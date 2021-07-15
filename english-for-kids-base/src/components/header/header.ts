import './header.scss';
import { BaseComponent, NavButton } from '../../shared';
import { Navbar } from '../navbar';
import { ICategory } from '../../models';
import { DataService } from '../../core/dataService';
import { MAIN_ICON, States, STATISTIC_ICON } from '../../core/constants';

export class Header extends BaseComponent {
  private navbar: Navbar;

  private dataService: DataService;

  constructor(service: DataService) {
    super('header', ['header']);
    this.dataService = service;
    this.navbar = new Navbar();
    this.init();
  }

  init(): void {
    this.navbar.append(new NavButton('Main Page', MAIN_ICON, States.category, 'active'));
    this.navbar.append(new NavButton('Statistic', STATISTIC_ICON, States.statistic));
    this.navbarCategory();
  }

  updateActive(): void {
    this.navbar.updateActive();
  }

  async navbarCategory(): Promise<void> {
    const categories: ICategory[] = await this.dataService.getCategories();
    categories.forEach((category) =>
      this.navbar.append(new NavButton(category.name, category.icon, `${States.words}-${category.id}`))
    );
  }

  render(): HTMLElement {
    this.element.appendChild(this.navbar.render());
    return this.element;
  }
}
