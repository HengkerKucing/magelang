// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initializeNavigation()
  initializeScrollEffects()
  initializeModals()
  initializeAnimations()
  initializeLazyLoading()
})

// Navigation functionality
function initializeNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Active navigation link
  window.addEventListener("scroll", () => {
    let current = ""
    const sections = document.querySelectorAll("section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Scroll effects and animations
function initializeScrollEffects() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Scroll to top functionality
  const scrollToTopBtn = createScrollToTopButton()

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block"
    } else {
      scrollToTopBtn.style.display = "none"
    }
  })
}

function createScrollToTopButton() {
  const button = document.createElement("button")
  button.innerHTML = "↑"
  button.className = "scroll-to-top"
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: var(--shadow);
        transition: var(--transition);
    `

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  button.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })

  document.body.appendChild(button)
  return button
}

// Modal functionality
function initializeModals() {
  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    const imageModal = document.getElementById("imageModal")
    const destinationModal = document.getElementById("destinationModal")
    const registrationModal = document.getElementById("registrationModal")

    if (event.target === imageModal) {
      closeImageModal()
    }
    if (event.target === destinationModal) {
      closeDestinationModal()
    }
    if (event.target === registrationModal) {
      closeRegistrationModal()
    }
  })

  // Close modals with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeImageModal()
      closeDestinationModal()
      closeRegistrationModal()
    }
  })
}

// Image modal functions
function openImageModal(imageSrc) {
  const modal = document.getElementById("imageModal")
  const modalImage = document.getElementById("modalImage")
  modalImage.src = imageSrc
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeImageModal() {
  const modal = document.getElementById("imageModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Destination modal function
function closeDestinationModal() {
  const modal = document.getElementById("destinationModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Animation on scroll
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".destination-card, .about-card, .contact-card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Lazy loading for images
function initializeLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  const lazyImages = document.querySelectorAll('img[loading="lazy"]')
  lazyImages.forEach((img) => {
    imageObserver.observe(img)
  })
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Performance optimizations
const debouncedResize = debounce(() => {
  // Handle resize events - check if map exists globally
  if (typeof window.map !== "undefined" && window.map && typeof window.map.invalidateSize === "function") {
    window.map.invalidateSize()
  }
}, 250)

window.addEventListener("resize", debouncedResize)

// Loading state management
function showLoading(element) {
  element.innerHTML = '<div class="loading"></div>'
}

function hideLoading(element, content) {
  element.innerHTML = content
}

// Error handling
window.addEventListener("error", (event) => {
  console.error("JavaScript error:", event.error)
  // You could implement user-friendly error messages here
})

// Service worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful")
      })
      .catch((error) => {
        console.log("ServiceWorker registration failed:", error)
      })
  })
}

// Analytics and tracking (placeholder)
function trackEvent(category, action, label) {
  // Implement your analytics tracking here
  console.log("Event tracked:", { category, action, label })
}

// Hero box functionality
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Registration modal functions
function openRegistrationModal() {
  const modal = document.getElementById("registrationModal")
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeRegistrationModal() {
  const modal = document.getElementById("registrationModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

function submitRegistration(event) {
  event.preventDefault()

  // Get form data
  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData)

  // Show success message
  const form = event.target
  form.innerHTML = `
    <div class="success-message">
      <h3>Registrasi Berhasil!</h3>
      <p>Terima kasih ${data.fullName}! Kami akan menghubungi Anda dalam 24 jam untuk konfirmasi tour.</p>
      <button type="button" class="btn btn-primary" onclick="closeRegistrationModal()">Tutup</button>
    </div>
  `

  // Track event
  trackEvent("Registration", "Submit", data.tourPackage)

  console.log("Registration data:", data)
}

// Export functions for global use
window.openImageModal = openImageModal
window.closeImageModal = closeImageModal
window.closeDestinationModal = closeDestinationModal
window.loadMoreDestinations = () => {
  const grid = document.getElementById("destinations-grid")
  const button = event.target
  
  // Show loading state
  button.innerHTML = '<div class="loading"></div> Memuat...'
  button.disabled = true
  
  // Simulate API call delay
  setTimeout(() => {
    // Add more destination cards
    const moreDestinations = [
      {
        title: "Air Terjun Sekumpul",
        description: "Air terjun yang menawan dengan ketinggian 80 meter, dikelilingi hutan tropis yang asri.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        location: "Sekumpul, Magelang",
        rating: "4.6"
      },
      {
        title: "Punthuk Setumbu",
        description: "Spot terbaik untuk melihat sunrise dengan pemandangan Candi Borobudur dan Gunung Merapi.",
        image: "https://images.unsplash.com/photo-1570939274851-2d4b4c70d3bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        location: "Borobudur, Magelang",
        rating: "4.8"
      },
      {
        title: "Gunung Tidar",
        description: "Gunung kecil yang menawarkan panorama kota Magelang dan sekitarnya dari ketinggian.",
        image: "https://images.unsplash.com/photo-1464822759844-d150baec0151?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        location: "Tidar, Magelang",
        rating: "4.3"
      }
    ]
    
    moreDestinations.forEach(dest => {
      const card = document.createElement('div')
      card.className = 'destination-card'
      card.innerHTML = `
        <div class="destination-image">
          <img src="${dest.image}" alt="${dest.title}" loading="lazy">
        </div>
        <div class="destination-content">
          <h3 class="destination-title">${dest.title}</h3>
          <p class="destination-description">${dest.description}</p>
          <div class="destination-meta">
            <span>📍 ${dest.location}</span>
            <span>⭐ ${dest.rating}</span>
          </div>
        </div>
      `
      grid.appendChild(card)
    })
    
    // Hide button after loading more
    button.style.display = 'none'
    
    // Add fade in animation to new cards
    const newCards = grid.querySelectorAll('.destination-card:nth-last-child(-n+3)')
    newCards.forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 100)
    })
    
  }, 1000)
}

window.scrollToSection = scrollToSection
window.openRegistrationModal = openRegistrationModal
window.closeRegistrationModal = closeRegistrationModal
window.submitRegistration = submitRegistration
