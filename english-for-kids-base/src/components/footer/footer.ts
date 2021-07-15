import './footer.scss';
import { BaseComponent } from '../../shared';
import { GITHUB_LINK, RSSCHOOL_LINK } from '../../core';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
  }

  render(): HTMLElement {
    this.element.innerHTML = `
    <div class="footer-container">
      <a class="github" href="${GITHUB_LINK}" target="_blank">github</a>
      <span class="year">2021</span>
      <a class="rss" href="${RSSCHOOL_LINK}" target="_blank" rel="noopener">
      </a>
    </div>`;
    return this.element;
  }
}
