let deleteId = null;

function deleteUserId(id) {
  deleteId = id; //store the id in the deleteId
}

function deleteUser() {
  const deletefile = JSON.parse(localStorage.getItem("Files")) || [];
  const filterfile = deletefile .filter((user) => user.id !== deleteId); // filter the deleteId from the local storage
  localStorage.setItem("File", JSON.stringify(filterfile));
  alert("deleted");
  window.location.reload();
}
