// Defaults
const DEFAULT_SIZE = 16;
const DEFAULT_PEN_COLOR = '#000000';
const DEFAULT_BG_COLOR = '#FFFFFF';

let disabled_writing = true;
let inkColor = DEFAULT_PEN_COLOR;
let bgColor = DEFAULT_BG_COLOR;
let blockSize = DEFAULT_SIZE;

let min = 16;
let max = 40;

const drawingBoard = document.querySelector('.drawing-board');

const colorPicker = document.getElementById('color-picker');
const bgColorPicker = document.getElementById('bg-color-picker')
const rangeInput = document.getElementById('range')
const createBlockBtn = document.getElementById('btn-create');

colorPicker.addEventListener('input', setPenColor);
bgColorPicker.addEventListener('input', setBoardColor);

createBlockBtn.addEventListener('click', setBlockSize)

function setPenColor(e) {
    disabled_writing = false;
    inkColor = e.target.value; 
}

function setBoardColor(e) {
    bgColor = e.target.value;
    drawingBoard.style.backgroundColor = bgColor;
}

function setBlockSize(){
    size = rangeInput.value;

    if(size < min || size > max) {
        alert("Oopps! Please insert from range of 16 to 40 block size.")
        rangeInput.value = ''
        rangeInput.focus();
    }
    else {
        createGridBlocks(size)
    }
}



function changeColor(e) {
    if(!disabled_writing) {
        e.target.style.backgroundColor = inkColor; // Use the updated inkColor value
    }
}

function createGridBlocks(size) {
    drawingBoard.innerHTML = ''
    drawingBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('mouseover', changeColor);
        drawingBoard.style.backgroundColor = bgColor;
        drawingBoard.appendChild(box);
    }
}

createGridBlocks(DEFAULT_SIZE);
