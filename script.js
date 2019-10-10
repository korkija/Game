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
    let speed = Math.random() / 2 + 0.5; // скорость по пикселям
    let color = getRandomColor();
    return new Rect(x, color, speed);
}

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

function checkCoordinate(event) {
    if (event) {
        listRect.forEach(function (element) {
            if ((element.x <= (event.clientX - event.target.offsetLeft) ) && ((element.x + element.width) >= (event.clientX - event.target.offsetLeft)) &&
                (element.y <= (event.clientY - event.target.offsetTop)) && ((element.y + element.height) >= (event.clientY - event.target.offsetTop)) && (element.width === 30)) {
                killingWithShow(element);
                setTimeout(function () {
                    listRect.splice(listRect.indexOf(element), 1);
                }, 1000);
                score.textContent = Number(score.textContent) + 1;
            }
        });
    }
}

function killingWithShow(element) {
    element.height += 10;
    element.width += 10;
    element.x -= 5;
    element.y -= 5;
    element.color = "red";
    element.speed = 0;
}

function changeCoordinate(listRect) {
    for (let i = 0; i < listRect.length; i++) {
        listRect[i].y += listRect[i].speed;
        listRect[i].draw();
        if (listRect[i].y > YYY) {
            if (checkDown.checked) {
                listRect[i].speed *= -1;
            } else {
                listRect.splice(i, 1);
                i--;
            }
        } else {
            if (listRect[i].y < (-30)) {
                if (checkUp.checked) {
                    listRect[i].speed *= -1;
                } else {
                    listRect.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

function animate() {
    let canvas = document.getElementById('canvas');
    canvas.addEventListener('mousedown', checkCoordinate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    changeCoordinate(listRect);
    if (requestId) {
        requestAnimationFrame(animate);
    }
}

let setInt = 0;
let requestId;
let checkUp = document.querySelector('#checkUp');
let checkDown = document.querySelector('#checkDown');
let listRect = [];
let score = document.querySelector("#score");
let canvasWindow = document.querySelector('canvas');
let ctx = canvasWindow.getContext('2d');
let XXX = canvasWindow.clientWidth;
let YYY = canvasWindow.clientHeight;


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
        } else {
            requestId = requestAnimationFrame(animate);
        }
        generateRect();
        if (setInt === 0) {
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