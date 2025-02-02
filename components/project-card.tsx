interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
}

export function ProjectCard({ title, description, technologies, image, demoUrl, githubUrl }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg cyberpunk-border bg-background p-4 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-xl font-bold text-primary cyberpunk-text">{title}</h3>
        <p className="text-sm text-text">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="rounded-full cyberpunk-border px-2 py-1 text-xs text-primary">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline cyberpunk-text"
            >
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline cyberpunk-text"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

