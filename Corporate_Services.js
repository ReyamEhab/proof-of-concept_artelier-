// ================= HERO IMAGE ANIMATION =================
const heroImg = document.getElementById('heroImage');

// Function to animate the hero image
function animateHero() {
  heroImg.classList.add('active'); // Add 'active' class to trigger CSS animations
  
  // After 6 seconds, remove 'active' class to fade back & zoom in (loop effect)
  setTimeout(() => {
    heroImg.classList.remove('active');
  }, 6000);
}

// Repeat hero animation smoothly every 12 seconds
setInterval(animateHero, 12000);
animateHero(); // Start animation immediately on page load

// ================= SIDE MENU TOGGLE =================
const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const closeBtn = document.getElementById('closeBtn');

// Open side menu when clicking the menu button
menuBtn.addEventListener('click', () => menuPanel.classList.add('open'));

// Close side menu when clicking the close button
closeBtn.addEventListener('click', () => menuPanel.classList.remove('open'));

// ================= FADE-IN ELEMENTS ON SCROLL =================
const fadeElements = document.querySelectorAll('.fade-in');

// Function to check if element is in viewport and add 'visible' class
function handleScroll() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) { // trigger 100px before element enters view
      el.classList.add('visible');
    }
  });
}

// Listen to scroll events to trigger fade-in
window.addEventListener('scroll', handleScroll);
handleScroll(); // Run once on page load to show elements already in view

// ================= AUTO IMAGE SLIDER PER SECTION =================
const artSections = document.querySelectorAll('.art-image');

artSections.forEach(section => {
  const images = section.querySelectorAll('img');
  let current = 0;

  // Cycle through images in each section every 4 seconds
  setInterval(() => {
    images[current].classList.remove('active'); // Hide current image
    current = (current + 1) % images.length;     // Move to next image
    images[current].classList.add('active');    // Show next image
  }, 4000);
});

// ================= REVEAL ANIMATION ON SCROLL =================
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150; // Trigger distance from bottom of viewport

    // Add or remove 'active' class based on scroll position
    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
});
// ===== MAGNETIC BANNER PARALLAX =====
const banner = document.querySelector('.interactive-banner');
const track = document.querySelector('.banner-track');

banner.addEventListener('mousemove', e => {
  const rect = banner.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const center = rect.width / 2;

  const offset = ((x - center) / center) * 20;

  track.style.transform = `translateX(${offset}px) rotateY(${offset / 3}deg)`;
});

banner.addEventListener('mouseleave', () => {
  track.style.transform = 'translateX(0) rotateY(0deg)';
});


banner.addEventListener('mouseleave', () => {
  banner.style.transform = `perspective(600px) rotateY(0deg)`; // reset rotation
});
// ================= SMOOTH SCROLL REVEAL (STAGGERED) =================
const cards = document.querySelectorAll('.client-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 120); // stagger animation
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));


// ================= PREMIUM 3D TILT + GLOW =================
cards.forEach(card => {
  let rect;
  let rafId;

  const updateTilt = (x, y) => {
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.07)
    `;
  };

  card.addEventListener('mouseenter', () => {
    rect = card.getBoundingClientRect();
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mousemove', e => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      updateTilt(e.clientX - rect.left, e.clientY - rect.top);
    });
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.6s ease';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});


// ================= ICON FLOAT ANIMATION =================
cards.forEach(card => {
  const icon = card.querySelector('.client-icon');

  card.addEventListener('mouseenter', () => {
    icon.style.transform = 'translateY(-8px) scale(1.1)';
    icon.style.transition = '0.4s ease';
  });

  card.addEventListener('mouseleave', () => {
    icon.style.transform = 'translateY(0) scale(1)';
  });
});



// ====================== LANGUAGE SWITCH ======================

// Get references to language dropdown
const languageDropdown = document.getElementById('languageDropdown');
const languageOptions = document.getElementById('languageOptions');

// Toggle dropdown display when language icon is clicked
languageDropdown.addEventListener('click', () => {
    languageOptions.style.display = languageOptions.style.display === 'block' ? 'none' : 'block';
});

    // Default load
    loadProducts("underglazes");

    const reviewTrack = document.getElementById("reviewTrack");
const reviewPrev = document.querySelector(".reviewPrev");
const reviewNext = document.querySelector(".reviewNext");
let reviewIndex = 0;

function slideReview(direction) {
  const reviews = document.querySelectorAll(".singleReview");
  const cardWidth = reviews[0].offsetWidth + 40;
  const totalReviews = reviews.length;

  if (direction === "next") {
    reviewIndex = (reviewIndex + 1) % (totalReviews - 2);
  } else {
    reviewIndex = (reviewIndex - 1 + (totalReviews - 2)) % (totalReviews - 2);
  }

  reviewTrack.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
}

reviewNext.addEventListener("click", () => slideReview("next"));
reviewPrev.addEventListener("click", () => slideReview("prev"));

function showPopup(event) {
  event.preventDefault();
  document.getElementById('popupMessage').classList.add('active');
  document.getElementById('emailInput').value = '';
}

function closePopup() {
  document.getElementById('popupMessage').classList.remove('active');
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".artelier-loader");
  const bar = document.querySelector(".loader-bar");

  // Wait for progress bar animation (4s) then fade out
  bar.addEventListener("animationend", () => {
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 300); // small delay for visual smoothness
  });
});

  const contactForm = document.getElementById('creative-contact-form');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    contactForm.reset();
  });

  // Language translations object
const translations = {
  en: {
    "hero-title": "One Stop for All<br>Your Artistic Needs",
    "hero-subtitle": "Discover a world of creativity — premium art supplies for professionals, students, and dreamers who turn imagination into art.",
    "features-title": "Why Artists Love Artelier",
    "feature1-title": "Premium Art Tools",
    "feature1-desc": "Only the finest brushes, paints, and canvases — curated to bring your vision to life.",
    "feature2-title": "Endless Color Range",
    "feature2-desc": "Explore thousands of rich shades and pigments crafted for true artistic depth.",
    "feature3-title": "Creative Inspiration",
    "feature3-desc": "Workshops, tutorials, and creative kits that spark your imagination daily.",
    "feature4-title": "Eco-Friendly Supplies",
    "feature4-desc": "Sustainable materials that care for your art — and for the planet."
  },
  fr: {
    "hero-title": "Tout en un pour tous<br>Vos besoins artistiques",
    "hero-subtitle": "Découvrez un monde de créativité — fournitures artistiques premium pour professionnels, étudiants et rêveurs qui transforment l'imagination en art.",
    "features-title": "Pourquoi les artistes adorent Artelier",
    "feature1-title": "Outils artistiques premium",
    "feature1-desc": "Seulement les meilleurs pinceaux, peintures et toiles — sélectionnés pour donner vie à votre vision.",
    "feature2-title": "Gamme de couleurs infinie",
    "feature2-desc": "Explorez des milliers de nuances et pigments riches conçus pour une profondeur artistique réelle.",
    "feature3-title": "Inspiration créative",
    "feature3-desc": "Ateliers, tutoriels et kits créatifs qui stimulent votre imagination au quotidien.",
    "feature4-title": "Fournitures écologiques",
    "feature4-desc": "Matériaux durables qui prennent soin de votre art — et de la planète."
  },
  ar: {
    "hero-title": "كل شيء في مكان واحد<br>لجميع احتياجاتك الفنية",
    "hero-subtitle": "اكتشف عالمًا من الإبداع — مستلزمات فنية مميزة للمحترفين والطلاب والحالمين الذين يحولون الخيال إلى فن.",
    "features-title": "لماذا يحب الفنانون أرتيليير",
    "feature1-title": "أدوات فنية مميزة",
    "feature1-desc": "أفضل الفرش والألوان واللوحات — مختارة لإحياء رؤيتك.",
    "feature2-title": "مجموعة ألوان لا نهائية",
    "feature2-desc": "استكشف آلاف الظلال والأصباغ الغنية المصممة لأعمق تجربة فنية.",
    "feature3-title": "إلهام إبداعي",
    "feature3-desc": "ورش عمل ودروس وأطقم إبداعية تشعل خيالك يوميًا.",
    "feature4-title": "مستلزمات صديقة للبيئة",
    "feature4-desc": "مواد مستدامة تهتم بفنك — وتهتم بالكوكب."
  }
};

// Toggle dropdown
const switcher = document.getElementById('languageSwitcher');
const options = document.getElementById('languageOptions');

switcher.addEventListener('click', () => {
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
});

// Change language
options.querySelectorAll('div').forEach(option => {
  option.addEventListener('click', () => {
    const lang = option.getAttribute('data-lang');
    document.querySelectorAll('[data-lang-key]').forEach(el => {
      const key = el.getAttribute('data-lang-key');
      el.innerHTML = translations[lang][key] || el.innerHTML;
    });
    options.style.display = 'none';
  });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu-link").forEach((link, i) => {
        link.style.opacity = "0";
        setTimeout(() => {
            link.style.transition = "0.7s ease";
            link.style.opacity = "1";
        }, i * 120);
    });
});

