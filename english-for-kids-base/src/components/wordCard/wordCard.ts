import { FLIP_CLASS, StatisticService } from '../../core';
import { IWord } from '../../models';
import { BaseComponent } from '../../shared';
import './wordCard.scss';

export class WordCard extends BaseComponent {
  private word: IWord;

  private rotate: HTMLElement;

  private audio: HTMLAudioElement;

  private statisticService: StatisticService;

  constructor(word: IWord, statisticService: StatisticService) {
    super('div', ['card', 'word-card']);
    this.word = word;
    this.statisticService = statisticService;
    this.rotate = document.createElement('div');
    this.rotate.classList.add('card__rotate');

    this.audio = new Audio(word.audioSrc);
  }

  getWordId(): number {
    return this.word.id;
  }

  addTrainListeners(): void {
    this.element.addEventListener('click', this.updateStatistic);
    this.element.addEventListener('click', this.playAudio);
    this.rotate.addEventListener('click', this.flipCard);
  }

  removeTrainListeners(): void {
    this.element.removeEventListener('click', this.updateStatistic);
    this.element.removeEventListener('click', this.playAudio);
    this.rotate.removeEventListener('click', this.flipCard);
  }

  updateStatistic = (): void => {
    this.statisticService.updateTrain(this.word.id);
  };

  playAudio = (): void => {
    if (this.element.classList.contains(FLIP_CLASS)) return;
    this.audio.play();
  };

  flipCard = (): void => {
    this.element.classList.add(FLIP_CLASS);
    this.element.addEventListener('mouseleave', this.removeFlipClass);
  };

  removeFlipClass = (): void => {
    this.element.classList.remove(FLIP_CLASS);
    this.element.removeEventListener('mouseleave', this.removeFlipClass);
  };

  render(): HTMLElement {
    const cardFront = document.createElement('div');
    cardFront.classList.add('word-card__front');
    cardFront.style.backgroundImage = `url('${this.word.image}')`;

    const descFront = document.createElement('div');
    descFront.classList.add('card__desc');
    descFront.textContent = this.word.word;

    const cardBack = document.createElement('div');
    cardBack.classList.add('word-card__back');
    cardBack.style.backgroundImage = `url('${this.word.image}')`;

    const descBack = document.createElement('div');
    descBack.classList.add('card__desc');
    descBack.textContent = this.word.translation;

    cardFront.append(descFront, this.rotate);
    cardBack.append(descBack);

    this.element.append(cardFront, cardBack);

    return this.element;
  }
}
