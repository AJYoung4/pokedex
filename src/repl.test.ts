import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: " hello world ",
        expected: ["hello", "world"],
    },
     {
        input: " hello   ",
        expected: ["hello"],
    },
     {
        input: " hello world ",
        expected: ["hello", "world"],
    },
    {
        input: "BULBASAUR charizard PiKaChU",
        expected: ["bulbasaur", "charizard", "pikachu"],
    },
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});