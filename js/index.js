const docFrag = document.createDocumentFragment();
const container = document.getElementById("container");
const remove = document.querySelectorAll(".close");
const boxes = container.querySelectorAll(".box");

let letter = "123456789abcdef";
let boxesColor;
boxesColor = [
  generateColor(letter),
  generateColor(letter),
  generateColor(letter),
  generateColor(letter),
  generateColor(letter),
];

function callFunctionWhenPressSpace(event) {
  if (event.keyCode === 32) {
    [
      generateColor(letter),
      generateColor(letter),
      generateColor(letter),
      generateColor(letter),
      generateColor(letter),
    ].forEach((color, i) => (boxes[i].style.backgroundColor = color));
  }
}

function handleMouseMove(event, i) {
  remove[i].style.display = "block";
}

function handleMouseOut(event, i) {
  remove[i].style.display = "none";
}

boxes.forEach((element, i) => {
  const mouseMoveHandler = (event) => handleMouseMove(event, i);
  const mouseOutHandler = (event) => handleMouseOut(event, i);

  element.style.backgroundColor = boxesColor[i];

  element.addEventListener("mousemove", mouseMoveHandler);
  element.addEventListener("mouseout", mouseOutHandler);

  element._mouseMoveHandler = mouseMoveHandler;
  element._mouseOutHandler = mouseOutHandler;
});

function addMidColor(event) {
  const midColorDiv = document.createElement("div");
  midColorDiv.classList.add("box");
  const parentElement = event.target.parentElement;

  if (parentElement && parentElement.nextElementSibling) {
    const [currentEleColor, nextEleColor] = [
      window.getComputedStyle(parentElement).backgroundColor,
      window.getComputedStyle(parentElement.nextElementSibling).backgroundColor,
    ];
    const getColor = mixTwoColor(currentEleColor, nextEleColor);
    midColorDiv.style.backgroundColor = `rgb(${getColor[0]}, ${getColor[1]}, ${getColor[2]})`;
  }

  // midColorDiv.style.backgroundColor = "red";
  midColorDiv.innerHTML = `<i class="ri-close-line close"></i><div id="plus">+</div>`;
  parentElement.insertAdjacentElement("afterEnd", midColorDiv);
}

function handleRemoveAndOtherFunctionality(event) {
  const boxes = container.querySelectorAll(".box");
  if (event.target.classList.contains("close")) {
    event.target.parentElement.remove();
    container
      .querySelectorAll(".box")
      .forEach((box) => (box.style.width = 50 + 5 + "%"));
  } else if (event.target.id === "plus") {
    addMidColor(event);
  }

  const condition = boxes.length;
  switch (true) {
    case condition >= 9:
      console.log(container.querySelectorAll(".add"));
      break;
    case condition <= 3:
      container
        .querySelectorAll(".close")
        .forEach((icon) => (icon.style.opacity = 0));
      break;
    case condition >= 3:
      container
        .querySelectorAll(".close")
        .forEach((icon) => (icon.style.opacity = 1));
      break;
    default:
      "box are so struggle";
  }
}

function generateColor(letterCode) {
  let hash = "#";

  for (let i = 0; i < 6; i++)
    hash += letter[Math.floor(Math.random() * letterCode.length)];

  return hash;
}

function mixTwoColor(colorFir, colorSec) {
  const [firCode, secCode, colorName] = [
    colorFir.match(/\d+/g),
    colorSec.match(/\d+/g),
    ["red", "green", "blue"],
  ];
  const map = new Map();

  firCode.forEach((code, i) =>
    map.set(colorName[i], Math.round((code + secCode[i]) / 1000))
  );

  const [red, green, blue] = [
    map.get("red"),
    map.get("green"),
    map.get("blue"),
  ];

  return [red, green, blue];
}

container.addEventListener("click", handleRemoveAndOtherFunctionality);
document.addEventListener("keydown", callFunctionWhenPressSpace);
container.appendChild(docFrag);
