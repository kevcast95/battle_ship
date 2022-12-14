const shipsPosition = ['2,2', '2,3', '2,4', '1,6', '1,5', '1,7', '1,10', '2,10', '3,10', '4,10', '5,10'];
import  { allowDrop, drop }  from "./DragNDrop.js";
import { showRotateBtns, hideRotateBtns } from "./Rotations.js";
import { xAxis } from "./constants.js";

/**
 * It creates a 10x10 grid of squares and appends them to the DOM
 */
function setBattleField() {
  const enemy = document.getElementById('enemy-section');
  const my = document.getElementById('my-section');
  console.log(".getAttributeNames();", my.getBoundingClientRect());
  const enemySquares = [];
  const mySquares = [];
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
  my.addEventListener('mouseover', (e) => showRotateBtns(e))
  my.addEventListener('mouseleave', (e) => hideRotateBtns(e))
};

/**
 * It takes a string as an argument, and if the string is not equal to 'enemy-section', 
 * it gets the element with the id equal to the string, and if the
 * shipsPosition array includes the substring of the id of the element, it adds the class
 * 'shotted-done' to the element, and sets the innerText of the element to '√', and if the
 * shipsPosition array does not include the substring of the id of the element, it adds the class
 * 'shotted-failed' to the element, and sets the innerText of the element to 'X'.
 * @param point - the id of the target that was clicked
 * @returns undefined.
 */          
function shotTarget(point) {
  if (point === 'enemy-section') {
    return
  }
  const targetShotted = document.getElementById(point);
  if (shipsPosition.includes(targetShotted.id.substring(3,7))) {
    setMissile(targetShotted, true)
    return
  }
  setMissile(targetShotted, false)
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
  const squareBtn = document.createElement("button");
  const tagId =  `${id}-${i+1},${j+1}`
  squareBtn.classList.add('square');
  squareBtn.innerText = `${xAxis[i]},${j+1}`;
  squareBtn.id = tagId;
  return squareBtn;
}

/**
 * It creates an image element, sets its class and src, appends it to the targetShotted element, and
 * then removes it after 500ms
 * @param targetShotted - the target that was shot
 * @param succes - boolean
 */
function setMissile(targetShotted, succes) {
  const img = document.createElement('img')
  const boom = document.createElement('img')
  img.classList.add("fall-missile", "absolute")
  boom.classList.add("boom", "absolute")
  img.src = "../assets/missile.png"
  boom.src = "../assets/boom1.gif"
  targetShotted.disabled = true
  targetShotted.append(img)
  setTimeout(()=> {
    targetShotted.removeChild(img)
    if(succes) {
      targetShotted.append(boom)
    } else {
      targetShotted.classList.add('shotted-failed');
    }
  }, 300)
}


window.addEventListener('load', setBattleField);