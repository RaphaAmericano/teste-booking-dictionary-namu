export interface WordId {
  id?: string;
}

export interface Word  extends WordId {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  origin: string
  meanings: Meaning[]
  license: License,
  sourceUrls: string[]
}

export interface Phonetic {
  text: string
  audio?: string
  sourceUrl?: string;
  license?: License
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[],
  synonyms?: string[],
  antonyms?: string[]
}

export interface Definition {
  definition: string
  example?: string
  synonyms: any[]
  antonyms: any[]
}
export interface License {
  name: string;
  url: string;
}


export interface InserWordDto extends Omit<Word, "id"> {}

export interface SearchWordDto extends Pick<Word, "word"> {}

export interface DictionaryApiResponse {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  origin?: string
  meanings: Meaning[],
  license: License,
  sourceUrls?: string[]
}

export interface UpdateWordDto extends DictionaryApiResponse {}