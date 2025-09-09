// Detective Investigation Board Portfolio - JavaScript

// Responsive adjustments for connection lines
document.addEventListener("DOMContentLoaded", function () {
  function handleResponsiveAdjustments() {
    const isMobile = window.innerWidth <= 768;
    const connectionLines = document.querySelector(".connection-lines");

    if (connectionLines) {
      if (isMobile) {
        connectionLines.style.display = "none";
      } else {
        connectionLines.style.display = "block";
      }
    }
  }

  // Handle window resize for responsive adjustments
  window.addEventListener("resize", handleResponsiveAdjustments);
  handleResponsiveAdjustments(); // Initial call
});

// Modal and Investigation Board Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Enhanced hover effects for pinned items
  const pinnedItems = document.querySelectorAll(".pinned-item");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeModal = document.querySelector(".close");

  // Add enhanced hover sound effect (optional)
  function playHoverSound() {
    // You can add audio here if desired
    // const audio = new Audio('sounds/pin-hover.mp3');
    // audio.play().catch(e => console.log('Audio play failed'));
  }

  // Enhanced hover effects
  pinnedItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      playHoverSound();

      // Add glow effect
      this.style.filter =
        "drop-shadow(0 15px 25px rgba(220, 20, 60, 0.4)) brightness(1.1)";

      // Animate the pin
      const pin = this.querySelector(".pin");
      if (pin) {
        pin.style.transform = "translateX(-50%) scale(1.2)";
        pin.style.boxShadow = "0 3px 12px rgba(220, 20, 60, 0.6)";
      }

      // Animate evidence tag
      const tag = this.querySelector(".evidence-tag");
      if (tag) {
        tag.style.transform = "rotate(15deg) scale(1.1)";
        tag.style.boxShadow = "0 3px 8px rgba(0, 0, 0, 0.4)";
      }

      // Animate red lines connected to this item
      animateConnectedLines(this);
    });

    item.addEventListener("mouseleave", function () {
      // Reset effects
      this.style.filter = "";

      const pin = this.querySelector(".pin");
      if (pin) {
        pin.style.transform = "translateX(-50%) scale(1)";
        pin.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
      }

      const tag = this.querySelector(".evidence-tag");
      if (tag) {
        tag.style.transform = "rotate(15deg) scale(1)";
        tag.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
      }

      // Reset red lines
      resetRedLines();
    });

    // Click event to open modal with enhanced animation
    item.addEventListener("click", function () {
      const section = this.getAttribute("data-section");
      openModal(section, this); // Pass the clicked element
    });

    // Add touch events for mobile devices
    item.addEventListener(
      "touchstart",
      function (e) {
        // Prevent default to avoid double-tap zoom on mobile
        e.preventDefault();

        // Add active state for touch feedback
        this.classList.add("touch-active");

        // Trigger hover effects on touch
        this.dispatchEvent(new Event("mouseenter"));
      },
      { passive: false }
    );

    item.addEventListener(
      "touchend",
      function (e) {
        e.preventDefault();

        // Remove active state
        this.classList.remove("touch-active");

        // Open modal on touch end
        const section = this.getAttribute("data-section");
        openModal(section, this);

        // Reset hover effects after a delay
        setTimeout(() => {
          this.dispatchEvent(new Event("mouseleave"));
        }, 500);
      },
      { passive: false }
    );
  });

  // Animate connected red lines
  function animateConnectedLines(hoveredItem) {
    const sectionType = hoveredItem.getAttribute("data-section");
    const lines = document.querySelectorAll(".red-line");
    const connectionPoints = document.querySelectorAll(".connection-point");

    // Reset all lines first
    lines.forEach((line) => {
      line.style.stroke = "#DC143C";
      line.style.strokeWidth = "3";
      line.style.opacity = "0.3";
      line.style.filter = "none";
    });

    // Highlight lines connected to the hovered section
    const sectionConnections = {
      hero: [0, 1, 2, 8, 10, 11, 12, 13, 14], // Lines connected to hero
      about: [0, 3, 4, 9, 11, 15], // Lines connected to about
      skills: [1, 3, 5, 6, 12, 16], // Lines connected to skills
      projects: [4, 5, 7, 13, 17], // Lines connected to projects
      contact: [2, 6, 7, 8, 9, 14, 18], // Lines connected to contact
    };

    if (sectionConnections[sectionType]) {
      sectionConnections[sectionType].forEach((lineIndex) => {
        if (lines[lineIndex]) {
          lines[lineIndex].style.stroke = "#FF1493";
          lines[lineIndex].style.strokeWidth = "4";
          lines[lineIndex].style.opacity = "1";
          lines[lineIndex].style.filter = "drop-shadow(0 0 8px #FF1493)";
        }
      });
    }

    // Animate connection points
    connectionPoints.forEach((point) => {
      point.style.fill = "#FF1493";
      point.style.filter = "drop-shadow(0 0 5px #FF1493)";
    });
  }

  // Reset red lines
  function resetRedLines() {
    const lines = document.querySelectorAll(".red-line");
    const connectionPoints = document.querySelectorAll(".connection-point");

    lines.forEach((line) => {
      line.style.stroke = "#DC143C";
      line.style.strokeWidth = "3";
      line.style.opacity = "0.8";
      line.style.filter = "none";
    });

    // Reset connection points
    connectionPoints.forEach((point) => {
      point.style.fill = "#DC143C";
      point.style.filter = "none";
    });
  }

  // Enhanced Modal functionality with zoom animation
  function openModal(section, clickedElement) {
    const content = document.getElementById(section + "-content");
    if (content) {
      // Add click pulse effect to photo
      const photo = clickedElement.querySelector(".pinned-photo");
      if (photo) {
        photo.classList.add("clicked");
        setTimeout(() => photo.classList.remove("clicked"), 300);
      }

      modalBody.innerHTML = content.innerHTML;
      modal.style.display = "block";

      // Add zoom-in animation class
      modal.classList.add("zoom-in");
      modal.classList.remove("zoom-out");

      // Add typewriter effect to modal content
      setTimeout(() => {
        addTypewriterEffect();
      }, 300);
    }
  }

  // Close modal
  closeModal.addEventListener("click", function () {
    closeModalFunction();
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModalFunction();
    }
  });

  function closeModalFunction() {
    // Add zoom-out animation
    modal.classList.add("zoom-out");
    modal.classList.remove("zoom-in");

    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("zoom-out");
    }, 400);
  }

  // Typewriter effect for modal content
  function addTypewriterEffect() {
    const elements = modalBody.querySelectorAll("h1, h2, h3");
    elements.forEach((element, index) => {
      const text = element.textContent;
      element.textContent = "";
      element.style.borderRight = "2px solid #DC143C";

      setTimeout(() => {
        typeWriter(element, text, 0);
      }, index * 200);
    });
  }

  function typeWriter(element, text, index) {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      setTimeout(() => typeWriter(element, text, index + 1), 50);
    } else {
      // Remove cursor after typing
      setTimeout(() => {
        element.style.borderRight = "none";
      }, 500);
    }
  }

  // Dynamic red line animation on page load
  function animateRedLinesOnLoad() {
    const lines = document.querySelectorAll(".red-line");
    lines.forEach((line, index) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length;

      setTimeout(() => {
        line.style.transition = "stroke-dashoffset 2s ease";
        line.style.strokeDashoffset = 0;
      }, index * 300);
    });
  }

  // Parallax effect for scattered evidence
  function addParallaxEffect() {
    const scatteredItems = document.querySelectorAll(".scattered-evidence > *");

    window.addEventListener("mousemove", function (e) {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      scatteredItems.forEach((item, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        item.style.transform += ` translate(${x}px, ${y}px)`;
      });
    });
  }

  // Random floating animation for evidence items
  function addFloatingAnimation() {
    const floatingItems = document.querySelectorAll(
      ".sticky-note, .fingerprint, .paper-clip"
    );

    floatingItems.forEach((item) => {
      // Set random animation duration and delay
      const duration = 3 + Math.random() * 4; // 3-7 seconds
      const delay = Math.random() * 2; // 0-2 seconds delay

      item.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
  }

  // Add CSS for floating animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
        }
        
        .pinned-item:hover .red-line {
            animation: pulse-fast 0.5s ease-in-out infinite;
        }
        
        @keyframes pulse-fast {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        
        .evidence-tag:hover {
            animation: wiggle 0.5s ease-in-out;
        }
        
        @keyframes wiggle {
            0%, 100% { transform: rotate(15deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(10deg); }
        }
    `;
  document.head.appendChild(style);

  // Initialize effects
  setTimeout(() => {
    animateRedLinesOnLoad();
    addParallaxEffect();
    addFloatingAnimation();
  }, 1000);

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModalFunction();
    }

    // Number keys 1-5 to open sections
    const sectionMap = {
      1: "hero",
      2: "about",
      3: "skills",
      4: "projects",
      5: "contact",
    };

    if (sectionMap[e.key]) {
      openModal(sectionMap[e.key]);
    }
  });

  // Add contact form functionality (if needed later)
  function initializeContactForm() {
    // This can be expanded when adding a contact form
    console.log("Contact form functionality ready");
  }

  // Add Easter egg - Konami code
  let konamiCode = [];
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      // Easter egg: Show special investigator message
      alert(
        "🕵️‍♀️ Secret Investigator Mode Activated! You found the hidden code!"
      );
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => {
        document.body.style.filter = "none";
      }, 3000);
      konamiCode = [];
    }
  });

  console.log("🕵️‍♀️ Investigation Board Loaded Successfully!");
  console.log(
    "💡 Tips: Use number keys 1-5 to quickly access sections, or discover the secret code!"
  );
});

// Additional utility functions
function createPinDrop(x, y) {
  const pin = document.createElement("div");
  pin.className = "pin-drop";
  pin.style.position = "absolute";
  pin.style.left = x + "px";
  pin.style.top = y + "px";
  pin.style.width = "10px";
  pin.style.height = "10px";
  pin.style.background = "#DC143C";
  pin.style.borderRadius = "50%";
  pin.style.animation = "pinDrop 1s ease forwards";

  document.querySelector(".cork-board").appendChild(pin);

  setTimeout(() => {
    pin.remove();
  }, 1000);
}

// CSS for pin drop animation
const pinDropStyle = document.createElement("style");
pinDropStyle.textContent = `
    @keyframes pinDrop {
        0% { 
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
        50% {
            transform: translateY(0) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(pinDropStyle);
