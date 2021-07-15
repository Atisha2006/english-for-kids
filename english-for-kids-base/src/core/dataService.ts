import { ICategory, IWord } from '../models';
import { FileApi } from './fileApi';

export class DataService {
  private FileApi: FileApi;

  constructor(api: FileApi) {
    this.FileApi = api;
  }

  async getWords(category_id: number): Promise<Array<IWord>> {
    return this.FileApi.getWords(category_id);
  }

  async getAllWords(): Promise<Array<IWord>> {
    return this.FileApi.getAllWords();
  }

  async getDifficultWords(wordsIndex: number[]): Promise<Array<IWord>> {
    return this.FileApi.getDifficultWords(wordsIndex);
  }

  async getCategories(): Promise<Array<ICategory>> {
    return this.FileApi.getCategories();
  }
}
