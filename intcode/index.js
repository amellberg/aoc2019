// Opcodes for the computer
const Op = {
    Add: 1,
    Mult: 2,
    Halt: 99,
};

class Computer {
    constructor() {
        this.memory = []; // Holds an intcode program
        this.ip = 0; // Instruction pointer; current position in memory
    }

    load(program) {
        this.memory = program;
        this.ip = 0;
    }

    run() {
        const getAddresses = () => ({
            a: this.memory[this.ip + 1],
            b: this.memory[this.ip + 2],
            c: this.memory[this.ip + 3],
        });

        let opcode;
        while ((opcode = this.memory[this.ip]) != Op.Halt) {
            const { a, b, c } = getAddresses();
            switch (opcode) {
                case Op.Add:
                    this.memory[c] = this.memory[a] + this.memory[b];
                    this.ip += 4;
                    break;
                case Op.Mult:
                    this.memory[c] = this.memory[a] * this.memory[b];
                    this.ip += 4;
                    break;
            }
        }
    }
}

module.exports = Computer;
