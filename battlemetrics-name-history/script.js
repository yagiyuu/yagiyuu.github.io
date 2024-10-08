const useridInput = document.getElementById("userid");
const lookupButton = document.getElementById("lookup");
const nameHistoryUl = document.getElementById("name-history");

lookupButton.addEventListener("click", async () => {
    const userid = useridInput.value.trim();
    if (!userid) {
        showError("Please enter userid");
        return;
    }

    lookupButton.disabled = true;
    lookupButton.textContent = "Loading...";
    while (nameHistoryUl.firstChild) {
        nameHistoryUl.firstChild.remove()
    }

    try {
        const response = await fetch(`https://api.battlemetrics.com/players/${userid}?include=identifier`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        const names = data.included
            .sort((a, b) => new Date(a.attributes.lastSeen) - new Date(b.attributes.lastSeen))
            .map((player) => player.attributes.identifier)
            .reverse();
        
        for (const name of names) {
            const li = document.createElement("li");
            li.textContent = name;
            nameHistoryUl.appendChild(li);
        }
    } catch (err) {
        showError(`An error occurred while fetching data: ${err}`);
    } finally {
        lookupButton.disabled = false;
        lookupButton.textContent = "Lookup";
    }
});

function showError(message) {
    const li = document.createElement("li");
    li.textContent = message;
    li.className = "error";
    nameHistoryUl.appendChild(li);
}