// Instructions for the computer
enum OpCode {
    Add = 1,
    Mult = 2,
    SaveInput = 3,
    Output = 4,
    Halt = 99,
}

// Parameter modes
enum PMode {
    Position = 0,
    Immediate = 1,
}

type IntProgram = number[];

class Computer {
    memory: IntProgram;
    ip: number; // Instruction pointer; current position in memory

    constructor() {
        this.memory = [];
        this.ip = 0;
    }

    load(program: IntProgram) {
        this.memory = program;
        this.ip = 0;
    }

    run() {
        const getAddresses = () => ({
            a: this.memory[this.ip + 1],
            b: this.memory[this.ip + 2],
            c: this.memory[this.ip + 3],
        });

        let opcode: OpCode;
        while ((opcode = this.memory[this.ip]) != OpCode.Halt) {
            const { a, b, c } = getAddresses();
            switch (opcode) {
                case OpCode.Add:
                    this.memory[c] = this.memory[a] + this.memory[b];
                    this.ip += 4;
                    break;
                case OpCode.Mult:
                    this.memory[c] = this.memory[a] * this.memory[b];
                    this.ip += 4;
                    break;
            }
        }
    }
}

module.exports = Computer;
