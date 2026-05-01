// Sign-in functionality
let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
let userNameInput = document.getElementById("sign-in-username");
let passWordInput = document.getElementById("sign-in-password");
let confirmPasswordInput = document.getElementById("sign-in-confirm-password");

function getCurrentProfileData() {
  const savedUsername = localStorage.getItem("loggedInUser");
  let allProfiles = {};

  try {
    allProfiles = JSON.parse(localStorage.getItem("edufunProfileData")) || {};
  } catch (error) {
    allProfiles = {};
  }

  const profile = savedUsername ? allProfiles[savedUsername] || {} : {};
  const displayName = profile.displayName || savedUsername || "";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

  return {
    savedUsername,
    profileImage: localStorage.getItem("profileImage") || "",
    displayName,
    initials,
  };
}

function buildAvatarMarkup(profileState) {
  if (profileState.profileImage) {
    return `<span class="edufun-nav-avatar"><img src="${profileState.profileImage}" alt="${profileState.displayName}" /></span>`;
  }

  return `<span class="edufun-nav-avatar">${profileState.initials}</span>`;
}

function updateAccountNavigation() {
  const desktopLabel = document.getElementById("pn-UserlogIn");
  const mobileLabel = document.getElementById("UserlogIn");
  const desktopAccount = document.getElementById("account-page");
  const mobileAccount = document.getElementById("account-page-phn");
  const profileState = getCurrentProfileData();

  [
    { anchor: desktopAccount, label: desktopLabel },
    { anchor: mobileAccount, label: mobileLabel },
  ].forEach(({ anchor, label }) => {
    if (!anchor || !label) {
      return;
    }

    if (profileState.savedUsername) {
      anchor.href = getRootPath() + "pages/account.html";
      anchor.classList.add("edufun-avatar-trigger");
      label.innerHTML = buildAvatarMarkup(profileState);
      label.setAttribute("title", profileState.displayName);
    } else {
      anchor.href = getRootPath() + "pages/login.html";
      anchor.classList.remove("edufun-avatar-trigger");
      label.textContent = "Log In";
      label.removeAttribute("title");
    }
  });
}

function showAuthMessage(message, type) {
  const messageBox = document.getElementById("auth-message");
  const passwordError = document.getElementById("passwordError");

  if (passwordError) {
    passwordError.textContent = type === "error" ? message : "";
  }

  if (!messageBox) {
    return;
  }

  messageBox.textContent = message;
  messageBox.className = `auth-message ${type}`;
  messageBox.style.display = "block";
}

function clearAuthMessage() {
  const messageBox = document.getElementById("auth-message");
  const passwordError = document.getElementById("passwordError");

  if (passwordError) {
    passwordError.textContent = "";
  }

  if (messageBox) {
    messageBox.textContent = "";
    messageBox.className = "auth-message";
    messageBox.style.display = "none";
  }
}

function getRootPath() {
  const marker = "/pages/";
  const path = window.location.pathname;

  if (path.includes(marker)) {
    return path.split(marker)[0] + "/";
  }

  return path.substring(0, path.lastIndexOf("/") + 1);
}

function addData() {
  clearAuthMessage();
  let userName = userNameInput.value.trim();
  let pass = passWordInput.value.trim();
  let confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : pass;

  if (userName === "" || pass === "") {
    showAuthMessage("Please enter a username and password.", "error");
    return;
  }

  if (pass.length < 4) {
    showAuthMessage("Password should be at least 4 characters long.", "error");
    return;
  }

  if (pass !== confirmPassword) {
    showAuthMessage("Passwords do not match.", "error");
    return;
  }

  // Check if user already exists
  if (userInfo.some((user) => user.name === userName)) {
    showAuthMessage("Username already taken. Please choose another.", "error");
    return;
  }

  const userData = {
    name: userName,
    password: pass,
  };

  userInfo.push(userData);
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  console.log(userInfo);

  userNameInput.value = "";
  passWordInput.value = "";
  if (confirmPasswordInput) {
    confirmPasswordInput.value = "";
  }
  showAuthMessage("Sign-up successful. Redirecting to login page...", "success");
  setTimeout(() => {
    window.location.href = getRootPath() + "pages/login.html";
  }, 900);
}

// Log-in functionality
const logInUserName = document.getElementById("log-in-username");
const logInUserPassword = document.getElementById("log-in-password");

function login() {
  clearAuthMessage();
  let logInName = logInUserName.value.trim();
  let logInPassword = logInUserPassword.value.trim();

  if (logInName === "" || logInPassword === "") {
    showAuthMessage("Please enter your username and password.", "error");
    return;
  }

  let userFind = userInfo.find(
    (user) => user.name === logInName && user.password === logInPassword
  );

  console.log("User found:", userFind);

  if (userFind) {
    localStorage.setItem("loggedInUser", logInName); // Save the logged-in user
    showAuthMessage("Login successful. Redirecting to home page...", "success");
    setTimeout(() => {
      window.location.href = getRootPath() + "index.html";
    }, 800);
  } else {
    showAuthMessage("Login failed. Incorrect username or password.", "error");
  }

  logInUserName.value = "";
  logInUserPassword.value = "";
}

window.addEventListener("DOMContentLoaded", updateAccountNavigation);
