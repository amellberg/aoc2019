// Numeric version
/*
function hasTwoAdjacent(num) {
    let prev = -1;
    while (num > 0) {
        const r = num % 10;
        if (r === prev) break;
        num = Math.trunc(num / 10);
        prev = r;
    }
    return num > 0;
}
*/

// Regexp version (I prefer this one)
function hasTwoAdjacent(num) {
    // Match any digit followed by one or more of the same
    const pattern = /(\d)\1+/; // No need for global flag
    return pattern.test(num.toString());
}

// For part 2
function hasExactlyTwoAdj(num) {
    let matches = 1;
    let prev = -1;
    while (num > 0) {
        const r = num % 10;
        if (r === prev) {
            matches++;
        } else if (matches === 2) {
            return true;
        } else {
            matches = 1;
        }
        num = Math.trunc(num / 10);
        prev = r;
    }
    return num === 0 && matches === 2;
}

function isNonDecreasing(num) {
    let prev = 10; // Or any number > 9
    while (num > 0) {
        const r = num % 10;
        if (r > prev) break; // Strictly decreasing digit pair found
        num = Math.trunc(num / 10);
        prev = r;
    }
    return num === 0;
}

function main() {
    let [numPassw1, numPassw2] = [0, 0];
    for (let k = 347312; k <= 805915; k++) {
        if (isNonDecreasing(k)) {
            if (hasTwoAdjacent(k)) numPassw1++;
            if (hasExactlyTwoAdj(k)) numPassw2++;
        }
    }
    console.log("Part 1:", numPassw1);
    console.log("Part 2:", numPassw2);
}

if (require.main === module) {
    main();
}

module.exports = { hasTwoAdjacent, hasExactlyTwoAdj, isNonDecreasing };
