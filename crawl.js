const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    dom.window.document.querySelectorAll("a").forEach((a) => {
        const url = new URL(a.href, baseURL);
        urls.push(url.href);
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
};