import { SearchWordDto, UpdateWordDto } from "../../../../domain/entities/Word";
import { prisma } from "../client";
const { word, meaning, phonetic } = prisma;

export class WordPrismaImplamantation {
  static async create(data: SearchWordDto): Promise<any> {
    const { word: word_search } = data;
    const result = await word.findMany({
      where: {
        word: {
          contains: word_search,
          mode: "insensitive",
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

  static async getAllWithProps(
    term: string,
    limit: number,
    skip: number = 0
  ): Promise<any> {
    const results = await word.findMany({
      where: {
        word: {
          contains: term,
          mode: "insensitive",
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
          mode: "insensitive",
        },
      },
    });

    return {
      results,
      totalDocs,
    };
  }

  static async getWordByTerm(term: string): Promise<any> {
    const result = await word.findFirst({
      where: {
        word: term,
      },
    });
    return result;
  }
  static async update(id: string, data: UpdateWordDto): Promise<any> { 
    const { word: word_string, phonetic: phonetic_string } = data
    const result = await word.update({
      where: {
        id,
      },
      data: {
        word: word_string,
        phonetic: phonetic_string
      },
    });
    return result  
  }
  static async updateAndRealtions(id: string, data: UpdateWordDto): Promise<any> {
    const {
      word: word_string,
      phonetic: phonetic_string,
      phonetics,
      meanings,
    } = data;

    const result = await word.update({
      where: {
        id,
      },
      data: {
        word: word_string,
        phonetic: phonetic_string,
      },
    });

    const phonetic_update_promises = phonetics.map((item) =>
      phonetic.upsert({
        where: {
          id: `${result.id}-${item.text}`,
        },
        create: {
          word_id: result.id,
          text: item.text,
          audio: item.audio,
        },
        update: {
          word_id: result.id,
          text: item.text,
          audio: item.audio,
        },
      })
    );
    

    // TODO: aqui deve ser algo mais elaborado. para cada objeto, gerar as promises de update e create
    // e depois fazer um Promise.all para executar todas as promises
    // precisar dos ids para conectar aos objetos relaticos
    const meanings_update_promises = meanings.map((item) => {
      const { partOfSpeech, definitions, synonyms, antonyms } = item;
      return meaning.upsert({
        where: {
          id: `${result.id}-${partOfSpeech}`,
        },
        create: {
          word_id: result.id,
          part_of_speech: partOfSpeech,
        },
        update: {
          word_id: result.id,
          part_of_speech: partOfSpeech,
          
        },
      })
    });

    const meanings_upsert_result = await Promise.all(meanings_update_promises);
    const phonetic_upsert_result = await Promise.all(phonetic_update_promises);
    return result;
  }
}
