import { setShipPoints, shipsList } from "./GenerlaFunctions.js";

const rotateBtns = document.getElementById('rotate-btn')
export function showRotateBtns(ev) {
  if (ev.target.nodeName === 'IMG') {
    console.log(rotateBtns);
    console.log(ev.target, ev)
    const x = ev.pageX;
    const y = ev.pageY;
    rotateBtns.classList.remove('none')
    rotateBtns.classList.add('absolute')
    rotateBtns.pageXCoords = x;
    rotateBtns.pageYCoords = `${y}`;
  }
}

export function hideRotateBtns(ev) {
  console.log("hjpñaakls{<dfaklsñ<dfhknñ", ev);
}