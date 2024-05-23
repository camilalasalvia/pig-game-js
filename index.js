const MIN = 1;
const MAX = 6;
const MAX_SCORE = 24;

let activePlayer = 0; 
let totalScores = [document.querySelector('#total-player1'), document.querySelector('#total-player2')];
let currentScores = [document.querySelector('#current-player1'), document.querySelector('#current-player2')];
let player1 = document.querySelector('#player1');
let player2 = document.querySelector('#player2');
let diceImage = document.querySelector('#dice');
let modal = document.querySelector('#modal');
let winner = document.querySelector('#winner-num');
let winnerScore = document.querySelector('#final-score');

document.querySelector('#new-game').addEventListener('click', newGame);
document.querySelector('#roll-dice').addEventListener('click', rollDice);
document.querySelector('#hold').addEventListener('click', hold);
document.querySelector('#close').addEventListener('click', function() {
    modal.classList.remove('show-modal');
    newGame();
});

function newGame() {
    resetScore();
    diceImage.setAttribute('src', '/dice/1.png');
    if(activePlayer === 1) switchPlayer();
}

function rollDice() {
    roll(function(randomNumber) {
        diceImage.classList.remove('rolling');
        if(randomNumber === 1) {
            currentScores[activePlayer].textContent = 0;
            switchPlayer();
        } else {
            currentScores[activePlayer].textContent = Number(currentScores[activePlayer].textContent) + randomNumber;
        }
    });
}

function hold() {
    totalScores[activePlayer].textContent = Number(totalScores[activePlayer].textContent) + Number(currentScores[activePlayer].textContent);
    if(totalScores[activePlayer].textContent >= MAX_SCORE) {
        showModal();
    }
    else {
        currentScores[activePlayer].textContent = 0;
        switchPlayer();
    }
}

function resetScore() {
    totalScores[0].textContent = '0';
    currentScores[0].textContent = '0';
    totalScores[1].textContent = '0';
    currentScores[1].textContent = '0';
}

function switchPlayer() {
    if(activePlayer === 0) {
        player1.classList.add('section-off');
        player2.classList.remove('section-off');
        activePlayer = 1;
    }
    else {
        player2.classList.add('section-off');
        player1.classList.remove('section-off');
        activePlayer = 0;
    }
}

function roll(callback) {
    let count = 1;
    const rollingInterval = setInterval(() => {
        randomNumber = Math.floor(Math.random() * MAX) + MIN;
        diceImage.classList.add('rolling');
        diceFace(count);
        count++;
        if(count === 7) {
            clearInterval(rollingInterval);
            diceFace(randomNumber);
            callback(randomNumber);
        }
    }, 180);
}

function diceFace(number) {
    imageName = '/dice/' + number + '.png';
    diceImage.setAttribute('src', imageName);
}

function showModal() {
    modal.classList.add('show-modal');
    winner.textContent = activePlayer + 1;
    winnerScore.textContent = totalScores[activePlayer].textContent;
}