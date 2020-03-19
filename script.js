//Init

const array = [];
const elements = [];
const container = document.body.querySelector(".container");

let speed = 10000;

//functions

function fillArray(n) {
  container.innerHTML = "";
  array.splice(0, array.length);
  elements.splice(0, elements.length);
  for (let i = 0; i < n; i++) {
    //const value = Math.floor(Math.random() * n + 1);
    const value = i + 1;
    const height = (container.clientHeight / n) * value;
    const element = document.createElement("div");
    element.className = "element";
    element.style.height = `${height}px`;
    element.style.border = n <= 350 ? "1px solid white" : "0";
    container.appendChild(element);
    array.push(value);
    elements.push(element);
  }
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * n);
    const temp = array[i];
    array[i] = array[index];
    array[index] = temp;

    let height = (container.clientHeight / array.length) * array[i];
    elements[i].style.height = `${height}px`;
    height = (container.clientHeight / array.length) * array[index];
    elements[index].style.height = `${height}px`;
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
      elements[i].style.backgroundColor = "#2892d7";
      elements[j].style.backgroundColor = "#2892d7";
      resolve();
    }, 1000 / speed);
  });
}

function insert(value, index) {
  array[index] = value;
  const height = (container.clientHeight / array.length) * value;
  elements[index].style.height = `${height}px`;
  elements[index].style.backgroundColor = "#ff3c22";
  return new Promise(resolve => {
    setTimeout(() => {
      elements[index].style.backgroundColor = "#2892d7";
      resolve();
    });
  }, 1000 / speed);
}

async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        await swap(j, j + 1);
      }
    }
  }
}

async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      await swap(j + 1, j);
      j--;
    }
    array[j + 1] = key;
  }
}

async function quickSort(low, high) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  let pivot = array[high];
  let i = low - 1;
  for (j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      await swap(i, j);
    }
  }
  await swap(i + 1, high);
  return i + 1;
}

async function mergeSort(left, right) {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);
    await mergeSort(left, middle);
    await mergeSort(middle + 1, right);
    await merge(left, middle, right);
  }
}

async function merge(left, middle, right) {
  const n1 = middle - left + 1;
  const n2 = right - middle;
  const leftArray = [];
  const rightArray = [];
  for (let i = 0; i < n1; i++) leftArray[i] = array[left + i];
  for (let j = 0; j < n2; j++) rightArray[j] = array[middle + 1 + j];
  let i = 0;
  let j = 0;
  let k = left;
  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) await insert(leftArray[i++], k);
    else await insert(rightArray[j++], k);
    k++;
  }
  while (i < n1) await insert(leftArray[i++], k++);
  while (j < n2) await insert(rightArray[j++], k++);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Logic
fillArray(100);
//insertionSort();
//bubbleSort();
//quickSort(0, array.length - 1);
mergeSort(0, array.length - 1);
