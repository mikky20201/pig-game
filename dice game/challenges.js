/*
Your 3 challenges 
change the game to follow these rules:
1. A player looses his entire score when he rolls two 6 in a row. 
After that, its the next players turn. 
(Hint: Always save the previous dice roll in a seperate variable).

2. Add an input field to the HMTL where players can set the winning score, 
so that they can change the predefined score of 100. 
(Hint: you can read that value wit the .value property of JavaScript. 
 This is a good opportunity to use google to figure this out)

 3. Add another dice to the game, so that there are two dices now. 
 The players looses his current score when one of them is a 1. 
 (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;


document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
           //1. Generate Random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2+ '.png';

    //3. Update the number in roundscore IF the rolled number is not a 1

    if (dice1 !== 1 && dice2 !== 1){
    //add score 
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {

    // Next player
    nextPlayer();
    }
  }  
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        var winningScore 
        // Undefined, 0, null or " " are COERCED to false
        // Anything else is true
        if(input){
            winningScore = input;
        } else{
            winningScore = 100;
        }

        
        //Check if player won the game
        if (scores [activePlayer] >= winningScore){
        document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
        } else {
        //Next player
        nextPlayer();
        }
    }
});


function nextPlayer (){
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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