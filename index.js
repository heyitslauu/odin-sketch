// Defaults
const DEFAULT_SIZE = 16;
const DEFAULT_PEN_COLOR = '#000000';
const DEFAULT_BG_COLOR = '#FFFFFF';

let disabled_writing = false;
let isMouseDown = false;

let inkColor = DEFAULT_PEN_COLOR;
let bgColor = DEFAULT_BG_COLOR;
let blockSize = DEFAULT_SIZE;
let is_rainbow = false;
let activeButton = null;

let min = 16;
let max = 40;

const drawingBoard = document.querySelector('.drawing-board');

const colorPicker = document.getElementById('color-picker');
const bgColorPicker = document.getElementById('bg-color-picker')
const rangeInput = document.getElementById('range')

const createBlockBtn = document.getElementById('btn-create');
const clearBtn = document.getElementById('clear-btn')
const eraser = document.getElementById('eraser-btn');
const rainbow = document.getElementById('rainbow-btn');


colorPicker.addEventListener('input', setPenColor);
bgColorPicker.addEventListener('input', setBoardColor);
eraser.addEventListener('click', eraseDrawing)
rainbow.addEventListener('click', triggerRainbow)


createBlockBtn.addEventListener('click', setBlockSize)
clearBtn.addEventListener('click', clearBlocks)

function setPenColor(e) {
    disabled_writing = false;
    is_rainbow = false
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

    blockSize = size
}

function clearBlocks() {
    createGridBlocks(blockSize)
}

function eraseDrawing(e) {
    if(activeButton !== eraser) {
        if (activeButton) {
            activeButton.classList.remove('active');
        }
    }
    e.target.classList.add('active')
    rainbow.classList.remove('active')
    activeButton = eraser;
    is_rainbow = false
    inkColor = bgColor
}

function triggerRainbow(e) {
    if (activeButton !== rainbow) {
        if (activeButton) {
            activeButton.classList.remove('active');
        }
        is_rainbow = true;
        rainbow.classList.add('active')
        randomColor = Math.floor(Math.random()*16777215).toString(16);
    
        inkColor = `#${randomColor}`
    }
   
}

function changeColor(e) {
    if(!disabled_writing && isMouseDown) {
        e.target.style.backgroundColor = inkColor;
    }

    if(is_rainbow && isMouseDown) {
        triggerRainbow()
    }
}

function createGridBlocks(size) {
    drawingBoard.innerHTML = ''
    drawingBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawingBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('mousedown', () => {isMouseDown = true;})
        box.addEventListener('mouseup', () => {isMouseDown = false;})
        box.addEventListener('mouseenter', changeColor);
        drawingBoard.style.backgroundColor = bgColor;
        
        drawingBoard.appendChild(box);
    }
}

createGridBlocks(DEFAULT_SIZE);
