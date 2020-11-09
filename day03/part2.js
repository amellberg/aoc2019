const { readFileSync } = require("fs");

function intersect(wireA, wireB) {
    return [...wireA.keys()].filter(p => wireB.has(p));
}

function parseDirection(dir) {
    const [direction, length] = [dir[0], parseInt(dir.slice(1))];
    if (![..."LRUD"].includes(direction) || isNaN(length) || length < 0) {
        throw new SyntaxError("invalid direction");
    }
    return { direction, length };
}

function traceWire(pathData) {
    const wire = new Map();

    let [x, y] = [0, 0];
    let steps = 1;
    for (const dir of pathData) {
        let { direction, length } = parseDirection(dir);
        for (; length > 0; length--, steps++) {
            switch (direction) {
                case "L":
                    x--;
                    break;
                case "R":
                    x++;
                    break;
                case "U":
                    y++;
                    break;
                case "D":
                    y--;
                    break;
            }
            const p = JSON.stringify([x, y]);
            if (!wire.has(p)) {
                wire.set(p, steps);
            }
        }
    }
    return wire;
}

function main(fileName) {
    const inputData = readFileSync(fileName, "utf-8");
    const [wireDataA, wireDataB] = inputData.split("\n");

    const wireA = traceWire(wireDataA.split(","));
    const wireB = traceWire(wireDataB.split(","));
    const cut = intersect(wireA, wireB);

    const stepSums = cut.map(p => wireA.get(p) + wireB.get(p));
    console.log(Math.min(...stepSums));
}

if (require.main === module) {
    main("input.txt");
}

module.exports = { parseDirection, traceWire, intersect };
