"use client"

import { useState } from "react"
import { Modal } from "./modal"
import { SkillChart } from "./skill-chart"

interface Skill {
  name: string
  proficiency: number
}

interface SkillCardProps {
  category: string
  skills: Skill[]
}

export function SkillCard({ category, skills }: SkillCardProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

  return (
    <>
      <div className="rounded-lg cyberpunk-border bg-background p-4 transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
        <h3 className="mb-4 text-xl font-bold text-primary cyberpunk-text">{category}</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className="rounded-full cyberpunk-border px-3 py-1 text-sm text-primary transition-all hover:bg-primary hover:text-background"
            >
              {skill.name}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)}>
        {selectedSkill && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary cyberpunk-text">{selectedSkill.name} Proficiency</h3>
            <SkillChart skill={selectedSkill.name} proficiency={selectedSkill.proficiency} />
          </div>
        )}
      </Modal>
    </>
  )
}

