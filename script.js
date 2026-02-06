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

let seconds = 0;
let timerInterval;

function createBoard() {
    const board = document.getElementById("sudoku-board");
    board.innerHTML = "";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            let cell = document.createElement("input");
            cell.type = "text";
            cell.maxLength = 1;
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (puzzle[row][col] !== "") {
                cell.value = puzzle[row][col];
                cell.disabled = true;
                cell.classList.add("prefilled");
            } else {
                cell.addEventListener("input", validateInput);
            }

            board.appendChild(cell);
        }
    }
}

function validateInput(e) {
    const value = e.target.value;

    if (!/^[1-9]$/.test(value)) {
        e.target.value = "";
        return;
    }

    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (!checkSafe(row, col, value)) {
        e.target.style.backgroundColor = "red";
        setTimeout(() => {
            e.target.value = "";
            e.target.style.backgroundColor = "white";
        }, 400);
    }
}

function checkSafe(row, col, value) {
    const inputs = document.querySelectorAll("#sudoku-board input");

    // Row + Column check
    for (let i = 0; i < 9; i++) {

        if (inputs[row*9 + i].value == value && i != col)
            return false;

        if (inputs[i*9 + col].value == value && i != row)
            return false;
    }

    // 3x3 box check
    let boxRow = Math.floor(row/3)*3;
    let boxCol = Math.floor(col/3)*3;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {

            let currentRow = boxRow + r;
            let currentCol = boxCol + c;

            if ((currentRow != row || currentCol != col) &&
                inputs[currentRow*9 + currentCol].value == value)
                return false;
        }
    }

    return true;
}

function checkSolution() {
    const inputs = document.querySelectorAll("#sudoku-board input");

    for (let input of inputs) {
        if (input.value === "") {
            alert("Complete the board first!");
            return;
        }
    }

    alert("🎉 Sudoku Solved in " + seconds + " seconds!");
    clearInterval(timerInterval);
}

function resetBoard() {
    const inputs = document.querySelectorAll("#sudoku-board input");

    inputs.forEach(input => {
        if (!input.disabled) {
            input.value = "";
        }
    });

    clearInterval(timerInterval);
    startTimer();
}

function startNewGame() {
    clearInterval(timerInterval);
    createBoard();
    startTimer();
}

function startTimer() {
    seconds = 0;
    document.getElementById("timer").innerText = "Time: 0s";

    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById("timer").innerText =
            "Time: " + seconds + "s";
    }, 1000);
}

createBoard();
startTimer();
