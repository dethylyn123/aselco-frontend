// import router
import {setRouter} from "../router/router.js";

// Set Router
setRouter();


const backendURL = "https://ff9d-222-127-16-227.ngrok-free.app/Aselco-Backend/public";
//http://aselco-backend.test
let userId;

// Get Logged User Profile Name
async function getLoggedUser(){

    // Access User Profile API Endpoint
    const response = await fetch(
      backendURL + "/api/profile/show",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
      }
    );
  
  // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
      console.log(json);

      // FULL NAME
      // Using getElementsByClassName instead of getElementById
      const userLoggedNameElements = document.getElementsByClassName("user_logged_name");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedNameElements.length; i++) {
          userLoggedNameElements[i].innerHTML = json.firstname + " " + json.lastname;
      }

      // Display user's image
      const imagePath = backendURL + "/storage/" + json.image;
      // Using getElementsByClassName instead of getElementById
      const userLoggedImageElements = document.getElementsByClassName("user_logged_image");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedImageElements.length; i++) {
          userLoggedImageElements[i].src = imagePath;
      }

      // ROLE
      // Using getElementsByClassName instead of getElementById
      const userLoggedRoleElements = document.getElementsByClassName("user_logged_role");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedRoleElements.length; i++) {
        const element = userLoggedRoleElements[i];
        element.innerHTML = element.value = json.role;
      }

      // FIRSTNAME
      // Using getElementsByClassName instead of getElementById
      const userLoggedFirstNameElements = document.getElementsByClassName("user_logged_firstname");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedFirstNameElements.length; i++) {
        const element = userLoggedFirstNameElements[i];
        element.innerHTML = element.value = json.firstname;
      }

      // LASTNAME
      // Using getElementsByClassName instead of getElementById
      const userLoggedLastNameElements = document.getElementsByClassName("user_logged_lastname");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedLastNameElements.length; i++) {
        const element = userLoggedLastNameElements[i];
        element.innerHTML = element.value = json.lastname;
      }

      // EMAIL
      // Using getElementsByClassName instead of getElementById
      const userLoggedEmailElements = document.getElementsByClassName("user_logged_email");

      // Loop through all elements with the given class
      for (let i = 0; i < userLoggedEmailElements.length; i++) {
        const element = userLoggedEmailElements[i];
        element.innerHTML = element.value = json.email;
      }

      // USER ID
      // Sets value to the input field with id "user_id"
      if (document.getElementById("user_id")) {
        document.getElementById("user_id").value = json.id;
      }

      userId = json.id;
      return userId;
      console.log(userId);
      // Uncomment if necessary; Used when getELementById
      // user_id = document.getElementById("user_logged_id").innerHTML = json.id;
      
    }

  // Get response if 400 or 500 status code
    else {
      const json = await response.json();
  
      errorNotification(json.message, 10);
  
    }
};

// Show Nav Admin Pages
function showNavAdminPages() {
  if (localStorage.getItem("role") == "Admin") {
   document.getElementById("nav_admin_pages").innerHTML = 
    `<div class="sb-sidenav-menu-heading">Admin Pages</div>
    <a class="nav-link" href="users.html">
        <div class="sb-nav-link-icon"><i class="fa-solid fa-user"></i></div>
        Users
    </a>`;
  }
}

// Notifications
function successNotification(message, seconds = 0){
  const successAlert = document.querySelector(".alert-success");
  if (successAlert) {
      successAlert.classList.remove('d-none');
      successAlert.classList.add('d-block');
      successAlert.innerHTML = message;

      if (seconds != 0) {
          setTimeout(function () {
              successAlert.classList.remove('d-block');
              successAlert.classList.add('d-none');
          }, seconds * 1000);
      }
  } else {
      console.error("Error: .alert-success element not found");
  }
}

function errorNotification(message, seconds = 0){
  const errorAlert = document.querySelector(".alert-danger");
  if (errorAlert) {
      errorAlert.classList.remove('d-none');
      errorAlert.classList.add('d-block');
      errorAlert.innerHTML = message;

      if (seconds != 0) {
          setTimeout(function () {
              errorAlert.classList.remove('d-block');
              errorAlert.classList.add('d-none');
          }, seconds * 1000);
      }
  } else {
      console.error("Error: .alert-danger element not found");
  }
}


export { backendURL, showNavAdminPages, successNotification, errorNotification, getLoggedUser, userId
};