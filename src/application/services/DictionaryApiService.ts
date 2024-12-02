import axios from "axios";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { DictionaryApiResponse, Phonetic, Meaning } from "../../domain/entities/Word";

export class DictionaryApiService {
  public static async getWord(word: string) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const { data, error } = await PromiseHandle.wrapPromise(axios.get(url));
    if (error || !data) {
      throw new Error("Erro ao buscar palavras");
    }
    return data.data;
  }

  public static reduceResponseArray(response: DictionaryApiResponse[]): DictionaryApiResponse {
    
    const words_string = new Set([...response.map(({ word }) => word)]);
    
    const phonetic_string = new Set([...response.map(({ phonetic }) => phonetic)]);
    const phonetics_objects = response
      .map(({ phonetics }) => phonetics)
      .flatMap((phonetics) => phonetics)
      .filter(({ audio }) => audio !== "")
      .reduce((arr, item) => {
        const exist = arr.find((p:Phonetic) => p.audio === item.audio)
        if (exist) {
          return arr;
        }
        arr.push(item)
        return arr 
      }, [] as Phonetic[]);
      
    const meanings_objects = response
      .map(({ meanings } ) => meanings)
      .flatMap((meanings) => meanings)
        .reduce((acc, meaning) => {
          const { partOfSpeech } = meaning
          const exist = acc.find(
            (item:Meaning) => item.partOfSpeech === partOfSpeech
          )
          
          if (exist) {
            exist.definitions = [...exist.definitions, ...meaning.definitions];
            exist.synonyms = [...(exist.synonyms ?? []), ...(meaning.synonyms ?? [])];
            exist.antonyms = [...(exist.antonyms ?? []), ...(meaning.antonyms ?? [])];
          } else {
            acc.push(meaning)
          }

          return acc;
        }, [] as Meaning[]);

    return {
      word: words_string.values().next().value,
      phonetic: phonetic_string.values().next().value,
      phonetics: phonetics_objects,
      meanings: meanings_objects,
    } as DictionaryApiResponse;

    }
  } 
