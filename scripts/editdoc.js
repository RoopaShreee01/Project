function Changelabel(fileid) {
  const fileidcheck = fileid;

  let editfilelabel = JSON.parse(localStorage.getItem("Files")) || [];
  const index = editfilelabel.findIndex((f) => f.id == fileidcheck);
  let modifylabel = prompt("enter a new label for the file:", "edit file name");

  editfilelabel[index].label = modifylabel;
  localStorage.setItem("File", JSON.stringify(editfilelabel));
  window.location.href = './Documentlist.html'; // reload the page
  return true;
}
