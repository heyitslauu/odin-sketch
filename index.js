const DEFAULT_SIZE = 16;
const DEFAULT_PEN_COLOR = '#000000';
const DEFAULT_BG_COLOR = '#FFFFFF';

let inkColor = DEFAULT_PEN_COLOR;

const drawingBoard = document.querySelector('.drawing-board');

const colorPicker = document.getElementById('color-picker');

colorPicker.addEventListener('input', setPenColor);

function setPenColor(e) {
    inkColor = e.target.value; // Update the global inkColor variable
    console.log(e.target.value);
}

function createGridBlocks(size) {
    drawingBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('mouseover', changeColor);
        drawingBoard.appendChild(box);
    }
}

function changeColor(e) {
    e.target.style.backgroundColor = inkColor; // Use the updated inkColor value
}

createGridBlocks(DEFAULT_SIZE);
