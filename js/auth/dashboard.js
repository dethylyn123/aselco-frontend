// To see errors in console using JavaScript
// "use strict";
import { backendURL, showNavAdminPages, successNotification, errorNotification, getLoggedUser } from "../utils/utils.js";

// Logout Btn
const btn_logout = document.getElementById("btn_logout");

// Add event listener to the logout button
btn_logout.addEventListener("click", async () => {
    // Access Logout API Endpoint
    const response = await fetch(
        backendURL + "/api/logout", {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
                "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
            },
        }
    );

    // Get response if 200-299 status code
    if (response.ok) {
        // Clear Tokens
        localStorage.clear();

        successNotification("Logout Successfully.");

        location.reload();

        // Redirect Page
        window.location.pathname = "/login.html";


    }
    // Get response if 400 or 500 status code
    else {
        const json = await response.json();

        errorNotification(json.message, 10);
    }
});
