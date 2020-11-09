const {
    hasTwoAdjacent,
    hasExactlyTwoAdj,
    isNonDecreasing,
} = require("./day04");

describe("hasTwoAdjacent(num)", () => {
    test.each([
        [1, false],
        [1337, true],
        [13337, true],
        [122345, true],
        [12345, false],
        [221249, true],
        [21299, true],
        [221299, true],
        [101010, false],
        [101001, true],
        [100, true],
        [1000, true],
    ])("num = %p returns %p", (num, want) => {
        expect(hasTwoAdjacent(num)).toBe(want);
    });
});

describe("hasExactlyTwoAdj(num)", () => {
    test.each([
        [1, false],
        [1337, true],
        [13337, false],
        [122345, true],
        [12345, false],
        [221249, true],
        [22124999, true],
        [111122, true],
        [21299, true],
        [2221299, true],
        [101010, false],
        [1010001, false],
        [100, true],
        [1000, false],
    ])("num = %p returns %p", (num, want) => {
        expect(hasExactlyTwoAdj(num)).toBe(want);
    });
});

describe("isNonDecreasing(num)", () => {
    test.each([
        [1, true],
        [1337, true],
        [122345, true],
        [12345, true],
        [221249, false],
        [21299, false],
        [223450, false],
        [221299, false],
        [101010, false],
        [111111, true],
        [10, false],
        [100, false],
        [1000, false],
        [135679, true],
    ])("num = %p returns %p", (num, want) => {
        expect(isNonDecreasing(num)).toBe(want);
    });
});
