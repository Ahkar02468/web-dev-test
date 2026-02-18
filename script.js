document.addEventListener("DOMContentLoaded", () => {
  // --- Sticky Header & Logo Shrink ---
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.querySelector(".mobile-toggle");
  const mobileCloseBtn = document.querySelector(".mobile-close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuLinks = document.querySelectorAll(
    ".mobile-menu a:not(.mobile-signin):not(.mobile-cart)",
  ); // Avoid closing on actions? Actually maybe close on nav links.

  function openMenu() {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
    mobileBtn.setAttribute("aria-label", "Close Menu");
  }

  function closeMenu() {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
    mobileBtn.setAttribute("aria-label", "Open Menu");
  }

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("active");
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close button inside the menu
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener("click", closeMenu);
    }

    // Close on link click (nav items)
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  // --- Mobile Editorial Submenu ---
  const editorialToggle = document.querySelector(".editorial-toggle");
  const mobileSubmenu = document.querySelector(".mobile-submenu");

  if (editorialToggle && mobileSubmenu) {
    editorialToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = editorialToggle.getAttribute("aria-expanded") === "true";
      editorialToggle.setAttribute("aria-expanded", !expanded);
      mobileSubmenu.classList.toggle("open");
      editorialToggle.classList.toggle("active");
    });
  }

  // --- FAQ Tabs & Accordion ---
  const tabBtns = document.querySelectorAll(".tab-btn");
  const faqItems = document.querySelectorAll(".accordion-item");

  // Initial State: Show All
  filterFAQs("all");

  // Tab Click Event
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active from all tabs
      tabBtns.forEach((b) => b.classList.remove("active"));
      // Add active to clicked
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      filterFAQs(category);
    });
  });

  function filterFAQs(category) {
    faqItems.forEach((item) => {
      // Reset state
      const trigger = item.querySelector(".accordion-trigger");
      trigger.setAttribute("aria-expanded", "false");
      item.querySelector(".accordion-content").style.height = "0";

      // Show/Hide logic
      if (
        category === "all" ||
        item.getAttribute("data-category") === category
      ) {
        item.style.display = "block";
        // Small animation delay could go here for polish
      } else {
        item.style.display = "none";
      }
    });
  }

  // Accordion Interaction
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close others (Accordion behavior)
      accordionTriggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute("aria-expanded", "false");
          otherTrigger.nextElementSibling.style.height = "0";
        }
      });

      // Toggle current
      trigger.setAttribute("aria-expanded", !isExpanded);
      const content = trigger.nextElementSibling;

      if (!isExpanded) {
        content.style.height = content.scrollHeight + "px";
      } else {
        content.style.height = "0";
      }
    });
  });

  // Resize Handler for Accordion Heights
  window.addEventListener("resize", () => {
    accordionTriggers.forEach((trigger) => {
      if (trigger.getAttribute("aria-expanded") === "true") {
        const content = trigger.nextElementSibling;
        content.style.height = "auto";
        setTimeout(() => {
          content.style.height = content.scrollHeight + "px";
        }, 10);
      }
    });
  });

  // --- Hero Text Cutout Animation ---
  const heroTextWrapper = document.getElementById("heroTextWrapper");
  const textClip = document.getElementById("textClip");

  if (heroTextWrapper && textClip) {
    const textElement = textClip.querySelector("text");

    function handleHeroText() {
      const windowWidth = window.innerWidth;

      if (windowWidth > 768) {
        // Desktop: Animate on scroll
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;

        const animationRange = windowHeight * 0.8;
        let progress = scrolled / animationRange;
        if (progress > 1) progress = 1;
        if (progress < 0) progress = 0;

        const startSize = 300;
        const startSpacing = 20;
        const endSize = 60;
        const endSpacing = 2;

        const headerHeight = 80;
        const gapBelowHeader = 60;
        const startY = headerHeight + gapBelowHeader + startSize * 0.4;
        const endY = headerHeight + endSize * 0.4;

        const currentSize = startSize - (startSize - endSize) * progress;
        const currentSpacing =
          startSpacing - (startSpacing - endSpacing) * progress;
        const currentY = startY - (startY - endY) * progress;

        textElement.setAttribute("x", windowWidth / 2);
        textElement.setAttribute("y", currentY);
        textElement.setAttribute("font-size", currentSize);
        textElement.setAttribute("letter-spacing", currentSpacing);
      } else {
        // Mobile: Set static, responsive size (no animation)
        const mobileFontSize = windowWidth / 6;
        textElement.setAttribute("x", windowWidth / 2);
        textElement.setAttribute("y", 150);
        textElement.setAttribute("font-size", mobileFontSize);
        textElement.setAttribute("letter-spacing", 2);
      }
    }

    window.addEventListener("scroll", handleHeroText);
    window.addEventListener("resize", handleHeroText);

    // Initial call
    handleHeroText();
  }
});
