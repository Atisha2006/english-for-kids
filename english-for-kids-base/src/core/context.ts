import { GameMode, States } from './constants';

export class Context {
  private static instance: Context;

  private activeState: string;

  private gameState: string;

  private constructor() {
    this.activeState = States.category;
    this.gameState = GameMode.train;
  }

  public static getInstance(): Context {
    if (!Context.instance) {
      Context.instance = new Context();
    }
    return Context.instance;
  }

  public setActiveState(value: string): void {
    this.activeState = value;
  }

  public getActiveState(): string {
    return this.activeState;
  }

  public setGameState(value: string): void {
    this.gameState = value;
  }

  public getGameState(): string {
    return this.gameState;
  }
}
