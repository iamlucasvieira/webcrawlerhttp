const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages", () => {
    const input = {
        "https://blog.lucas.dev/": 1,
        "https://blog.lucas.dev/path": 5,
        "https://blog.lucas.dev/path2": 3,
        "https://blog.lucas.dev/path3": 10,
    };
    const actual = sortPages(input);
    const expected = [
        ["https://blog.lucas.dev/path3", 10],
        ["https://blog.lucas.dev/path", 5],
        ["https://blog.lucas.dev/path2", 3],
        ["https://blog.lucas.dev/", 1],
    ];
    expect(actual).toEqual(expected);
});
