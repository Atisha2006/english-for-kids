import { IGameStateDefault } from '../models';

/**
 *  Router states
 */
export const States = {
  category: 'category', // default State
  words: 'words',
  statistic: 'statistic'
};

/**
 *  Game mode
 */
export const GameMode = {
  train: 'train', // default mode
  play: 'play'
};

/**
 * API url
 */
export const BASE = 'http://127.0.0.1:3000';

/**
 *  Main page icon
 */
export const MAIN_ICON = './icons/main.svg';

/**
 *  Statistic page icon
 */
export const STATISTIC_ICON = './icons/statistic.svg';

/**
 *  Sound correct answer
 */
export const CORRECT_AUDIO = './audio/correct.mp3';

/**
 *  Sound error answer
 */
export const ERROR_AUDIO = './audio/error.mp3';

/**
 *  Sound success end game
 */
export const SUCCESS_AUDIO = './audio/success.mp3';

/**
 *  Sound error end game
 */
export const FAILURE_AUDIO = './audio/failure.mp3';

/**
 *  Additional class wordCard for flipped state
 */
export const FLIP_CLASS = 'flipped';

/**
 *  Additional class wordList for play mode
 */
export const PLAY_MODE_CLASS = 'play-mode';

/**
 *  Random index for shuffle word
 */
export const RANDOM_INDEX = 0.5;

/**
 *  Default state game before start game
 */
export const GameStateDefault: IGameStateDefault = {
  isStart: false,
  activeWordIndex: 0, // index active card in array of wordCards
  errorCount: 0, // number of incorrect answers
  wordCards: [] // array of word cards before start game is empty
};

/**
 *  Statisics parameters for sorting
 */
export const Sort = {
  category: 'category',
  word: 'word',
  translation: 'translation',
  trainClick: 'trainClick',
  playCorrectClick: 'playCorrectClick',
  playErrorClick: 'playErrorClick',
  percentCorrect: 'percentCorrect',
  percentError: 'percentError'
};

/**
 *  Sorting order types
 */
export const SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

/**
 *  MAX count word card in page
 */
export const COUNT_WORD = 8;

/**
 *  Delay before asking for the next word
 */
export const ASK_WORD_DELAY = 1000;

/**
 *  Default initial value for statistics parametrs
 */
export const INITIAL_VALUE = 0;

/**
 *  Github link
 */
export const GITHUB_LINK = 'https://github.com/Atisha2006';

/**
 *  Rs.school link
 */
export const RSSCHOOL_LINK = 'https://rs.school/js/';
