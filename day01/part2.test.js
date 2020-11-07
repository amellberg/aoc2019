const { computeFuel, fuelReq } = require("./part2");

let testCases = [
    { mass: 12, want: 2 },
    { mass: 14, want: 2 },
    { mass: 1969, want: 654 },
    { mass: 100756, want: 33583 },
];

for (const tc of testCases) {
    test(`computeFuel(${tc.mass})`, () => {
        expect(computeFuel(tc.mass)).toBe(tc.want);
    });
}

testCases = [
    { mass: 14, want: 2 },
    { mass: 1969, want: 966 },
    { mass: 100756, want: 50346 },
];

for (const tc of testCases) {
    test(`fuelReq(${tc.mass})`, () => {
        expect(fuelReq(tc.mass)).toBe(tc.want);
    });
}
