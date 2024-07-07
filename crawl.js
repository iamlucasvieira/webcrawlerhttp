const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentURL, pages) {
    baseUrl = new URL(baseUrl);
    currentURL = new URL(currentURL);

    if (baseUrl.hostname !== currentURL.hostname) {
        return pages;
    }

    const normalizedCurrentURL = normalizeURL(currentURL.href);
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1;

    console.log("🕷️ Crawling:", currentURL.href);

    try {
        const resp = await fetch(currentURL);

        if (!resp.ok) {
            console.error("❌ Error:", resp.statusText);
            return pages;
        }

        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.error("❌ Error: Not an HTML page");
            return pages;
        }

        const htmlBody = await resp.text();
        const urls = getURLsFromHTML(htmlBody, currentURL);

        for (const url of urls) {
            pages = await crawlPage(baseUrl, url, pages);
        }

        return pages;
    } catch (e) {
        console.error("❌ Error:", e.message);
        return pages;
    }
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
