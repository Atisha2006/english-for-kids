import { StatisticService } from '../../core';
import { IContent } from '../../models';
import { StatisticList } from '../statisticList';

export class StatisticModule implements IContent {
  private element: HTMLElement;

  private statisticService: StatisticService;

  private statisticList: StatisticList;

  constructor(parent: HTMLElement, statisticService: StatisticService) {
    this.element = parent;
    this.statisticService = statisticService;
    this.statisticList = new StatisticList(this.statisticService);
  }

  destroy(): void {
    this.statisticList.element.innerHTML = '';
    this.element.removeChild(this.statisticList.element);
  }

  render(): HTMLElement {
    this.element.append(this.statisticList.render());
    return this.element;
  }
}
