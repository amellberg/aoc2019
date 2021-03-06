const { readFileSync } = require("fs");

function intersect(wireA, wireB) {
    return [...wireA].filter(p => wireB.has(p));
}

function parseDirection(dir) {
    const [direction, length] = [dir[0], parseInt(dir.slice(1))];
    if (![..."LRUD"].includes(direction) || isNaN(length) || length < 0) {
        throw new SyntaxError("invalid direction");
    }
    return { direction, length };
}

function traceWire(pathData) {
    const wire = new Set();

    let [x, y] = [0, 0];
    for (const dir of pathData) {
        let { direction, length } = parseDirection(dir);
        for (; length > 0; length--) {
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
            wire.add(JSON.stringify([x, y]));
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

    const norm1 = (x, y) => Math.abs(x) + Math.abs(y);
    const norms = cut.map(jp => {
        const [x, y] = JSON.parse(jp);
        return norm1(x, y);
    });
    console.log(Math.min(...norms));
}

if (require.main === module) {
    main("input.txt");
}

module.exports = { parseDirection, traceWire, intersect };
