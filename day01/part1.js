const { readFileSync } = require("fs");

function computeFuel(mass) {
    return Math.floor(mass / 3) - 2;
}

function main(fileName) {
    const inputData = readFileSync(fileName, "utf-8");
    const fuelValues = inputData
        .trim()
        .split("\n")
        .map(x => computeFuel(x));
    const fuelSum = fuelValues.reduce((acc, x) => acc + x, 0);
    console.log(fuelSum);
}

// Execute main if file is run from terminal (not if run as import)
if (require.main === module) {
    main("input.txt");
}

module.exports = { computeFuel };
