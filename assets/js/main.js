document.addEventListener("DOMContentLoaded", function () {
  // Dropdown
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const menu = dropdown.querySelector(".dropdown-menu");

    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click from propagating to the window listener

      const isOpen = menu.style.display === "block";

      // Close all open dropdowns
      document.querySelectorAll(".dropdown").forEach((d) => {
        d.classList.remove("active");
        d.querySelector(".dropdown-menu").style.display = "none";
        d.querySelector("button").classList.remove("active");
      });

      // Open the clicked dropdown if it was closed
      if (!isOpen) {
        menu.style.display = "block";
        button.classList.add("active");
        dropdown.classList.add("active");
      }
    });
  });

  // Close dropdowns if clicked outside
  window.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
      dropdown.querySelector(".dropdown-menu").style.display = "none";
      dropdown.querySelector("button").classList.remove("active");
    });
  });

  // Open & Close side-menu
  document.querySelectorAll(".open-side-menu").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".side-menu").classList.toggle("active");
    });
  });

  // Open & Close aside-nav
  document.querySelectorAll(".open-aside-nav").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".aside-nav").classList.toggle("active");
    });
  });

  // Open & Close links-aside
  document.querySelectorAll(".edit-links-aside").forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      item.classList.toggle("active");
      document.querySelector(".links-aside").classList.toggle("active");
    });
  });

  // Aside links
  document.querySelectorAll(".links-aside").forEach((aside) => {
    aside.querySelectorAll(".link").forEach((link) => {
      const submenu = link.querySelector(".sub-menu");
      const viewIcon = link.querySelector(".view");

      const dragHandle = link.querySelector(".drag-handle");

      // Allow dragging only when clicking the handle
      dragHandle.addEventListener("mousedown", () => {
        link.setAttribute("draggable", "true");
      });

      dragHandle.addEventListener("mouseup", () => {
        link.setAttribute("draggable", "false");
      });

      link.addEventListener("dragstart", (e) => {
        draggedItem = link;
        setTimeout(() => {
          link.style.opacity = "0";
          link.style.visibility = "hidden";
        }, 0);
      });

      link.addEventListener("dragend", () => {
        setTimeout(() => {
          draggedItem.style.opacity = "1";
          draggedItem.style.visibility = "visible";
          draggedItem = null;
        }, 0);
      });

      link.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      link.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedItem !== link) {
          const bounding = link.getBoundingClientRect();
          const offset = e.clientY - bounding.top;
          if (offset > bounding.height / 2) {
            link.insertAdjacentElement("afterend", draggedItem);
          } else {
            link.insertAdjacentElement("beforebegin", draggedItem);
          }
        }
      });

      // Toggle submenu on click
      link.addEventListener("click", (event) => {
        if (submenu) {
          link.classList.toggle("open");
        }
        event.stopPropagation(); // Prevent event from bubbling
      });

      // Handle view icon click
      if (viewIcon) {
        viewIcon.addEventListener("click", (event) => {
          link.classList.toggle("view-box");
          event.stopPropagation(); // Prevent event from bubbling
        });
      }

      // Manage submenu interactions
      if (submenu) {
        submenu.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent event from bubbling
        });

        // Manage view icons in the submenu
        submenu.querySelectorAll("li").forEach((item) => {
          const viewIconSub = item.querySelector(".view");
          if (viewIconSub) {
            viewIconSub.addEventListener("click", (event) => {
              item.classList.toggle("view-box-sub");
              event.stopPropagation(); // Prevent event from bubbling
            });
          }
        });
      }
    });
  });
});
