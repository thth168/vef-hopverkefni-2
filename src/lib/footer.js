import { empty, Attr, createElement } from './helpers';

export default class Footer {
  constructor(slug) {
    this.slug = slug;
    this.container = document.querySelector('.lecturepage__footer');
  }

  load() {
    empty(this.container);
    if (window.localStorage.getItem(this.slug) === 'true') {
      this.finishElement = createElement('p', '✓ Fyrirlestur kláraður', Attr('class', 'footer__finish'));
      this.finishElement.classList.add('--finished');
    } else {
      this.finishElement = createElement('p', 'Klára fyrirlestur', Attr('class', 'footer__finish'));
      this.finishElement.addEventListener('click', this.markFinished);
    }

    this.backElement = createElement('a', 'Til baka', Attr('class', 'footer__back'), Attr('href', './'));
    // this.backElement.addEventListener('click', this.back);
    this.container.appendChild(this.finishElement);
    this.container.appendChild(this.backElement);
  }

  markFinished(e) {
    this.USP = new URLSearchParams(window.location.search);
    this.slug = this.USP.get('slug');
    window.localStorage.setItem(this.slug, 'true');
    e.currentTarget.textContent = '✓ Fyrirlestur kláraður';
    e.currentTarget.classList.add('--finished');
  }

  back() {
    window.location = window.location.origin;
  }
}
