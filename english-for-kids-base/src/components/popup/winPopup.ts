import './popup.scss';
import { BaseComponent } from '../../shared';
import { States } from '../../core';

export class WinPopup extends BaseComponent {
  constructor() {
    super('div', ['overlay', 'hidden']);
    this.element.addEventListener('click', () => {
      window.location.hash = States.category;
      this.hide();
    });
  }

  show(count: number): void {
    const popupInner = document.createElement('div');
    popupInner.classList.add('popup__inner');
    popupInner.innerHTML = count ? `${count} mistakes` : `You Win!!!`;
    if (count) {
      popupInner.classList.remove('win');
    } else popupInner.classList.add('win');
    this.element.append(popupInner);
    this.element.classList.remove('hidden');
  }

  hide(): void {
    this.element.classList.add('hidden');
    this.element.innerHTML = '';
  }

  render(): HTMLElement {
    return this.element;
  }
}
