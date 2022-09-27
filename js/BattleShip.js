const shipsPosition = ['b,2', 'b,3', 'b,4', 'a,6', 'a,5', 'a,7', 'a,10', 'b,10', 'c,10', 'd,10', 'e,10'];
import  { allowDrop, drop }  from "./DragNDrop.js";

/**
 * It creates a 10x10 grid of squares and appends them to the DOM
 */
function setBattleField() {
  const enemy = document.getElementById('enemy-section');
  const my = document.getElementById('my-section');
  const enemySquares = [];
  const mySquares = [];
  const xAxis = ['a','b','c','d','e','f','g','h','i','j']
  for (let i = 0; i < xAxis.length; i++) {
    for (let j = 0; j < xAxis.length; j++) {
      enemySquares.push(createSqares('en',xAxis,i,j));
      mySquares.push(createSqares('my',xAxis,i,j));
    };
  };
  enemy.append(...enemySquares);
  my.append(...mySquares);
  enemy.addEventListener('click', ({target}) => shotTarget(target.id))
  my.addEventListener('drop', (e) => drop(e))
  my.addEventListener('dragover', (e) => allowDrop(e))
};
document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

/**
 * It takes a string as an argument, and if the string is not equal to 'enemy-section', it pushes the
 * string to the points array, and then it gets the element with the id equal to the string, and if the
 * shipsPosition array includes the substring of the id of the element, it adds the class
 * 'shotted-done' to the element, and sets the innerText of the element to '√', and if the
 * shipsPosition array does not include the substring of the id of the element, it adds the class
 * 'shotted-failed' to the element, and sets the innerText of the element to 'X'.
 * @param point - the id of the target that was clicked
 * @returns undefined.
 */
const points = [];
function shotTarget(point) {
  if (point === 'enemy-section') {
    return
  }
  points.push(point);
  const targetShotted = document.getElementById(point);
  const img = document.createElement('img')
  img.classList.add("fall-missile", "absolute")
  img.src = "../assets/missile.png"
  targetShotted.appendChild(img)
  setTimeout(()=> {
    targetShotted.removeChild(img)
  }, 500)
  if (shipsPosition.includes(targetShotted.id.substring(3,7))) {
    targetShotted.classList.add('shotted-done');
    return
  }
  targetShotted.classList.add('shotted-failed');
  targetShotted.innerText = 'X';
};

/**
 * It creates a div element, assigns it a class of 'square', assigns it an id of 'id-xAxis[i],j+1', and
 * assigns it an innerText of 'xAxis[i],j+1'
 * @param id - the id of the board
 * @param xAxis - an array of the letters A-H
 * @param i - the index of the xAxis array
 * @param j - the index of the row
 * @returns A div element with a class of square, inner text of the xAxis and j+1, and an id of the
 * tagId.
 */
function createSqares(id,xAxis,i,j) {
  const squareDiv = document.createElement("div");
  const tagId =  `${id}-${xAxis[i]},${j+1}`
  squareDiv.classList.add('square');
  squareDiv.innerText = `${xAxis[i]},${j+1}`;
  squareDiv.id = tagId;
  return squareDiv;
}


window.addEventListener('load', setBattleField);