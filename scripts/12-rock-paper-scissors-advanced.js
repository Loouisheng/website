const score =JSON.parse(localStorage.getItem('score')) ||{
    wins:0,
    losses:0,
    ties:0
}

updateScoreElement();


/*
if(!score){
    score = {
    wins:0,
    losses:0,
    ties:0
    }
}*/
const computerMove = pickComputerMove();

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
  
  // Add an event listener for the reset score
  // button using .addEventListener
  document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
        showResetConfirmation();
    });


function showResetConfirmation(){
    document.querySelector('.makesure').innerHTML = `Are you sure you want to reset the score? <button class='yes'>Yes</button> <button class='no'>No</button>`

    document.querySelector('.yes').addEventListener('click',()=>{
        resetScore();
        document.querySelector('.makesure').innerHTML='';

    })
    document.querySelector('.no').addEventListener('click',()=>{
        document.querySelector('.makesure').innerHTML='';
    })


}

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    } else if (event.key === 'p') {
      playGame('paper');
    } else if (event.key === 's') {
      playGame('scissors');
    } else if (event.key === 'a') {
      autoPlay();
    
    // Add an if-statement condition to
    // check if 'Backspace' was pressed.
    } else if (event.key === 'Backspace') {
      showResetConfirmation();
    }
  });

let isAutoPlaying = false;

let intervalID ;

const clickAutobutton = document.querySelector('.auto-play-button').addEventListener((Event),()=>{
    autoPlay();  
})
function autoPlay(){
    if(!isAutoPlaying){
        intervalID = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying = true;
        document.querySelector('.auto-play-button').innerHTML='Stop Playing';
    } else{
        clearInterval(intervalID);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Playing';
    }
}


document.querySelector('.js-rock-button').addEventListener('click',()=>{
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('scissors');
});

function playGame(playerMove){
    const computerMove = pickComputerMove();
    
    let result = '';
    
    if (playerMove === 'rock'){
        if(computerMove === 'rock'){
            result='Tie.';
        }else if (computerMove ==='paper'){
            result='You lose.';
        }else if (computerMove === 'scissors'){
            result='You win.';
        }

    }else if (playerMove==='paper'){
        if(computerMove === 'rock'){
            result='You win.'
        }else if (computerMove ==='paper'){
            result='Tie.'
        }else if (computerMove === 'scissors'){
            result='You lose.'
        }

    }else if (playerMove==='scissors'){
        if(computerMove === 'rock'){
            result='You lose.';
        }else if (computerMove ==='paper'){
            result='You win.';
        }else if (computerMove === 'scissors'){
            result='Tie.';
        }
    }
    if(result === 'You win.'){
        score.wins +=1;
    }else if (result ==='You lose.'){
        score.losses+=1;
    }else if (result==='Tie.'){
        score.ties+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));

    
    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
    
// alert(`. 
// Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties} `);
}
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML =  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickComputerMove(){

    const randomNumber = Math.random();
    
    let computerMove ='';

    if (randomNumber >= 0 &&randomNumber < 1/3) {
        computerMove='rock';
    }else if (randomNumber>=1/3 && randomNumber< 2/3) {
        computerMove = 'paper';
    } else{
        computerMove = 'scissors';
    }

    return computerMove;
};