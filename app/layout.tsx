import "./globals.css"
import { Orbitron } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import type React from "react"

const orbitron = Orbitron({ subsets: ["latin"] })

export const metadata = {
  title: "Tobi's Portfolio",
  description: "Software Engineer Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={orbitron.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

