export interface IStatisticWord {
  id: number;
  category: string;
  word: string;
  translation: string;
  trainClick: number;
  playCorrectClick: number;
  playErrorClick: number;
}
