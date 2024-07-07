function sortPages(pages) {
    pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => b[1] - a[1]);
    return pagesArr;
}

function printReport(pages) {
    console.log("=====================================");
    console.log("📚 Report:");
    sortPages(pages).forEach(([url, count]) => {
        console.log(`- ${count}: ${url}`);
    });
    console.log("=====================================");
}

module.exports = { sortPages, printReport };
