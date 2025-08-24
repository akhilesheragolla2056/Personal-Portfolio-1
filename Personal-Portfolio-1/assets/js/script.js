'use strict';

// =======================================================
// UTILITY FUNCTION
// =======================================================

// Helper function to toggle the 'active' class on an element
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// =======================================================
// SIDEBAR TOGGLE LOGIC
// =======================================================

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Add click event to the sidebar button if it exists
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// =======================================================
// MAIN PAGE NAVIGATION LOGIC (Switches between About, Resume, etc.)
// =======================================================

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  // Add click event listener to each main navigation link
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {

      const clickedPageName = this.innerHTML.toLowerCase().trim();

      // Deactivate all nav links and pages first
      for (let j = 0; j < pages.length; j++) {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }

      // Activate the link that was clicked
      this.classList.add("active");

      // Activate the corresponding page
      for (let j = 0; j < pages.length; j++) {
        if (pages[j].dataset.page === clickedPageName) {
          pages[j].classList.add("active");
        }
      }
    });
  }
}



// =======================================================
// PROJECTS PAGE FILTERING LOGIC (All, Web design, etc.)
// =======================================================

const filterBtns = document.querySelectorAll("[data-filter-btn]");
const projectItems = document.querySelectorAll("[data-filter-item]");

if (filterBtns.length > 0 && projectItems.length > 0) {
  let lastClickedFilterBtn = filterBtns[0];

  // Add a click event to all filter buttons
  for (let i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", function () {
      
      // Update the active state on the filter buttons
      lastClickedFilterBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedFilterBtn = this;

      const category = this.dataset.filter;

      // Show or hide project items based on the selected category
      for (let j = 0; j < projectItems.length; j++) {
        if (category === "all" || projectItems[j].dataset.category === category) {
          projectItems[j].classList.add("active");
        } else {
          projectItems[j].classList.remove("active");
        }
      }
    });
  }
}



// =======================================================
// MODAL LOGIC (The pop-up window for skills/testimonials)
// =======================================================

const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Function to toggle the modal
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// Add click event to all modal items
if (testimonialsItems.length > 0) {
  for (let i = 0; i < testimonialsItems.length; i++) {
    testimonialsItems[i].addEventListener("click", function () {
      if (modalImg && modalTitle && modalText) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        testimonialsModalFunc();
      }
    });
  }
}

// Add click event to modal close button and overlay
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}