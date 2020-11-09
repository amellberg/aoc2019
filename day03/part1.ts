import { readFileSync } from "fs";

type JsonCoord = string; // A JSON-ified 2-tuple of integers, e.g. "[3,-12]"
type Wire = Set<JsonCoord>; // All points traced out by wire, excl. "[0,0]"

type DirData = string; // E.g. "R34", or "L98", "U2" etc
type PathDir = "L" | "R" | "U" | "D";
type PathLen = number;

function isPathDir(c: string): c is PathDir {
    return [..."LRUD"].includes(c);
}

function intersect(wireA: Wire, wireB: Wire): JsonCoord[] {
    return [...wireA].filter(p => wireB.has(p));
}

function parseDirection(dir: DirData): { direction: PathDir; length: PathLen } {
    const [d, n] = [dir[0], parseInt(dir.slice(1))];
    if (!isPathDir(d) || isNaN(n) || n < 0) {
        throw new SyntaxError("invalid direction");
    }
    return { direction: d, length: n };
}

// Traces the path a wire takes and returns all covered points as the wire.
function traceWire(pathData: DirData[]): Wire {
    const wire: Wire = new Set();

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

function main(fileName: string) {
    const inputData = readFileSync(fileName, "utf-8");
    const [wireDataA, wireDataB] = inputData.split("\n");

    const wireA = traceWire(wireDataA.split(","));
    const wireB = traceWire(wireDataB.split(","));
    const cut = intersect(wireA, wireB);

    const norm1 = (x: number, y: number) => Math.abs(x) + Math.abs(y);
    const norms = cut.map(jp => {
        const [x, y] = JSON.parse(jp);
        return norm1(x, y);
    });
    console.log(Math.min(...norms));
}

if (require.main === module) {
    main("input.txt");
}

export { parseDirection, traceWire, intersect };
