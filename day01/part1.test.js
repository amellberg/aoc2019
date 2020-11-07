const { computeFuel } = require("./part1");

const testCases = [
    { mass: 12, want: 2 },
    { mass: 14, want: 2 },
    { mass: 1969, want: 654 },
    { mass: 100756, want: 33583 },
];

for (const tc of testCases) {
    test(`mass=${tc.mass}`, () => {
        expect(computeFuel(tc.mass)).toBe(tc.want);
    });
}
