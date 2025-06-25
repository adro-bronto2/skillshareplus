"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function DigitalClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex items-center space-x-3 bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50">
      <Clock className="h-4 w-4 text-purple-400" />
      <div className="text-center">
        <div className="text-sm font-mono font-bold text-white">{formatTime(time)}</div>
        <div className="text-xs text-gray-400">{formatDate(time)}</div>
      </div>
    </div>
  )
}
