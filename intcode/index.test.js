const { Computer, parseInstruction } = require("./index");

describe("run()-tests corresponding to day 2", () => {
    const testCases = [
        {
            program: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
            want: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
        },
        {
            program: [1, 0, 0, 0, 99],
            want: [2, 0, 0, 0, 99],
        },
        {
            program: [2, 3, 0, 3, 99],
            want: [2, 3, 0, 6, 99],
        },
        {
            program: [2, 4, 4, 5, 99, 0],
            want: [2, 4, 4, 5, 99, 9801],
        },
        {
            program: [1, 1, 1, 4, 99, 5, 6, 0, 99],
            want: [30, 1, 1, 4, 2, 5, 6, 0, 99],
        },
    ];

    const computer = new Computer();
    for (const testCase of testCases) {
        test(JSON.stringify(testCase.program), () => {
            computer.load(testCase.program);
            computer.run();
            expect(computer.memory).toEqual(testCase.want);
        });
    }
});

describe("run()-tests corresponding to day 5", () => {
    const largerProg = [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99,
    ];

    const testCases = [
        {
            name: "output = input",
            program: [3, 0, 4, 0, 99],
            input: 666,
            wantOutput: [666],
        },
        //////////////////////////
        {
            name: "equal, position mode",
            program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
            input: 8,
            wantOutput: [1],
        },
        {
            name: "not equal, position mode",
            program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
            input: 7,
            wantOutput: [0],
        },
        {
            name: "equal, immediate mode",
            program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
            input: 8,
            wantOutput: [1],
        },
        {
            name: "not equal, immediate mode",
            program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
            input: 7,
            wantOutput: [0],
        },
        /////////////////////////
        {
            name: "less than, position mode",
            program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
            input: 7,
            wantOutput: [1],
        },
        {
            name: "not less than, position mode",
            program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
            input: 8,
            wantOutput: [0],
        },
        {
            name: "less than, immediate mode",
            program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
            input: 7,
            wantOutput: [1],
        },
        {
            name: "not less than, immediate mode",
            program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
            input: 8,
            wantOutput: [0],
        },
        /////////////////////////
        {
            name: "jump test, position mode",
            program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
            input: 0,
            wantOutput: [0],
        },
        {
            name: "jump test, position mode",
            program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
            input: 4,
            wantOutput: [1],
        },
        {
            name: "jump test, immediate mode",
            program: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
            input: 0,
            wantOutput: [0],
        },
        {
            name: "jump test, immediate mode",
            program: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
            input: 4,
            wantOutput: [1],
        },
        /////////////////////////////
        {
            name: "larger example, input < 8",
            program: largerProg,
            input: 7,
            wantOutput: [999],
        },
        {
            name: "larger example, input = 8",
            program: largerProg,
            input: 8,
            wantOutput: [1000],
        },
        {
            name: "larger example, input > 8",
            program: largerProg,
            input: 9,
            wantOutput: [1001],
        },
    ];

    const computer = new Computer();
    for (const testCase of testCases) {
        test(testCase.name, () => {
            computer.load(testCase.program);
            const out = computer.run(testCase.input);
            expect(out).toEqual(testCase.wantOutput);
        });
    }
});

describe("parseInstruction(code)", () => {
    const testCases = [
        { code: 1, want: { op: 1, pmodes: [0, 0, 0] } },
        { code: 99, want: { op: 99, pmodes: [0, 0, 0] } },
        { code: 1099, want: { op: 99, pmodes: [0, 1, 0] } },
        { code: 1002, want: { op: 2, pmodes: [0, 1, 0] } },
        { code: 102, want: { op: 2, pmodes: [1, 0, 0] } },
        { code: 11105, want: { op: 5, pmodes: [1, 1, 1] } },
        { code: 10001, want: { op: 1, pmodes: [0, 0, 1] } },
    ];

    for (const testCase of testCases) {
        test(`code=${testCase.code}`, () => {
            expect(parseInstruction(testCase.code)).toEqual(testCase.want);
        });
    }
});
