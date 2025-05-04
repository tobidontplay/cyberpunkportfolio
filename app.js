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
  const resumeUrl = "assets/Tobi_Aribo_Resume.txt"
  
  // Create a temporary anchor element
  const downloadLink = document.createElement("a")
  downloadLink.href = resumeUrl
  downloadLink.download = "Tobi_Aribo_Resume.txt"
  
  // Append to the body, click it, and remove it
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
})

// Ultra simple collapsible project cards
document.addEventListener('DOMContentLoaded', function() {
  // Add repository links to all roadmap cards
  addRepoLinksToRoadmaps();
  
  // Setup In Progress indicator links
  setupInProgressLinks();
  
  // Initialize all toggle buttons for project cards
  document.querySelectorAll('.project-card .toggle-btn').forEach(btn => {
    const card = btn.closest('.project-card');
    const content = card.querySelector('.project-content');
    
    if (!content) return;
    
    // Set initial state
    btn.textContent = '+';
    btn.classList.remove('active');
    content.style.display = 'none';
    
    // Add click handler
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      
      // First collapse all other cards
      document.querySelectorAll('.project-card').forEach(otherCard => {
        if (otherCard !== card) {
          const otherContent = otherCard.querySelector('.project-content');
          const otherBtn = otherCard.querySelector('.toggle-btn');
          if (otherContent && otherContent.style.display !== 'none') {
            otherContent.style.display = 'none';
            otherBtn.classList.remove('active');
            otherBtn.textContent = '+';
          }
        }
      });
      
      // Toggle this card
      if (content.style.display === 'none') {
        content.style.display = 'block';
        this.classList.add('active');
        this.textContent = '-';
      } else {
        content.style.display = 'none';
        this.classList.remove('active');
        this.textContent = '+';
      }
    });
  });
  
  // Initialize all toggle buttons for roadmap cards
  document.querySelectorAll('.roadmap-card .toggle-btn').forEach(btn => {
    const card = btn.closest('.roadmap-card');
    const content = card.querySelector('.milestone-list');
    
    if (!content) return;
    
    // Set initial state
    btn.textContent = '+';
    btn.classList.remove('active');
    content.style.display = 'none';
    
    // Add click handler
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      
      // Get current state of this card
      const isExpanded = content.style.display !== 'none';
      
      // First collapse ALL roadmap cards (including this one)
      document.querySelectorAll('.roadmap-card').forEach(anyCard => {
        const anyContent = anyCard.querySelector('.milestone-list');
        const anyBtn = anyCard.querySelector('.toggle-btn');
        if (anyContent) {
          anyContent.style.display = 'none';
          if (anyBtn) {
            anyBtn.classList.remove('active');
            anyBtn.textContent = '+';
          }
        }
      });
      
      // If this card was not expanded before, expand it now
      if (!isExpanded) {
        content.style.display = 'block';
        this.classList.add('active');
        this.textContent = '-';
      }
      // If it was already expanded, it will remain collapsed (already done above)
    });
  });
  
  // Also make headers clickable (except links)
  document.querySelectorAll('.toggle-header').forEach(header => {
    header.addEventListener('click', function(e) {
      // Don't toggle if clicking on a link or button
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      
      // Find and click the toggle button
      const btn = this.querySelector('.toggle-btn');
      if (btn) btn.click();
    });
  });
})

// Function to initialize project toggles - removed as it's now handled in the DOMContentLoaded event

// No need to call initProjectToggle as it's now handled in the DOMContentLoaded event

// Removed duplicate initProjectToggle function

// No need for additional initialization as it's now handled in the DOMContentLoaded event

// Projects section technology charts animation
const techBars = document.querySelectorAll('.tech-bar')
const techObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const techFill = entry.target.querySelector('.tech-fill')
        const projectName = entry.target.getAttribute('data-project')
        const techData = projectTechData[projectName]
        const techKeys = Object.keys(techData)
        const techValues = Object.values(techData)
        const total = techValues.reduce((a, b) => a + b, 0)
        const percentage = (techValues[0] / total) * 100
        
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
  
  // Prepare the data for submission
  const formData = {
    name,
    email,
    message
  }
  
  // Send the data to our serverless function
  fetch('/api/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json().then(data => {
        // If response is not ok, throw an error with the data
        if (!response.ok) {
          throw new Error(data.message || 'Unknown error occurred');
        }
        return data;
      });
    } else {
      // Handle non-JSON response (like HTML error pages)
      return response.text().then(text => {
        console.error('Received non-JSON response:', text.substring(0, 150) + '...');
        throw new Error('Received non-JSON response from server. Check browser console for details.');
      });
    }
  })
  .then(data => {
    // Show success message
    formStatus.className = 'form-status success'
    formStatus.textContent = 'Thank you for your message! I will get back to you soon.'
    
    // Reset the form
    this.reset()
    
    // Log success for debugging
    console.log('Form submitted successfully:', data)
  })
  .catch(error => {
    console.error('Error submitting form:', error)
    
    // Show detailed error message
    formStatus.className = 'form-status error'
    formStatus.textContent = `Error: ${error.message || 'There was an error sending your message. Please try again later.'}`
    
    // Add debug info to console
    console.log('Form submission error details:', error)
  })
  .finally(() => {
    // Re-enable the submit button
    submitButton.disabled = false
    submitButton.textContent = 'Send Message'
  })
})

// Make In Progress indicators link to specific roadmap sections
function setupInProgressLinks() {
  // Get all in-progress indicators
  const inProgressLinks = document.querySelectorAll('.work-in-progress');
  
  inProgressLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the project title from the parent element
      const projectTitle = this.closest('.project-title').textContent.trim().split(' ')[0];
      
      // Find the corresponding roadmap card
      const roadmapCards = document.querySelectorAll('.roadmap-card');
      let targetCard = null;
      
      roadmapCards.forEach(card => {
        const cardTitle = card.querySelector('.roadmap-title').textContent.trim();
        if (cardTitle.includes(projectTitle)) {
          targetCard = card;
        }
      });
      
      if (targetCard) {
        // Scroll to the roadmap section
        document.querySelector('#roadmap').scrollIntoView({
          behavior: 'smooth'
        });
        
        // Expand the specific roadmap card after a short delay
        setTimeout(() => {
          // First collapse all roadmap cards
          document.querySelectorAll('.roadmap-card').forEach(card => {
            const content = card.querySelector('.milestone-list');
            const btn = card.querySelector('.toggle-btn');
            if (content) {
              content.style.display = 'none';
            }
            if (btn) {
              btn.classList.remove('active');
              btn.textContent = '+';
            }
          });
          
          // Then expand the target card
          const content = targetCard.querySelector('.milestone-list');
          const btn = targetCard.querySelector('.toggle-btn');
          if (content) {
            content.style.display = 'block';
          }
          if (btn) {
            btn.classList.add('active');
            btn.textContent = '-';
          }
        }, 500);
      } else {
        // If no specific card is found, just scroll to the roadmap section
        document.querySelector('#roadmap').scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add repository links to roadmap cards
function addRepoLinksToRoadmaps() {
  // Repository URLs for each project
  const repoUrls = {
    'D-Frames': 'https://github.com/tobidontplay/d-frames',
    'Midnight Shayo': 'https://github.com/tobidontplay/shayo-culture-vibes-web',
    'FloodSpy': 'https://github.com/tobidontplay/floodspy',
    'NeuralNFT': 'https://github.com/tobidontplay/NeuralNFT.git',
    'FloodSpy Weather': 'https://github.com/tobidontplay/floodspyweather-'
  };
  
  // Get all roadmap cards
  const roadmapCards = document.querySelectorAll('.roadmap-card');
  
  // Add repo links to each card
  roadmapCards.forEach(card => {
    // Get the project title
    const titleElement = card.querySelector('.roadmap-title');
    if (!titleElement) return;
    
    const projectTitle = titleElement.textContent.trim();
    const repoUrl = repoUrls[projectTitle];
    
    // Check if this card already has a repo link
    const existingRepoLink = card.querySelector('.repo-link');
    
    // If there's no repo link and we have a URL for this project, add one
    if (!existingRepoLink && repoUrl) {
      const repoLink = document.createElement('a');
      repoLink.href = repoUrl;
      repoLink.className = 'repo-link';
      repoLink.textContent = 'View Repository';
      card.appendChild(repoLink);
    }
  });
}

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
