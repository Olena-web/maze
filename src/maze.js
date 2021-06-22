"use strict";
let map = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

//1. find coordinates maybeEndPosition
let topEdge = map[0]; // top string

let bottomEdge = [map[map.length - 1]]; // bottom string

let leftEdge = [];
let rightEdge = [];

const edgeVertical = () => {
  let i = 0;
  for (i = 0; i < map.length; i++) {
    leftEdge.push(map[i][0]);
    rightEdge.push(map[i][map.length]);
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

// 2. find coordinates for start and end

function getCoordinates(array, char) {
  for (let i = 0; i < array.length; i++) {
    const i2 = array[i].indexOf(char);
    if (i2 !== -1) return [i, i2];
  }
  return undefined;
}
let a = getCoordinates(map, "0");
let b = getCoordinates(leftEdge, "+");
console.log(a); //[ 3, 4 ]
console.log(b); //[ 3, 0 ]

let start = { x: 4, y: 3 };
let end = { x: 4, y: 0 };

const SearchAlgorithms = (function () {
  let metopo = [];
  let visited = [];
  let idCounter = 0;
  let current = {};
  function init(start, end) {
    metopo = [start];
    visited = [];
    idCounter = 1;

    start.id = 0;
    start.mutation = 0;
    start.parent = null;
  }

  function canGo(map, p) {
    return map[p.y] != null && map[p.y][p.x] === "+";
  }

  function hasVisited(p) {
    return visited.filter((n) => areEqual(p, n)).length > 0;
  }

  function areEqual(p1, p2) {
    return p1.x == p2.x && p1.y == p2.y;
  }

  function getPossibleStates(p) {
    return [
      { x: p.x + 1, y: p.y, val: "right" },
      { x: p.x, y: p.y + 1, val: "down" },
      { x: p.x - 1, y: p.y, val: "left" },
      { x: p.x, y: p.y - 1, val: "top" },
    ];
  }

  function getChildren(map, p) {
    let children = [];

    let possible = getPossibleStates(p);
    for (let i = 0; i < possible.length; i++) {
      let n = possible[i];
      if (canGo(map, n) && !hasVisited(n)) {
        children.push(n);
      }
    }

    children.forEach((c) => {
      c.parent = current.id;
      c.id = idCounter++;
      c.mutation = current.mutation + 1;
    });

    return children;
  }

  function fixPath() {
    let parent = visited[visited.length - 1];

    while (parent != null) {
      parent.inPath = true;
      parent = visited.find((n) => n.id === parent.parent);
    }
  }

  function dfs(map, start, end) {
    init(start, end);

    while (metopo.length > 0) {
      current = metopo.shift();

      visited.push(current);

      if (areEqual(current, end)) {
        break;
      }

      metopo.unshift(...getChildren(map, current));
    }

    fixPath();
    return visited;
  }

  function bfs(map, start, end) {
    init(start, end);

    while (metopo.length > 0) {
      current = metopo.shift();

      visited.push(current);

      if (areEqual(current, end)) {
        break;
      }

      let children = getChildren(map, current);
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (hasVisited(child)) {
          continue;
        }
        metopo.push(child);
      }
    }

    fixPath();
    return visited;
  }

  return {
    dfs: dfs,
    bfs: bfs,
  };
})();
// for DFS
const dfsNodes = SearchAlgorithms.dfs(map, start, end);
// for BFS
const bfsNodes = SearchAlgorithms.dfs(map, start, end);

function filter(array, key, value) {
  let i,
    j,
    hash = [],
    item;

  for (i = 0, j = array.length; i < j; i++) {
    item = array[i];
    if (typeof item[key] !== "undefined" && item[key] === value) {
      hash.push(item);
    }
  }

  return hash;
}
const truePath = filter(bfsNodes, "inPath", true);

function propertyValue(array, key) {
  const arr = [];
  let index = -1;
  let item;

  while (++index < array.length) {
    item = array[index];

    if (item.hasOwnProperty(key)) {
      arr[arr.length] = item[key];
    }
  }
  return arr;
}
console.log(propertyValue(truePath, "val"));
