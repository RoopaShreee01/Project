let deleteId = null;

function deleteUserId(id) {
  deleteId = id; //store the id in the deleteId
}

function deleteUser() {
  const users = JSON.parse(localStorage.getItem("regusersLocalstorage")) || [];
  const filterUser = users.filter((user) => user.id !== deleteId); // filter the deleteId from the local storage
  localStorage.setItem("regusersLocalstorage", JSON.stringify(filterUser));
  alert("deleted");
  window.location.reload();
}
