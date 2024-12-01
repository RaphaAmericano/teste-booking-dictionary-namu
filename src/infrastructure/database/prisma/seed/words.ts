import { prisma } from "../client";
import { WordService } from "../../../../application/services/WordService";
import { PromiseHandle } from "../../../../shared/utils/PromiseHandle";

const { word } = prisma;

export async function wordsSeed() {
  const data = await WordService.fetchWords();
  const map_data = WordService.mapWordsToInsert(WordService.mapWords(data));
  
  const createMany = word.createMany({
    data: map_data,
    skipDuplicates: true,
  });


  const { data: create_many_data, error } = await PromiseHandle.wrapPromise(createMany);
  if (error || !create_many_data) {
    throw new Error("Erro ao carregar o seed de palavras");
  }

  return create_many_data
}
