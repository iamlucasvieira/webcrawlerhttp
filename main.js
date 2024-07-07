const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

function main() {
    const expectedLength = 3;
    const actualLength = process.argv.length;
    if (actualLength !== expectedLength) {
        console.log("Usage: node main.js <website-url>");
        console.error(
            `\n😢 Expected ${expectedLength - 2} argument, but got ${actualLength - 2}.`,
        );
        process.exit(1);
    }

    const url = process.argv[2];
    console.log("Crawling website:", url);
    // Iterate over the pages object and log the pages
    crawlPage(url, url, {}).then((pages) => {
        printReport(pages);
    });
}

main();
