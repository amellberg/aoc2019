const Computer = require("../intcode")

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
]

const computer = new Computer()
for (const testCase of testCases) {
    test(JSON.stringify(testCase.program), () => {
        computer.load(testCase.program)
        computer.run()
        expect(computer.memory).toEqual(testCase.want)
    })
}
