import { NextApiRequest, NextApiResponse } from 'next'
import xml2json from 'xml2json'
import { URLSearchParams } from 'url'

import {
  PostForTranslate,
  WordResult,
  ParsedWord,
  TranslateResult,
} from '@/types/translateAPI'

const reqParsedText = async (text): Promise<ParsedWord[]> => {
  if (!text) throw new Error('Invalid text.')

  const query = {
    appid: process.env.YAHOO_API_APP_KEY,
    sentence: text,
    results: 'ma',
  }

  const res = await fetch(
    `${process.env.YAHOO_API_URL}?${new URLSearchParams(query)}`,
  )

  const json = await res
    .text()
    .then((t) => xml2json.toJson(t))
    .then(JSON.parse)
    .then(({ ResultSet: { ma_result } }) => ma_result)
    .then((maRs) => {
      if (Array.isArray(maRs.word_list.word)) {
        return maRs.word_list.word
      } else {
        return [maRs.word_list.word]
      }
    })
    .then((words) => words.filter((word) => word.surface !== ''))
  return json as Promise<ParsedWord[]>
}

const sleep = async (length: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, length))
}

const reqTranslate = async (_query: PostForTranslate): Promise<string> => {
  if (!_query || typeof _query.text !== 'string' || !_query.language)
    throw new Error('Invalid query.')

  const { text, language } = _query

  if (!language.source || !language.target)
    throw new Error('source or target of language is not exist or empty')
  if (!text) throw new Error('text is not exist or empty')
  if (text.length > 2000) throw new Error('text.length is over 2000')

  const query = {
    text: _query.text,
    ..._query.language,
  }

  const res = await fetch(
    `${process.env.TRANSLATE_API_URL}?${new URLSearchParams(query)}`,
  )

  const resultText: string = await res.text()

  if (resultText.match('<title>エラー</title>')) {
    console.log('error');
    
    await sleep(100)
    return await reqTranslate(_query)
  } else {
    return resultText
  }
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const body: PostForTranslate = request.body
    const { text, language } = body

    if (!text || !language || !language.source || !language.target) {
      return response.status(400).end('Invalid request body.')
    }

    const [translatedText, parsedSourceText] = await Promise.all([
      reqTranslate(body),
      reqParsedText(text),
    ])

    const parsedTranslatedText = await reqParsedText(translatedText)

    // prettier-ignore
    const [
      resultSourceText,
      resultTranslatedText
    ] = await Promise.all([
      Promise.all(
        parsedSourceText.map(async (word, i): Promise<WordResult> => {
          await sleep(i * 5)
          return {
            word: word.surface,
            translatedWord: await reqTranslate({
              text: word.surface,
              language,
            }),
          }
        }),
      ),
      Promise.all(
        parsedTranslatedText.map(async (word, i): Promise<WordResult> => {
          await sleep(i * 5)
          return {
            word: word.surface,
            translatedWord: await reqTranslate({
              text: word.surface,
              language: {
                target: language.source,
                source: language.target,
              },
            }),
          }
        }),
      ),
    ])

    const result: TranslateResult = {
      source: resultSourceText,
      target: resultTranslatedText,
    }

    return response.json(result)
  }
}
