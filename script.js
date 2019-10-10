// тут может находится ваш код
function Rect(x, color, speed) {
    this.x = x;
    this.y = -30;
    this.color = color;
    this.speed = speed;
    this.height = 30;
    this.width = 30;
    this.draw = function () {
        this._canvas = document.querySelector('canvas');
        if (this._canvas.getContext) {
            let ctx = this._canvas.getContext('2d');
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}

function Canvas() {
    this.add = function (elements) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].draw();
        }
    }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function rectCreate() {
    let x = Math.floor(Math.random() * (XXX - 30));
    let speed = Math.random() /2 + 0.5; // скорость по пикселям
    let color = getRandomColor();
    return new Rect(x, color, speed);
}

let setInt = 0;

function generateRect() {
    if (requestId) {
        if (setInt !== 0) {
            clearTimeout(setInt);
        }
        setInt = setInterval(() => {
            listRect.push(rectCreate());
        }, 1000);

    }
}

let listRect = [];
let score = document.querySelector("#score");
let canvasWindow = document.querySelector('canvas');
let ctx = canvasWindow.getContext('2d');
let canVas = new Canvas();
let XXX = canvasWindow.clientWidth;
let YYY = canvasWindow.clientHeight;

function checkCoordinate(event) {
    if (event) {
        listRect.forEach(function (element, index) {
            if ((element.x <= event.layerX) && ((element.x + element.width) >= event.layerX) &&
                (element.y <= event.layerY) && ((element.y + element.height) >= event.layerY)) {
                listRect.splice(index, 1);
                score.textContent = Number(score.textContent) + 1;
            }
            if (element.y > YYY) {
                listRect.splice(index, 1);
            }
        });
    }
}

function changeCoordinate(listRect) {
    listRect.forEach(function (element) {
        element.y += element.speed;
    })
}

function animate() {
    let canvas = document.getElementById('canvas');
    canvas.addEventListener('mousedown', checkCoordinate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canVas.add(listRect);
    changeCoordinate(listRect);
    if (requestId) {
        requestAnimationFrame(animate);
    }
}

let requestId;
document.body.onload = function () {
    let btns = document.querySelectorAll('button');
    let btnStart = btns[0];
    let btnStop = btns[1];
    requestId = requestAnimationFrame(animate);

    btnStart.addEventListener('click', () => {
        score.textContent = 0;
        listRect = [];
        if (requestId) {
            cancelAnimationFrame(requestId);
        }
        generateRect();
        if (setInt===0) {
            animate();
        }
    });
    btnStop.addEventListener('click', () => {
        if (requestId) {
            cancelAnimationFrame(requestId);
        }
        listRect = [];
        requestId = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    });
};