// Functions to be used in other files

// Return object of a tile to be added to array
function addTileToArray(x, y, state) {
  return {
    x: x,
    y: y,
    state: state,
  };
}

// Return object of a ship
function addShipToArray(x, y, rotation, index) {
  return {
    x: x,
    y: y,
    data: rotation + intToBin(index),
  };
}

// Convert an integer into binary
function intToBin(num) {
  return ('00000000' + num.toString(2)).slice(-8);
}

// Convert binary into an integer
function binToInt(num) {
  return parseInt(num, 2);
}

// Find the closest tile to provided x and y coordinates
function findTileByCoordinates(x, y, array) {
  let closestIndex = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].x < x && array[i].y < y) {
      if (
        array[i].x >= array[closestIndex].x &&
        array[i].y >= array[closestIndex].y
      ) {
        closestIndex = i;
      }
    }
  }
  return closestIndex;
}

// Process response into an object including rotation and position values
function processResponse(response) {
  let rotation = JSON.parse(response[0]);
  let position = binToInt(response.substring(1));

  return {
    rotation: rotation,
    position: [position],
  };
}

// Find the next letter in alphabetical sequence
function nextLetter(letter) {
  if (letter === 'A') {
    return 'B';
  } else if (letter === 'B') {
    return 'C';
  } else if (letter === 'C') {
    return 'D';
  } else if (letter === 'D') {
    return 'E';
  } else if (letter === 'E') {
    return 'F';
  } else if (letter === 'F') {
    return 'G';
  } else if (letter === 'G') {
    return 'H';
  } else if (letter === 'H') {
    return 'I';
  } else if (letter === 'I') {
    return 'J';
  } else if (letter === 'J') {
    return 'END';
  }
}
