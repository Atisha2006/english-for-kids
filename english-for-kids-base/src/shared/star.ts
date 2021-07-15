import { BaseComponent } from './baseComponent';

export class Star extends BaseComponent {
  private success: boolean;

  constructor(success: boolean) {
    super('span', ['star']);
    this.success = success;
    this.element.classList.add('star', `star_${success}`);
  }

  render(): HTMLElement {
    if (this.success) this.element.classList.add(`star_success`);
    else this.element.classList.add(`star_error`);
    return this.element;
  }
}
