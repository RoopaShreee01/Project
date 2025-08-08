document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const fileId = urlParams.get("fileId");

  // Get all registered users
  const users = JSON.parse(localStorage.getItem("regusersLocalstorage")) || [];
  const currentUser = (JSON.parse(sessionStorage.getItem("Logindata")) || [])[0]?.email;

  // Filter out current user
  const otherUsers = users.filter((u) => u.email !== currentUser);

  // Populate user list as a single-select dropdown
  const userListDiv = document.getElementById("userList");
  const select = document.createElement("select");
  select.className = "form-select";
  select.id = "userSelect";
  select.multiple = false; // Single select

  // Add a default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Select user to share with --";
  select.appendChild(defaultOption);

  otherUsers.forEach((u) => {
    const option = document.createElement("option");
    option.value = u.email;
    option.textContent = u.email;
    select.appendChild(option);
  });
  userListDiv.appendChild(select);

  // Handle form submit
  document.getElementById("shareForm").onsubmit = function (e) {
    e.preventDefault();
    const selected = select.value;
    if (!selected) {
      alert("Please select a user to share with.");
      return;
    }
    let files = JSON.parse(localStorage.getItem("Files")) || [];
    const idx = files.findIndex((f) => f.id == fileId);
    if (idx !== -1) {
      files[idx].shared = true;
      files[idx].sharedWith = [selected];
      files[idx].sharedBy = currentUser;
      localStorage.setItem("Files", JSON.stringify(files));

      // Store only minimal info for the shared user
      const sharedKey = `sharedFiles_${selected}`;
      let sharedFiles = JSON.parse(localStorage.getItem(sharedKey)) || [];
      // Avoid duplicates
      if (!sharedFiles.some(f => f.id == files[idx].id)) {
        sharedFiles.push({
          id: files[idx].id,
          label: files[idx].label,
          filename: files[idx].filename,
          sharedBy: currentUser
        });
        localStorage.setItem(sharedKey, JSON.stringify(sharedFiles));
      }
    }
    window.location.href = "Documentlist.html";
  };
});
