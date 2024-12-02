import axios from "axios";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { WordRepositoryImpl } from "../../infrastructure/database/WordRepositoryImpl";
import { Word, WordFavoriteHistoryDto, WordFavoriteHistoryFormatDto } from "../../domain/entities/Word";

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

  public static mapWords(words: { [key: string]: number }) {
    const map_data = Object.keys(words)
    return map_data;
  }

  public static mapWordsToInsert(words: string[] ) {
    return words.map((word) => ({ word }));
  }

  public static formatWordToResponse(words: WordFavoriteHistoryDto[] ): WordFavoriteHistoryFormatDto[]{
    return words.map(({ created_at, word }: WordFavoriteHistoryDto) => ({ added: created_at, word: word.word }))
  }

  // * Database funcions
  public async getAllWords(search: string, limit: number, skip: number ) {
    return this.wordRepository.getByTerm(search, limit, skip)
  }

  public async getWord(word:string){
    return this.wordRepository.getByWord(word)
  }

  public async update(id: string, data: any) {
    return this.wordRepository.update(id, data);
  }

  

}
