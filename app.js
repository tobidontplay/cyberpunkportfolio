// Background animation
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById("background-animation").appendChild(renderer.domElement)

const geometry = new THREE.BufferGeometry()
const vertices = []
for (let i = 0; i < 10000; i++) {
  vertices.push(THREE.MathUtils.randFloatSpread(2000))
  vertices.push(THREE.MathUtils.randFloatSpread(2000))
  vertices.push(THREE.MathUtils.randFloatSpread(2000))
}
geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00ffff, size: 2 }))
scene.add(particles)

camera.position.z = 1000

function animate() {
  requestAnimationFrame(animate)
  particles.rotation.x += 0.0005
  particles.rotation.y += 0.0005
  renderer.render(scene, camera)
}
animate()

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Intersection Observer for skill card animations
const skillCards = document.querySelectorAll(".skill-card")
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  },
  {
    threshold: 0.1,
  },
)

skillCards.forEach((card) => {
  observer.observe(card)
  
  // Add click event listener to show proficiency charts
  card.addEventListener("click", function() {
    // Get the proficiency container for this card
    const proficiencyContainer = this.querySelector(".proficiency-container")
    
    // Check if this card's proficiency chart is already active
    const isActive = proficiencyContainer.classList.contains("active")
    
    // First, hide all proficiency containers
    document.querySelectorAll(".proficiency-container").forEach(container => {
      container.classList.remove("active")
    })
    
    // If this card wasn't active before, make it active
    if (!isActive) {
      proficiencyContainer.classList.add("active")
      
      // Animate the proficiency fill
      const proficiencyFill = proficiencyContainer.querySelector(".proficiency-fill")
      const proficiency = this.getAttribute("data-proficiency")
      
      // Reset the width first to trigger animation
      proficiencyFill.style.width = "0"
      
      // Force a reflow to ensure the animation works
      void proficiencyFill.offsetWidth
      
      // Set the width to the proficiency percentage
      setTimeout(() => {
        proficiencyFill.style.width = `${proficiency}%`
      }, 50)
    }
  })
})

// Resume download functionality
document.getElementById("download-resume").addEventListener("click", () => {
  // Replace with actual resume URL
  const resumeUrl = "path/to/your/resume.pdf"
  window.open(resumeUrl, "_blank")
})

// Projects section technology charts animation
const techBars = document.querySelectorAll('.tech-bar')
const techObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const techFill = entry.target.querySelector('.tech-fill')
        const percentage = entry.target.getAttribute('data-percentage')
        
        // Reset width first
        techFill.style.width = '0'
        
        // Force reflow
        void techFill.offsetWidth
        
        // Animate to the percentage
        setTimeout(() => {
          techFill.style.width = `${percentage}%`
        }, 100)
        
        // Unobserve after animation
        techObserver.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.2,
  }
)

techBars.forEach((bar) => {
  techObserver.observe(bar)
})

// Contact button scrolls to contact section
document.getElementById('contact-button').addEventListener('click', function() {
  document.querySelector('#contact').scrollIntoView({
    behavior: 'smooth'
  })
})

// Contact form functionality
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value
  const formStatus = document.getElementById("form-status")
  const submitButton = this.querySelector('button[type="submit"]')
  
  // Disable the submit button and show loading state
  submitButton.disabled = true
  submitButton.textContent = 'Sending...'
  formStatus.className = 'form-status'
  formStatus.textContent = ''
  
  // Prepare the data
  const formData = {
    name,
    email,
    message
  }
  
  // Send the data to our serverless function
  fetch('/api/contact-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    // Show success message
    formStatus.className = 'form-status success'
    formStatus.textContent = 'Thank you for your message! I will get back to you soon.'
    
    // Reset the form
    this.reset()
  })
  .catch(error => {
    console.error('Error submitting form:', error)
    
    // Show error message
    formStatus.className = 'form-status error'
    formStatus.textContent = 'There was an error sending your message. Please try again later.'
  })
  .finally(() => {
    // Re-enable the submit button
    submitButton.disabled = false
    submitButton.textContent = 'Send Message'
  })
})


// Skills Category Filtering
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.skill-category-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  
  // Make sure all skill cards have proper visibility classes
  skillCards.forEach(card => {
    card.classList.add('skill-card-initialized');
  });
  
  // Function to filter skills by category
  function filterSkills(category) {
    console.log('Filtering skills by category:', category);
    
    // Show/hide skill cards based on category
    skillCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      console.log(`Card: ${card.getAttribute('data-skill')}, Category: ${cardCategory}`);
      
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
        card.classList.add('visible');
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });
  }
  
  // Add click event to category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      filterSkills(category);
    });
  });
  
  // Initialize with frontend skills visible by default
  filterSkills('frontend');
  
  // Log all skill cards for debugging
  console.log('All skill cards:');
  skillCards.forEach(card => {
    console.log(`${card.getAttribute('data-skill')} (${card.getAttribute('data-category')})`);
  });
});
