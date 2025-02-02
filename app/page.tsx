"use client"

import { useState } from "react"
import { Modal } from "@/components/modal"
import { ContactForm } from "@/components/contact-form"
import { ProjectCard } from "@/components/project-card"
import { SkillCard } from "@/components/skill-card"
import { Download, Mail, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const skillsData = {
  Frontend: [
    { name: "React", proficiency: 92 },
    { name: "TypeScript", proficiency: 88 },
    { name: "Next.js", proficiency: 90 },
    { name: "HTML/CSS", proficiency: 95 },
  ],
  Backend: [
    { name: "Java", proficiency: 98 },
    { name: "Node.js", proficiency: 89 },
    { name: "Python", proficiency: 85 },
    { name: "SQL", proficiency: 87 },
  ],
  "Tools & Others": [
    { name: "Git", proficiency: 93 },
    { name: "Docker", proficiency: 82 },
    { name: "AWS", proficiency: 78 },
    { name: "Linux", proficiency: 85 },
  ],
}

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleDownloadResume = () => {
    // Replace with actual resume download logic
    alert("Resume download functionality to be implemented")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div id="background-animation" className="absolute inset-0" />
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="glitch mb-4 text-4xl font-bold md:text-6xl" data-text="Tobi Aribo">
            Tobi Aribo
          </h1>
          <p className="mb-8 text-xl text-text-color cyberpunk-text">
            Aspiring Software Engineer | Passionate About AI and Web Development
          </p>
          <div className="flex gap-4">
            <Button onClick={() => setIsContactModalOpen(true)} className="cta-button">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
            <Button onClick={handleDownloadResume} className="cta-button">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary cyberpunk-text">About Me</h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Tobi Aribo"
                className="mx-auto rounded-lg cyberpunk-border"
              />
            </div>
            <div className="space-y-4">
              <p className="text-lg text-text">
                I am a passionate software engineer with a strong foundation in computer science and a keen interest in
                artificial intelligence and web development. Currently pursuing my degree in Computer Science, I am
                constantly exploring new technologies and building projects that challenge my skills.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/tobidontplay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary cyberpunk-text">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Project 1"
              description="A description of your first project goes here. Talk about what problem it solves and what technologies you used."
              technologies={["React", "TypeScript", "Node.js"]}
              image="/placeholder.svg?height=200&width=300"
              demoUrl="https://demo.com"
              githubUrl="https://github.com"
            />
            {/* Add more ProjectCard components as needed */}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary cyberpunk-text">Skills</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsData).map(([category, skills]) => (
              <SkillCard key={category} category={category} skills={skills} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <ContactForm />
      </Modal>
    </div>
  )
}

