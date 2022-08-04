const canvasContainer = document.querySelector(".canvas-container");
const canvasWidth = canvasContainer.offsetWidth;
const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const eraserBtn = document.querySelector("#eraser");
const resetBtn = document.querySelector("#reset");
const sliderLabel = document.querySelector("label");
const slider = document.querySelector("#slider");
let rowSize = slider.value;
let mouseDown = false;
let currentColor = colorBtn.value;
let rainbow = false;

window.addEventListener("mousedown", () => {
  mouseDown = true;
  console.log(mouseDown);
});

window.addEventListener("mouseup", () => {
  mouseDown = false;
  console.log(mouseDown);
});

colorBtn.addEventListener("click", (e) => {
  rainbow = false;
  currentColor = e.target.value;
});

rainbowBtn.addEventListener("click", () => {
  if (rainbow) {
    rainbow = false;
  } else {
    rainbow = true;
  }
});

eraserBtn.addEventListener("click", (e) => {
  rainbow = false;
  currentColor = e.target.value;
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

createGrid(rowSize);
updateSliderLabel();

function createGrid(rowSize) {
  let boxWidth = calculateWidth(rowSize, canvasWidth);
  console.log(boxWidth);
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
  if (rainbow) currentColor = "red";
  e.target.style.backgroundColor = currentColor;
}

function hoverColor(e) {
  if (rainbow) currentColor = "green";
  if (mouseDown) e.target.style.backgroundColor = currentColor;
}

function updateSliderLabel() {
  rowSize = slider.value;
  sliderLabel.textContent = `${rowSize} X ${rowSize}`;
}
