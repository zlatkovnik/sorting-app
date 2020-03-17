//Init

const array = [];
const container = document.body.querySelector(".container");

//functions

function fillArray(n) {
  for (let i = 1; i <= n; i++) array.push(i);
}

function randomizeArray() {
  for (let i = 0; i < array.length; i++) {
    const index = Math.floor(Math.random() * array.length);
    const temp = array[i];
    array[i] = array[index];
    array[index] = temp;
  }
}

//Logic

fillArray(20);
randomizeArray();
console.log(array);
