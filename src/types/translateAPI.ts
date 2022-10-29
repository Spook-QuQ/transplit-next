export type PostForTranslate = {
  text: string
  language: {
    target: string
    source: string
  }
}

export type ParsedWord = {
  surface: string
  reading: string
  pos: string
}

export type WordResult = {
  word: string
  translatedWord: string
}

export type TranslateResult = {
  source: WordResult[]
  target: WordResult[]
}
