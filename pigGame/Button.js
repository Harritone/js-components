export default class Button {
  element;

  constructor(name) {
    this.name = name;
    this.getButtonEl();
  }

  getButtonEl() {
    const button = document.createElement('button');
    button.className = `btn btn--${this.name}`;
    const content =
      this.name === 'new'
        ? '🔄 New game'
        : this.name === 'roll'
        ? '🎲 Roll dice'
        : '📥 Hold';
    button.textContent = content;
    this.element = button;
  }
}
