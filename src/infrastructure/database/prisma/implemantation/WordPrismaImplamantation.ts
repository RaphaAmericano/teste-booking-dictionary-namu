import { CreateAuthDto } from "../../../../domain/entities/Auth";
import { SearchWordDto } from "../../../../domain/entities/Word";
import { prisma } from "../client";
const { word } = prisma;

export class WordPrismaImplamantation {
  static async create(data: SearchWordDto): Promise<any> {
    const { word: word_search } = data;
    const result = await word.findMany({
      where: {
        word: {
          contains: word_search,
          mode: "insensitive"
        },
      },
    });
    return result;
  }

  static async getAll(): Promise<any> {
    const result = await word.findMany({
      orderBy: {
        word: "asc",
      },
    });
    return result;
  }

  static async getAllWithProps(term: string, limit: number, skip: number = 0): Promise<any> {
    const results = await word.findMany({
      where: {
        word: {
          contains: term,
          mode: "insensitive"
        },
      },
      take: limit,
      skip,
      orderBy: {
        word: "asc",
      },
    });
    
    const totalDocs = await word.count({
      where: {
        word: {
          contains: term,
          mode: "insensitive"
        },
      }
    })  

    return { 
      results,
      totalDocs
     };
  }

  static async getWordByTerm(term: string): Promise<any> {
    const result = await word.findFirst({
      where: {
        word: term,
      },
    })
    return result;
  }

}
