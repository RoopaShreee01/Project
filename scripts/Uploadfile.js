function fileUpload(inputFile) {
  let file = inputFile.files[0];

  let label = prompt("enter a label for the file:", "New Upload");
  if (!label) label = "untitled";

  const fileEntries = {
    id: Number(new Date()),
    label: label,
    filename: file.name,
  };

  let files = JSON.parse(localStorage.getItem("Files")) || [];
  files.push(fileEntries);
  localStorage.setItem("Files", JSON.stringify(files));
}
