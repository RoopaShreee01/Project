function loginValidation() {
  let loginEmail = document.getElementById("login-email-id").value;
  let loginPassword = document.getElementById("login-password-id").value;

  const logusers = {
    id: Number(new Date()),
    email: loginEmail,
    password: loginPassword,
  };

  let loginusers =
    JSON.parse(localStorage.getItem("regusersLocalstorage")) || [];

  let storage = JSON.parse(sessionStorage.getItem("loginStorage")) || [];

  if (loginEmail === "") {
    alert("Please fill your email - Email field is mandatory!");
    return false;
  } else if (loginPassword === "") {
    alert("Please enter Password - Password is mandatory!");
    return false;
  }

  const loginEmailExists = loginusers.find(
    (loginmail) => loginmail.email === loginEmail
  ); // check for the existance of email;

  if (loginEmailExists) {
    if (loginEmailExists.password === loginPassword) {
      const now = new Date();
      const loginDateTime = now.toLocaleString();
      logusers.loginDateTime = loginDateTime;
      storage.push(logusers);
      sessionStorage.setItem("Logindata", JSON.stringify(storage));
      return true;
    } else {
      alert("password mismatch");
      return false;
    }
  } else {
    alert("User not registered");
    return false;
  }
}
