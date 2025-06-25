"use client"

import { useState } from "react"
import { User, SettingsIcon, Bell, Shield, Palette, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function SettingsSection() {
  const router = useRouter()

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    pomodoroSound: true,
    autoBreak: false,
    theme: "dark",
    language: "en",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const settingsCategories = [
    {
      id: "profile",
      title: "Profile Settings",
      description: "Manage your account and personal information",
      icon: User,
      action: () => router.push("/dashboard/profile"),
    },
    {
      id: "general",
      title: "General Settings",
      description: "App preferences and general configuration",
      icon: SettingsIcon,
      action: () => router.push("/dashboard/settings"),
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Control how you receive notifications",
      icon: Bell,
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-300">Push Notifications</Label>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-300">Pomodoro Sound</Label>
            <Switch
              checked={settings.pomodoroSound}
              onCheckedChange={(checked) => handleSettingChange("pomodoroSound", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-300">Auto Break Reminders</Label>
            <Switch
              checked={settings.autoBreak}
              onCheckedChange={(checked) => handleSettingChange("autoBreak", checked)}
            />
          </div>
        </div>
      ),
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize the look and feel",
      icon: Palette,
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Theme</Label>
            <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-gray-300">Dark Mode</Label>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
            />
          </div>
        </div>
      ),
    },
    {
      id: "language",
      title: "Language & Region",
      description: "Set your language and regional preferences",
      icon: Globe,
      component: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Language</Label>
            <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">Quick Settings</Badge>
      </div>

      {/* Profile Summary */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-purple-500/30">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
              <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">John Doe</h3>
              <p className="text-gray-400">john.doe@example.com</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Premium User</Badge>
                <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-600">
                  127.5h logged
                </Badge>
              </div>
            </div>
            <Button
              onClick={() => router.push("/dashboard/profile")}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      <div className="space-y-4">
        {settingsCategories.map((category) => {
          const Icon = category.icon

          return (
            <Card
              key={category.id}
              className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-2 rounded-lg border border-purple-500/30">
                      <Icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">{category.title}</CardTitle>
                      <CardDescription className="text-gray-400">{category.description}</CardDescription>
                    </div>
                  </div>
                  {category.action && (
                    <Button
                      onClick={category.action}
                      variant="outline"
                      className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      Configure
                    </Button>
                  )}
                </div>
              </CardHeader>
              {category.component && <CardContent>{category.component}</CardContent>}
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">Common settings and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => router.push("/dashboard/settings")}
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 justify-start"
            >
              <Shield className="h-4 w-4 mr-2" />
              Privacy & Security
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 justify-start"
            >
              <Globe className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 justify-start"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notification Center
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 justify-start"
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              Advanced Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
