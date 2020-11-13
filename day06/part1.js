const { readFileSync } = require("fs");

function countOrbits(orbitMap) {
    // 'depth' is the length of the chain between the current object and COM;
    // this is also the # of objects that the current object is in orbit around
    // (directly or indirectly).
    const count = (currObj, depth) => {
        let numOrbs = 0; // # of direct+indirect orbiters of current obj
        for (const orbiter of orbitMap[currObj] || []) {
            numOrbs += count(orbiter, depth + 1);
        }
        return depth + numOrbs;
    };
    return count("COM", 0);
}

function createOrbitMap(orbitData) {
    const orbits = Object.create(null);
    orbitData
        .split("\n")
        .map(orbit => orbit.split(")"))
        .forEach(([obj, orbiter]) =>
            (orbits[obj] || (orbits[obj] = [])).push(orbiter)
        );
    return orbits;
}

function main(inputFile) {
    const map = createOrbitMap(readFileSync(inputFile, "utf-8").trim());
    console.log(countOrbits(map));
}

if (require.main === module) {
    main("input.txt");
}

module.exports = { createOrbitMap, countOrbits };
