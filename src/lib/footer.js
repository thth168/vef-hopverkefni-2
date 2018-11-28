import { empty, Attr, createElement } from './helpers';

/**
 * Hlutur sem sér um að smíða footer á síðuna
 *
 * @param {} slug
 */

export default class Footer {
  constructor(slug) {
    this.slug = slug;
    this.container = document.querySelector('.lecturepage__footer');
  }

  /**
   * Function sér sér um að smíða footerinn þegar það er kallað á það
   */

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
    this.container.appendChild(this.finishElement);
    this.container.appendChild(this.backElement);
  }

  /**
   * Event handler sem sér um það þegar ýtt er á klára fyrirlestur
   * @param {event} e
   */

  markFinished(e) {
    this.USP = new URLSearchParams(window.location.search);
    this.slug = this.USP.get('slug');
    window.localStorage.setItem(this.slug, 'true');
    e.currentTarget.textContent = '✓ Fyrirlestur kláraður';
    e.currentTarget.classList.add('--finished');
  }

  /**
   * Event handler sem sendir notendann aftur á heimasíðuna þegar ýtt er á tilbaka
   */
  back() {
    window.location = window.location.origin;
  }
}
