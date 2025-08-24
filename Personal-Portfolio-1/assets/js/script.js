'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (!modalImg || !modalTitle || !modalText) return;

    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text = this.querySelector("[data-testimonials-text]");

    if (avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt || '';
    }
    if (title) modalTitle.innerHTML = title.innerHTML;
    if (text) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


// ====== PROJECTS FILTER (SCOPED TO PROJECTS ARTICLE) ======
(function initProjectsFilter() {
  const projectsArticle = document.querySelector('article.projects');
  if (!projectsArticle) return;

  const filterBtns = projectsArticle.querySelectorAll('[data-filter-btn]');
  const items = projectsArticle.querySelectorAll('[data-filter-item]');

  const select = projectsArticle.querySelector('[data-select]');
  const selectValue = projectsArticle.querySelector('[data-selecct-value]');
  const selectItems = projectsArticle.querySelectorAll('[data-select-item]');

  const applyFilter = (value) => {
    const v = (value || 'all').toLowerCase().trim();
    items.forEach(li => {
      const cat = (li.dataset.category || '').toLowerCase().trim();
      if (v === 'all' || v === cat) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  };

  // top tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (selectValue) selectValue.textContent = btn.textContent;
      applyFilter(btn.textContent);
    });
  });

  // dropdown
  if (select) {
    select.addEventListener('click', () => select.classList.toggle('active'));
  }
  selectItems.forEach(opt => {
    opt.addEventListener('click', () => {
      const t = opt.textContent;
      if (selectValue) selectValue.textContent = t;
      if (select) select.classList.remove('active');

      // sync the top tabs visual state
      filterBtns.forEach(b => {
        b.classList.toggle('active', b.textContent.trim() === t.trim());
      });

      applyFilter(t);
    });
  });

  // default
  applyFilter('all');
})();


// contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const target = this.textContent.trim().toLowerCase();
    for (let j = 0; j < pages.length; j++) {
      const pageName = (pages[j].dataset.page || '').trim().toLowerCase();
      if (target === pageName) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j]?.classList.remove("active");
      }
    }
  });
}
