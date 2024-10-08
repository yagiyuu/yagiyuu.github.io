const urlListUl = document.getElementById("urlList");
const loadingMessageDiv = document.getElementById("loadingMessage");

const fetchSitemap = async () => {
    try {
        const response = await fetch("https://yagiyuu.github.io/sitemap.xml", {
            method: "GET",
            headers: {
                "Content-Type": "application/xml"
            }
        });
        const xmlContent = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
        const urls = xmlDoc.getElementsByTagName("loc");

        for (const url of urls) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = url.textContent;
            a.href = url.textContent;
            a.target = "_blank";
            li.appendChild(a);
            urlListUl.appendChild(li);
        }
    } catch (err) {
        const li = document.createElement("li");
        li.textContent = `An error occurred: ${err}`;
        urlListUl.appendChild(li);
    } finally {
        loadingMessageDiv.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", fetchSitemap);