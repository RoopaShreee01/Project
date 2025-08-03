function fileUpload(inputFile) {
    let file = inputFile.files[0];
    if (!file) return;

    let label = prompt("Enter a label for the file:");
    if (!label) return;

    let reader = new FileReader();
    reader.onload = function () {
        let filesArray = JSON.parse(localStorage.getItem("Files")) || [];

        let fileId = Date.now();

        let fileDetails = {
            id: fileId,
            label: label,
            filename: file.name,
            data: reader.result
        };

        filesArray.push(fileDetails);
        localStorage.setItem("Files", JSON.stringify(filesArray));

        // Refresh the table with new file
        populateTable();
    };
    reader.readAsDataURL(file);
}

// Edit file label
function changeLabel(fileId) {
    let filesArray = JSON.parse(localStorage.getItem("Files")) || [];
    const index = filesArray.findIndex(f => f.id == fileId);
    if (index === -1) {
        alert("File not found.");
        return;
    }

    let newLabel = prompt("Enter a new label for the file:", filesArray[index].label);
    if (!newLabel) return;

    filesArray[index].label = newLabel;
    localStorage.setItem("Files", JSON.stringify(filesArray));

    populateTable(); // Refresh the table view
}

// Delete file
function deleteFile(fileId) {
    let filesArray = JSON.parse(localStorage.getItem("Files")) || [];
    filesArray = filesArray.filter(f => f.id != fileId);
    localStorage.setItem("Files", JSON.stringify(filesArray));
    populateTable();
}

// Load table on page load
function populateTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear table first

    const files = JSON.parse(localStorage.getItem("Files")) || [];
    files.forEach(file => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${file.label}</td>
            <td>${file.filename}</td>
            <td>
                <a href="#" onclick="changeLabel('${file.id}')">Edit</a>
                <a href="#" onclick="deleteFile('${file.id}')" class="text-danger ms-2">Delete</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Auto-load when page opens
window.onload = populateTable;