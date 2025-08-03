// Helper to get current user email
function getCurrentUserEmail() {
  const loginusers = JSON.parse(sessionStorage.getItem("Logindata")) || [];
  return loginusers.length > 0 ? loginusers[0].email : "unknown@unknown.com";
}

// My Uploads table
function populateTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  const files = JSON.parse(localStorage.getItem("Files")) || [];
  const currentUser = getCurrentUserEmail();
  files
    .filter((f) => f.uploadedBy === currentUser)
    .forEach((file) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${file.label}</td>
                    <td>${file.filename}</td>
                    <td>
                        <a href="#" onclick="changeLabel('${file.id}')">Edit</a> |
                        <a href="#" onclick="deleteFile('${file.id}')">Delete</a> |
                        <a href="#" onclick="openShareDialog('${file.id}')">Share</a>
                    </td>
                `;
      tableBody.appendChild(row);
    });
}

// Shared Uploads table
function populateSharedTable() {
  const sharedTableBody = document.getElementById("sharedTableBody");
  sharedTableBody.innerHTML = "";
  const files = JSON.parse(localStorage.getItem("Files")) || [];
  files
    .filter((f) => f.shared === true)
    .forEach((file) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${file.label}</td>
                    <td>${file.filename}</td>
                    <td>${file.sharedBy || file.uploadedBy}</td>
                `;
      sharedTableBody.appendChild(row);
    });
}

// Share file
function shareFile(fileId) {
  let files = JSON.parse(localStorage.getItem("Files")) || [];
  const idx = files.findIndex((f) => f.id == fileId);
  if (idx !== -1) {
    files[idx].shared = true;
    localStorage.setItem("Files", JSON.stringify(files));
    populateSharedTable();
  }
}

// Edit label
function changeLabel(fileId) {
  let files = JSON.parse(localStorage.getItem("Files")) || [];
  const idx = files.findIndex((f) => f.id == fileId);
  if (idx !== -1) {
    const newLabel = prompt(
      "Enter a new label for the file:",
      files[idx].label
    );
    if (newLabel && newLabel.trim() !== "") {
      files[idx].label = newLabel.trim();
      localStorage.setItem("Files", JSON.stringify(files));
      populateTable();
      populateSharedTable();
    }
  }
}

// Delete file
function deleteFile(fileId) {
  let files = JSON.parse(localStorage.getItem("Files")) || [];
  files = files.filter((f) => f.id != fileId);
  localStorage.setItem("Files", JSON.stringify(files));
  populateTable();
  populateSharedTable();
}

// Upload file
function fileUpload(inputFile) {
  let file = inputFile.files[0];
  if (!file) return;
  let label = prompt("Enter a label for the file:");
  if (!label) return;
  let reader = new FileReader();
  reader.onload = function () {
    let filesArray = JSON.parse(localStorage.getItem("Files")) || [];
    let fileId = Date.now();
    let uploadedBy = getCurrentUserEmail();
    let fileDetails = {
      id: fileId,
      label: label,
      filename: file.name,
      data: reader.result,
      uploadedBy: uploadedBy,
      shared: false,
    };
    filesArray.push(fileDetails);
    localStorage.setItem("Files", JSON.stringify(filesArray));
    populateTable();
  };
  reader.readAsDataURL(file);
  // Reset file input so same file can be uploaded again if needed
  inputFile.value = "";
}

// Initial load
window.onload = function () {
  populateTable();
  populateSharedTable();
};
