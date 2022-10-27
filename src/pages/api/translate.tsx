import { NextApiRequest, NextApiResponse } from 'next'
import xml2json from 'xml2json'

import { PostForTranslate } from '@/types/requestBodies'

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const body: PostForTranslate = request.body
    const { text, languages } = body

    if (!text || !languages || !languages.source || !languages.target) {
      console.log(!text, !languages, !languages.source, !languages.target)
      return response.status(400).end('Invalid request body.')
    }
  }
  return response.end(`Hello Test Api!`)
}
