import { ICategory, IStatisticWord, IWord } from '../models';
import { INITIAL_VALUE, Sort } from './constants';
import { DataService } from './dataService';

export class StatisticService {
  private dataService: DataService;

  constructor(dataService: DataService) {
    this.dataService = dataService;
  }

  async init(): Promise<void> {
    const words: IWord[] = await this.dataService.getAllWords();
    const categories: ICategory[] = await this.dataService.getCategories();
    const categoriesMap: Map<number, string> = categories.reduce((acc, cat) => acc.set(cat.id, cat.name), new Map());

    words.forEach((word) => {
      if (localStorage.getItem(`${word.id}`)) return;
      this.addWord(word, categoriesMap.get(word.category_id));
    });
  }

  reset(): void {
    localStorage.clear();
  }

  addWord(word: IWord, category: string | undefined): void {
    const wordStatistic = JSON.stringify({
      id: word.id,
      category,
      word: word.word,
      translation: word.translation,
      trainClick: INITIAL_VALUE,
      playCorrectClick: INITIAL_VALUE,
      playErrorClick: INITIAL_VALUE
    });
    localStorage.setItem(`${word.id}`, wordStatistic);
  }

  getWord(id: number): IStatisticWord {
    const response = localStorage.getItem(`${id}`);
    const result: IStatisticWord = response ? JSON.parse(response) : null;
    return result;
  }

  updateWord(id: number, word: IStatisticWord): void {
    localStorage.setItem(`${id}`, JSON.stringify(word));
  }

  getStatistic(): IStatisticWord[] {
    const result: IStatisticWord[] = Object.values(localStorage).map((el) => JSON.parse(el));
    return result;
  }

  updateTrain(id: number): void {
    const result: IStatisticWord = this.getWord(id);
    result.trainClick++;
    this.updateWord(id, result);
  }

  updatePlayCorrect(id: number): void {
    const result: IStatisticWord = this.getWord(id);
    result.playCorrectClick++;
    this.updateWord(id, result);
  }

  updatePlayError(id: number): void {
    const result: IStatisticWord = this.getWord(id);
    result.playErrorClick++;
    this.updateWord(id, result);
  }

  removeWord(id: number): void {
    localStorage.removeItem(`${id}`);
  }

  getSortedStatistic(sort: string): IStatisticWord[] {
    const statistic = this.getStatistic();
    switch (sort) {
      case Sort.word:
        return statistic.sort((a, b) => (a.word > b.word ? 1 : -1));
      case Sort.translation:
        return statistic.sort((a, b) => (a.translation > b.translation ? 1 : -1));
      case Sort.trainClick:
        return statistic.sort((a, b) => b.trainClick - a.trainClick);
      case Sort.playCorrectClick:
        return statistic.sort((a, b) => b.playCorrectClick - a.playCorrectClick);
      case Sort.playErrorClick:
        return statistic.sort((a, b) => b.playErrorClick - a.playErrorClick);
      case Sort.percentCorrect:
        return statistic.sort(
          (a, b) =>
            (Math.ceil((b.playCorrectClick * 100) / (b.playCorrectClick + b.playErrorClick)) || 0) -
            (Math.ceil((a.playCorrectClick * 100) / (a.playCorrectClick + a.playErrorClick)) || 0)
        );
      case Sort.percentError:
        return statistic.sort(
          (a, b) =>
            (Math.ceil((b.playErrorClick * 100) / (b.playCorrectClick + b.playErrorClick)) || 0) -
            (Math.ceil((a.playErrorClick * 100) / (a.playCorrectClick + a.playErrorClick)) || 0)
        );
      default:
        return statistic.sort((a, b) => (a.category > b.category ? 1 : -1));
    }
  }
}
