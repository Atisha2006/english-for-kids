import { DataService } from '../../core';
import { IContent } from '../../models';
import { CategoriesList } from '../categoriesList';

export class CategoriesModule implements IContent {
  private categoriesList: CategoriesList;

  private element: HTMLElement;

  private dataService: DataService;

  constructor(parent: HTMLElement, service: DataService) {
    this.element = parent;
    this.dataService = service;
    this.categoriesList = new CategoriesList();
    this.categoriesList.addCategoryCard(this.dataService);
  }

  destroy(): void {
    this.element.removeChild(this.categoriesList.element);
  }

  render(): HTMLElement {
    this.element.append(this.categoriesList.render());
    return this.element;
  }
}
