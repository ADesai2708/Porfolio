// ============================================
//   CURSOR GLOW EFFECT
// ============================================
const cursorGlow = document.getElementById('cursorGlow');

if (window.matchMedia("(pointer: fine)").matches) {
  document.addEventListener('mousemove', (e) => {
    // Update cursor position
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
} else {
  // Hide glow effect on touch devices
  cursorGlow.style.display = 'none';
}

// ============================================
//   NAVBAR & MOBILE MENU
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Transform burger to X (simple visual change)
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ============================================
//   SCROLL REVEAL ANIMATIONS
// ============================================
// Add reveal class to sections that need to fade in
const revealSections = document.querySelectorAll('.section-title, .about-card, .timeline-item, .project-card, .skill-category, .achievement-card, .contact-card');
revealSections.forEach(el => el.classList.add('reveal'));

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Stop observing once revealed
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ============================================
//   NUMBER COUNTING (Stats in Hero Section)
// ============================================
const stats = document.querySelectorAll('.stat-number');
let hasCounted = false;

const startCounting = () => {
  if (hasCounted) return;
  hasCounted = true;

  stats.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS approx
    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        // Format to 2 decimal places if it's CGPA, else whole integer
        stat.innerText = Number.isInteger(target) ? Math.floor(current) : current.toFixed(2);
        requestAnimationFrame(updateCount);
      } else {
        stat.innerText = target;
      }
    };

    updateCount();
  });
};

// Start counting immediately if stats are visible
if (window.scrollY < 200) {
    setTimeout(startCounting, 800); // Small delay to sync with fade-up animation
} else {
    // If scrolled past, count when scrolled back up (or just count immediately)
    startCounting();
}
