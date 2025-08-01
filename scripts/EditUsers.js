function getUserIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function editUser() {
  const userId = getUserIdFromURL();
  const editedName = document.getElementById("editFullname").value;
  const editedEmail = document.getElementById("editEmail").value;

  const users = JSON.parse(localStorage.getItem("regusersLocalstorage")) || [];
  const userIndex = users.findIndex((j) => j.id === userId);
  const nameExist = users.find((k) => k.name == editedName); //change the name only if the enetered name doesnt exist in the localstorage
  const Emailexist = users.find((l) => l.email == editedEmail); //change the email only if the enetered email doesnt exist in the localstorage

  if (!(userIndex != -1 && nameExist && Emailexist)) {
    users[userIndex].name = editedName;
    users[userIndex].email = editedEmail;

    localStorage.setItem("regusersLocalstorage", JSON.stringify(users));
    alert("User updated successfully.");
    window.location.href = "./UserList.html"; // reload the page
  } else {
    alert("user name or email already available Please enter valid details");
    return false;
  }
}
