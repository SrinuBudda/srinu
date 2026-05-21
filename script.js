document.addEventListener('DOMContentLoaded', () => {

  /* --- HEADER SCROLL ACTION --- */
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* --- MOBILE MENU TOGGLE --- */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isOpened = navMenu.classList.contains('active');
    menuToggle.innerHTML = isOpened 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  /* --- TYPEWRITER ANIMATION --- */
  const textEl = document.getElementById('typewriter-text');
  const words = ["Software Engineer", "Front-End Developer", "UI/UX Designer", "Problem Solver"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      charIndex--;
      typeSpeed = 50; // faster delete
    } else {
      charIndex++;
      typeSpeed = 100; // standard type speed
    }

    textEl.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next word
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 300; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  /* --- INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS --- */
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  /* --- SKILLS ANIMATION (ON VIEW) --- */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  /* --- ACTIVE NAVIGATION HIGHLIGHTER --- */
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = 'home';
    const scrollPos = window.scrollY + 120; // offset header height

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- PROJECTS GRID FILTER --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* --- BACK TO TOP BUTTON --- */
  const backToTopBtn = document.getElementById('btn-back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.style.display = 'flex';
      backToTopBtn.style.opacity = '1';
    } else {
      backToTopBtn.style.opacity = '0';
      setTimeout(() => {
        if (window.scrollY <= 500) {
          backToTopBtn.style.display = 'none';
        }
      }, 300);
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* --- CONTACT FORM HANDLING --- */
  const contactForm = document.getElementById('contact-form-el');
  const formStatus = document.getElementById('form-status-message');
  const submitBtn = document.getElementById('btn-submit-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable button & show sending state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';
    
    // Simulate API Response delay
    setTimeout(() => {
      formStatus.className = 'form-status success';
      formStatus.innerHTML = 'Thank you, Sanju has received your message! I will get back to you shortly.';
      
      // Reset Form fields
      contactForm.reset();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
      
      // Fade out success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }, 1800);
  });
});
