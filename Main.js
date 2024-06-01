import GameField from "./GameField.mjs";
import Snake from "./Snake.mjs";
import Apple from "./Apple.mjs";
import Score from "./Score.mjs";

export default class Main {
  constructor(width, height) {
    this.gameField = new GameField(width, height);
    this.snake = new Snake(width, height);
    this.apple = new Apple(width, height);
    this.score = new Score(0);
    this.speed = 500;

    this.interval = setInterval(() => {
      this.snake.move(this.snake.direction);
      if (this.snake.direction === "dead") {
        document.querySelector(
          ".score-text"
        ).innerHTML = `Your score is ${this.score.score}`;
        clearInterval(this.interval);
        document.querySelector(".restartBtn").addEventListener("click", () => {
          this.score.reset();
          window.location.reload();
        });
      }
      this.update();
    }, this.speed);
  }

  update() {
    const apple = document.querySelector(".apple");
    const head = document.querySelector(".head");
    this.score.draw();

    if (
      apple.getAttribute("x") === head.getAttribute("x") &&
      apple.getAttribute("y") === head.getAttribute("y")
    ) {
      this.apple.getPosition();
      this.snake.grow();
      this.score.increase();

      // Увелечение скорости змейки на 10 м-секунд с каждым съедением яблока
      this.speed -= 10;
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.snake.move(this.snake.direction);
        if (this.snake.direction === "dead") {
          document.querySelector(
            ".score-text"
          ).innerHTML = `Your score is ${this.score.score}`;
          clearInterval(this.interval);
          document
            .querySelector(".restartBtn")
            .addEventListener("click", () => {
              this.score.reset();
              window.location.reload();
            });
        }
        this.update();
      }, this.speed);
    }
  }
}

const startBtn = document.querySelector(".startGameBtn");
startBtn.addEventListener("click", () => {
  const width = Number(document.querySelector("#width").value);
  const height = Number(document.querySelector("#height").value);
  const displayError = document.querySelector(".fieldSize");
  const widthCheck = width >= 15 && width <= 40 ? true : false;
  const heightCheck = height >= 15 && width <= 40 ? true : false;

  if (!widthCheck && heightCheck)
    displayError.innerHTML = `ОШИБКА: Ширина вне диапазона от 15 до 40!`;
  else if (widthCheck && !heightCheck)
    displayError.innerHTML = `ОШИБКА: Длина вне диапазона от 15 до 40!`;
  else if (!widthCheck && !heightCheck)
    displayError.innerHTML = `ОШИБКА: Ширина и длина вне диапазона от 15 до 40!`;
  else if (widthCheck && heightCheck) {
    const start = new Main(width, height);
    document.querySelector(".startGame").style.display = "none";
  }
});
