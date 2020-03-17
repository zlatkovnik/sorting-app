//Init

const array = [];
const elements = [];
const container = document.body.querySelector(".container");

let speed = 100;

//functions

function fillArray(n) {
  container.innerHTML = "";
  array.splice(0, array.length);
  elements.splice(0, elements.length);
  for (let i = 0; i < n; i++) {
    const value = Math.floor(Math.random() * n + 1);
    const height = (container.clientHeight / n) * value;
    const element = document.createElement("div");
    element.className = "element";
    element.style.height = `${height}px`;
    element.style.marginLeft = n <= 300 ? "1px" : "0";
    container.appendChild(element);
    array.push(value);
    elements.push(element);
  }
}

function swap(i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  let height = (container.clientHeight / array.length) * array[i];
  elements[i].style.height = `${height}px`;
  height = (container.clientHeight / array.length) * array[j];
  elements[j].style.height = `${height}px`;

  elements[i].style.backgroundColor = "#ff3c22";
  elements[j].style.backgroundColor = "#ff3c22";

  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000 / speed);
  });
}

async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        await swap(j, j + 1);
        elements[j].style.backgroundColor = "#2892d7";
        elements[j + 1].style.backgroundColor = "#2892d7";
      }
    }
  }
  return new Promise(resolve => {});
}

//Logic
fillArray(301);
bubbleSort();
