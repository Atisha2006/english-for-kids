import './switch.scss';
import { BaseComponent } from '../../shared';
import { Context, GameMode, States } from '../../core';
import { WordsModule } from '../contentModules';

export class Switch extends BaseComponent {
  private input: HTMLInputElement;

  private context: Context;

  private content: WordsModule;

  constructor(content: WordsModule) {
    super('label', ['switch']);
    this.context = Context.getInstance();
    this.input = document.createElement('input');
    this.input.classList.add('input-checkbox');
    this.input.setAttribute('name', 'switch');
    this.input.setAttribute('type', 'checkbox');
    this.addListener(this.input);
    this.content = content;
  }

  addListener(input: HTMLInputElement): void {
    input.addEventListener('change', () => {
      if (input.checked) {
        this.context.setGameState(GameMode.play);
      } else {
        this.context.setGameState(GameMode.train);
      }
      if (this.context.getActiveState().split('-')[0] === States.words) {
        this.content.update();
      }
    });
  }

  render(): HTMLElement {
    const span = document.createElement('span');
    span.classList.add('checkbox-switch');
    this.element.append(this.input, span);
    return this.element;
  }
}
