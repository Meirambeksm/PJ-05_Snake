import Snake from "./Snake.mjs";

export default class Apple {
  constructor(width, height) {
    // Изначальные данные
    this.width = width;
    this.height = height;
    this.coordinates = this.getCoordinates();
    this.x = this.coordinates[0];
    this.y = this.coordinates[1];
    this.apple = document.querySelector(`[x="${this.x}"][y="${this.y}"]`);
    this.apple.classList.add("apple");
    this.snake = new Snake();
  }

  // Генерация случайных координат яблока
  getCoordinates() {
    let x, y;
    do {
      x = Math.ceil(Math.random() * this.width);
      y = Math.ceil(Math.random() * this.height);
    } while (this.isSnakeBody(x, y));
    return [x, y];
  }

  // Позиция нового яблока
  getPosition() {
    const apple = document.querySelector(".apple");
    apple.classList.remove("apple");

    let coordinates = this.getCoordinates();
    let x = coordinates[0];
    let y = coordinates[1];

    const newApple = document.querySelector(`[x="${x}"][y="${y}"]`);
    newApple.classList.add("apple");
  }

  // Проверка на появление следующего яблока на теле змеи
  isSnakeBody(x, y) {
    return document
      .querySelector(`[x="${x}"][y="${y}"]`)
      .classList.contains("snakeBody");
  }
}
