class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'x';
        this.gameActive = true;
        this.score = { x: 0, o: 0 };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.playerTurnDisplay = document.querySelector('.player-turn');
        this.restartButton = document.getElementById('restart-btn');
        this.resetScoreButton = document.getElementById('reset-score');
        this.scoreXDisplay = document.getElementById('score-x');
        this.scoreODisplay = document.getElementById('score-o');

        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });

        this.restartButton.addEventListener('click', this.restartGame.bind(this));
        this.resetScoreButton.addEventListener('click', this.resetScore.bind(this));

        this.updatePlayerTurnDisplay();
    }

    handleCellClick(e) {
        const cell = e.target;
        const index = Array.from(this.cells).indexOf(cell);

        if (this.board[index] !== '' || !this.gameActive) return;

        this.makeMove(index);
        this.checkGameStatus();
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer);
    }

    checkGameStatus() {
        const winner = this.checkWinner();
        
        if (winner) {
            this.handleWin(winner);
        } else if (this.board.every(cell => cell !== '')) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }

    checkWinner() {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return null;
    }

    handleWin(winner) {
        this.gameActive = false;
        this.score[winner]++;
        this.updateScoreDisplay();
        
        const winningCombination = this.winningCombinations.find(combo => {
            const [a, b, c] = combo;
            return this.board[a] === winner && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });

        winningCombination.forEach(index => {
            this.cells[index].classList.add('winning-cell');
        });

        this.playerTurnDisplay.textContent = `Player ${winner.toUpperCase()} Wins!`;
    }

    handleDraw() {
        this.gameActive = false;
        this.playerTurnDisplay.textContent = "It's a Draw!";
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
        this.updatePlayerTurnDisplay();
    }

    updatePlayerTurnDisplay() {
        this.playerTurnDisplay.textContent = `Player ${this.currentPlayer.toUpperCase()}'s Turn`;
    }

    updateScoreDisplay() {
        this.scoreXDisplay.textContent = this.score.x;
        this.scoreODisplay.textContent = this.score.o;
    }

    restartGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'x';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winning-cell');
        });
        
        this.updatePlayerTurnDisplay();
    }

    resetScore() {
        this.score = { x: 0, o: 0 };
        this.updateScoreDisplay();
        this.restartGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 