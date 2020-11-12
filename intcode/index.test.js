const { Computer, parseInstruction } = require("./index");

describe("run()-tests corresponding to day 2", () => {
    const testCases = [
        {
            program: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
            want: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
        },
        {
            program: [1, 0, 0, 0, 99],
            want: [2, 0, 0, 0, 99]
        },
        {
            program: [2, 3, 0, 3, 99],
            want: [2, 3, 0, 6, 99]
        },
        {
            program: [2, 4, 4, 5, 99, 0],
            want: [2, 4, 4, 5, 99, 9801]
        },
        {
            program: [1, 1, 1, 4, 99, 5, 6, 0, 99],
            want: [30, 1, 1, 4, 2, 5, 6, 0, 99]
        }
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
    const testCases = [
        {
            program: [3, 0, 4, 0, 99],
            input: 666,
            wantMemory: [666, 0, 4, 0, 99],
            wantOutput: [666]
        }
    ];

    const computer = new Computer();
    for (const testCase of testCases) {
        test("output is equal to input", () => {
            computer.load(testCase.program);
            const out = computer.run(testCase.input);
            expect(computer.memory).toEqual(testCase.wantMemory);
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
        { code: 10001, want: { op: 1, pmodes: [0, 0, 1] } }
    ];

    for (const testCase of testCases) {
        test(`code=${testCase.code}`, () => {
            expect(parseInstruction(testCase.code)).toEqual(testCase.want);
        });
    }
});
