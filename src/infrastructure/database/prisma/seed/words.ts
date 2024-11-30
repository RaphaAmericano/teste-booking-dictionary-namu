import { prisma } from "../client";
import { WordsService } from "../../../../application/services/WordsService";
import { PromiseHandle } from "../../../../shared/utils/PromiseHandle";

const { word } = prisma;

export async function wordsSeed() {
  const data = await WordsService.fetchWords();
  const reduce_data = WordsService.reduceWords(data);
  const createMany = word.createMany({
    data: reduce_data,
    skipDuplicates: true,
  });

  const { data: create_many_data, error } = await PromiseHandle.wrapPromise(
    createMany
  );
  if (error || !create_many_data) {
    throw new Error("Erro ao carregar o seed de palavras");
  }

  return create_many_data
}
