// Initialize particles.js
document.addEventListener("DOMContentLoaded", function () {
  // Particles.js configuration
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#0cffe1",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#0cffe1",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });

  // Variables
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const typedTextElement = document.getElementById("typed-text");
  const contactForm = document.getElementById("contact-form");

  // Typewriter effect
  const typedTexts = [
    "Full-Stack Developer",
    "Mobile App Developer",
    "UI/UX Enthusiast",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentText = typedTexts[textIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typedTexts.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000);

  // Scroll event for header styling and section activation
  function handleScroll() {
    // Add scrolled class to header when page is scrolled
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Activate sections when scrolled into view
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        section.classList.add("active");

        // Update navigation links
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }

  // Initialize sections visibility
  function initSections() {
    const homeSection = document.getElementById("home");
    homeSection.classList.add("active");

    // Activate first visible section on load
    handleScroll();
  }

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Close mobile menu if open
        if (nav.classList.contains("active")) {
          nav.classList.remove("active");
          menuToggle.classList.remove("active");
        }

        // Smooth scroll to target
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Form highlight effects
  const formInputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.querySelector(".form-highlight").style.width = "100%";
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.querySelector(".form-highlight").style.width = "0";
      }
    });
  });

  // Form submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Simple validation
      if (name && email && message) {
        // Show success message (in real implementation, you'd send data to server)
        const formBtn = this.querySelector('button[type="submit"]');
        const originalText = formBtn.textContent;

        formBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        formBtn.style.backgroundColor = "#0cffe1";

        // Reset form after delay
        setTimeout(() => {
          contactForm.reset();
          formInputs.forEach((input) => {
            input.parentElement.querySelector(".form-highlight").style.width =
              "0";
          });

          // Reset button
          setTimeout(() => {
            formBtn.textContent = originalText;
            formBtn.style.backgroundColor = "";
          }, 1500);
        }, 1000);
      }
    });
  }

  // Add scroll reveal animations to elements
  function addScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      ".project-card, .skill-tag, .social-link"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = `opacity 0.5s ease ${
        index * 0.1
      }s, transform 0.5s ease ${index * 0.1}s`;

      observer.observe(element);
    });
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 15px 30px rgba(12, 255, 225, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Initialize
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", () => {
    initSections();
    addScrollAnimations();
  });
});
