/*
RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const electron = require('electron');
const { app, ipcRenderer } = electron;
const diceDOM = document.querySelector('.dice');
const btnRollDOM = document.getElementById('btn-roll');
const btnHoldDOM = document.getElementById('btn-hold');
const btnNewDOM = document.getElementById('btn-new');

var scores = [0, 0], roundscore = 0, activePlayer = 0;
let diceValue = Math.floor(Math.random() * 6) + 1;




diceDOM.style.display = 'none';
btnRollDOM.addEventListener('click', () => {
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + diceValue + ".png";

    if (diceValue !== 1) {
        roundscore += diceValue;
        document.querySelector('#current-' + activePlayer).innerHTML = '<em><b>' + roundscore + '</b></em>';
    } else {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundscore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }

});

btnHoldDOM.addEventListener('click', () => {
    ipcRenderer.send('data-inc', "hello world");

});

btnNewDOM.addEventListener('click', () => {
    roundscore = 0;
    scores[0] = 0, scores[1] = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.getElementById('dice').style.display = 'none';

});
