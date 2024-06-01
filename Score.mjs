export default class Score {
  constructor() {
    // Инициализация
    this._score = 0;
    this.speed = 0;
    this._bestScore = localStorage.getItem("bestScore")
      ? parseInt(localStorage.getItem("bestScore"))
      : 0;
  }

  get score() {
    return this._score;
  }

  draw() {
    // Отрисовка очков
    document.querySelector(
      ".score"
    ).innerHTML = `<h1>Score: ${this._score}</h1>`;
    document.querySelector(
      ".bestScore"
    ).innerHTML = `<h1>Best score: ${this._bestScore}</h1>`;
  }

  increase() {
    // Увеличение очков при съедении яблок
    this._score++;
    this.draw();
  }

  reset() {
    // Обнуление текущего очка и обновление лучшего результата
    const finalScore =
      this._score > this._bestScore ? this._score : this._bestScore;
    localStorage.setItem("bestScore", finalScore);
    this._bestScore = finalScore;
    this._score = 0;
    this.draw();
  }
}
