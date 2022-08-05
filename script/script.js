const canvasContainer = document.querySelector(".canvas-container");
const canvasWidth = canvasContainer.offsetWidth;
const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const eraserBtn = document.querySelector("#eraser");
const resetBtn = document.querySelector("#reset");
const sliderLabel = document.querySelector("#slider-label");
const slider = document.querySelector("#slider");
const colorPicker = document.querySelector("#colorpicker");
let rowSize = slider.value;
let activeBtn = colorBtn;
let defaultColor = colorPicker.value;
let currentColor = defaultColor;
let eraserColor = eraserBtn.value;
let rainbowActive = false;
let mouseDown = false;

document.body.addEventListener("mousedown", () => {
  mouseDown = true;
});

document.body.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.onload = () => {
  createGrid(rowSize);
  updateSliderLabel();
};

colorBtn.addEventListener("click", () => {
  setActiveBtn(colorBtn);
  rainbowActive = false;
  currentColor = colorPicker.value;
});

rainbowBtn.addEventListener("click", () => {
  setActiveBtn(rainbowBtn);
  if (rainbowActive) {
    rainbowActive = false;
    currentColor = colorPicker.value;
  } else {
    rainbowActive = true;
  }
});

eraserBtn.addEventListener("click", () => {
  setActiveBtn(eraserBtn);
  rainbowActive = false;
  currentColor = eraserColor;
});

resetBtn.addEventListener("click", () => {
  destroyGrid();
  createGrid(rowSize);
});

slider.addEventListener("input", updateSliderLabel);

slider.addEventListener("mouseup", () => {
  destroyGrid();
  createGrid(rowSize);
});

colorPicker.addEventListener("change", () => {
  currentColor = colorPicker.value;
});

function createGrid(rowSize) {
  let boxWidth = calculateWidth(rowSize, canvasWidth);
  let boxHeight = calculateWidth(rowSize, canvasWidth);
  console.log(boxWidth, boxHeight);
  for (let row = 0; row < rowSize; row++) {
    for (let column = 0; column < rowSize; column++) {
      let newBox = document.createElement("div");
      newBox.classList.add("canvas-box");
      newBox.style.width = `${boxWidth}px`;
      newBox.style.height = `${boxHeight}px`;
      newBox.draggable = false;
      newBox.addEventListener("mousedown", singleColor);
      newBox.addEventListener("mouseover", hoverColor);
      canvasContainer.appendChild(newBox);
    }
  }
}

function destroyGrid() {
  console.log("I need to reset!");
  let gridBoxes = document.querySelectorAll(".canvas-box");
  gridBoxes.forEach((box) => {
    box.remove();
  });
}

function calculateWidth(numBoxes, width) {
  let pixelDimensions = width / numBoxes;
  return pixelDimensions;
}

function singleColor(e) {
  if (rainbowActive) currentColor = randomColor();
  e.target.style.backgroundColor = currentColor;
}

function hoverColor(e) {
  if (rainbowActive) currentColor = randomColor();
  if (mouseDown) e.target.style.backgroundColor = currentColor;
}

function randomColor() {
  let max = 250;
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    let num = Math.floor(Math.random() * max);
    rgb.push(num);
  }
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

function updateSliderLabel() {
  rowSize = slider.value;
  sliderLabel.textContent = `${rowSize} X ${rowSize}`;
}

function setActiveBtn(btn) {
  if (activeBtn === null) {
    activeBtn = btn;
    activeBtn.classList.add("active");
  } else {
    activeBtn.classList.remove("active");
    activeBtn = btn;
    activeBtn.classList.add("active");
  }
}
