function setRouter() {
    switch (window.location.pathname) {
        // If you are logged in you cant access outside pages
        case "/login.html":
        case "/index.html":
        case "/":
            if (localStorage.getItem("token")) {
                window.location.pathname = "/dashboard.html"
            }
            break;
        // If you are not logged in you can't access dashboard pages
        case "/dashboard.html":
            if (!localStorage.getItem("token")) {
                window.location.pathname = "/login.html";
            }
            break;
    }
}

export {setRouter};