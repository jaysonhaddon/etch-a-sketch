const canvasContainer = document.querySelector(".canvas-container");
const canvasWidth = canvasContainer.offsetWidth;
let rowSize = 16;

createGrid(rowSize);

function createGrid(rowSize) {
  let boxWidth = calculateWidth(rowSize, canvasWidth);
  console.log(boxWidth);
  let totalBoxes = rowSize ** 2;
  for (let i = 0; i < totalBoxes; i++) {
    let newBox = document.createElement("div");
    newBox.classList.add("canvas-box");
    newBox.style.width = `${boxWidth}%`;
    newBox.addEventListener("onmouseover", boxAction);
    canvasContainer.appendChild(newBox);
  }
}

function calculateWidth(numBoxes, width) {
  let pixelWidth = width / numBoxes;
  let percentage = (pixelWidth / width) * 100;
  return percentage;
}

function boxAction(e) {
  console.log("You clicked a box!");
  e.target.style.backgroundColor = "black";
}
