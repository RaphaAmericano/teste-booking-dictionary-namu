import { History, CreateHistoryDto } from "../../../../domain/entities/History";
import { prisma } from "../client";
const { history } = prisma;

export class HistoryPrismaImplamantation {
  static async create(data: CreateHistoryDto): Promise<History> {
    const result = await history.create({
      data,
    });
    return result;
  }
}
