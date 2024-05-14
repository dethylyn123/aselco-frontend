import { backendURL, successNotification, errorNotification } from "../utils/utils.js";

const form_contacts = document.getElementById("form_contacts");

form_contacts.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button
  document.querySelector("#form_contacts button[type = 'submit']").disabled = true;
  document.querySelector("#form_contacts button[type = 'submit']").innerHTML = 
  `<div class="col-sm-12 d-flex justify-content-center align-items-center">
      <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
      <b class="ms-2">Loading...</b>
  </div>`;

  //   Get values of form (input, textarea, select) put it as form-data
  const formData = new FormData(form_contacts);

  let response;

  response = await fetch(
    backendURL + "/api/contact",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
      body: formData,
    }
  );

  // Get response if 200-299 status code
  if (response.ok) {
    successNotification("Successfully sent message.", 10);
    // Reset Form
    form_contacts.reset();
  } 
  // Get response if 422 status code
  else if (response.status == 422) {
    const json = await response.json();
    errorNotification(json.message, 10);
  }
  
  document.querySelector("#form_contacts button[type='submit']").disabled = false;
  document.querySelector("#form_contacts button[type='submit']").innerHTML = "Submit";
};
