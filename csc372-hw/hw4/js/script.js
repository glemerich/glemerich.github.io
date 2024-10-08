/*
Name: Garrett Emerich
Date: 10/08/2024
  CSC 372-01

This is the javascript for the index page.
*/

document.addEventListener("DOMContentLoaded", () => {
    const playerMoves = document.querySelectorAll('.move');
    const computerChoiceImg = document.getElementById('computer-choice');
    const resultText = document.getElementById('result');
    const winsDisplay = document.getElementById('wins');
    const lossesDisplay = document.getElementById('losses');
    const tiesDisplay = document.getElementById('ties');
    let computerShuffleInterval;
    let wins = 0;
    let losses = 0;
    let ties = 0;

    // event listeners for player move
    playerMoves.forEach(move => {
        move.addEventListener('click', () => {
            highlightPlayerMove(move);
            startComputerTurn(move.id);
        });
    });

    // Highlight the selected player's move
    function highlightPlayerMove(selectedMove) {
        playerMoves.forEach(move => move.classList.remove('selected'));
        selectedMove.classList.add('selected');
    }

    // Shuffle images and determine computer move
    function startComputerTurn(playerMove) {
        let computerChoices = ['rock.png', 'paper.png', 'scissors.png'];
        let index = 0;

        if (computerShuffleInterval) {
            clearInterval(computerShuffleInterval);
        }

        computerShuffleInterval = setInterval(() => {
            computerChoiceImg.src = `../images/${computerChoices[index]}`;
            index = (index + 1) % computerChoices.length;
        }, 500);

        // Stop shuffling after 3 seconds
        setTimeout(() => {
            clearInterval(computerShuffleInterval);
            let randomChoiceIndex = Math.floor(Math.random() * computerChoices.length);
            let computerMove = computerChoices[randomChoiceIndex].split('.')[0]; // Extracts "rock", "paper", or "scissors"
            computerChoiceImg.src = `../images/${computerChoices[randomChoiceIndex]}`;
            determineWinner(playerMove, computerMove); // Determine who won the game
        }, 3000);
    }

    // Determine the winner
    function determineWinner(playerMove, computerMove) {
        if (playerMove === computerMove) {
            resultText.textContent = "It's a tie!";
            ties++;
        } else if (
            (playerMove === 'rock' && computerMove === 'scissors') ||
            (playerMove === 'scissors' && computerMove === 'paper') ||
            (playerMove === 'paper' && computerMove === 'rock')
        ) {
            resultText.textContent = "You win!";
            wins++;
        } else {
            resultText.textContent = "You lose!";
            losses++;
        }
        updateScore();
    }

    // Update the score display
    function updateScore() {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }

    // Reset game
    document.getElementById('reset-btn').addEventListener('click', () => {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScore();
        resultText.textContent = 'Make your move!';
        computerChoiceImg.src = 'images/question-mark.png';
        playerMoves.forEach(move => move.classList.remove('selected'));
    });
});
