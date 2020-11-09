const { parseDirection, traceWire, intersect } = require("./part1");

describe("parseDirection()", () => {
    test("parses valid input", () => {
        expect(parseDirection("D344")).toMatchObject({
            direction: "D",
            length: 344,
        });
    });
    test("parses valid input", () => {
        expect(parseDirection("L1")).toMatchObject({
            direction: "L",
            length: 1,
        });
    });
    test("parses valid input", () => {
        expect(parseDirection("U006")).toMatchObject({
            direction: "U",
            length: 6,
        });
    });
    test("throws on bad direction", () => {
        expect(() => {
            parseDirection("I237");
        }).toThrow();
    });
    test("throws on negative length", () => {
        expect(() => {
            parseDirection("D-237");
        }).toThrow();
    });
    test("throws on invalid length", () => {
        expect(() => {
            parseDirection("L.237");
        }).toThrow();
    });
});

function jsonCoord(x, y) {
    return JSON.stringify([x, y]);
}

describe("traceWire()", () => {
    const testCases = [
        {
            name: "constructs an empty wire",
            path: [],
            want: [],
        },
        {
            name: "constructs a wire without self-intersect",
            path: ["R3", "U2"],
            want: [
                jsonCoord(1, 0),
                jsonCoord(2, 0),
                jsonCoord(3, 0),
                jsonCoord(3, 1),
                jsonCoord(3, 2),
            ],
        },
        {
            name: "constructs a wire with one self-intersect",
            path: ["D2", "L1", "U1", "R2"],
            want: [
                jsonCoord(0, -1),
                jsonCoord(0, -2),
                jsonCoord(-1, -2),
                jsonCoord(-1, -1),
                jsonCoord(1, -1),
            ],
        },
        {
            name: "constructs a wire with several self-intersects",
            path: ["R3", "U2", "D3", "L2", "U3"],
            want: [
                jsonCoord(1, 0),
                jsonCoord(2, 0),
                jsonCoord(3, 0),
                jsonCoord(3, 1),
                jsonCoord(3, 2),
                jsonCoord(3, -1),
                jsonCoord(2, -1),
                jsonCoord(1, -1),
                jsonCoord(1, 1),
                jsonCoord(1, 2),
            ],
        },
    ];

    for (const testCase of testCases) {
        test(testCase.name, () => {
            const wire = traceWire(testCase.path);
            expect([...wire].sort()).toEqual(testCase.want.sort());
        });
    }

    test("throws on bad wire data", () => {
        expect(() => {
            traceWire(["U2", "r3", "L15"]);
        }).toThrow();
    });
});

describe("intersect()", () => {
    test("handles wires that don't intersect", () => {
        const wireA = traceWire(["U5", "R3"]);
        const wireB = traceWire(["D10", "R2"]);
        expect(intersect(wireA, wireB)).toEqual([]);
    });
    test("handles one intersection point", () => {
        const wireA = traceWire(["R5", "D3"]);
        const wireB = traceWire(["D1", "R10"]);
        expect(intersect(wireA, wireB)).toEqual([jsonCoord(5, -1)]);
    });
    test("handles two intersection points", () => {
        const wireA = traceWire(["R10", "D3"]);
        const wireB = traceWire(["U2", "R2", "D5", "R2", "U4"]);
        expect(intersect(wireA, wireB)).toEqual([
            jsonCoord(2, 0),
            jsonCoord(4, 0),
        ]);
    });
    test("handles identical wires", () => {
        const wireA = traceWire(["R3"]);
        const wireB = traceWire(["R3"]);
        expect(intersect(wireA, wireB)).toEqual([
            jsonCoord(1, 0),
            jsonCoord(2, 0),
            jsonCoord(3, 0),
        ]);
    });
});
