import Pig from './Pig.js';

export default class App {
  static init() {
    const main = document.createElement('main');
    new Pig(main);
    document.body.prepend(main);
  }
}
