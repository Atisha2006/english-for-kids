import { BaseComponent } from './baseComponent';

export class StatisticCol extends BaseComponent {
  private text: string;

  target: string;

  constructor(text: string, className: string, target = 'none') {
    super('div', [className]);
    this.text = text;
    this.target = target;
  }

  render(): HTMLElement {
    this.element.textContent = this.text;
    return this.element;
  }
}
