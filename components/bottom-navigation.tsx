"use client"
import { Home, CheckSquare, Calendar, BookOpen, Music, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function BottomNavigation({ activeSection, onSectionChange }: BottomNavigationProps) {
  const sections = [
    { id: "home", label: "Home", icon: Home },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "journal", label: "Journal", icon: BookOpen },
    { id: "music", label: "Music", icon: Music },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 min-w-[60px]",
                  isActive
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white scale-110"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50",
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "drop-shadow-lg")} />
                <span className="text-xs font-medium">{section.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
