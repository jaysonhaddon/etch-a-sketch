const canvasContainer = document.querySelector(".canvas-container");
const canvasWidth = canvasContainer.offsetWidth;
const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const eraserBtn = document.querySelector("#eraser");
const resetBtn = document.querySelector("#reset");
const sliderLabel = document.querySelector("label");
const slider = document.querySelector("#slider");
let rowSize = slider.value;
let activeBtn = colorBtn;
let defaultColor = colorBtn.value;
let currentColor = defaultColor;
let eraserColor = eraserBtn.value;
let rainbowActive = false;
let mouseDown = false;

window.addEventListener("mousedown", () => {
  mouseDown = true;
});

window.addEventListener("mouseup", () => {
  mouseDown = false;
});

colorBtn.addEventListener("click", () => {
  setActiveBtn(colorBtn);
  rainbowActive = false;
  currentColor = defaultColor;
});

rainbowBtn.addEventListener("click", () => {
  setActiveBtn(rainbowBtn);
  if (rainbowActive) {
    rainbowActive = false;
    currentColor = defaultColor;
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
  setActiveBtn(resetBtn);
  rainbowActive = false;
  currentColor = defaultColor;
  destroyGrid();
  createGrid(rowSize);
  setTimeout(resetBtnBlink, 300);
});

slider.addEventListener("input", updateSliderLabel);

slider.addEventListener("mouseup", () => {
  destroyGrid();
  createGrid(rowSize);
});

createGrid(rowSize);
updateSliderLabel();

function createGrid(rowSize) {
  let boxWidth = calculateWidth(rowSize, canvasWidth);
  let totalBoxes = rowSize ** 2;
  for (let i = 0; i < totalBoxes; i++) {
    let newBox = document.createElement("div");
    newBox.classList.add("canvas-box");
    newBox.style.width = `${boxWidth}%`;
    newBox.addEventListener("mousedown", singleColor);
    newBox.addEventListener("mouseover", hoverColor);
    canvasContainer.appendChild(newBox);
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
  let pixelWidth = width / numBoxes;
  let percentage = (pixelWidth / width) * 100;
  return percentage;
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

function resetBtnBlink() {
  resetBtn.classList.remove("active");
  setActiveBtn(colorBtn);
}
