"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    achievementAlerts: true,
    reminderNotifications: true,

    // Privacy
    profileVisibility: "public",
    showLearningStats: true,
    showBadges: true,
    allowDataExport: true,

    // Appearance
    theme: "system",
    language: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",

    // Account
    twoFactorEnabled: false,
    sessionTimeout: "30",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved successfully!",
        description: "Your preferences have been updated.",
      })
    } catch (error) {
      toast({
        title: "Failed to save settings",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New passwords don't match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      toast({
        title: "Password updated successfully!",
        description: "Your password has been changed.",
      })
    } catch (error) {
      toast({
        title: "Failed to update password",
        description: "Please check your current password and try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportData = () => {
    toast({
      title: "Data export started",
      description: "Your data export will be emailed to you within 24 hours.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Your account deletion request has been submitted.",
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black"></div>

      {/* Header */}
      <div className="relative z-10 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <Separator orientation="vertical" className="h-6 bg-gray-800/50" />
              <h1 className="text-xl font-semibold text-white drop-shadow-lg">Settings</h1>
            </div>

            <Button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="bg-gray-800 hover:bg-gray-700 text-white"
            >
              {isSaving ? "Saving..." : "Save Changes"}
              <Save className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Notifications */}
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-gray-900/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow-lg">
                <Bell className="h-5 w-5 text-white" />
                Notifications
              </CardTitle>
              <CardDescription className="text-gray-300 drop-shadow">
                Manage how you receive notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Email Notifications</Label>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Push Notifications</Label>
                  <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Weekly Reports</Label>
                  <p className="text-sm text-gray-400">Get weekly learning progress reports</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Achievement Alerts</Label>
                  <p className="text-sm text-gray-400">Get notified when you earn new badges</p>
                </div>
                <Switch
                  checked={settings.achievementAlerts}
                  onCheckedChange={(checked) => handleSettingChange("achievementAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Learning Reminders</Label>
                  <p className="text-sm text-gray-400">Daily reminders to log your learning sessions</p>
                </div>
                <Switch
                  checked={settings.reminderNotifications}
                  onCheckedChange={(checked) => handleSettingChange("reminderNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-gray-900/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow-lg">
                <Shield className="h-5 w-5 text-white" />
                Privacy & Security
              </CardTitle>
              <CardDescription className="text-gray-300 drop-shadow">
                Control your privacy settings and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-300">Profile Visibility</Label>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) => handleSettingChange("profileVisibility", value)}
                >
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50">
                    <SelectItem value="public">Public - Anyone can view</SelectItem>
                    <SelectItem value="private">Private - Only you can view</SelectItem>
                    <SelectItem value="friends">Friends - Only connections can view</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Show Learning Statistics</Label>
                  <p className="text-sm text-gray-400">Display your learning hours and progress publicly</p>
                </div>
                <Switch
                  checked={settings.showLearningStats}
                  onCheckedChange={(checked) => handleSettingChange("showLearningStats", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Show Badges</Label>
                  <p className="text-sm text-gray-400">Display your earned badges on your profile</p>
                </div>
                <Switch
                  checked={settings.showBadges}
                  onCheckedChange={(checked) => handleSettingChange("showBadges", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center space-x-2">
                  {settings.twoFactorEnabled && (
                    <Badge
                      variant="secondary"
                      className="bg-green-500/30 backdrop-blur-sm text-white border-green-400/30"
                    >
                      Enabled
                    </Badge>
                  )}
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorEnabled", checked)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Session Timeout</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
                >
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50">
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-gray-900/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow-lg">
                <Palette className="h-5 w-5 text-white" />
                Appearance
              </CardTitle>
              <CardDescription className="text-gray-300 drop-shadow">
                Customize how SkillShare+ looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-300">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50">
                    <SelectItem value="light">
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center space-x-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center space-x-2">
                        <Monitor className="h-4 w-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Language</Label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50">
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Date Format</Label>
                <Select value={settings.dateFormat} onValueChange={(value) => handleSettingChange("dateFormat", value)}>
                  <SelectTrigger className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50">
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-gray-900/75">
            <CardHeader>
              <CardTitle className="text-white drop-shadow-lg">Change Password</CardTitle>
              <CardDescription className="text-gray-300 drop-shadow">Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-gray-300">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                    className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-gray-300">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                    className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-300">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    className="bg-gray-800/50 backdrop-blur-sm border-gray-800/50 text-white placeholder:text-gray-400 focus:border-gray-500 focus:ring-gray-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button onClick={handlePasswordUpdate} className="bg-gray-800 hover:bg-gray-700 text-white">
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Data & Account */}
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:bg-gray-900/75">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white drop-shadow-lg">
                <Globe className="h-5 w-5 text-white" />
                Data & Account
              </CardTitle>
              <CardDescription className="text-gray-300 drop-shadow">
                Manage your data and account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-gray-300">Export Data</Label>
                  <p className="text-sm text-gray-400">Download all your learning data and progress</p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  className="bg-gray-800/50 border-gray-800/50 text-white hover:bg-gray-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>

              <Separator className="bg-gray-800/50" />

              <div className="space-y-4">
                <div className="space-y-0.5">
                  <Label className="text-base text-red-300">Danger Zone</Label>
                  <p className="text-sm text-gray-400">Irreversible and destructive actions</p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full bg-red-600/80 hover:bg-red-700/80 backdrop-blur-sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-gray-100">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-300">
                        This action cannot be undone. This will permanently delete your account and remove all your data
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700 text-gray-300">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
