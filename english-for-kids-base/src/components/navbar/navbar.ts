import './navbar.scss';
import { BaseComponent, NavButton } from '../../shared';
import { Context } from '../../core/context';

export class Navbar extends BaseComponent {
  private buttons: NavButton[] = [];

  private navList: HTMLElement;

  private navBtn: HTMLElement;

  private context: Context;

  constructor() {
    super('nav', ['nav']);
    this.context = Context.getInstance();
    this.navBtn = document.createElement('span');
    this.navBtn.classList.add('nav__burger');
    this.navList = document.createElement('ul');
    this.navList.classList.add('nav__list');
    this.navBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.element.classList.toggle('active');
      document.addEventListener('click', this.handler);
    });
  }

  handler = (ev: MouseEvent): void => {
    const target = <HTMLElement>ev.target;
    const hasActiveLink: boolean = !this.navList.contains(target) && this.element.classList.contains('active');
    if (hasActiveLink) {
      this.element.classList.toggle('active');
      document.removeEventListener('click', this.handler);
    }
  };

  append(button: NavButton): void {
    this.buttons = [...this.buttons, button];
    this.addListener(button);
    this.navList.appendChild(button.render());
  }

  addListener(button: NavButton): void {
    button.element.addEventListener('click', () => {
      this.addActive(button);
    });
  }

  addActive(button: NavButton): void {
    const hasNotActive = !button.element.classList.contains('active');
    if (hasNotActive) {
      this.buttons.forEach((el) => {
        el.element.classList.remove('active');
      });
      button.element.classList.add('active');
      this.element.classList.remove('active');
    }
  }

  updateActive(): void {
    const activeBtn = this.buttons.find((button) => button.target === this.context.getActiveState());
    if (activeBtn) {
      this.addActive(activeBtn);
    } else {
      this.buttons.forEach((el) => {
        el.element.classList.remove('active');
      });
    }
  }

  render(): HTMLElement {
    const navBtnIcon = document.createElement('span');
    navBtnIcon.classList.add('nav__burger-icon');
    this.navBtn.append(navBtnIcon);
    this.element.append(this.navBtn, this.navList);
    return this.element;
  }
}
