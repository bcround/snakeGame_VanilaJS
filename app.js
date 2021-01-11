const $canvas = document.getElementById('gameBoard');
const ctx = $canvas.getContext('2d');

class Snake {
  xPos = 0;
  yPos = 0;
  xMove = 10;
  yMove = 0;

  generateSnake() {
    ctx.fillStyle = '#008000';
    ctx.fillRect(this.xPos, this.yPos, 10, 10);
  }

  updateMoves() {
    this.xPos += this.xMove;
    this.yPos += this.yMove;
    if (this.xPos === $canvas.width) this.xPos = 0;
    else if (this.xPos === -10) this.xPos = $canvas.width;
    else if (this.yPos === $canvas.height) this.yPos = 0;
    else if (this.yPos === -10) this.yPos = $canvas.height;
  }

  changeDirection(direction) {
    switch(direction) {
      case 'ArrowUp':
        this.xMove = 0;
        this.yMove = -10;
        break;
      case 'ArrowDown':
        this.xMove = 0;
        this.yMove = 10;
        break;
      case 'ArrowLeft':
        this.xMove = -10;
        this.yMove = 0;
        break;
      case 'ArrowRight':
        this.xMove = 10;
        this.yMove = 0;
        break;
    }
  }

  eat(food) {
    setTimeout(() => {
      food.foodRandomPos();
      food.generateFood();
    }, 150);

  }
}

class Food {
  xPos = 0;
  yPos = 0;

  foodRandomPos() {
    this.xPos = Math.floor((Math.random() * 40)) * 10;
    this.yPos = Math.floor((Math.random() * 40)) * 10;
    console.log(this.xPos, this.yPos);
  }

  generateFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(this.xPos, this.yPos, 10, 10);
  }
}

const snake = new Snake();
const food = new Food();

food.foodRandomPos();

setInterval(() => {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  snake.generateSnake();
  food.generateFood();
  snake.updateMoves();
  if (snake.xPos === food.xPos && snake.yPos === food.yPos) {
    snake.eat(food);
  }
}, 200);

document.addEventListener('keyup', e => {
  snake.changeDirection(e.key);
})