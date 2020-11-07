const { readFileSync } = require("fs");
const Computer = require("../intcode");

function findInput(computer, initProgram, target) {
    let noun, verb;
    for (noun = 0; noun <= 99; noun++) {
        for (verb = 0; verb <= 99; verb++) {
            computer.load([...initProgram]);
            computer.memory[1] = noun;
            computer.memory[2] = verb;
            computer.run();
            if (computer.memory[0] === target) {
                return { noun, verb };
            }
        }
    }
}

function main(fileName) {
    const input = readFileSync(fileName, "utf-8");
    const program = input.trimEnd().split(",").map(Number);

    const c = new Computer();
    const { noun = null, verb = null } = findInput(c, program, 19690720) || {};
    if (noun !== null) {
        console.log(`noun=${noun}`, `verb=${verb} =>`, 100 * noun + verb);
    }
}

// Execute main only if the file is run from the terminal.
if (require.main === module) {
    main("input.txt");
}
