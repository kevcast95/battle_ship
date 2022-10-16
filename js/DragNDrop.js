import { shipsObjs } from "./constants.js";

document.addEventListener("dragstart", (e) => letDrag(e))
document.addEventListener("dragend", (ev) => dragEnd(ev), false)
const mySection = document.getElementById("my-section")
mySection.addEventListener("dragenter", (ev) => dragEnter(ev), false)
mySection.addEventListener("dragleave", (ev) => dragLeave(ev), false)

/* The class SettinPoint is a blueprint for creating objects that store an array of points. */
class SettinPoint {
  constructor() {
    this.length = 0;
    this.arr = [];
  }
  addPoints(item) {
    this.arr[this.length] = item;
    this.length++;
  }
  showPoints() {
    return this.arr;
  }
}

const selectedPoints = new SettinPoint()
/**
 * The function is called when the user starts dragging a ship. It sets the data to be transferred to
 * the id of the ship being dragged.
 * @param ev - The event object is a standard JavaScript object that contains information about the
 * event that occurred.
 */
function letDrag(ev) {
  ev.dataTransfer.setData("ship", ev.target.id)
  ev.target.style.opacity = 0;
}

/**
 * When the drag ends, make the element visible again
 * @param ev - The event object.
 */
function dragEnd(ev) {
  ev.target.style.opacity = "1";
}
/**
 * When the user drags an element over a square, the square's background color changes to a light blue
 * @param ev - The event object.
 */
function dragEnter(ev) {
  if (ev.target.className === "square") {
    if (!validateTarget(ev)) {
      ev.target.style.background = "red"
      return
    };
    ev.target.style.background = "rgba(66, 157, 227, 0.634)";
  }
}

/**
 * If the square the user is hovering over is not in the array of filled points, return true
 * @param ev - the event object
 * @returns A boolean value.
 */
function validateTarget(ev) {
  const overSquare = ev.target.id.substring(3, 7)
  const filledPoints = selectedPoints.showPoints()
  return filledPoints.includes(overSquare) ? false : true
}


/**
 * If the target of the dragLeave event is a square, then remove the background color
 * @param ev - the event object
 */
function dragLeave(ev) {
  if (ev.target.className === "square") {
    ev.target.style.background = "";
  }
}

/**
 * When the user drags an element over the drop zone, prevent the default action (open as link for some
 * elements)
 * @param ev - The event object.
 */
export function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * The function takes an event as an argument, prevents the default behavior of the event, gets the
 * data from the event, gets the ship from the data, adds the class "absolute" to the ship, and appends
 * the ship to the target of the event
 * @param ev - the event object
 */
export function drop(ev) {
  ev.preventDefault();
  if (validateTarget(ev)) {
    let data = ev.dataTransfer.getData("ship");
    let ship = document.getElementById(data);
    ship.classList.add("absolute");
    ev.target.appendChild(document.getElementById(data));
    setShipPoints(ship, ev);
    hideShipSection();
  }else {
    alert("Este punto se encuentra ocupado")
  }
  if (ev.target.className === "square") {
    ev.target.style.background = "";
  };
}

function setShipPoints(ship, data) {
  /*  const starSquare = document.getElementById(data.target.id)
   console.log("starSquare",starSquare.getBoundingClientRect()); */
  const shipId = ship.id
  const ponintArr = createPointsArray(shipId, data.target.id);
  localStorage.setItem(`${shipId}`, JSON.stringify(ponintArr))
}

/**
 * It takes a ship name and a starting point, and returns an array of points that the ship will occupy
 * @param ship - the name of the ship
 * @param start - the starting point of the ship
 * @returns An object with the name, size, direction, and pointsPosition properties.
 */
function createPointsArray(ship, start) {
  const currentShip = shipsObjs.filter(cShip => cShip.name === ship);
  const coord1 = parseInt(start.substring(3, 4));
  const coord2 = parseInt(start.substring(5, 7));
  const points = [];
  let newPoint = "";
  for (let i = 0; i < currentShip[0].size; i++) {
    if (currentShip[0].direction === 'vertical') {
      newPoint = `${coord1 + i},${coord2}`
    } else {
      newPoint = `${coord1},${coord2 + 1}`
    }
    points.push(newPoint)
  }
  points.forEach(point => selectedPoints.addPoints(point))
  console.log(selectedPoints.showPoints());
  console.log("shipsObjs:", ship, points);
  currentShip[0].pointsPosition = points
  return currentShip[0];
}

/**
 * If the ships section has no children, remove the ships section and center the attack section
 */
function hideShipSection() {
  const section = document.getElementById('main-ships-section')
  if (section.children.length === 0) {
    const attakSection = document.getElementById('main-attack-section')
    attakSection.style.margin = '0 auto'
    section.classList.remove('main-ships-section')
    section.classList.add('none')
  }
}