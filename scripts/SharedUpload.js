// Open share dialog for a file
function openShareDialog(fileId) {
    // Get all registered users (assuming stored in localStorage as "loginusers")
    const users = JSON.parse(localStorage.getItem("loginusers")) || [];
    const currentUser = (JSON.parse(sessionStorage.getItem("Logindata")) || [])[0]?.email;

    // Filter out current user from the list
    const otherUsers = users.filter(u => u.email !== currentUser);

    // Build a prompt with checkboxes (simple HTML prompt)
    let userList = otherUsers.map((u, i) =>
        `<div><input type="checkbox" id="user_${i}" value="${u.email}"> ${u.email}</div>`
    ).join('');
    const dialogHtml = `
        <div id="shareDialog" style="background:#fff;color:#222;padding:20px;border-radius:8px;max-width:350px;">
            <h5>Select users to share with:</h5>
            ${userList}
            <button id="shareConfirmBtn" class="btn btn-primary btn-sm mt-2">Share</button>
            <button id="shareCancelBtn" class="btn btn-secondary btn-sm mt-2 ms-2">Cancel</button>
        </div>
    `;

    // Create overlay
    let overlay = document.createElement("div");
    overlay.id = "shareOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.innerHTML = dialogHtml;
    document.body.appendChild(overlay);

    // Cancel button
    document.getElementById("shareCancelBtn").onclick = function () {
        document.body.removeChild(overlay);
    };

    // Confirm button
    document.getElementById("shareConfirmBtn").onclick = function () {
        // Get selected users
        const selected = [];
        otherUsers.forEach((u, i) => {
            if (document.getElementById(`user_${i}`).checked) {
                selected.push(u.email);
            }
        });
        if (selected.length === 0) {
            alert("Please select at least one user to share with.");
            return;
        }
        // Update file's sharedWith and sharedBy
        let files = JSON.parse(localStorage.getItem("Files")) || [];
        const idx = files.findIndex(f => f.id == fileId);
        if (idx !== -1) {
            files[idx].shared = true;
            files[idx].sharedWith = selected;
            files[idx].sharedBy = currentUser;
            localStorage.setItem("Files", JSON.stringify(files));
        }
        document.body.removeChild(overlay);

        // Optionally, refresh shared uploads table if present
        if (typeof populateSharedTable === "function") {
            populateSharedTable();
        }
    };
}