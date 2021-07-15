import { ICategory, IWord } from '../models';

export class FileApi {
  async getWords(category_id: number): Promise<Array<IWord>> {
    const response = await fetch('./words.json');
    const res: [] = await response.json();
    const result: IWord[] = res[category_id - 1];
    return result;
  }

  async getAllWords(): Promise<Array<IWord>> {
    const response = await fetch('./words.json');
    const res: [] = await response.json();
    const result: IWord[] = res.reduce((acc, val) => acc.concat(val), []);
    return result;
  }

  async getDifficultWords(wordsIndex: number[]): Promise<Array<IWord>> {
    const allWords: IWord[] = await this.getAllWords();
    let result: IWord[] = [];
    wordsIndex.forEach((i) => {
      const word = allWords.find((el) => el.id === i);
      if (word) result = [...result, word];
    });
    return result;
  }

  async getCategories(): Promise<Array<ICategory>> {
    const response = await fetch('./categories.json');
    const result: ICategory[] = await response.json();
    return result;
  }
}
