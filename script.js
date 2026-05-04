// script.js
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const messageDisplay = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'x';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = gameBoard[winCondition[0]];
            const b = gameBoard[winCondition[1]];
            const c = gameBoard[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            displayMessage(`Player ${currentPlayer.toUpperCase()} wins!`);
            gameActive = false;
            return;
        }

        let draw = !gameBoard.includes('');
        if (draw) {
            displayMessage("It's a draw!");
            gameActive = false;
            return;
        }

        switchPlayer();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        displayMessage(`Player ${currentPlayer.toUpperCase()}'s turn`);
    }

    function displayMessage(message) {
        messageDisplay.textContent = message;
    }

    function resetGame() {
        currentPlayer = 'x';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        messageDisplay.textContent = `Player X's turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    resetGame(); // Initialize game on page load
});