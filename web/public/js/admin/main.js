"use strict";

// toggle-menu
document.getElementById("toggleSidebar").addEventListener("click", function (e) {
  e.preventDefault();
  let sidenavContent = document.getElementById('sidenavContent')
  if (sidenavContent.classList.contains('close-sidenav')) {
    sidenavContent.classList.remove("close-sidenav");
  } else {
    sidenavContent.classList.add("close-sidenav");
  }
});
