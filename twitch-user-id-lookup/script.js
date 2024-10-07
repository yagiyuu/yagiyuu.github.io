const lookupButton = document.getElementById("lookup");
const usernameInput = document.getElementById("username");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

lookupButton.addEventListener("click", async () => {
    const username = usernameInput.value.trim();
    if (!username) {
        showError("Please enter username");
        return;
    }

    lookupButton.disabled = true;
    lookupButton.textContent = "Loading...";
    resultDiv.style.display = "none";
    errorDiv.style.display = "none";

    try {
        const response = await fetch("https://gql.twitch.tv/gql", {
            method: "POST",
            headers: {
                "Client-ID": "kimne78kx3ncx6brgo4mv6wki5h1ko",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query {
                        user(login: "${username}") {
                            id
                        }
                    }
                `,
            }),
        });

        const data = await response.json();

        if (data.data.user) {
            showResult(`User ID: ${data.data.user.id}`);
        } else {
            showError("User not found");
        }
    } catch (err) {
        showError("An error occurred while fetching data");
    } finally {
        lookupButton.disabled = false;
        lookupButton.textContent = "Lookup";
    }
});

function showResult(message) {
    resultDiv.textContent = message;
    resultDiv.style.display = "block";
    errorDiv.style.display = "none";
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
    resultDiv.style.display = "none";
}