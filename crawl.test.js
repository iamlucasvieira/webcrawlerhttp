const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
    const input = "https://blog.lucas.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.lucas.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL strip slash", () => {
    const input = "https://blog.lucas.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.lucas.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
    const input = "https://BLOG.lucas.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.lucas.dev/path";
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
    let inputHTMLBody = `
<html>
        <body>
            <a href="https://blog.lucas.dev/path/">Blog</a>
            <a href="https://blog.lucas.dev/path2">Blog2</a>
        </body>
</html>
`;
    const inputBaseURL = "https://blog.lucas.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        "https://blog.lucas.dev/path/",
        "https://blog.lucas.dev/path2",
    ];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
    let inputHTMLBody = `
<html>
        <body>
            <a href="/path/">Blog</a>
            <a href="/path2">Blog2</a>
        </body>
</html>
`;
    const inputBaseURL = "https://blog.lucas.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        "https://blog.lucas.dev/path/",
        "https://blog.lucas.dev/path2",
    ];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML mixed", () => {
    let inputHTMLBody = `
<html>
        <body>
            <a href="/path/">Blog</a>
            <a href="https://blog.lucas.dev/path2">Blog2</a>
        </body> 
</html>
`;
    const inputBaseURL = "https://blog.lucas.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        "https://blog.lucas.dev/path/",
        "https://blog.lucas.dev/path2",
    ];
    expect(actual).toEqual(expected);
});
