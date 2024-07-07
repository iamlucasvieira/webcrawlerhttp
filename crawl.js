const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
    console.log("🕷️ Crawling:", currentURL);

    try {
        const resp = await fetch(currentURL);

        if (!resp.ok) {
            console.error("❌ Error:", resp.statusText);
            return;
        }

        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.error("❌ Error: Not an HTML page");
            return;
        }

        console.log(await resp.text());
    } catch (e) {
        console.error("❌ Error:", e.message);
        return;
    }

    // console.log("🔍 Status:", resp.status);
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    dom.window.document.querySelectorAll("a").forEach((a) => {
        try {
            const url = new URL(a.href, baseURL);
            urls.push(url.href);
        } catch (e) {
            console.error("❌ Invalid URL:", a.href);
        }
    });
    return urls;
}

function normalizeURL(urlString) {
    const url = new URL(urlString);
    const hostPath = `${url.hostname}${url.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
};
