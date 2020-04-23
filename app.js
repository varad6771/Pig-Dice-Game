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
       nextPlayer();
    }

});

btnHoldDOM.addEventListener('click', () => {
  if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }  

});

btnNewDOM.addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}
