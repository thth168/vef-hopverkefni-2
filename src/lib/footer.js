import { empty, newAttribute, createElement } from './helpers';

export default class Footer {
  constructor(slug) {
    this.slug = slug;
    this.container = document.querySelector('.lecturepage__footer');
  }

  load() {
    empty(this.container);
    this.finishAttr = [newAttribute('class', 'footer__finish')];
    if (window.localStorage.getItem(this.slug) === 'true') {
      this.finishElement = createElement('p', '✓ Fyrirlestur kláraður', this.finishAttr);
    } else {
      this.finishElement = createElement('p', 'Klára fyrirlestur', this.finishAttr);
      this.finishElement.addEventListener('click', this.markFinished);
    }

    this.backAttr = [newAttribute('class', 'footer__back')];
    this.backElement = createElement('p', 'Til baka', this.backAttr);
    this.backElement.addEventListener('click', this.back);
    this.container.appendChild(this.finishElement);
    this.container.appendChild(this.backElement);
  }

  markFinished(e) {
    this.USP = new URLSearchParams(window.location.search);
    this.slug = this.USP.get('slug');
    window.localStorage.setItem(this.slug, 'true');
    e.currentTarget.textContent = '✓ Fyrirlestur kláraður';
  }

  back() {
    window.location = window.location.origin;
  }
}
