# PLAIMANAS Frontend Test

This project implements the frontend design for PLAIMANAS using pure HTML, CSS, and JavaScript.

## Setup Instructions

1.  **Add Images:**
    *   Create an `assets/` folder in this directory.
    *   Export images from the Figma file.
    *   Update the `src` paths in `index.html` (look for `<img ...>`) to point to your real images.
    *   Remove the `<div class="placeholder-box">...</div>` elements.

2.  **Run:**
    *   Since this uses vanilla technologies, you can simply open `index.html` in any modern web browser.
    *   No build step (`npm start`, etc.) is required.

## Features

*   **Responsive Layout:** Uses CSS Grid and Flexbox to adapt to mobile and desktop.
*   **Marquee Animation:** CSS-based infinite scroll (lightweight, no JS thread blocking).
*   **Accordion:** Vanilla JS implementation for the FAQ section.
*   **Mobile Menu:** Full-screen overlay menu on smaller screens.
*   **Fonts:** Hanken Grotesk loaded via Google Fonts.

## Customization

*   **Colors:** Edit CSS variables in `styles.css` (`:root`).
*   **Grid:** Adjust `.grid-layout` in `styles.css` to match the exact spacing of the Figma design.
