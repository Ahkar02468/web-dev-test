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
  const menuLinks = document.querySelectorAll(".mobile-menu a:not(.mobile-signin):not(.mobile-cart)"); // Avoid closing on actions? Actually maybe close on nav links.
  
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

  // Only run if elements exist (in case we're on a page without the hero)
  if (heroTextWrapper && textClip) {
    const textElement = textClip.querySelector("text");

    function updateAnimation() {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Define the scroll range for the animation (e.g., 80% of viewport)
      const animationRange = windowHeight * 0.8;

      // Calculate progress (0 to 1)
      let progress = scrolled / animationRange;
      if (progress > 1) progress = 1;
      if (progress < 0) progress = 0;

      // Animation Parameters
      // RESPONSIVE SIZE CALCULATION
      // Desktop: Start big (300px)
      // Mobile: Calculate based on screen width to ensure it fits or is appropriately large
      // "PLAIMANAS" is approx 9 chars.
      
      let startSize;
      let startSpacing;
      
      if (windowWidth > 768) {
          startSize = 300; 
          startSpacing = 20;
      } else {
          // Mobile: Width-based calculation
          // Target width: 90% of screen
          // Approx width of text = fontSize * 0.7 * 9chars
          // fontSize = (windowWidth * 0.9) / (0.7 * 9)
          // Simplified: windowWidth / 7
          startSize = windowWidth / 6; // e.g., 375px -> ~62px
          startSpacing = 2; // Tighter spacing on mobile
      }

      const endSize = windowWidth > 768 ? 60 : 40; // Smaller end size on mobile
      const endSpacing = 2;

      // Y Position: Start close under header with small gap, then shrink into header
      const headerHeight = windowWidth > 768 ? 80 : 60; // Header height
      const gapBelowHeader = windowWidth > 768 ? 60 : 40; // Small space below header
      const startY = headerHeight + gapBelowHeader + (startSize * 0.4); // Start just below header
      const endY = headerHeight + (endSize * 0.4); // End positioned in header

      // Interpolate values
      const currentSize = startSize - (startSize - endSize) * progress;
      const currentSpacing =
        startSpacing - (startSpacing - endSpacing) * progress;
      const currentY = startY - (startY - endY) * progress;

      // Apply to SVG Text directly
      textElement.setAttribute("x", windowWidth / 2); // Always center horizontally
      textElement.setAttribute("y", currentY);
      textElement.setAttribute("font-size", currentSize);
      textElement.setAttribute("letter-spacing", currentSpacing);
    }

    window.addEventListener("scroll", updateAnimation);
    window.addEventListener("resize", updateAnimation);

    // Initial call
    updateAnimation();
  }
});
