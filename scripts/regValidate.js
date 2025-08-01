function regValidation() {
  let regName = document.getElementById("full-name-id").value;
  let regEmail = document.getElementById("email-id").value;
  let regpassword = document.getElementById("pwd-id").value;
  let regConfirmPassword = document.getElementById("confirmpwd-id").value;

  const regusers = {
    id: Number(new Date()),
    name: regName,
    email: regEmail,
    password: regpassword,
  };
  let users = localStorage.getItem("regusersLocalstorage")
    ? JSON.parse(localStorage.getItem("regusersLocalstorage"))
    : []; // ternary operator

  if (regName === "") {
    alert("Please fill your name");
    return false;
  } else if (regEmail === "") {
    alert("Please enter Email");
    return false;
  } else if (regpassword === "") {
    alert("Please enter the Password");
    return false;
  } else if (regConfirmPassword === "") {
    alert("Please confirm Password");
    return false;
  } else if (regConfirmPassword != regpassword) {
    alert("Confirm password should match the actual password");
    return false;
  }

  const nameExists = users.some((user) => user.name === regName); // checking only if the user name is matching
  const emailExists = users.some((usermail) => usermail.email === regEmail); // checking only if the email is matching
  if (nameExists) {
    alert("This name is already registered!");
    return false;
  } else if (emailExists) {
    alert("This email is already registered in another user name!");
    return false;
  } else {
    // Add new name
    users.push(regusers);
    localStorage.setItem("regusersLocalstorage", JSON.stringify(users));
    return true; // key and value pair
  }
}
