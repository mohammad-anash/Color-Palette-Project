const docFrag = document.createDocumentFragment();
const container = document.getElementById("container");
const remove = document.querySelectorAll(".close");
const boxes = container.querySelectorAll(".box");

let letter = "123456789abcdef";
let boxesColor;
let element;
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
    ].forEach((color, i) => {
      boxes[i].style.backgroundColor = color;
    });
  }
}

boxes.forEach((element, i) => {
  element.style.backgroundColor = boxesColor[i];
});

function addMidColor(event) {
  const midColorDiv = document.createElement("div");
  midColorDiv.classList.add("box");
  const parentElement = event.target.parentElement.parentElement;

  if (parentElement && parentElement.nextElementSibling) {
    const [currentEleColor, nextEleColor] = [
      window.getComputedStyle(parentElement).backgroundColor,
      window.getComputedStyle(parentElement.nextElementSibling).backgroundColor,
    ];
    const [color1, color2] = [currentEleColor, nextEleColor];
    const mixedColor = tinycolor.mix(color1, color2);
    midColorDiv.style.backgroundColor = mixedColor;
  }

  midColorDiv.innerHTML = `<div id="feature">
          <i class="ri-close-line close"></i>
          <i class="ri-edit-line edit"></i>
        </div>
         <div class="mix-two-color">
          <div id="plus" class="add">+</div>
        </div>`;
  parentElement.insertAdjacentElement("afterEnd", midColorDiv);
}

function handleRemoveAndOtherFunctionality(event) {
  const boxes = container.querySelectorAll(".box");
  if (event.target.classList.contains("close")) {
    event.target.parentElement.parentElement.remove();
    container
      .querySelectorAll(".box")
      .forEach((box) => (box.style.width = 50 + 5 + "%"));
  } else if (event.target.id === "plus") {
    console.log(event.target);
    addMidColor(event);
  } else if (event.target.classList.contains("edit")) {
    const editContainer = document.getElementById("edit-container");
    editContainer.style.display = "block";
    editContainer.classList.add("show");
    element = event.target;
  } else if (event.target.id === "edit-btn") {
    hexColorFunctionality(element);
  } else if (event.target.id === "close") {
    event.target.parentElement.classList.remove("show");
    event.target.parentElement.style.display = "none";
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

function hexColorFunctionality(element) {
  let editHex = document.getElementById("edit-hex");
  const hexCode = editHex.value;
  element.parentElement.parentElement.style.backgroundColor = "#" + hexCode;

  editHex.value = "";
}

document.body.addEventListener("click", handleRemoveAndOtherFunctionality);
document.addEventListener("keydown", callFunctionWhenPressSpace);
container.appendChild(docFrag);
