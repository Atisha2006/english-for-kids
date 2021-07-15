import { DataService } from '../../core';
import { ICategory } from '../../models';
import { BaseComponent } from '../../shared';
import { CategoryCard } from '../categoryCard';

export class CategoriesList extends BaseComponent {
  constructor() {
    super('div', ['categories__list']);
  }

  async addCategoryCard(service: DataService): Promise<void> {
    const categories: ICategory[] = await service.getCategories();
    categories.forEach((category) => {
      this.element.append(new CategoryCard(category).render());
    });
  }

  render(): HTMLElement {
    return this.element;
  }
}
