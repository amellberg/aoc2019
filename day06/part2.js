const { readFileSync } = require("fs");

function findPath(orbitMap, start, end) {
    // Setup some attributes for each object (vertex)
    const attrs = Object.create(null);
    for (const obj of Object.keys(orbitMap)) {
        attrs[obj] = { prev: null, visited: false };
    }

    // Run a DFS from start, looking for end, storing prev pointers as we go
    (function find(currObj) {
        attrs[currObj].visited = true;
        if (currObj === end) return true;
        for (const obj of orbitMap[currObj]) {
            if (!attrs[obj].visited) {
                attrs[obj].prev = currObj;
                if (find(obj)) return true;
            }
        }
        return false;
    })(start);

    // Trace out a path in reverse, from end to start, using the prev pointers
    const path = [];
    let currObj = attrs[end].prev;
    while (currObj !== start) {
        path.push(currObj);
        currObj = attrs[currObj].prev;
    }
    return path;
}

// Undirected version of createOrbitMap from part 1
function createOrbitMap(orbitData) {
    const orbits = Object.create(null);
    orbitData
        .split("\n")
        .map(orbit => orbit.split(")"))
        .forEach(([obj, orbiter]) => {
            (orbits[obj] || (orbits[obj] = [])).push(orbiter);
            (orbits[orbiter] || (orbits[orbiter] = [])).push(obj);
        });
    return orbits;
}

function main(inputFile) {
    const map = createOrbitMap(readFileSync(inputFile, "utf-8").trim());
    const path = findPath(map, "YOU", "SAN");
    // console.log(path);
    console.log(path.length - 1);
}

const data =
    "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN";
const map = createOrbitMap(data);

if (require.main === module) {
    main("input.txt");
}

module.exports = {};
