const container = document.getElementById('ballContainer'); 
const totalBall = 50;
let balls = [];
let mouseX = 0, mouseY = 0;

const options = {
  width: window.innerWidth,
  height: window.innerHeight
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) { 
  return Math.random() * (max - min) + min;
}

function setUp() {
  for (let i = 0; i < totalBall; i++) {
    let randomSize = randomInt(20, 60);
    let randomX = randomFloat(randomSize / 2, options.width - randomSize / 2);
    let randomY = randomFloat(randomSize / 2, options.height - randomSize / 2);
    let randomVx = randomFloat(-1, 1) * 1.1;
    let randomVy = randomFloat(-1, 1) * 1.1;
    let randomColor = `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

    const ballElement = document.createElement('div');
    ballElement.style.position = 'absolute';
    // ballElement.style.width == ballElement.style.height; // not in use
    // ballElement.style.width == `${randomSize}px`
    // ballElement.style.transition =`randomSize 5s`;

    ballElement.style.backgroundColor = randomColor;
    ballElement.style.borderRadius = '50%';  
    ballElement.style.left = `${randomX}px`;
    ballElement.style.top = `${randomY}px`;
    ballElement.style.opacity = 0.8;

    container.appendChild(ballElement);

    balls.push(new Ball(randomX, randomY, randomSize, randomVx, randomVy, randomColor, ballElement));
  }
  
  requestAnimationFrame(loop);
}
window.addEventListener('load', setUp);

window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

class Ball {
  constructor(x, y, size, vx, vy, color, element) {
    this.x = x;
    this.y = y;
    this.originalSize = size;
    this.size = size;
    this.radius = size / 2;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.element = element;  
  }

  update() {
    const distance = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
    // debugger
    // console.log(this.radius,distance)
    // if (distance < this.radius * 1.2) {  
    if (distance < this.radius ) {  
      this.size = this.originalSize * 1.4;
    } else {
      this.size = this.originalSize;
    }
    
    this.radius = this.size / 2;

    if (this.y - this.radius < 0 || this.y + this.radius > options.height) {
      this.vy *= -1; 
    }

    if (this.x - this.radius < 0 || this.x + this.radius > options.width) {
      this.vx *= -1; 
    }

    this.x += this.vx;
    this.y += this.vy;
    this.element.style.left = `${this.x - this.radius}px`;
    this.element.style.top = `${this.y - this.radius}px`;
    this.element.style.width = `${this.size}px`; 
    this.element.style.height = `${this.size}px`; 
  }
}

function updates() {
  for (let ball of balls) {
    ball.update();
  }
}

function loop() {
  updates();
  requestAnimationFrame(loop);
}

