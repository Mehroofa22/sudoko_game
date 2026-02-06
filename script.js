// Sample Sudoku Puzzle
let puzzle = [
    [5,3,"","","7","","","",""],
    [6,"","",1,9,5,"","",""],
    ["",9,8,"","","","",6,""],
    [8,"","","",6,"","","",3],
    [4,"","",8,"",3,"","",1],
    [7,"","","",2,"","","",6],
    ["",6,"","","","",2,8,""],
    ["","","",4,1,9,"","",5],
    ["","","","",8,"","",7,9]
];

// Create Board
function createBoard() {
    const board = document.getElementById("sudoku-board");
    board.innerHTML = "";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = document.createElement("input");
            cell.maxLength = 1;

            if (puzzle[row][col] !== "") {
                cell.value = puzzle[row][col];
                cell.disabled = true;
                cell.classList.add("prefilled");
            }

            cell.dataset.row = row;
            cell.dataset.col = col;

            board.appendChild(cell);
        }
    }
}

// Validate Sudoku
function isValid(board) {

    for (let i = 0; i < 9; i++) {
        let row = new Set();
        let col = new Set();

        for (let j = 0; j < 9; j++) {

            let rowVal = board[i][j];
            let colVal = board[j][i];

            if (rowVal !== "") {
                if (row.has(rowVal)) return false;
                row.add(rowVal);
            }

            if (colVal !== "") {
                if (col.has(colVal)) return false;
                col.add(colVal);
            }
        }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
        for (let boxCol = 0; boxCol < 9; boxCol += 3) {

            let box = new Set();

            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {

                    let val = board[boxRow+r][boxCol+c];

                    if (val !== "") {
                        if (box.has(val)) return false;
                        box.add(val);
                    }
                }
            }
        }
    }

    return true;
}

function checkSolution() {
    console.log("Button clicked"); // test

    let inputs = document.querySelectorAll("#sudoku-board input");
    let board = [];

    for (let i = 0; i < 9; i++) {
        board.push([]);
        for (let j = 0; j < 9; j++) {
            board[i].push(inputs[i*9+j].value);
        }
    }

    if (isValid(board)) {
        alert("You solved it in " + seconds + " seconds!");
        clearInterval(timerInterval);
    } else {
        alert("There are mistakes!");
    }
}

// Timer
let seconds = 0;
let timerInterval;

function startTimer() {
    seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").innerText = "Time: " + seconds + "s";
    }, 1000);
}

// New Game / Reset
function newGame() {
    clearInterval(timerInterval);
    startTimer();
    createBoard();
}

// Start everything
createBoard();
startTimer();
function showSuccessMessage() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h2>🎉 Congratulations!</h2>
            <p>You solved the Sudoku in ${seconds} seconds!</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function showErrorMessage() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content error-modal">
            <h2>Oops!</h2>
            <p>There are still some mistakes.</p>
            <button onclick="this.parentElement.parentElement.remove()">Try Again</button>
        </div>
    `;
    document.body.appendChild(modal);
}