import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    console.log(this.container);
  }

  load() {
    empty(this.container);
  }
}
