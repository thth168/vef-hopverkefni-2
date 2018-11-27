import { empty, createElement, newAttribute } from './helpers';

export default class Content {
  constructor(contentArray) {
    this.container = document.querySelector('.lecturepage__content');
    this.content = contentArray.reverse();
  }

  youtube(object) {
    this.data = object.data;
    this.youtubeDivAttr = [newAttribute('class', 'content__youtube')];
    this.youtubeDivElement = createElement('div', '', this.youtubeDivAttr);
    this.dataAttr = [newAttribute('allowfullscreen', '0'), newAttribute('frameborder', '0'), newAttribute('src', this.data)];
    this.youtubeElement = createElement('iframe', '', this.dataAttr);

    this.youtubeDivElement.appendChild(this.youtubeElement);
    this.container.appendChild(this.youtubeDivElement);
  }

  text(object) {
    this.divAttr = [newAttribute('class', 'content__text')];
    this.textDiv = createElement('div', '', this.divAttr);
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.pAttr = [newAttribute('class', 'text__paragraph')];
      this.textDiv.appendChild(createElement('p', this.data.pop(), this.pAttr));
    }
    this.container.appendChild(this.textDiv);
  }

  quote(object) {
    this.divAttr = [newAttribute('class', 'content__quote')];
    this.blockquote = createElement('blockquote', '', this.divAttr);
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.pAttr = [newAttribute('class', 'quote__paragraph')];
      this.blockquote.appendChild(createElement('p', this.data.pop(), this.pAttr));
    }
    this.footerAttr = [newAttribute('class', 'quote__source')];
    this.blockquote.appendChild(createElement('footer', object.attribute, this.footerAttr));
    this.container.appendChild(this.blockquote);
  }

  image(object) {
    this.figAttr = [newAttribute('class', 'content__imageContainer')];
    this.figure = createElement('figure', '', this.figAttr);
    this.imageDivAttr = [newAttribute('class', 'imageContainer__container')];
    this.imageDiv = createElement('div', '', this.imageDivAttr);
    this.imageAttr = [newAttribute('src', object.data), newAttribute('class', 'imageContainer__image')];
    this.protectorAttr = [newAttribute('class', 'imageContainer__protector')];
    this.imageDiv.appendChild(createElement('img', '', this.imageAttr));
    this.imageDiv.appendChild(createElement('div', '', this.protectorAttr));
    this.figure.appendChild(this.imageDiv);
    this.captionAttr = [newAttribute('class', 'imageContainer__caption')];
    this.figure.appendChild(createElement('caption', object.caption, this.captionAttr));
    this.container.appendChild(this.figure);
  }

  heading(object) {
    this.headingAttr = [newAttribute('class', 'content__heading')];
    this.container.appendChild(createElement('h1', object.data, this.headingAttr));
  }

  list(object) {
    this.listAttr = [newAttribute('class', 'content__list')];
    this.listElement = createElement('ul', '', this.listAttr);
    this.data = object.data;
    while (this.data.length > 0) {
      this.dataAttr = [newAttribute('class', 'list__listitem')];
      this.listElement.appendChild(createElement('li', this.data.pop(), this.dataAttr));
    }
    this.container.appendChild(this.listElement);
  }

  code(object) {
    this.divAttr = [newAttribute('class', 'content__code')];
    this.codeDiv = createElement('pre', '', this.divAttr);
    this.data = object.data.split('\n').reverse();
    while (this.data.length > 0) {
      this.pAttr = [newAttribute('class', 'code__line')];
      this.codeDiv.appendChild(createElement('code', this.data.pop(), this.pAttr));
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
        default: console.error('villa, hlutur ekki höndlaður');
      }
    }
  }
}
