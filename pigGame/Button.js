export default class Button {
  constructor(name) {
    this.name = name;
    this.button;
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
    this.button = button;
    return button;
  }
}
