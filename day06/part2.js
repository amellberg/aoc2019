const { readFileSync } = require("fs");

function findPath(orbitMap, start, end) {
    // Set up some attributes for each object (vertex)
    const attrs = Object.create(null);
    for (const obj of Object.keys(orbitMap)) {
        attrs[obj] = { parent: null, visited: false };
    }

    // Run a DFS from start, looking for end, storing parent pointers as we go
    (function find(currObj) {
        attrs[currObj].visited = true;
        if (currObj === end) return true;
        for (const obj of orbitMap[currObj]) {
            if (!attrs[obj].visited) {
                attrs[obj].parent = currObj;
                if (find(obj)) return true;
            }
        }
        return false;
    })(start);

    // Trace out a path in reverse, from end to start, using the parent pointers
    const path = [];
    let currObj = attrs[end].parent;
    while (currObj !== start) {
        path.push(currObj);
        currObj = attrs[currObj].parent;
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

if (require.main === module) {
    main("input.txt");
}
