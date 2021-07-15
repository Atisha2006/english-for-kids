import { Sort, SortOrder, States, StatisticService } from '../../core';
import { BaseComponent, Button, StatisticCol } from '../../shared';
import { StatisticField } from './statisticField';
import './statisticList.scss';

export class StatisticList extends BaseComponent {
  private statisticService: StatisticService;

  private number: StatisticCol;

  private category: StatisticCol;

  private word: StatisticCol;

  private translation: StatisticCol;

  private trainClick: StatisticCol;

  private playCorrect: StatisticCol;

  private playError: StatisticCol;

  private percent: StatisticCol;

  private statisticFields: StatisticField[] = [];

  private sortHeaderCol: StatisticCol[];

  private btnReset: Button;

  private btnDifficultWords: Button;

  constructor(statisticService: StatisticService) {
    super('div', ['statistic__list']);
    this.statisticService = statisticService;
    this.number = new StatisticCol('№', 'statistic__number');
    this.category = new StatisticCol('Category', 'statistic__category', Sort.category);
    this.word = new StatisticCol('Word', 'statistic__word', Sort.word);
    this.translation = new StatisticCol('Translation', 'statistic__translation', Sort.translation);
    this.trainClick = new StatisticCol('Train', 'statistic__trainClick', Sort.trainClick);
    this.playCorrect = new StatisticCol('Correct', 'statistic__playCorrect', Sort.playCorrectClick);
    this.playError = new StatisticCol('Wrong', 'statistic__playError', Sort.playErrorClick);
    this.percent = new StatisticCol('% Correct', 'statistic__percent', Sort.percentCorrect);
    this.sortHeaderCol = [
      this.category,
      this.word,
      this.translation,
      this.trainClick,
      this.playCorrect,
      this.playError,
      this.percent
    ];
    this.addListeners();
    this.btnReset = new Button('Reset statistic', 'button', false, 'btn_statistic');
    this.btnReset.element.addEventListener('click', () => {
      this.reset();
    });
    this.btnDifficultWords = new Button('Repeat difficult words', 'button', false, 'btn_difficult');
    this.btnDifficultWords.element.addEventListener('click', () => {
      window.location.hash = `${States.words}`;
    });
  }

  async reset(): Promise<void> {
    this.statisticService.reset();
    await this.statisticService.init();
    this.statisticService
      .getSortedStatistic(Sort.category)
      .forEach((word, index) => this.statisticFields[index].updateStatistic(word));
  }

  addWordStatistic(): void {
    this.statisticFields = [];
    this.statisticService.getSortedStatistic(Sort.category).forEach((el) => {
      const statisticField = new StatisticField(el);
      this.element.append(statisticField.render());
      this.statisticFields = [...this.statisticFields, statisticField];
    });
  }

  addListeners(): void {
    this.sortHeaderCol.forEach((col) =>
      col.element.addEventListener('click', () => {
        const statistic = this.statisticService.getSortedStatistic(col.target);
        if (col.element.classList.contains(SortOrder.desc)) {
          col.element.classList.remove(SortOrder.desc);
          col.element.classList.add(SortOrder.asc);
          statistic.reverse();
        } else if (col.element.classList.contains(SortOrder.asc)) {
          col.element.classList.remove(SortOrder.asc);
          col.element.classList.add(SortOrder.desc);
        } else {
          this.sortHeaderCol.forEach((el) => el.element.classList.remove(SortOrder.asc, SortOrder.desc));
          col.element.classList.add(SortOrder.desc);
        }
        statistic.forEach((word, index) => this.statisticFields[index].updateStatistic(word));
      })
    );
  }

  render(): HTMLElement {
    this.element.append(this.btnReset.render(), this.btnDifficultWords.render());
    const header = document.createElement('div');
    header.classList.add('statistic-feild', 'statistic-feild_header');
    this.element.append(header);
    this.sortHeaderCol.forEach((col) => col.element.classList.remove(SortOrder.asc, SortOrder.desc));
    header.append(
      this.number.render(),
      this.category.render(),
      this.word.render(),
      this.translation.render(),
      this.trainClick.render(),
      this.playCorrect.render(),
      this.playError.render(),
      this.percent.render()
    );
    this.addWordStatistic();
    return this.element;
  }
}
