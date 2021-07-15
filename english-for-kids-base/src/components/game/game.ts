import { WinPopup } from '../popup';
import { WordCard } from '../wordCard';
import { WordsList } from '../wordsList';
import { Button, Star, delay } from '../../shared';
import {
  ASK_WORD_DELAY,
  CORRECT_AUDIO,
  ERROR_AUDIO,
  FAILURE_AUDIO,
  GameStateDefault,
  RANDOM_INDEX,
  StatisticService,
  SUCCESS_AUDIO
} from '../../core';

export class Game {
  private audio: HTMLAudioElement;

  private startBtn: Button;

  private rating: HTMLElement;

  private wordsList: WordsList;

  private popup: WinPopup;

  private statisticService: StatisticService;

  private wordCards: WordCard[];

  private currentWord: WordCard;

  private isStart: boolean;

  private errorCount: number;

  private activeWordIndex: number;

  constructor(
    statisticService: StatisticService,
    wordsList: WordsList,
    startButton: Button,
    ratingNode: HTMLElement,
    popup: WinPopup
  ) {
    this.statisticService = statisticService;
    this.audio = new Audio();
    this.startBtn = startButton;
    this.rating = ratingNode;
    this.wordsList = wordsList;
    this.popup = popup;
    this.startBtn.element.addEventListener('click', () => {
      if (!this.isStart) {
        this.startGame();
        this.startBtn.element.classList.add('active');
      } else this.askWord();
    });
    this.currentWord = undefined!;
    ({
      isStart: this.isStart,
      activeWordIndex: this.activeWordIndex,
      errorCount: this.errorCount,
      wordCards: this.wordCards
    } = GameStateDefault);
  }

  startGame(): void {
    this.isStart = true;
    this.wordCards = this.wordsList.getWords();
    this.wordCards.forEach((word) => {
      word.element.addEventListener('click', () => {
        this.currentWord = word;
      });
      word.element.addEventListener('click', this.answerCard);
    });
    this.wordCards = this.wordCards.sort(() => Math.random() - RANDOM_INDEX);
    this.askWord();
  }

  answerCard = async (): Promise<void> => {
    const activeWord = this.wordCards[this.activeWordIndex];
    if (this.currentWord === activeWord) {
      this.currentWord.element.classList.add('disable');
      this.addStar(true);
      this.correctAudio();
      this.statisticService.updatePlayCorrect(activeWord.getWordId());
      this.activeWordIndex++;
      if (this.activeWordIndex < this.wordCards.length) {
        await delay(ASK_WORD_DELAY);
        this.askWord();
      } else {
        await delay(ASK_WORD_DELAY);
        this.audio.src = this.errorCount ? FAILURE_AUDIO : SUCCESS_AUDIO;
        this.popup.show(this.errorCount);
        this.audio.play();
      }
    } else {
      this.addStar(false);
      this.errorAudio();
      this.statisticService.updatePlayError(activeWord.getWordId());
      this.errorCount++;
    }
  };

  endGame(): void {
    this.startBtn.element.classList.remove('active');
    this.rating.innerHTML = '';
    this.wordCards.forEach((word) => {
      word.element.classList.remove('disable');
      word.element.removeEventListener('click', this.answerCard);
    });
    ({
      isStart: this.isStart,
      activeWordIndex: this.activeWordIndex,
      errorCount: this.errorCount,
      wordCards: this.wordCards
    } = GameStateDefault);
  }

  askWord = (): void => {
    this.wordCards[this.activeWordIndex].playAudio();
  };

  addStar(success: boolean): void {
    this.rating.append(new Star(success).render());
  }

  correctAudio(): void {
    this.audio.src = CORRECT_AUDIO;
    this.audio.play();
  }

  errorAudio(): void {
    this.audio.src = ERROR_AUDIO;
    this.audio.play();
  }
}
