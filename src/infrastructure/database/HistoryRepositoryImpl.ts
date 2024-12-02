import { HistoryRepository } from "../../domain/interfaces/HistoryRepository";

interface HistoryRepositoryImplProps {
  createFunction: (data: any) => Promise<any>;
}

export class HistoryRepositoryImpl implements HistoryRepository {
  private createFunction: (data: any) => Promise<any>;
  constructor(props: HistoryRepositoryImplProps) {
    this.createFunction = props.createFunction;
  }

  async create(data: any): Promise<any> {
    const result = await this.createFunction(data);
    return result;
  }
}
