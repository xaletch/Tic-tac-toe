const cell = document.querySelectorAll('.cell');
const xScoreSpan = document.querySelector('#XScore');
const oScoreSpan = document.querySelector('#OScore');
const reset = document.querySelector('.resetBtn');
const draws = document.querySelector('#draws');
const levelDiv = document.querySelector('.level');

const X = 'X';
const O = 'O';

let xScore  = 0;
let oScore  = 0;

let currentLevel = 1;
let flag = true;

let currentPlayer = X;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', cellClick);
};

function cellClick(e) {
    if (flag) {
    if (e.target.innerHTML === '') {
        e.target.appendChild(addImg(currentPlayer));
  
        CheckWinner();
        checkDraw();
    };
        currentPlayer = currentPlayer === X ? O : X;
    };
};
  
function addImg(type) {
    const div = document.createElement('div');
    div.classList.add('image-div');
    div.textContent = type;
    return div;
};
  

function CheckWinner() {
    for (let i = 0; i < winCombos.length; i++) {
      const winCombo = winCombos[i];
      const cell1 = cell[winCombo[0]];
      const cell2 = cell[winCombo[1]];
      const cell3 = cell[winCombo[2]];
  
        if ( cell1.innerHTML !== '' && cell1.innerHTML === cell2.innerHTML && cell2.innerHTML === cell3.innerHTML) {
            
            level(`Игрок ${currentPlayer} выигрывает!`);

            flag = false;
            currentLevel++;

            updateScore(currentPlayer);
                
            setTimeout(() => {
                resetBoard();

                level(`Уровень ${currentLevel}`);
            }, 2100);
        };
    };
};
  
// function updateScore(player) {
//     if (player === X) {
//         xScore++;
//         xScoreSpan.textContent = xScore;
//     } else if (player === O) {
//         oScore++;
//         oScoreSpan.textContent = oScore;
//     }
// }
  
function resetBoard() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
    };

    flag = true;
    currentPlayer = X;
    level(`Уровень ${currentLevel}`);
};
  
function checkDraw() {
    let isDraw = true;

    for (let i = 0; i < cell.length; i++) {
        if (cell[i].innerHTML === '') {
            isDraw = false;
        };
    };

    if (isDraw) {
        draws.textContent++;
        level("Ничья!");
        setTimeout(() => {
            resetBoard();

            level(`Уровень ${currentLevel}`);
        }, 2000);
    };
};

function level(msg) {
    levelDiv.classList.add('show');
    levelDiv.textContent = msg;

    setTimeout(() => {
        levelDiv.classList.remove('show');
    }, 1800)
};

function updateScore () {
    if (currentPlayer === X) {
        xScore++;
        xScoreSpan.textContent = xScore;
    } else {
        oScore++;
        oScoreSpan.textContent = oScore;
    };
};

function resetBtn () {
    cell.forEach((cells) => cells.innerHTML = '');

    flag = true;
};

reset.addEventListener('click', () => {
    flag = false;
    resetBtn();
  
    currentLevel = 1;
    xScore = 0;
    oScore = 0;
  
    xScoreSpan.textContent = xScore;
    oScoreSpan.textContent = oScore;
  
    level('Сброс игры!');
  
    setTimeout(() => {
      level(`Уровень ${currentLevel}`);
      flag = true;
    }, 2100);
});
