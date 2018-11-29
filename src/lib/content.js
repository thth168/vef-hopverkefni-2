import {
  empty, createElement, Attr, errorDisplay,
} from './helpers';

/**
 * Hlutur sem sér um hlutina á fyrirlestravefsíðunni
 *
 * Inniheldur function sem getur búið til viðeigandi element sem eiga að vera á fyrirlestri.
 * Til að hlaða inn elementunum þá er kallað Content.load()
 *
 * @param {array} contentArray
 */

export default class Content {
  constructor(contentArray) {
    this.container = document.querySelector('.lecturepage__content');
    this.content = contentArray.reverse();
  }

  /**
   * Function sem smíðar youtube hlut úr gögnum sem það er gefið
   * <div class='content__youtube'>\
   * --<iframe allowfullscreen='0' frameborder='0' src='object.data'
   * --title='Myndband tengt fyrirlestri'></iframe>\
   * </div>
   *
   * @param {youtube_object} object
   */

  youtube(object) {
    this.data = object.data;
    this.youtubeDivElement = createElement('div', '', Attr('class', 'content__youtube'));
    this.youtubeElement = createElement('iframe', '', Attr('allowfullscreen', '0'), Attr('frameborder', '0'), Attr('src', this.data), Attr('title', `Myndband tengt fyrirlestri = ${this.data}`));
    this.youtubeDivElement.appendChild(this.youtubeElement);
    this.container.appendChild(this.youtubeDivElement);
  }

  /**
   * Function sem smíðar text hlut úr gefnum gögnum
   * <div class='content__text'>\
   * --<p class='text__paragraph'>object.data</p>\
   * --...\
   * </div>
   *
   * @param {text_object} object
   */

  text(object) {
    this.textDiv = createElement('div', '', Attr('class', 'content__text'));
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.textDiv.appendChild(createElement('p', this.data.pop(), Attr('class', 'text__paragraph')));
    }
    this.container.appendChild(this.textDiv);
  }

  /**
   * Function sem býr til blockquote úr gefnum gögnum
   * <blockquote class='content__quote'>\
   * --<p class='quote__paragraph'>object.data</p>\
   * ----...\
   * --<footer class='quote__source'>object.attribute</footer>\
   * </blockquote>
   *
   * @param {quote_object} object
   */

  quote(object) {
    this.blockquote = createElement('blockquote', '', Attr('class', 'content__quote'));
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.blockquote.appendChild(createElement('p', this.data.pop(), Attr('class', 'quote__paragraph')));
    }
    this.blockquote.appendChild(createElement('footer', object.attribute, Attr('class', 'quote__source')));
    this.container.appendChild(this.blockquote);
  }

  /**
   * Function sem býr til image úr gefnum gögnum
   *
   * <figure class='content__imageContainer'>\
   * --<div class='imageContainer__container'>\
   * ----<img src='object.data' class='imageContainer__image'
   * aria-labelledby='(fyrsta orðið í caption)'></img>\
   * ----<div class='imageContainer__protector'></div>\
   * --</div>\
   * --<label class='imageContainer__caption' id='(fyrsta orðið í caption)'>\
   * ----object.attribute\
   * --</label>\
   * </figure>
   * @param {image_object} object
   */

  image(object) {
    this.figure = createElement('figure', '', Attr('class', 'content__imageContainer'));
    this.imageDiv = createElement('div', '', Attr('class', 'imageContainer__container'));
    this.ariaLabel = 'undefined';
    if(object.caption) {
      this.ariaLabel = object.caption.split(' ')[0];
    }
    this.imageDiv.appendChild(createElement('img', '', Attr('src', object.data), Attr('class', 'imageContainer__image'), Attr('aria-labelledby', `${this.ariaLabel}-${object.data}`)));
    this.imageDiv.appendChild(createElement('div', '', Attr('class', 'imageContainer__protector')));
    this.figure.appendChild(this.imageDiv);
    this.figure.appendChild(createElement('label', object.caption, Attr('class', 'imageContainer__caption'), Attr('id', `${this.ariaLabel}-${object.data}`)));
    this.container.appendChild(this.figure);
  }

  /**
   * Function sem býr til heading úr gefnum gögnum
   *
   * <h1 class='content__heading'>object.data</h1>
   * @param {heading_object} object
   */

  heading(object) {
    this.container.appendChild(createElement('h1', object.data, Attr('class', 'content__heading')));
  }

  /**
   * Function sem býr til list úr gefnum gögnum
   *
   * <ul class='content__list'>\
   * --<li class='list__listitem'>object.data</li>\
   * --...\
   * </ul>
   * @param {list_object} object
   */

  list(object) {
    this.listElement = createElement('ul', '', Attr('class', 'content__list'));
    this.data = object.data;
    while (this.data.length > 0) {
      this.listElement.appendChild(createElement('li', this.data.pop(), Attr('class', 'list__listitem')));
    }
    this.container.appendChild(this.listElement);
  }

  /**
   * Function sem býr til code úr gefnum gögnum
   * <pre class='content__code'>\
   * --<code class='code__line'>object.data</code>\
   * --<br>\
   * --...\
   * </pre>
   * @param {*} object
   */

  code(object) {
    this.codeDiv = createElement('pre', '', Attr('class', 'content__code'));
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.codeDiv.appendChild(createElement('code', this.data.pop(), Attr('class', 'code__line')));
      this.codeDiv.appendChild(createElement('br'));
    }
    this.container.appendChild(this.codeDiv);
  }

  /**
   * Function sem sér um að taka gögnin sem hluturinn
   * hefur og býr til elementin til að setja á síðuna
   */

  load() {
    empty(this.container);
    while (this.content.length > 0) {
      this.object = this.content.pop();
      switch (this.object.type) {
        case 'youtube':
          this.youtube(this.object);
          break;
        case 'text':
          this.text(this.object);
          break;
        case 'quote':
          this.quote(this.object);
          break;
        case 'image':
          this.image(this.object);
          break;
        case 'heading':
          this.heading(this.object);
          break;
        case 'list':
          this.list(this.object);
          break;
        case 'code':
          this.code(this.object);
          break;
        default: errorDisplay('Villa, hlutur ekki höndlaður');
      }
    }
  }
}
