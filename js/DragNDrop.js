import {hideShipSection, setShipPoints, selectedPoints, validateTarget } from "./GenerlaFunctions.js"

document.addEventListener("dragstart", (e) => letDrag(e))
document.addEventListener("dragend", (ev) => dragEnd(ev), false)
const mySection = document.getElementById("my-section")
mySection.addEventListener("dragenter", (ev) => dragEnter(ev), false)
mySection.addEventListener("dragleave", (ev) => dragLeave(ev), false)



/**
 * The function is called when the user starts dragging a ship. It sets the data to be transferred to
 * the id of the ship being dragged.
 * @param ev - The event object is a standard JavaScript object that contains information about the
 * event that occurred.
 */
function letDrag(ev) {
  const droppedShip = selectedPoints.getPointKeys();
  const dragShip = ev.target.id
  if (droppedShip.includes(dragShip)) {
    selectedPoints.pop(dragShip)
  }
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
    setShipPoints(ship.id, ev);
    hideShipSection();
  }else {
    alert("Este punto se encuentra ocupado")
  }
  if (ev.target.className === "square") {
    ev.target.style.background = "";
  };
}
