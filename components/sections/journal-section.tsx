"use client"

import { useState } from "react"
import { Plus, Search, Calendar, BookOpen, Edit3, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface JournalEntry {
  id: string
  title: string
  content: string
  mood: "great" | "good" | "okay" | "bad" | "terrible"
  tags: string[]
  createdAt: string
  updatedAt: string
}

export function JournalSection() {
  const { toast } = useToast()

  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "First Day of Learning",
      content: "Today I started my learning journey with React and TypeScript. It's challenging but exciting!",
      mood: "great",
      tags: ["learning", "react", "typescript"],
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
  ])

  const [showNewEntry, setShowNewEntry] = useState(false)
  const [editingEntry, setEditingEntry] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "okay" as JournalEntry["mood"],
    tags: [] as string[],
    tagInput: "",
  })

  const moods = [
    { value: "great", label: "Great 😄", color: "bg-green-500/20 text-green-300 border-green-400/30" },
    { value: "good", label: "Good 😊", color: "bg-blue-500/20 text-blue-300 border-blue-400/30" },
    { value: "okay", label: "Okay 😐", color: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30" },
    { value: "bad", label: "Bad 😞", color: "bg-orange-500/20 text-orange-300 border-orange-400/30" },
    { value: "terrible", label: "Terrible 😢", color: "bg-red-500/20 text-red-300 border-red-400/30" },
  ]

  const handleAddEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setEntries([entry, ...entries])
    setNewEntry({
      title: "",
      content: "",
      mood: "okay",
      tags: [],
      tagInput: "",
    })
    setShowNewEntry(false)

    toast({
      title: "Journal entry added!",
      description: "Your thoughts have been saved.",
    })
  }

  const handleAddTag = () => {
    if (newEntry.tagInput.trim() && !newEntry.tags.includes(newEntry.tagInput.trim())) {
      setNewEntry((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: "",
      }))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setNewEntry((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleDeleteEntry = (entryId: string) => {
    setEntries(entries.filter((entry) => entry.id !== entryId))
    toast({
      title: "Entry deleted",
      description: "Journal entry has been removed.",
    })
  }

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getMoodColor = (mood: JournalEntry["mood"]) => {
    return moods.find((m) => m.value === mood)?.color || moods[2].color
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Journal</h2>
        <Button
          onClick={() => setShowNewEntry(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search entries..."
          className="pl-10 bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* New Entry Form */}
      {showNewEntry && (
        <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">New Journal Entry</CardTitle>
            <CardDescription className="text-gray-400">Capture your thoughts and reflections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input
                value={newEntry.title}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="What's on your mind?"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label className="text-gray-300">Content</Label>
              <Textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Write your thoughts here..."
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
              />
            </div>

            <div>
              <Label className="text-gray-300">Mood</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setNewEntry((prev) => ({ ...prev, mood: mood.value as JournalEntry["mood"] }))}
                    className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                      newEntry.mood === mood.value
                        ? mood.color
                        : "bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-700/50"
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Tags</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  value={newEntry.tagInput}
                  onChange={(e) => setNewEntry((prev) => ({ ...prev, tagInput: e.target.value }))}
                  placeholder="Add a tag..."
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button
                  onClick={handleAddTag}
                  variant="outline"
                  className="bg-gray-800/50 border-gray-700 text-gray-300"
                >
                  Add
                </Button>
              </div>
              {newEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newEntry.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-purple-500/20 text-purple-300 border-purple-400/30 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddEntry} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
              <Button
                onClick={() => setShowNewEntry(false)}
                variant="outline"
                className="bg-gray-800/50 border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">
                {searchTerm
                  ? "No entries match your search."
                  : "No journal entries yet. Start writing your first entry!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card
              key={entry.id}
              className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{entry.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Badge className={getMoodColor(entry.mood)}>
                        {moods.find((m) => m.value === entry.mood)?.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setEditingEntry(entry.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteEntry(entry.id)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">{entry.content}</p>

                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-600">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
