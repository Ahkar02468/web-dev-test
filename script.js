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
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuLinks = document.querySelectorAll(".mobile-menu a");

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.contains("active");

      if (isOpen) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
        mobileBtn.setAttribute("aria-label", "Open Menu");
      } else {
        mobileMenu.classList.add("active");
        document.body.style.overflow = "hidden";
        mobileBtn.setAttribute("aria-label", "Close Menu");
      }
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
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
      // Make text huge at start to fill screen (responsive)
      const startSize = windowWidth > 768 ? 300 : 150;
      const endSize = 60; // Final font size (Logo size)
      const startSpacing = 16;
      const endSpacing = 2;

      // Y Position: Anchor top of text to be right under the header
      // Adjust this '80' if the text sits too low/high relative to your specific header
      const headerHeight = 140;
      const startY = headerHeight + startSize * 0.35;
      const endY = headerHeight + endSize * 0.35;

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
