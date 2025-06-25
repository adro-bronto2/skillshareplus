"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, CloudSnowIcon as Snow, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherData {
  temperature: number
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy"
  location: string
  humidity: number
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 22,
    condition: "sunny",
    location: "San Francisco",
    humidity: 65,
  })

  useEffect(() => {
    // Simulate weather updates
    const interval = setInterval(() => {
      const conditions: WeatherData["condition"][] = ["sunny", "cloudy", "rainy", "snowy", "windy"]
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
      const randomTemp = Math.floor(Math.random() * 30) + 5

      setWeather((prev) => ({
        ...prev,
        temperature: randomTemp,
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 40) + 40,
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-yellow-400" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-400" />
      case "snowy":
        return <Snow className="h-5 w-5 text-white" />
      case "windy":
        return <Wind className="h-5 w-5 text-gray-300" />
    }
  }

  return (
    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 min-w-[120px]">
      <CardContent className="p-3">
        <div className="flex items-center space-x-2">
          {getWeatherIcon()}
          <div>
            <div className="text-sm font-bold text-white">{weather.temperature}°C</div>
            <div className="text-xs text-gray-400 capitalize">{weather.condition}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
