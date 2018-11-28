import {
  empty, createElement, Attr, errorDisplay,
} from './helpers';

export default class Content {
  constructor(contentArray) {
    this.container = document.querySelector('.lecturepage__content');
    this.content = contentArray.reverse();
  }
  /**
   * Function sem smíðar youtube hlut úr gögnum sem það er gefið
   * <div class='content__youtube'>
   *   <iframe
   * @param {} object
   */

  youtube(object) {
    this.data = `${object.data}`;
    this.youtubeDivElement = createElement('div', '', Attr('class', 'content__youtube'));
    this.youtubeElement = createElement('iframe', '', Attr('allowfullscreen', '0'), Attr('frameborder', '0'), Attr('src', this.data), Attr('title', 'Myndband tengt fyrirlestri'));

    this.youtubeDivElement.appendChild(this.youtubeElement);
    this.container.appendChild(this.youtubeDivElement);
  }

  text(object) {
    this.textDiv = createElement('div', '', Attr('class', 'content__text'));
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.textDiv.appendChild(createElement('p', this.data.pop(), Attr('class', 'text__paragraph')));
    }
    this.container.appendChild(this.textDiv);
  }

  quote(object) {
    this.blockquote = createElement('blockquote', '', Attr('class', 'content__quote'));
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.blockquote.appendChild(createElement('p', this.data.pop(), Attr('class', 'quote__paragraph')));
    }
    this.blockquote.appendChild(createElement('footer', object.attribute, Attr('class', 'quote__source')));
    this.container.appendChild(this.blockquote);
  }

  image(object) {
    this.figure = createElement('figure', '', Attr('class', 'content__imageContainer'));
    this.imageDiv = createElement('div', '', Attr('class', 'imageContainer__container'));
    this.imageDiv.appendChild(createElement('img', '', Attr('src', object.data), Attr('class', 'imageContainer__image'), Attr('aria-labelledby', object.caption.split(' ')[0])));
    this.imageDiv.appendChild(createElement('div', '', Attr('class', 'imageContainer__protector')));
    this.figure.appendChild(this.imageDiv);
    this.figure.appendChild(createElement('label', object.caption, Attr('class', 'imageContainer__caption'), Attr('id', object.caption.split(' ')[0])));
    this.container.appendChild(this.figure);
  }

  heading(object) {
    this.container.appendChild(createElement('h1', object.data, Attr('class', 'content__heading')));
  }

  list(object) {
    this.listElement = createElement('ul', '', Attr('class', 'content__list'));
    this.data = object.data;
    while (this.data.length > 0) {
      this.listElement.appendChild(createElement('li', this.data.pop(), Attr('class', 'list__listitem')));
    }
    this.container.appendChild(this.listElement);
  }

  code(object) {
    this.codeDiv = createElement('pre', '', Attr('class', 'content__code'));
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.codeDiv.appendChild(createElement('code', this.data.pop(), Attr('class', 'code__line')));
      this.codeDiv.appendChild(createElement('br'));
    }
    this.container.appendChild(this.codeDiv);
  }

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
