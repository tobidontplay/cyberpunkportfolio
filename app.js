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
})

// Resume download functionality
document.getElementById("download-resume").addEventListener("click", () => {
  // Replace with actual resume URL
  const resumeUrl = "path/to/your/resume.pdf"
  window.open(resumeUrl, "_blank")
})

// Contact form functionality
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault()
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  // Here you would typically send this data to a server
  // For this example, we'll just log it to the console
  console.log("Form submitted:", { name, email, message })

  // You can replace this with actual form submission logic
  alert("Thank you for your message! I will get back to you soon.")
  this.reset()
})

