"use client"

import { useState, useEffect } from "react"
import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface AchievementPopupProps {
  achievement: string
  onClose: () => void
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 4000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card className="bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-xl border-yellow-500/50 shadow-2xl min-w-[300px]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500/30 p-2 rounded-full">
                <Trophy className="h-6 w-6 text-yellow-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Achievement Unlocked!</h3>
                <p className="text-yellow-100 text-sm">{achievement}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-yellow-200 hover:text-white hover:bg-yellow-500/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
