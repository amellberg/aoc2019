// Instructions and their corresponding opcodes
const Instr = {
    Add: 1,
    Mult: 2,
    SaveInput: 3,
    Output: 4,
    JumpIfTrue: 5,
    JumpIfFalse: 6,
    LessThan: 7,
    Equals: 8,
    Halt: 99
};

// Parameter modes
const PMode = {
    Position: 0, // Treat parameter as a pointer to another memory value
    Immediate: 1 // Treat parameter as a direct value
};

class Computer {
    constructor() {
        this.memory = [];
        this.ip = 0;
    }

    load(program) {
        this.memory = program;
        this.ip = 0;
    }

    run(input) {
        this.input = input;
        const output = [];
        let res;
        for (;;) {
            const { op, pmodes } = parseInstruction(this.memory[this.ip]);
            if (op === Instr.Halt) break;
            if ((res = this.exec(op, this.paramVals(pmodes))) !== undefined) {
                output.push(res);
            }
        }
        return output;
    }

    // Returns the three memory pointers corresponding to each parameter,
    // taking the parameter modes x, y, z into account. Some returned values
    // might be undefined (when the instruction pointer is close to the end of
    // the program), but they are never used by the corresponding instruction.
    paramVals([x, y, z]) {
        return {
            a: x === PMode.Position ? this.memory[this.ip + 1] : this.ip + 1,
            b: y === PMode.Position ? this.memory[this.ip + 2] : this.ip + 2,
            c: z === PMode.Position ? this.memory[this.ip + 3] : this.ip + 3
        };
    }

    // Executes the instruction corresponding to op, using the parameter values
    // a, b and c (which must already have been resolved using the correct
    // parameter mode).
    exec(op, { a, b, c }) {
        switch (op) {
            case Instr.Add:
                this.memory[c] = this.memory[a] + this.memory[b];
                this.ip += 4;
                return;
            case Instr.Mult:
                this.memory[c] = this.memory[a] * this.memory[b];
                this.ip += 4;
                return;
            case Instr.SaveInput:
                this.memory[a] = this.input;
                this.ip += 2;
                return;
            case Instr.Output:
                this.ip += 2;
                return this.memory[a];
            case Instr.JumpIfTrue:
                this.ip = this.memory[a] !== 0 ? this.memory[b] : this.ip + 3;
                return;
            case Instr.JumpIfFalse:
                this.ip = this.memory[a] == 0 ? this.memory[b] : this.ip + 3;
                return;
            case Instr.LessThan:
                this.memory[c] = this.memory[a] < this.memory[b] ? 1 : 0;
                this.ip += 4;
                return;
            case Instr.Equals:
                this.memory[c] = this.memory[a] === this.memory[b] ? 1 : 0;
                this.ip += 4;
                return;
        }
    }
}

// Helper function that returns the opcode and the parameter modes as an array,
// e.g. parseInstruction(10004) => { op: 4, pmodes: [0,0,1] }
function parseInstruction(code) {
    const op = code % 100;
    const pmodes = [];

    code = Math.trunc(code / 100);
    for (let i = 0; i < 3; i++) {
        pmodes.push(code % 10);
        code = Math.trunc(code / 10);
    }
    return { op, pmodes };
}

module.exports = { Computer, parseInstruction };
