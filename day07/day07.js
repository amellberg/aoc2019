const fs = require("fs");
const intcode = require("../intcode");

function permutations(arr) {
    if (arr.length === 0) return [[]];
    return arr.flatMap(x =>
        permutations(arr.filter(y => y !== x)).map(P => [x, ...P])
    );
}

const computer = new intcode.Computer();
 
function runAmplifier(program, phaseSetting, inputValue) {
    computer.load(program);
    const output = computer.run(phaseSetting, inputValue);
    console.assert(output.length === 1);
    return output[0];
}

function computeSignal(program, phaseSeq) {
    let prevOut = 0; // Output signal from previous amplifier
    for (const phaseSetting of phaseSeq) {
        prevOut = runAmplifier(program, phaseSetting, prevOut);
    }
    return prevOut;
}

function main(inputFile) {
    const inputData = fs.readFileSync(inputFile, "utf-8");
    const program = inputData.split(",").map(Number);

    const signals = permutations([0, 1, 2, 3, 4]).map(phaseSeq => ({
        signal: computeSignal(program, phaseSeq),
        seq: phaseSeq,
    }));
    console.log("Max signal and corresponding phase sequence:");
    console.log(
        signals.reduce((acc, x) => (x.signal > acc.signal ? x : acc), {
            signal: 0,
            seq: null,
        })
    );
}

if (require.main === module) {
    main("input.txt");
}

module.exports = { computeSignal };
