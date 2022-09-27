
document.addEventListener("dragstart", (e) => letDrag(e))

/**
 * The function is called when the user starts dragging a ship. It sets the data to be transferred to
 * the id of the ship being dragged.
 * @param event - The event object is a standard JavaScript object that contains information about the
 * event that occurred.
 */
function letDrag(event) {
  event.dataTransfer.setData("ship", event.target.id)

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
  let data = ev.dataTransfer.getData("ship")
  let ship = document.getElementById(data)
  ship.classList.add("absolute")
  ev.target.appendChild(document.getElementById(data))
  hideShipSection()
}

function hideShipSection() {
  const section = document.getElementById('main-ships-section')
  if (section.children.length === 0) {
    const attakSection = document.getElementById('main-attack-section')
    attakSection.style.margin = '0 auto'
    section.classList.remove('main-ships-section')
    section.classList.add('none')
  } 
}