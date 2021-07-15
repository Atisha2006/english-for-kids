import { DataService, StatisticService } from '../../core';
import { Game } from '../game';
import { IContent } from '../../models';
import { Button } from '../../shared';
import { WinPopup } from '../popup';
import { WordsList } from '../wordsList';

export class WordsModule implements IContent {
  private wordsList: WordsList;

  private element: HTMLElement;

  private dataService: DataService;

  private startBtn: Button;

  private rating: HTMLElement;

  private header: HTMLElement;

  private game: Game;

  private popup: WinPopup;

  private statisticService: StatisticService;

  constructor(parent: HTMLElement, service: DataService, statisticService: StatisticService) {
    this.element = parent;
    this.dataService = service;
    this.statisticService = statisticService;
    this.header = document.createElement('h2');
    this.wordsList = new WordsList(this.statisticService, this.header);
    this.startBtn = new Button('Start game', 'button', false, 'btn_start');
    this.rating = document.createElement('div');
    this.rating.classList.add('rating');
    this.popup = new WinPopup();
    this.game = new Game(this.statisticService, this.wordsList, this.startBtn, this.rating, this.popup);
  }

  destroy(): void {
    this.game.endGame();
    this.wordsList.element.innerHTML = '';
    this.element.removeChild(this.wordsList.element);
  }

  update(): void {
    this.game.endGame();
    this.wordsList.addState();
  }

  render(): HTMLElement {
    this.wordsList.init(this.dataService);
    this.wordsList.element.append(this.header, this.rating, this.startBtn.render());
    this.element.append(this.wordsList.render());
    document.body.append(this.popup.render());
    return this.element;
  }
}
