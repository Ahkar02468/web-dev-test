document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header & Logo Shrink ---
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.contains('active');
            
            if (isOpen) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                mobileBtn.setAttribute('aria-label', 'Open Menu');
            } else {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                mobileBtn.setAttribute('aria-label', 'Close Menu');
            }
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- FAQ Tabs & Accordion ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const faqItems = document.querySelectorAll('.accordion-item');

    // Initial State: Show All
    filterFAQs('all');

    // Tab Click Event
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            filterFAQs(category);
        });
    });

    function filterFAQs(category) {
        faqItems.forEach(item => {
            // Reset state
            const trigger = item.querySelector('.accordion-trigger');
            trigger.setAttribute('aria-expanded', 'false');
            item.querySelector('.accordion-content').style.height = '0';

            // Show/Hide logic
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                // Small animation delay could go here for polish
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Accordion Interaction
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close others (Accordion behavior)
            accordionTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherTrigger.nextElementSibling.style.height = '0';
                }
            });

            // Toggle current
            trigger.setAttribute('aria-expanded', !isExpanded);
            const content = trigger.nextElementSibling;
            
            if (!isExpanded) {
                content.style.height = content.scrollHeight + 'px';
            } else {
                content.style.height = '0';
            }
        });
    });

    // Resize Handler for Accordion Heights
    window.addEventListener('resize', () => {
        accordionTriggers.forEach(trigger => {
            if (trigger.getAttribute('aria-expanded') === 'true') {
                const content = trigger.nextElementSibling;
                content.style.height = 'auto';
                setTimeout(() => {
                    content.style.height = content.scrollHeight + 'px';
                }, 10);
            }
        });
    });
});
