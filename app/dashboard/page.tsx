"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Plus,
  BarChart3,
  Clock,
  TrendingUp,
  LogOut,
  Settings,
  User,
  Sparkles,
  Trophy,
  Crown,
  Medal,
  Award,
  Zap,
  Flame,
  Target,
  Users,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DigitalClock } from "@/components/digital-clock"
import { WeatherWidget } from "@/components/weather-widget"
import { TasksSection } from "@/components/sections/tasks-section"
import { CalendarSection } from "@/components/sections/calendar-section"
import { JournalSection } from "@/components/sections/journal-section"
import { MusicSection } from "@/components/sections/music-section"
import { SettingsSection } from "@/components/sections/settings-section"
import { AchievementPopup } from "@/components/achievements-popup"
import { useApp } from "@/contexts/app-context"
import { useTheme } from "@/hooks/use-theme"

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const { theme, effectiveTheme } = useTheme()
  const { sessions, addSession, achievements, streakCount } = useApp()

  const [activeSection, setActiveSection] = useState("home")
  const [formData, setFormData] = useState({
    topic: "",
    hours: "",
    notes: "",
  })
  const [currentAchievement, setCurrentAchievement] = useState<string | null>(null)

  // Generate weekly chart data
  const getWeeklyData = () => {
    const weeklyHours: { [key: string]: number } = {}

    sessions.forEach((session) => {
      const date = new Date(session.date)
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()))
      const weekKey = weekStart.toISOString().split("T")[0]

      weeklyHours[weekKey] = (weeklyHours[weekKey] || 0) + session.hours
    })

    return Object.entries(weeklyHours)
      .map(([week, hours]) => ({
        week: new Date(week).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        hours: Number(hours.toFixed(1)),
      }))
      .slice(-6) // Last 6 weeks
  }

  const weeklyData = getWeeklyData()
  const totalHours = sessions.reduce((sum, session) => sum + session.hours, 0)
  const avgHours = sessions.length > 0 ? (totalHours / sessions.length).toFixed(1) : 0

  const [friends, setFriends] = useState([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      totalHours: 89.5,
      weeklyHours: 12.5,
      streak: 8,
      status: "online",
      rank: 2,
    },
    {
      id: "2",
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      totalHours: 156.0,
      weeklyHours: 18.0,
      streak: 15,
      status: "offline",
      rank: 1,
    },
    {
      id: "3",
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      totalHours: 67.5,
      weeklyHours: 8.5,
      streak: 5,
      status: "online",
      rank: 4,
    },
    {
      id: "4",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      totalHours: totalHours,
      weeklyHours: weeklyData.reduce((sum, week) => sum + week.hours, 0),
      streak: streakCount,
      status: "online",
      rank: 3,
    },
  ])

  // Show welcome message on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to your dashboard! 🎉",
        description: "Start tracking your learning journey by logging your first session.",
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast])

  // Show achievement popup
  useEffect(() => {
    if (achievements.length > 0) {
      const lastAchievement = achievements[achievements.length - 1]
      if (lastAchievement !== currentAchievement) {
        setCurrentAchievement(lastAchievement)
      }
    }
  }, [achievements, currentAchievement])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.topic || !formData.hours) return

    addSession({
      topic: formData.topic,
      hours: Number.parseFloat(formData.hours),
      notes: formData.notes,
      date: new Date().toISOString().split("T")[0],
    })

    setFormData({ topic: "", hours: "", notes: "" })

    toast({
      title: "Session logged successfully! ✅",
      description: `Added ${formData.hours} hours of ${formData.topic} to your learning journey.`,
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been signed out of your account.",
    })

    // Redirect back to login page
    router.push("/")
  }

  const chartConfig = {
    hours: {
      label: "Hours",
      color: "hsl(var(--primary))",
    },
  }

  const renderSection = () => {
    switch (activeSection) {
      case "tasks":
        return <TasksSection />
      case "calendar":
        return <CalendarSection />
      case "journal":
        return <JournalSection />
      case "music":
        return <MusicSection />
      case "settings":
        return <SettingsSection />
      default:
        return renderHomeSection()
    }
  }

  const renderHomeSection = () => (
    <div className="space-y-8 pb-20">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up hover:bg-gray-900/90">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Hours</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                  {totalHours}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm p-3 rounded-full border border-purple-500/30">
                <Clock className="h-6 w-6 text-purple-400 drop-shadow-lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up-delayed hover:bg-gray-900/90">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Sessions</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                  {sessions.length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-pink-600/30 to-purple-600/30 backdrop-blur-sm p-3 rounded-full border border-pink-500/30">
                <BookOpen className="h-6 w-6 text-pink-400 drop-shadow-lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up-delayed-2 hover:bg-gray-900/90">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Average</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                  {avgHours}h
                </p>
              </div>
              <div className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-sm p-3 rounded-full border border-yellow-500/30">
                <TrendingUp className="h-6 w-6 text-yellow-400 drop-shadow-lg" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up-delayed-3 hover:bg-gray-900/90">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Streak</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">
                  {streakCount}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 backdrop-blur-sm p-3 rounded-full border border-green-500/30">
                <Flame className="h-6 w-6 text-green-400 drop-shadow-lg" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Banner */}
      {achievements.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-xl border-yellow-500/30 shadow-2xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-white">Latest Achievement</h3>
                  <p className="text-yellow-200 text-sm">{achievements[achievements.length - 1]}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="bg-yellow-500/20 border-yellow-400/30 text-yellow-300 hover:bg-yellow-500/30"
              >
                <Bell className="h-4 w-4 mr-2" />
                View All ({achievements.length})
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Learning Session Form */}
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-slide-in-left hover:bg-gray-900/90">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm p-2 rounded-lg border border-purple-500/30">
                <Plus className="h-5 w-5 text-purple-400 drop-shadow-lg" />
              </div>
              Log Learning Session
            </CardTitle>
            <CardDescription className="text-gray-400 drop-shadow">
              Track your learning progress and take detailed notes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-sm font-semibold text-gray-300">
                  Topic
                </Label>
                <Input
                  id="topic"
                  placeholder="What did you learn today?"
                  value={formData.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                  className="h-12 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all duration-300 text-gray-200 placeholder:text-gray-500 hover:bg-gray-800/70"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours" className="text-sm font-semibold text-gray-300">
                  Hours Spent
                </Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  placeholder="2.5"
                  value={formData.hours}
                  onChange={(e) => handleInputChange("hours", e.target.value)}
                  className="h-12 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all duration-300 text-gray-200 placeholder:text-gray-500 hover:bg-gray-800/70"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-semibold text-gray-300">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Key takeaways, resources, or reflections..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                  className="resize-none bg-gray-800/50 backdrop-blur-sm border-gray-700/50 focus:border-purple-500/50 focus:ring-purple-500/30 transition-all duration-300 text-gray-200 placeholder:text-gray-500 hover:bg-gray-800/70"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:-translate-y-1 animate-pulse-button bg-size-200 hover:bg-pos-100"
              >
                Log Session
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 animate-slide-in-right hover:bg-gray-900/90">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-semibold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              <div className="bg-gradient-to-r from-emerald-600/30 to-blue-600/30 backdrop-blur-sm p-2 rounded-lg border border-emerald-500/30">
                <BarChart3 className="h-5 w-5 text-emerald-400 drop-shadow-lg" />
              </div>
              Weekly Progress
            </CardTitle>
            <CardDescription className="text-gray-400 drop-shadow">
              Your learning hours over the past weeks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} content={<ChartTooltipContent />} />
                  <Bar dataKey="hours" fill="url(#chartGradient)" radius={[8, 8, 0, 0]} className="drop-shadow-lg" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Friends & Competition */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 animate-fade-in-up hover:bg-gray-900/90 xl:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            <div className="bg-gradient-to-r from-yellow-600/30 to-orange-600/30 backdrop-blur-sm p-2 rounded-lg border border-yellow-500/30">
              <Trophy className="h-5 w-5 text-yellow-400 drop-shadow-lg" />
            </div>
            Friends & Competition
          </CardTitle>
          <CardDescription className="text-gray-400 drop-shadow">
            See how you stack up against your learning buddies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Leaderboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-400" />
                  Weekly Leaderboard
                </h3>
                <div className="space-y-2">
                  {friends
                    .sort((a, b) => b.weeklyHours - a.weeklyHours)
                    .map((friend, index) => (
                      <div
                        key={friend.id}
                        className={`flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                          friend.name === "You"
                            ? "bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-500/40 shadow-lg shadow-yellow-500/20"
                            : "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10 border-2 border-gray-600/50">
                              <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm">
                                {friend.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {friend.status === "online" && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-200">{friend.name}</p>
                            <p className="text-sm text-gray-400">{friend.weeklyHours}h this week</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {index === 0 && <Crown className="h-5 w-5 text-yellow-400" />}
                          {index === 1 && <Medal className="h-5 w-5 text-gray-400" />}
                          {index === 2 && <Award className="h-5 w-5 text-amber-600" />}
                          <span className="text-lg font-bold text-gray-200">#{index + 1}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-400" />
                  Streak Competition
                </h3>
                <div className="space-y-2">
                  {friends
                    .sort((a, b) => b.streak - a.streak)
                    .map((friend, index) => (
                      <div
                        key={friend.id}
                        className={`flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                          friend.name === "You"
                            ? "bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/40 shadow-lg shadow-orange-500/20"
                            : "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800/70"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border-2 border-gray-600/50">
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm">
                              {friend.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-200">{friend.name}</p>
                            <p className="text-sm text-gray-400">{friend.streak} day streak</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Flame className="h-5 w-5 text-orange-500" />
                          <span className="text-lg font-bold text-gray-200">{friend.streak}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Challenge Section */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-lg border border-purple-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <Target className="h-5 w-5 text-pink-400" />
                    Weekly Challenge
                  </h4>
                  <p className="text-gray-400 text-sm mt-1">First to reach 25 hours this week wins! 🏆</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="text-sm text-gray-300">
                      Progress:{" "}
                      <span className="font-semibold text-gray-200">
                        {weeklyData.reduce((sum, week) => sum + week.hours, 0)}/25h
                      </span>
                    </div>
                    <div className="flex-1 bg-gray-800/50 rounded-full h-2 max-w-xs">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((weeklyData.reduce((sum, week) => sum + week.hours, 0) / 25) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="bg-gray-800/50 border-gray-700/50 text-gray-300 hover:bg-gray-800/70 hover:text-gray-200"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Invite Friends
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Sessions Table */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 animate-fade-in-up hover:bg-gray-900/90">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
            Learning Sessions
          </CardTitle>
          <CardDescription className="text-gray-400 drop-shadow">
            All your logged learning sessions ({sessions.length} total)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 hover:bg-gray-800/70">
                  <TableHead className="font-semibold text-gray-300 px-6 py-4">Date</TableHead>
                  <TableHead className="font-semibold text-gray-300 px-6 py-4">Topic</TableHead>
                  <TableHead className="font-semibold text-gray-300 px-6 py-4">Hours</TableHead>
                  <TableHead className="font-semibold text-gray-300 px-6 py-4 hidden md:table-cell">Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-gray-400">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-full border border-gray-700/50">
                          <BookOpen className="h-8 w-8 text-gray-500" />
                        </div>
                        <p className="font-medium">No learning sessions yet</p>
                        <p className="text-sm">Start by logging your first session above!</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sessions.map((session, index) => (
                    <TableRow
                      key={session.id}
                      className={`hover:bg-gray-800/50 transition-colors duration-300 ${
                        index % 2 === 0 ? "bg-gray-800/30" : "bg-gray-900/30"
                      }`}
                    >
                      <TableCell className="px-6 py-4 font-medium text-gray-200">
                        {new Date(session.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="font-medium text-gray-200">{session.topic}</div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm text-gray-200 border border-purple-500/30">
                          {session.hours}h
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 hidden md:table-cell max-w-xs">
                        <div className="text-gray-400 text-sm truncate" title={session.notes}>
                          {session.notes || "No notes"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className={`min-h-screen relative overflow-hidden ${effectiveTheme === "dark" ? "dark" : ""}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-yellow-900/10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-900/20 via-blue-900/30 to-violet-900/40 animate-gradient-y"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-rose-900/20 via-purple-900/30 to-indigo-900/20 animate-gradient-xy"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-xl animate-bounce-slow"></div>
      </div>

      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-twinkle">
          <Sparkles className="h-6 w-6 text-purple-400/60" />
        </div>
        <div className="absolute top-40 right-32 animate-twinkle-delayed">
          <Sparkles className="h-4 w-4 text-yellow-400/70" />
        </div>
        <div className="absolute bottom-32 left-40 animate-twinkle">
          <Sparkles className="h-5 w-5 text-pink-400/60" />
        </div>
        <div className="absolute bottom-20 right-20 animate-twinkle-delayed">
          <Sparkles className="h-6 w-6 text-blue-400/70" />
        </div>
      </div>

      {/* Top Navbar */}
      <nav className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl shadow-2xl border border-purple-500/30 animate-glow">
                <BookOpen className="h-6 w-6 text-white drop-shadow-lg" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                SkillShare+ Dashboard
              </h1>
            </div>

            {/* Digital Clock and Weather in Center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <DigitalClock />
              <WeatherWidget />
            </div>

            <div className="flex items-center space-x-4 animate-slide-in-right">
              <div className="hidden sm:flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700/50">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-white">{totalHours}h logged</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    <Avatar className="h-8 w-8 border-2 border-white/30">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-gray-900/95 backdrop-blur-xl border-gray-800/50"
                  align="end"
                  forceMount
                >
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                    className="hover:bg-purple-900/50 text-gray-200"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/settings")}
                    className="hover:bg-purple-900/50 text-gray-200"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-red-900/50 text-gray-200">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderSection()}</div>

      {/* Bottom Navigation */}
      <BottomNavigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Achievement Popup */}
      {currentAchievement && (
        <AchievementPopup achievement={currentAchievement} onClose={() => setCurrentAchievement(null)} />
      )}

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            transform: translateX(0%) scale(1);
          }
          50% {
            transform: translateX(-50%) scale(1.1);
          }
        }
        @keyframes gradient-y {
          0%, 100% {
            transform: translateY(0%) scale(1);
          }
          50% {
            transform: translateY(-50%) scale(1.05);
          }
        }
        @keyframes gradient-xy {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
          }
          33% {
            transform: translate(30%, -30%) scale(1.1);
          }
          66% {
            transform: translate(-20%, 20%) scale(0.9);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }
        @keyframes twinkle-delayed {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(-180deg);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes pulse-button {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        .animate-gradient-y {
          animation: gradient-y 20s ease infinite;
        }
        .animate-gradient-xy {
          animation: gradient-xy 25s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-twinkle-delayed {
          animation: twinkle-delayed 4s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-fade-in-up-delayed {
          animation: fade-in-up 0.6s ease-out 0.1s both;
        }
        .animate-fade-in-up-delayed-2 {
          animation: fade-in-up 0.6s ease-out 0.2s both;
        }
        .animate-fade-in-up-delayed-3 {
          animation: fade-in-up 0.6s ease-out 0.3s both;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        .animate-pulse-button {
          animation: pulse-button 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .hover\\:bg-pos-100:hover {
          background-position: right center;
        }
      `}</style>
    </div>
  )
}
