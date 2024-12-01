import axios from "axios";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { InserWordDto } from "../../domain/entities/Word";
import { WordRepositoryImpl } from "../../infrastructure/database/WordRepositoryImpl";

export class WordService {

  constructor(private readonly wordRepository: WordRepositoryImpl){}

  public static async fetchWords() {
    const url =
      "https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words_dictionary.json";
    const { data: words_data, error } = await PromiseHandle.wrapPromise(
      axios.get(url)
    );
    if (error || !words_data) {
      throw new Error("Erro ao buscar palavras");
    }
    return words_data.data;
  }

  public static reduceWords(words: { [key: string]: number }) {
    const reduce_data = Object.keys(words).reduce(
      (acc: InserWordDto[], word: string) => {
        const obj = { word, number: words[word] };
        acc.push(obj);
        return acc;
      },
      []
    );
    return reduce_data;
  }

  public static mapWords(words: { [key: string]: number }) {
    const map_data = Object.keys(words)
    return map_data;
  }

  public static mapWordsToInsert(words: string[] ) {
    return words.map((word) => ({ word }));
  }

  public async getAllWords(search: string, limit: number, skip: number ) {
    return this.wordRepository.getByTerm(search, limit, skip)
  }

}
