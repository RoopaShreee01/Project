let filedeleteId = null;

function deletefileId(id) {
  filedeleteId = id; //store the id in the deleteId
}

function deletefile() {
  const delfile = JSON.parse(localStorage.getItem("Files")) || [];
  const filterUser = delfile.filter((file) => file.id !== filedeleteId); // filter the deleteId from the local storage
  localStorage.setItem("Files", JSON.stringify(filterUser));
  alert("deleted");
  window.location.reload();
}
