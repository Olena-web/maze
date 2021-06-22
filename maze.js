var map = 
[
["#", "#", "#", "#", "#", "#","#","#","#"],
["#", "+", "+", "+", "#", "+","+","+","#"],
["#", "+", "#", "+", "#", "+","#","+","#"],
["+", "+", "#", "+", "0", "+","#","+","#"],
["#", "#", "#", "+", "#", "#","#","#","#"],
["#", "#", "+", "+", "#", "#","#","#","#"],
["#", "#", "+", "#", "#", "#","#","#","#"],
["#", "#", "#", "#", "#", "#","#","#","#"],
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
        return map[p.y] != null && map[p.y][p.x] === '+'; 
    }
    
    function hasVisited(p) {
        return visited.filter(n => areEqual(p, n)).length > 0;
    }
    
    function areEqual(p1, p2) {
        return p1.x == p2.x && p1.y == p2.y;
    }
    
    function getPossibleStates(p) {
        return [
            { x: p.x + 1, y: p.y, val: 'right' }, 
            { x: p.x, y: p.y + 1, val: 'down' },
            { x: p.x - 1, y: p.y, val: 'left' },
            { x: p.x, y: p.y - 1, val: 'top' }
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

        children.forEach(c => { 
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
            parent = visited.find(n => n.id === parent.parent);
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
        bfs: bfs
    };
})();
 // for DFS
 var dfsNodes = SearchAlgorithms.dfs(map, start, end);
 // for BFS
 var bfsNodes = SearchAlgorithms.dfs(map, start, end);
//  console.log(bfsNodes);
console.log(bfsNodes[9]);
console.log(bfsNodes.length);



function filter(array, key, value){
    var i, j, hash = [], item;

    for(i =  0, j = array.length; i<j; i++){
        item = array[i];
        if(typeof item[key] !== "undefined" && item[key] === value){
            hash.push(item);
        }
    }

    return hash;
   
};
const truePath = (filter (bfsNodes, 'inPath', true));
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
console.log(propertyValue(truePath, 'val'));