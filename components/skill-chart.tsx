"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface SkillChartProps {
  skill: string
  proficiency: number
}

export function SkillChart({ skill, proficiency }: SkillChartProps) {
  const data = [
    {
      name: skill,
      value: proficiency,
    },
  ]

  return (
    <Card className="p-4">
      <div className="h-[200px]">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  )
}

