import { States } from '../../core';
import { ICategory } from '../../models';
import { BaseComponent } from '../../shared';
import './categoryCard.scss';

export class CategoryCard extends BaseComponent {
  private category: ICategory;

  constructor(category: ICategory) {
    super('div', ['card', 'card_category']);
    this.category = category;
    this.addListeners();
  }

  addListeners(): void {
    this.element.addEventListener('click', () => {
      window.location.hash = `${States.words}-${this.category.id}`;
    });
  }

  render(): HTMLElement {
    const imgWrap = document.createElement('div');
    imgWrap.classList.add('card__img-wrap');

    const img = document.createElement('img');
    img.classList.add('card__img');
    img.src = this.category.image;
    img.setAttribute('alt', this.category.name);

    const desc = document.createElement('div');
    desc.classList.add('card__desc');
    desc.textContent = this.category.name;

    imgWrap.append(img);

    this.element.append(imgWrap, desc);
    return this.element;
  }
}
