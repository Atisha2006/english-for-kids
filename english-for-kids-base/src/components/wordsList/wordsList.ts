import { Context, COUNT_WORD, DataService, GameMode, PLAY_MODE_CLASS, Sort, StatisticService } from '../../core';
import { ICategory, IWord } from '../../models';
import { BaseComponent } from '../../shared';
import { WordCard } from '../wordCard';

export class WordsList extends BaseComponent {
  private context: Context;

  private wordCards: WordCard[];

  private statisticService: StatisticService;

  private header: HTMLElement;

  constructor(statisticService: StatisticService, header: HTMLElement) {
    super('div', ['word__list']);
    this.context = Context.getInstance();
    this.statisticService = statisticService;
    this.wordCards = [];
    this.header = header;
  }

  async init(service: DataService): Promise<void> {
    this.wordCards = [];
    const activeCategoryId = Number(this.context.getActiveState().split('-')[1]);
    const categories: ICategory[] = await service.getCategories();
    categories.forEach((cat) => { 
      if (cat.id === activeCategoryId) {
        this.header.textContent = cat.name;
      }
    });
    this.addWordCard(service, activeCategoryId);
  }

  async addWordCard(service: DataService, activeCategoryId: number): Promise<void> {
    let words: IWord[] = [];
    if (activeCategoryId) {
      words = await service.getWords(activeCategoryId);
    } else {
      const wordsIndex = this.statisticService
        .getSortedStatistic(Sort.percentError)
        .slice(0, COUNT_WORD)
        .filter((el) => el.playErrorClick > 0)
        .map((word) => word.id);
      words = await service.getDifficultWords(wordsIndex);
    }
    if (!words.length) {
      this.element.innerHTML = 'No difficult words';
    }
    words.forEach((word) => {
      const wordCard: WordCard = new WordCard(word, this.statisticService);
      this.wordCards = [...this.wordCards, wordCard];
      this.element.append(wordCard.render());
    });
    this.addState();
  }

  getWords(): WordCard[] {
    return this.wordCards;
  }

  addState(): void {
    const state = this.context.getGameState();
    if (state === GameMode.play) {
      this.element.classList.add(PLAY_MODE_CLASS);
      this.wordCards.forEach((word) => {
        word.removeTrainListeners();
      });
    } else {
      this.element.classList.remove(PLAY_MODE_CLASS);
      this.wordCards.forEach((word) => {
        word.addTrainListeners();
      });
    }
  }

  render(): HTMLElement {
    return this.element;
  }
}
