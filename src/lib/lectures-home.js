import Header from './header';
import List from './list';
import Sort from './sorting';

export default class LecturesHome {
  constructor() {
    this.headerContainer = document.querySelector('.header');
  }

  load() {
    this.header = new Header('Vefforritun', 'Fyrirlestrar', './img/header.jpg', this.headerContainer);
    this.header.load();
    this.sorter = new Sort();
    this.sorter.load();
    this.list = new List();
    this.list.load();
  }
}
