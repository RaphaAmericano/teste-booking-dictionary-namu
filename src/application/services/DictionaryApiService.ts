import axios from "axios"
import { PromiseHandle } from "../../shared/utils/PromiseHandle";

export class DictionaryApiService {
    public static async getWord(word: string){
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const { data, error } = await PromiseHandle.wrapPromise(
        axios.get(url)
      );
      if (error || !data) {
        throw new Error("Erro ao buscar palavras");
      }
      return data.data;
    }
}