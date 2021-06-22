"use strict";
let maze = [
  [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
    ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
    ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
    ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ],
];
// // console.log(maze[0][2][1]);
// // console.log(maze[0].length);
// // console.log(maze[0][2].length);
// let startPosition = `0`;
// let maybeWay = `+`;
// let noWay = `#`;
// let x = 0;
// let y = 0;

//1. find coordinates maybeEndPosition

let topEdge = maze[0][0]; // top string
let bottomEdge = maze[0][maze[0].length - 1]; // bottom string
let leftEdge = [];
let rightEdge = [];
let maybeEndPosition = [topEdge, bottomEdge, leftEdge, rightEdge];

const edgeVertical = () => {
  let i = 0;
  for (i = 0; i < maze[0].length; i++) {
    leftEdge.push(maze[0][i][0]);
    rightEdge.push(maze[0][0][maze[0][0].length - 1]);
  }
};
edgeVertical();
console.log(leftEdge.includes("+"));

const ifEdgeHasEscape = (string) => {
  if (string.indexOf("+") > -1) {
    console.log(
      "escape found inside  this string",
      "index",
      string.indexOf("+")
    );
    return string.indexOf("+");
  } else {
    console.log("not found");
  }
};
ifEdgeHasEscape(rightEdge); //not found

ifEdgeHasEscape(leftEdge); //escape found inside  this string
console.log(leftEdge.indexOf("+"));
console.log(ifEdgeHasEscape(maybeEndPosition));

// 2. find coordinates for start and end

function getCoordinates(array, char) {
  for (let i = 0; i < array.length; i++) {
    const i2 = array[i].indexOf(char);
    if (i2 !== -1) return [i, i2];
  }
  return undefined;
}
let a = getCoordinates(maze[0], "0");
let b = getCoordinates(leftEdge, "+");
console.log(a);
console.log(b);
console.log(getCoordinates(maze[0], "0")); //[ 3, 4 ]
console.log(getCoordinates(leftEdge, "+")); //[ 3, 0 ]
