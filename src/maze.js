"use strict";
// let maze = [
//   [
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
//     ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
//     ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
//     ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
//     ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
//     ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
//     ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
//     ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
//   ],
// ];
// // // console.log(maze[0][2][1]);
// // // console.log(maze[0].length);
// // // console.log(maze[0][2].length);
// // let startPosition = `0`;
// // let maybeWay = `+`;
// // let noWay = `#`;
// // let x = 0;
// // let y = 0;

// //1. find coordinates maybeEndPosition

// let topEdge = maze[0][0]; // top string
// let bottomEdge = maze[0][maze[0].length - 1]; // bottom string
// let leftEdge = [];
// let rightEdge = [];
// let maybeEndPosition = [topEdge, bottomEdge, leftEdge, rightEdge];

// const edgeVertical = () => {
//   let i = 0;
//   for (i = 0; i < maze[0].length; i++) {
//     leftEdge.push(maze[0][i][0]);
//     rightEdge.push(maze[0][0][maze[0][0].length - 1]);
//   }
// };
// edgeVertical();
// console.log(leftEdge.includes("+"));

// const ifEdgeHasEscape = (string) => {
//   if (string.indexOf("+") > -1) {
//     console.log(
//       "escape found inside  this string",
//       "index",
//       string.indexOf("+")
//     );
//     return string.indexOf("+");
//   } else {
//     console.log("not found");
//   }
// };
// ifEdgeHasEscape(rightEdge); //not found

// ifEdgeHasEscape(leftEdge); //escape found inside  this string
// console.log(leftEdge.indexOf("+"));

// // 2. find coordinates for start and end

// function getCoordinates(array, char) {
//   for (let i = 0; i < array.length; i++) {
//     const i2 = array[i].indexOf(char);
//     if (i2 !== -1) return [i, i2];
//   }
//   return undefined;
// }
// let a = getCoordinates(maze[0], "0");
// let b = getCoordinates(leftEdge, "+");
// console.log(a); //[ 3, 4 ]
// console.log(b); //[ 3, 0 ]

var map = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

var start = { x: 4, y: 3 };
var end = { x: 0, y: 3 };

var SearchAlgorithms = (function () {
  var metopo = [];
  var visited = [];
  var idCounter = 0;

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
    var children = [];

    var possible = getPossibleStates(p);
    for (var i = 0; i < possible.length; i++) {
      var n = possible[i];
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
    var parent = visited[visited.length - 1];

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

      var children = getChildren(map, current);
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
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
var dfsNodes = SearchAlgorithms.dfs(map, start, end);
// for BFS
var bfsNodes = SearchAlgorithms.dfs(map, start, end);
//  console.log(bfsNodes);
console.log(bfsNodes[9]);
console.log(bfsNodes.length);

function filter(array, key, value) {
  var i,
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
// console.log (truePath);

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
  var map = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "+", "+", "+", "#", "+", "+", "+", "#"],
    ["#", "+", "#", "+", "#", "+", "#", "+", "#"],
    ["+", "+", "#", "+", "0", "+", "#", "+", "#"],
    ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
    ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ];

  var start = { x: 4, y: 3 };
  var end = { x: 4, y: 0 };

  var SearchAlgorithms = (function () {
    var metopo = [];
    var visited = [];
    var idCounter = 0;

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
      var children = [];

      var possible = getPossibleStates(p);
      for (var i = 0; i < possible.length; i++) {
        var n = possible[i];
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
      var parent = visited[visited.length - 1];

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

        var children = getChildren(map, current);
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
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
  var dfsNodes = SearchAlgorithms.dfs(map, start, end);
  // for BFS
  var bfsNodes = SearchAlgorithms.dfs(map, start, end);
  //  console.log(bfsNodes);
  console.log(bfsNodes[9]);
  console.log(bfsNodes.length);

  function filter(array, key, value) {
    var i,
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
  // console.log (truePath);

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
}
console.log(propertyValue(truePath, "val"));
