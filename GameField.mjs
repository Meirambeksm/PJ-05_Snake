export default class GameField {
  constructor(width, height) {
    // Отрисовка игрового поля
    this.cell = document.getElementsByClassName("cell");
    this.field = document.querySelector(".field");
    this.width = width;
    this.height = height;
    this.x = 1;
    this.y = height;

    // Создание клеток (width x height)
    for (let i = 1; i < this.width * this.height + 1; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      document.querySelector(".field").appendChild(cell);
    }

    // Присвоение каждой клетке координат
    for (let i = 0; i < this.cell.length; i++) {
      if (this.x > this.width) {
        this.x = 1;
        this.y--;
      }

      this.cell[i].setAttribute("x", this.x);
      this.cell[i].setAttribute("y", this.y);
      this.x++;
    }

    // Определение размера игрового поля
    this.field.style.width = `${this.width * 20}px`;
    this.field.style.height = `${this.height * 20}px`;
  }
}
