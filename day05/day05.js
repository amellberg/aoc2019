const { readFileSync } = require("fs");
const { Computer } = require("../intcode");

function main(fileName) {
    const input = readFileSync(fileName, "utf-8");
    const program = input.trimEnd().split(",").map(Number);

    const c = new Computer();
    c.load([...program]);
    console.log("Part 1:", c.run(1));
    c.load([...program]);
    console.log("Part 2:", c.run(5));
}

// Execute main if file is run from terminal (not if run as import)
if (require.main === module) {
    main("input.txt");
}
