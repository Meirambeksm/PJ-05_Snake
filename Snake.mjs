export default class Snake {
  constructor(width, height) {
    // Изначальные данные
    this.x = 5;
    this.y = 5;
    this.width = width;
    this.height = height;
    this.direction = "right";
    this.step = false;
    this.snakeBody = [
      document.querySelector(`[x = "${this.x}"][y = "${this.y}"]`),
      document.querySelector(`[x = "${this.x - 1}"][y = "${this.y}"]`),
    ];

    // Отрисовка змеи
    for (let i = 0; i < this.snakeBody.length; i++) {
      this.snakeBody[i].classList.add("snakeBody");
    }
    this.snakeBody[0].classList.add("head");
  }

  // Движение змеи
  move(direction) {
    window.addEventListener("keydown", (e) => this.control(e));
    // Получаем координаты змеи
    const snakeBody = this.snakeBody;
    const snakeCoordinates = [
      snakeBody[0].getAttribute("x"),
      snakeBody[0].getAttribute("y"),
    ];

    // Убирает классы из головы и тела
    snakeBody[0].classList.remove("head");
    snakeBody[snakeBody.length - 1].classList.remove("snakeBody");

    // Удаляет хвост
    snakeBody.pop();

    // Определение направления змеи
    switch (direction) {
      case "right":
        snakeCoordinates[0] < this.width
          ? snakeBody.unshift(
              document.querySelector(
                `[x="${+snakeCoordinates[0] + 1}"][y="${+snakeCoordinates[1]}"]`
              )
            )
          : snakeBody.unshift(
              document.querySelector(`[x="1"][y="${+snakeCoordinates[1]}"]`)
            );
        break;

      case "down":
        snakeCoordinates[1] > 1
          ? snakeBody.unshift(
              document.querySelector(
                `[x="${+snakeCoordinates[0]}"][y="${+snakeCoordinates[1] - 1}"]`
              )
            )
          : snakeBody.unshift(
              document.querySelector(
                `[x="${+snakeCoordinates[0]}"][y="${this.height}"]`
              )
            );
        break;

      case "left":
        snakeCoordinates[0] > 1
          ? snakeBody.unshift(
              document.querySelector(
                `[x="${+snakeCoordinates[0] - 1}"][y="${+snakeCoordinates[1]}"]`
              )
            )
          : snakeBody.unshift(
              document.querySelector(
                `[x="${this.width}"][y="${snakeCoordinates[1]}"]`
              )
            );
        break;

      case "up":
        snakeCoordinates[1] < this.height
          ? snakeBody.unshift(
              document.querySelector(
                `[x="${+snakeCoordinates[0]}"][y="${+snakeCoordinates[1] + 1}"]`
              )
            )
          : snakeBody.unshift(
              document.querySelector(`[x="${snakeCoordinates[0]}"][y="1"]`)
            );
        break;
    }

    // Добавление классов головы и тела змеи при движении
    snakeBody[0].classList.add("head");
    snakeBody.forEach((body) => body.classList.add("snakeBody"));

    const head = snakeBody[0];
    this.step = true;

    for (let i = 1; i < snakeBody.length; i++) {
      if (
        head.getAttribute("x") === snakeBody[i].getAttribute("x") &&
        head.getAttribute("y") === snakeBody[i].getAttribute("y")
      ) {
        this.direction = "dead";
        document.querySelector(".gameOver").style.display = "flex";
        break;
      }
    }
  }

  // Рост змеи при каждом съедании яблока
  grow() {
    const snakeBody = this.snakeBody;
    const x = snakeBody[snakeBody.length - 1].getAttribute("x");
    const y = snakeBody[snakeBody.length - 1].getAttribute("y");
    snakeBody.push(document.querySelector(`[x="${x}"][y="${y}"]`));
  }

  // Контроль кнопок на клавиатуре
  control(e) {
    if (this.step == true) {
      switch (e.key) {
        case "ArrowUp":
          if (this.direction !== "down") {
            this.direction = "up";
            this.step = false;
          }
          break;
        case "ArrowRight":
          if (this.direction !== "left") {
            this.direction = "right";
            this.step = false;
          }
          break;
        case "ArrowDown":
          if (this.direction !== "up") {
            this.direction = "down";
            this.step = false;
          }
          break;
        case "ArrowLeft":
          if (this.direction !== "right") {
            this.direction = "left";
            this.step = false;
          }
          break;
      }
    }
  }
}
