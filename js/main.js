const buttons = document.querySelectorAll('.button');
let button = Array.from([...buttons]);
let container = document.getElementById('container');
const drawMessage = document.createElement('p');
const winnerMessage = document.createElement("p");
container.addEventListener('click', clickfunction);
let o = false,
    x = true;
let count = false;
let counterForX = false,
    counterForO = false;

const imgForX = `<img src="./img/x.png" class="img">`;
const imgForO = '<img src="./img/o.png" class="img">';
let resultX = false,
    resultO = false,
    allClicked = false;

function clickfunction(element) {

    if (element.target.tagName == 'DIV' && element.target.innerHTML != imgForX && element.target.innerHTML != imgForO) {
        element.target.classList.add('tada');
        setText(element.target);

        resultX = checkForWinner(imgForO);
        resultO = checkForWinner(imgForX);
        if (resultX == false && resultO == false) {
            allClicked = Array.from(buttons).every(checkClicked);
        }
        if (allClicked) {
            drawGame();
        }
    }
}

function checkClicked(button) {
    return button.classList.contains('tada');
}

function setText(element) {

    if (x == true && o == false) {
        element.innerHTML = imgForX;
        x = false;
        o = true;
    }
    else{
        element.innerHTML = imgForO;
        x = true;
        o = false;
    }
}

function checkForWinner(img) {
    lines = [
        [1, 2, 0],
        [0, 3, 6],
        [3, 4, 5],
        [6, 4, 2],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 7, 8]
    ];
    let setWinner = false;
    for (const line of lines) {
        if (button[line[0]].innerHTML == img && button[line[1]].innerHTML == img && button[line[2]].innerHTML == img) {
            setWinner = true;
            break;
        }
    }
    if (setWinner) {
        if (img == '<img src="./img/x.png" class="img">') {
            winner('X');
            return true;
        } else {
            winner('O');
            return true;
        }
    }
    return false;
}

function winner(s) {
    playerCounter(s);
    winnerMessage.innerHTML = 'The winner is ' + s + ' player';
    document.body.appendChild(winnerMessage);
    playagain();
}

function playerCounter(s) {
    if (s == 'X') {
        counterForX++;
        document.getElementById('X').innerHTML = `Player X = `+counterForX;
    } else {
        counterForO++;
        document.getElementById('O').innerHTML = `Player O = `+counterForO;
    }
}

function drawGame() {
    let check ;
    for (const b of button) {
        if (!b.classList.contains('tada')) {
            check = false;
        } else {
            check = true;
        }
    }

    if (check) {
        drawMessage.textContent = "Game is draw";
        playagain();
        document.body.appendChild(drawMessage);
    }
}

function playagain() {
    const playagain = document.createElement('button');
    playagain.innerHTML = "Play Again";
    playagain.setAttribute('class', 'playagain');
    container.removeEventListener('click', clickfunction)

    playagain.addEventListener('click', function () {
        for (let i = 0; i < button.length; i++) {
            button[i].innerHTML = "";
            button[i].classList.remove('tada');
        }
        playagain.remove();
        count = 0;
        resultO = resultX = true;
        container.addEventListener('click', clickfunction);
        winnerMessage.remove();
        drawMessage.remove();
    });
    document.body.appendChild(playagain);
}
