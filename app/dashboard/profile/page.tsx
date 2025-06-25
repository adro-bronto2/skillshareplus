"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Camera, Save, User, Mail, Calendar, MapPin, Phone, Globe, Edit3, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate learner focused on web development and design. Always exploring new technologies and sharing knowledge with the community.",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.dev",
    joinDate: "2024-01-15",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  const [editData, setEditData] = useState(profileData)

  const stats = {
    totalHours: 127.5,
    totalSessions: 45,
    streak: 12,
    badges: ["Early Adopter", "Consistent Learner", "JavaScript Expert", "React Specialist"],
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData(profileData)
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setProfileData(editData)
      setIsEditing(false)

      toast({
        title: "Profile updated successfully!",
        description: "Your profile information has been saved.",
      })
    } catch (error) {
      toast({
        title: "Failed to update profile",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAvatarChange = () => {
    // In a real app, this would open a file picker
    toast({
      title: "Avatar upload",
      description: "Avatar upload functionality would be implemented here.",
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-pink-900/20 to-yellow-900/10 opacity-75 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-900/20 via-blue-900/30 to-violet-900/40 opacity-60 animate-gradient-y"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-rose-900/20 via-purple-900/30 to-indigo-900/20 opacity-40 animate-gradient-xy"></div>
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
          <Sparkles className="h-4 w-4 text-yellow-300/70" />
        </div>
        <div className="absolute bottom-32 left-40 animate-twinkle">
          <Sparkles className="h-5 w-5 text-pink-400/60" />
        </div>
        <div className="absolute bottom-20 right-20 animate-twinkle-delayed">
          <Sparkles className="h-6 w-6 text-blue-400/70" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="flex items-center space-x-2 text-gray-400 hover:bg-white/20 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <h1 className="text-xl font-semibold text-white drop-shadow-lg">Profile</h1>
            </div>

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                    <Save className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleEdit}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Edit Profile
                  <Edit3 className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:bg-gray-900/90">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-white/50 shadow-2xl">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl">
                        {profileData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-white/90 border-white/50 hover:bg-white"
                        onClick={handleAvatarChange}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-white drop-shadow-lg">{profileData.name}</h2>
                  <p className="text-gray-400 drop-shadow">{profileData.email}</p>

                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined{" "}
                    {new Date(profileData.joinDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  <Separator className="my-6 bg-white/30" />

                  {/* Stats */}
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Hours</span>
                      <span className="font-semibold text-white drop-shadow">{stats.totalHours}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Sessions</span>
                      <span className="font-semibold text-white drop-shadow">{stats.totalSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Current Streak</span>
                      <span className="font-semibold text-white drop-shadow">{stats.streak} days</span>
                    </div>
                  </div>

                  <Separator className="my-6 bg-white/30" />

                  {/* Badges */}
                  <div className="w-full">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Achievements</h3>
                    <div className="flex flex-wrap gap-2">
                      {stats.badges.map((badge, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:bg-gray-900/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white drop-shadow-lg">
                  <User className="h-5 w-5 text-white" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400 drop-shadow">
                  {isEditing ? "Update your personal details" : "Your personal information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-400">
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                        <User className="h-4 w-4 text-white/60" />
                        <span className="text-white">{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-400">
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                        <Mail className="h-4 w-4 text-white/60" />
                        <span className="text-white">{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-400">
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                        <Phone className="h-4 w-4 text-white/60" />
                        <span className="text-white">{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-400">
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                        <MapPin className="h-4 w-4 text-white/60" />
                        <span className="text-white">{profileData.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="website" className="text-gray-400">
                      Website
                    </Label>
                    {isEditing ? (
                      <Input
                        id="website"
                        value={editData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                        <Globe className="h-4 w-4 text-white/60" />
                        <a
                          href={profileData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-white/80 transition-colors"
                        >
                          {profileData.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-400">
                    Bio
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={editData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                      className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                      <p className="text-white">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Learning Preferences */}
            <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:bg-gray-900/90">
              <CardHeader>
                <CardTitle className="text-white drop-shadow-lg">Learning Preferences</CardTitle>
                <CardDescription className="text-gray-400 drop-shadow">
                  Your learning goals and interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-400">Favorite Topics</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["JavaScript", "React", "TypeScript", "CSS", "Node.js", "Python"].map((topic) => (
                        <Badge
                          key={topic}
                          variant="outline"
                          className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all duration-300"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-400">Learning Goals</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                        <span className="text-sm text-white">Complete 100 hours of learning</span>
                        <Badge
                          variant="secondary"
                          className="bg-green-500/30 backdrop-blur-sm text-white border-green-400/30"
                        >
                          {Math.round((stats.totalHours / 100) * 100)}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20">
                        <span className="text-sm text-white">Maintain 30-day streak</span>
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/30 backdrop-blur-sm text-white border-blue-400/30"
                        >
                          {Math.round((stats.streak / 30) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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
            transform: translate(0%, 0%) rotate(0deg);
          }
          25% {
            transform: translate(-25%, -25%) rotate(90deg);
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg);
          }
          75% {
            transform: translate(-25%, -25%) rotate(270deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        @keyframes twinkle-delayed {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.3) rotate(180deg);
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
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-twinkle-delayed {
          animation: twinkle-delayed 4s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  )
}
