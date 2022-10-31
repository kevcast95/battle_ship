import { shipsObjs } from "./constants.js";

/* FUNCTIONS CALLED BY DRAGNDROP MODULE */

/* The Ships class is a container for the ships array */
class Ships {
  constructor() {
    this.ships = shipsObjs;
  }
  getShips() {
    return this.ships
  }
  updatePosition(ship) {
    const shipName = ship.name;
    this.ships.forEach(shp => {
      if (shp.name === shipName) {
        shp.pointsPosition = ship.pointsPosition
      }
    })
  }
}

export const shipsList = new Ships();

/* It's a class that stores points and ships */
class SettinPoint {
  constructor() {
    this.lengthP = 0;
    this.arr = {};
  }

  addPoints(ship, item) {
    this.push(ship, item);
  }

  push(key, item) {
    this.arr[key] = item;
    this.lengthP++;
  }

  pop(key) {
    delete this.arr[key];
    this.lengthP--;
  }
  getPointKeys() {
    return Object.keys(this.arr);
  }
  
  getPoints() {
    return Object.values(this.arr);
  }

}
export const selectedPoints = new SettinPoint();


/**
 * If the square the user is hovering over is not in the array of filled points, return true
 * @param ev - the event object
 * @returns A boolean value.
 */
export function validateTarget(ev) {
  const overSquare = ev.target.id.substring(3, 7)
  const filledPoints = selectedPoints.getPoints().flat()
  return filledPoints.includes(overSquare) ? false : true
}

/**
 * It takes a ship and a target id, creates an array of points, and then stores that array in local
 * storage
 * @param ship - the name of the ship
 * @param data - {
 */
export function setShipPoints(ship, data) {
  /*  const starSquare = document.getElementById(data.target.id)
   console.log("starSquare",starSquare.getBoundingClientRect()); */
  const ponintArr = createPointsArray(ship, data.target.id);
  shipsList.updatePosition(ponintArr);
}

/**
 * It takes a ship name and a starting point, and returns an array of points that the ship will occupy
 * @param ship - the name of the ship
 * @param start - the starting point of the ship
 * @returns An object with the name, size, direction, and pointsPosition properties.
 */
function createPointsArray(ship, start) {
  const currentShip = shipsList.getShips().filter(cShip => cShip.name === ship);
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
  selectedPoints.addPoints(ship, points)
  currentShip[0].pointsPosition = points
  return currentShip[0];
}

/**
 * If the ships section has no children, remove the ships section and center the attack section
 */
export function hideShipSection() {
  const section = document.getElementById('main-ships-section')
  if (section.children.length === 0) {
    const attakSection = document.getElementById('main-attack-section')
    attakSection.style.margin = '0 auto'
    section.classList.remove('main-ships-section')
    section.classList.add('none')
  }
}