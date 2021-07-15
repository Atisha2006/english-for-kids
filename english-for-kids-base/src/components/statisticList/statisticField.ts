import { IStatisticWord } from '../../models';
import { BaseComponent } from '../../shared';

export class StatisticField extends BaseComponent {
  private wordStatistic: IStatisticWord;

  private number: HTMLElement;

  private category: HTMLElement;

  private word: HTMLElement;

  private translation: HTMLElement;

  private trainClick: HTMLElement;

  private playCorrect: HTMLElement;

  private playError: HTMLElement;

  private percent: HTMLElement;

  constructor(word: IStatisticWord) {
    super('div', ['statistic-feild']);
    this.wordStatistic = word;
    this.number = document.createElement('div');
    this.number.classList.add('statistic__number');
    this.category = document.createElement('div');
    this.category.classList.add('statistic__category');
    this.word = document.createElement('div');
    this.word.classList.add('statistic__word');
    this.translation = document.createElement('div');
    this.translation.classList.add('statistic__translation');
    this.trainClick = document.createElement('div');
    this.trainClick.classList.add('statistic__trainClick');
    this.playCorrect = document.createElement('div');
    this.playCorrect.classList.add('statistic__playCorrect');
    this.playError = document.createElement('div');
    this.playError.classList.add('statistic__playError');
    this.percent = document.createElement('div');
    this.percent.classList.add('statistic__percent');
  }

  public updateStatistic(word: IStatisticWord): void {
    this.category.textContent = `${word.category}`;
    this.word.textContent = `${word.word}`;
    this.translation.textContent = `${word.translation}`;
    this.trainClick.textContent = `${word.trainClick}`;
    this.playCorrect.textContent = `${word.playCorrectClick}`;
    this.playError.textContent = `${word.playErrorClick}`;
    const percent = Math.ceil((word.playCorrectClick * 100) / (word.playCorrectClick + word.playErrorClick)) || 0;
    this.percent.textContent = `${percent}`;
  }

  render(): HTMLElement {
    this.updateStatistic(this.wordStatistic);
    this.element.append(
      this.number,
      this.category,
      this.word,
      this.translation,
      this.trainClick,
      this.playCorrect,
      this.playError,
      this.percent
    );
    return this.element;
  }
}
