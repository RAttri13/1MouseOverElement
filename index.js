const canvas = document.querySelector('canvas');
// const canvas = document.getElementById('container');
const ctx = canvas.getContext('2d');
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

function setUp(){ 
    canvas.width=options.width;
    canvas.height=options.height;

    for(let i=0;i<totalBall;i++){
        let randomSize=randomInt(20,60);
        let randomX=randomFloat(0+randomSize/2,options.width-randomSize/2);
        let randomY=randomFloat(0+randomSize/2,options.height-randomSize/2);
        let randomVx=randomFloat(-1,1)*1.1;
        let randomVy=randomFloat(-1,1)*1.1;
        let randomColor=`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)} )`
        balls.push(new Ball(randomX,randomY,randomSize,randomVx,randomVy,randomColor))    
        }
    requestAnimationFrame(loop);
    // balls.push(new Ball(200,100,50,2,2,"#fff"))
    // balls.push(new Ball(100,200,80,-1,1,"red"))
}

window.addEventListener('load', setUp);

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});
            
// used to update velocity and call ball.update() to update position base on vel
function update(){
    for(let ball of balls){
        ball.update()
    }
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let ball of balls){
        ball.draw(ctx);
    }
}

function loop(){
    update();
    draw(); 
    requestAnimationFrame(loop)
}

class Ball{
    constructor(x,y,size,vx,vy,color){
    this.x=x;
    this.y=y;
    this.originalSize = size;
    this.size = size;
    this.radius=size/2;
    this.vx=vx;
    this.vy=vy;
    this.color=color;
    };

    
    update() {
        const distance = Math.sqrt((this.x - mouseX) ** 2 + (this.y - mouseY) ** 2);
        if (distance < this.radius) {
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
    }

    draw(_ctx){
        _ctx.globalAlpha=0.6
        _ctx.beginPath();
        _ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true)
        _ctx.closePath();
        _ctx.fillStyle=this.color;
        _ctx.fill();
    }
}

requestAnimationFrame(loop);
