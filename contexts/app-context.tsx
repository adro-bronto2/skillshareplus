"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  completed: boolean
  createdAt: string
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: "task" | "event" | "reminder"
  priority?: "low" | "medium" | "high" | "urgent"
  description?: string
  taskId?: string
}

interface JournalEntry {
  id: string
  title: string
  content: string
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface LearningSession {
  id: string
  topic: string
  hours: number
  notes: string
  date: string
}

interface AppContextType {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void

  events: CalendarEvent[]
  setEvents: (events: CalendarEvent[]) => void
  addEvent: (event: Omit<CalendarEvent, "id">) => void

  journalEntries: JournalEntry[]
  setJournalEntries: (entries: JournalEntry[]) => void
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => void

  sessions: LearningSession[]
  setSessions: (sessions: LearningSession[]) => void
  addSession: (session: Omit<LearningSession, "id">) => void

  achievements: string[]
  addAchievement: (achievement: string) => void

  streakCount: number
  updateStreak: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>("events", [])
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>("journalEntries", [])
  const [sessions, setSessions] = useLocalStorage<LearningSession[]>("sessions", [
    {
      id: "1",
      topic: "JavaScript ES6 Features",
      hours: 2,
      notes: "Learned about arrow functions, destructuring, and async/await",
      date: "2024-01-20",
    },
    {
      id: "2",
      topic: "React State Management",
      hours: 3.5,
      notes: "Deep dive into useState, useEffect, and custom hooks",
      date: "2024-01-21",
    },
  ])
  const [achievements, setAchievements] = useLocalStorage<string[]>("achievements", [])
  const [streakCount, setStreakCount] = useLocalStorage<number>("streakCount", 0)

  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    const updatedTasks = [newTask, ...tasks]
    setTasks(updatedTasks)

    // Auto-add to calendar if has due date
    if (taskData.dueDate) {
      addEvent({
        title: taskData.title,
        date: taskData.dueDate,
        type: "task",
        priority: taskData.priority,
        description: taskData.description,
        taskId: newTask.id,
      })
    }

    // Check for achievements
    if (updatedTasks.length === 1) {
      addAchievement("First Task Created! 🎯")
    } else if (updatedTasks.length === 10) {
      addAchievement("Task Master! 📋")
    }
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    setTasks(updatedTasks)

    // Update calendar event if due date changed
    const task = tasks.find((t) => t.id === id)
    if (task && updates.dueDate && updates.dueDate !== task.dueDate) {
      const existingEvent = events.find((e) => e.taskId === id)
      if (existingEvent) {
        const updatedEvents = events.map((event) =>
          event.taskId === id ? { ...event, date: updates.dueDate!, title: updates.title || event.title } : event,
        )
        setEvents(updatedEvents)
      } else if (updates.dueDate) {
        addEvent({
          title: updates.title || task.title,
          date: updates.dueDate,
          type: "task",
          priority: updates.priority || task.priority,
          taskId: id,
        })
      }
    }
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
    // Remove associated calendar event
    setEvents(events.filter((event) => event.taskId !== id))
  }

  const addEvent = (eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Date.now().toString(),
    }
    setEvents([...events, newEvent])
  }

  const addJournalEntry = (entryData: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedEntries = [newEntry, ...journalEntries]
    setJournalEntries(updatedEntries)

    // Check for achievements
    if (updatedEntries.length === 1) {
      addAchievement("First Journal Entry! 📝")
    } else if (updatedEntries.length === 7) {
      addAchievement("Week of Reflection! 🌟")
    }
  }

  const addSession = (sessionData: Omit<LearningSession, "id">) => {
    const newSession: LearningSession = {
      ...sessionData,
      id: Date.now().toString(),
    }

    const updatedSessions = [newSession, ...sessions]
    setSessions(updatedSessions)

    // Check for achievements
    const totalHours = updatedSessions.reduce((sum, s) => sum + s.hours, 0)
    if (totalHours >= 10 && totalHours < 10.5) {
      addAchievement("10 Hours Milestone! ⏰")
    } else if (totalHours >= 50 && totalHours < 50.5) {
      addAchievement("Learning Champion! 🏆")
    } else if (totalHours >= 100 && totalHours < 100.5) {
      addAchievement("Century Club! 💯")
    }

    updateStreak()
  }

  const addAchievement = (achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements([...achievements, achievement])
    }
  }

  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    const todaySessions = sessions.filter((s) => s.date === today)
    const yesterdaySessions = sessions.filter((s) => s.date === yesterday)

    if (todaySessions.length > 0) {
      if (yesterdaySessions.length > 0 || streakCount === 0) {
        setStreakCount(streakCount + 1)
      }
    }
  }

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        addTask,
        updateTask,
        deleteTask,
        events,
        setEvents,
        addEvent,
        journalEntries,
        setJournalEntries,
        addJournalEntry,
        sessions,
        setSessions,
        addSession,
        achievements,
        addAchievement,
        streakCount,
        updateStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
