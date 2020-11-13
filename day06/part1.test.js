const { createOrbitMap, countOrbits } = require("./part1");

const data = "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L";

describe("createOrbitMap()", () => {
    test("example data", () => {
        expect(createOrbitMap(data)).toEqual({
            COM: ["B"],
            B: ["C", "G"],
            C: ["D"],
            D: ["E", "I"],
            E: ["F", "J"],
            G: ["H"],
            J: ["K"],
            K: ["L"],
        });
    });
});

describe("countOrbits()", () => {
    test("example data", () => {
        const map = createOrbitMap(data);
        expect(countOrbits(map)).toBe(42);
    });
});
