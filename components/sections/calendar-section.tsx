"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Eye, Edit3, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/contexts/app-context"
import { useToast } from "@/hooks/use-toast"

export function CalendarSection() {
  const { events, addEvent, setEvents } = useApp()
  const { toast } = useToast()

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "event" as const,
    priority: "medium" as const,
  })

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const today = new Date()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDate = (date: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
    return events.filter((event) => event.date === dateString)
  }

  const isToday = (date: number) => {
    return (
      today.getDate() === date &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    )
  }

  const isSelected = (date: number) => {
    return (
      selectedDate &&
      selectedDate.getDate() === date &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const handleDateClick = (date: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), date))
  }

  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return

    const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`

    addEvent({
      title: newEvent.title,
      date: dateString,
      type: newEvent.type,
      priority: newEvent.priority,
      description: newEvent.description,
    })

    setNewEvent({
      title: "",
      description: "",
      type: "event",
      priority: "medium",
    })
    setShowAddEvent(false)

    toast({
      title: "Event added successfully!",
      description: `"${newEvent.title}" has been added to your calendar.`,
    })
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId))
    toast({
      title: "Event deleted",
      description: "Event has been removed from your calendar.",
    })
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      case "event":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      case "reminder":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Calendar</h2>
        <Button
          onClick={() => setShowAddEvent(true)}
          disabled={!selectedDate}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                onClick={() => navigateMonth("prev")}
                variant="outline"
                size="sm"
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setCurrentDate(new Date())}
                variant="outline"
                size="sm"
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                Today
              </Button>
              <Button
                onClick={() => navigateMonth("next")}
                variant="outline"
                size="sm"
                className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                {day}
              </div>
            ))}

            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="p-2 h-20"></div>
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = i + 1
              const dayEvents = getEventsForDate(date)

              return (
                <div
                  key={date}
                  onClick={() => handleDateClick(date)}
                  className={`
                    p-2 h-20 border border-gray-700/50 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800/50
                    ${isToday(date) ? "bg-purple-600/20 border-purple-500/50" : ""}
                    ${isSelected(date) ? "bg-blue-600/20 border-blue-500/50 ring-2 ring-blue-500/30" : ""}
                  `}
                >
                  <div className={`text-sm font-medium mb-1 ${isToday(date) ? "text-purple-300" : "text-white"}`}>
                    {date}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`w-full h-1 rounded-full ${getPriorityColor(event.priority)}`}
                        title={event.title}
                      />
                    ))}
                    {dayEvents.length > 2 && <div className="text-xs text-gray-400">+{dayEvents.length - 2}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Event Form */}
      {showAddEvent && selectedDate && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">
              Add Event for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter event description..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Type</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value: any) => setNewEvent((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="reminder">Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Priority</Label>
                <Select
                  value={newEvent.priority}
                  onValueChange={(value: any) => setNewEvent((prev) => ({ ...prev, priority: value }))}
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
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddEvent} className="bg-green-600 hover:bg-green-700 text-white">
                Add Event
              </Button>
              <Button
                onClick={() => setShowAddEvent(false)}
                variant="outline"
                className="bg-gray-800/50 border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Date Events */}
      {selectedDate && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Events for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForDate(selectedDate.getDate()).length === 0 ? (
              <p className="text-gray-400 text-center py-4">No events for this date</p>
            ) : (
              <div className="space-y-3">
                {getEventsForDate(selectedDate.getDate()).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`} />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{event.title}</h4>
                        {event.description && <p className="text-gray-400 text-sm mt-1">{event.description}</p>}
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                          {event.priority && (
                            <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                              {event.priority}
                            </Badge>
                          )}
                          {event.taskId && (
                            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                              From Task
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteEvent(event.id)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
