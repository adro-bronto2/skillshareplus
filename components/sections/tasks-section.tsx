"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Clock,
  AlertCircle,
  Flag,
  CalendarIcon,
  Trash2,
  CheckSquare,
  Edit3,
  Star,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useApp } from "@/contexts/app-context"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface PomodoroSettings {
  workDuration: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
  soundEnabled: boolean
}

export function TasksSection() {
  const { toast } = useToast()
  const { tasks, addTask, updateTask, deleteTask } = useApp()

  const [showAddTask, setShowAddTask] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium" as const,
    category: "",
  })

  // Pomodoro state with persistence
  const [pomodoroSettings, setPomodoroSettings] = useLocalStorage<PomodoroSettings>("pomodoroSettings", {
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    soundEnabled: true,
  })

  const [currentTimer, setCurrentTimer] = useState(pomodoroSettings.workDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [timerType, setTimerType] = useState<"work" | "shortBreak" | "longBreak">("work")
  const [pomodoroCount, setPomodoroCount] = useLocalStorage<number>("pomodoroCount", 0)
  const [showPomodoroSettings, setShowPomodoroSettings] = useState(false)

  // Pomodoro timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && currentTimer > 0) {
      interval = setInterval(() => {
        setCurrentTimer((time) => time - 1)
      }, 1000)
    } else if (currentTimer === 0) {
      setIsRunning(false)

      // Play notification sound
      if (pomodoroSettings.soundEnabled) {
        const audio = new Audio(
          "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        )
        audio.play().catch(() => {}) // Ignore errors if audio can't play
      }

      if (timerType === "work") {
        setPomodoroCount((count) => count + 1)
        const newCount = pomodoroCount + 1

        if (newCount % pomodoroSettings.longBreakInterval === 0) {
          setTimerType("longBreak")
          setCurrentTimer(pomodoroSettings.longBreak * 60)
          toast({
            title: "Work session complete! 🍅",
            description: "Time for a long break!",
          })
        } else {
          setTimerType("shortBreak")
          setCurrentTimer(pomodoroSettings.shortBreak * 60)
          toast({
            title: "Work session complete! 🍅",
            description: "Time for a short break!",
          })
        }
      } else {
        setTimerType("work")
        setCurrentTimer(pomodoroSettings.workDuration * 60)
        toast({
          title: "Break time over! 💪",
          description: "Ready for another work session?",
        })
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, currentTimer, timerType, pomodoroCount, pomodoroSettings, toast])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    const duration =
      timerType === "work"
        ? pomodoroSettings.workDuration
        : timerType === "shortBreak"
          ? pomodoroSettings.shortBreak
          : pomodoroSettings.longBreak
    setCurrentTimer(duration * 60)
  }

  const handleAddTask = () => {
    if (!newTask.title.trim()) return

    addTask({
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      category: newTask.category,
      completed: false,
    })

    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      category: "",
    })
    setShowAddTask(false)

    toast({
      title: "Task added successfully!",
      description: `"${newTask.title}" has been added to your task list.`,
    })
  }

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (task) {
      updateTask(taskId, { completed: !task.completed })

      if (!task.completed) {
        toast({
          title: "Task completed! ✅",
          description: `Great job on completing "${task.title}"!`,
        })
      }
    }
  }

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId)
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500/30 text-red-300 border-red-400/30"
      case "high":
        return "bg-orange-500/30 text-orange-300 border-orange-400/30"
      case "medium":
        return "bg-yellow-500/30 text-yellow-300 border-yellow-400/30"
      case "low":
        return "bg-green-500/30 text-green-300 border-green-400/30"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-3 w-3" />
      case "high":
        return <Flag className="h-3 w-3" />
      case "medium":
        return <Clock className="h-3 w-3" />
      case "low":
        return <Timer className="h-3 w-3" />
    }
  }

  const getProgressPercentage = () => {
    const totalDuration =
      timerType === "work"
        ? pomodoroSettings.workDuration * 60
        : timerType === "shortBreak"
          ? pomodoroSettings.shortBreak * 60
          : pomodoroSettings.longBreak * 60

    return ((totalDuration - currentTimer) / totalDuration) * 100
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="space-y-6 pb-20">
      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{totalTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{completedTasks}</p>
              </div>
              <Star className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completion Rate</p>
                <p className="text-2xl font-bold text-purple-400">{completionRate}%</p>
              </div>
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pomodoro Timer */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Timer className="h-5 w-5 text-red-400" />
            Pomodoro Timer
            <Badge className="bg-red-500/20 text-red-300 border-red-400/30">Session {pomodoroCount + 1}</Badge>
          </CardTitle>
          <CardDescription className="text-gray-400">Stay focused with the Pomodoro Technique</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            {/* Timer Display */}
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-8 border-gray-700 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="text-center">
                  <div className="text-4xl font-mono font-bold text-white mb-2">{formatTime(currentTimer)}</div>
                  <div className="text-sm text-gray-400 capitalize">
                    {timerType === "shortBreak"
                      ? "Short Break"
                      : timerType === "longBreak"
                        ? "Long Break"
                        : "Work Time"}
                  </div>
                </div>
              </div>
              {/* Progress ring */}
              <svg className="absolute top-0 left-0 w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className={`${timerType === "work" ? "text-red-500" : "text-green-500"}`}
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - getProgressPercentage() / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleStartPause}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8"
              >
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {/* Pomodoro Count */}
            <div className="text-center">
              <div className="text-sm text-gray-400">Completed Pomodoros Today</div>
              <div className="text-2xl font-bold text-white">{pomodoroCount}</div>
            </div>

            {/* Settings Toggle */}
            <Button
              onClick={() => setShowPomodoroSettings(!showPomodoroSettings)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              Timer Settings
            </Button>

            {/* Pomodoro Settings */}
            {showPomodoroSettings && (
              <div className="w-full max-w-md space-y-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Work (min)</Label>
                    <Input
                      type="number"
                      value={pomodoroSettings.workDuration}
                      onChange={(e) =>
                        setPomodoroSettings((prev) => ({
                          ...prev,
                          workDuration: Number.parseInt(e.target.value) || 25,
                        }))
                      }
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Short Break (min)</Label>
                    <Input
                      type="number"
                      value={pomodoroSettings.shortBreak}
                      onChange={(e) =>
                        setPomodoroSettings((prev) => ({ ...prev, shortBreak: Number.parseInt(e.target.value) || 5 }))
                      }
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Long Break (min)</Label>
                    <Input
                      type="number"
                      value={pomodoroSettings.longBreak}
                      onChange={(e) =>
                        setPomodoroSettings((prev) => ({ ...prev, longBreak: Number.parseInt(e.target.value) || 15 }))
                      }
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">Long Break Interval</Label>
                    <Input
                      type="number"
                      value={pomodoroSettings.longBreakInterval}
                      onChange={(e) =>
                        setPomodoroSettings((prev) => ({
                          ...prev,
                          longBreakInterval: Number.parseInt(e.target.value) || 4,
                        }))
                      }
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">Sound Notifications</Label>
                  <input
                    type="checkbox"
                    checked={pomodoroSettings.soundEnabled}
                    onChange={(e) => setPomodoroSettings((prev) => ({ ...prev, soundEnabled: e.target.checked }))}
                    className="rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Task Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Tasks</h2>
        <Button
          onClick={() => setShowAddTask(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Add New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input
                value={newTask.title}
                onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter task description..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300">Due Date</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                  className="bg-gray-800/50 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-300">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) => setNewTask((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Category</Label>
                <Input
                  value={newTask.category}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Work, Personal"
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddTask} className="bg-green-600 hover:bg-green-700 text-white">
                Add Task
              </Button>
              <Button
                onClick={() => setShowAddTask(false)}
                variant="outline"
                className="bg-gray-800/50 border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50">
            <CardContent className="p-8 text-center">
              <CheckSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">No tasks yet. Add your first task to get started!</p>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              className={`bg-gray-900/80 backdrop-blur-xl border-gray-800/50 transition-all duration-300 ${
                task.completed ? "opacity-60" : "hover:shadow-lg hover:scale-[1.02]"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="mt-1 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <h3 className={`font-semibold ${task.completed ? "line-through text-gray-500" : "text-white"}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm mt-1 ${task.completed ? "text-gray-600" : "text-gray-400"}`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {getPriorityIcon(task.priority)}
                          <span className="ml-1 capitalize">{task.priority}</span>
                        </Badge>
                        {task.category && (
                          <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-600">
                            {task.category}
                          </Badge>
                        )}
                        {task.dueDate && (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setEditingTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteTask(task.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
