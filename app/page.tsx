"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function AuthForms() {
  const router = useRouter()
  const { toast } = useToast()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      console.log("Login data:", loginData)

      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      })

      // Redirect to dashboard using App Router navigation
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (registerData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful registration
      console.log("Register data:", registerData)

      toast({
        title: "Account created successfully!",
        description: "Welcome to SkillShare+. Redirecting to your dashboard...",
      })

      // Redirect to dashboard using App Router navigation
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialAuth = async (provider: string) => {
    setIsLoading(true)

    try {
      // Simulate social auth
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: `${provider} authentication successful!`,
        description: "Redirecting to your dashboard...",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: `Failed to authenticate with ${provider}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginChange = (field: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegisterChange = (field: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }))
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
          <Sparkles className="h-4 w-4 text-yellow-400/70" />
        </div>
        <div className="absolute bottom-32 left-40 animate-twinkle">
          <Sparkles className="h-5 w-5 text-pink-400/60" />
        </div>
        <div className="absolute bottom-20 right-20 animate-twinkle-delayed">
          <Sparkles className="h-6 w-6 text-blue-400/70" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6 animate-fade-in-up">
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20 animate-glow">
              <User className="h-10 w-10 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-4xl font-bold text-white drop-shadow-2xl mb-3 animate-slide-in-left">
              Welcome to SkillShare+
            </h1>
            <p className="text-white/90 text-lg drop-shadow-lg animate-slide-in-right">
              Sign in to your account or create a new one
            </p>
          </div>

          <Card className="bg-gray-900/95 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 animate-fade-in-up-delayed hover:scale-[1.02]">
            <CardContent className="p-0">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-gray-800/80 to-gray-700/80 m-6 mb-0 backdrop-blur-sm">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 data-[state=active]:scale-105"
                    disabled={isLoading}
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300 data-[state=active]:scale-105"
                    disabled={isLoading}
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login" className="p-6 pt-4 animate-fade-in">
                  <CardHeader className="px-0 pt-2">
                    <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Sign In
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Enter your credentials to access your dashboard
                    </CardDescription>
                  </CardHeader>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div className="space-y-2 animate-slide-in-left">
                      <Label htmlFor="login-email" className="text-sm font-medium text-gray-200">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="Enter your email"
                          value={loginData.email}
                          onChange={(e) => handleLoginChange("email", e.target.value)}
                          className="pl-10 h-12 bg-gray-800/50 border-gray-700/50 focus:border-purple-400 focus:ring-purple-300 transition-all duration-300 hover:shadow-md text-gray-300 placeholder:text-gray-500"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 animate-slide-in-right">
                      <Label htmlFor="login-password" className="text-sm font-medium text-gray-200">
                        Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => handleLoginChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12 bg-gray-800/50 border-gray-700/50 focus:border-purple-400 focus:ring-purple-300 transition-all duration-300 hover:shadow-md text-gray-300 placeholder:text-gray-500"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm animate-fade-in">
                      <label className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-colors"
                          disabled={isLoading}
                        />
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors">Remember me</span>
                      </label>
                      <button
                        type="button"
                        className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50 transition-colors duration-200 hover:underline"
                        disabled={isLoading}
                      >
                        Forgot password?
                      </button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 group animate-pulse-button bg-size-200 hover:bg-pos-100"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 animate-fade-in-delayed">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full bg-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gray-900 px-3 text-gray-400 font-medium">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-12 bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                        onClick={() => handleSocialAuth("Google")}
                        disabled={isLoading}
                      >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                        onClick={() => handleSocialAuth("Facebook")}
                        disabled={isLoading}
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Registration Form */}
                <TabsContent value="register" className="p-6 pt-4 animate-fade-in">
                  <CardHeader className="px-0 pt-2">
                    <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Create Account
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Fill in your information to get started with your dashboard
                    </CardDescription>
                  </CardHeader>

                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <div className="space-y-2 animate-slide-in-left">
                      <Label htmlFor="register-name" className="text-sm font-medium text-gray-200">
                        Full Name
                      </Label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Enter your full name"
                          value={registerData.name}
                          onChange={(e) => handleRegisterChange("name", e.target.value)}
                          className="pl-10 h-12 bg-gray-800/50 border-gray-700/50 focus:border-purple-400 focus:ring-purple-300 transition-all duration-300 hover:shadow-md text-gray-300 placeholder:text-gray-500"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 animate-slide-in-right">
                      <Label htmlFor="register-email" className="text-sm font-medium text-gray-200">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          value={registerData.email}
                          onChange={(e) => handleRegisterChange("email", e.target.value)}
                          className="pl-10 h-12 bg-gray-800/50 border-gray-700/50 focus:border-purple-400 focus:ring-purple-300 transition-all duration-300 hover:shadow-md text-gray-300 placeholder:text-gray-500"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 animate-slide-in-left">
                      <Label htmlFor="register-password" className="text-sm font-medium text-gray-200">
                        Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password (min. 8 characters)"
                          value={registerData.password}
                          onChange={(e) => handleRegisterChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12 bg-gray-800/50 border-gray-700/50 focus:border-purple-400 focus:ring-purple-300 transition-all duration-300 hover:shadow-md text-gray-300 placeholder:text-gray-500"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 animate-slide-in-right">
                      <Label htmlFor="register-confirm-password" className="text-sm font-medium text-gray-200">
                        Confirm Password
                      </Label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={registerData.confirmPassword}
                          onChange={(e) => handleRegisterChange("confirmPassword", e.target.value)}
                          className="pl-10 pr-10 h-12 bg-gray-800/50 border-gray-700/50 focus:border-purple-400 focus:ring-purple-300 transition-all duration-300 hover:shadow-md text-gray-300 placeholder:text-gray-500"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                          disabled={isLoading}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 text-sm animate-fade-in">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-0.5 transition-colors"
                        disabled={isLoading}
                        required
                      />
                      <span className="text-gray-300">
                        I agree to the{" "}
                        <button
                          type="button"
                          className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                        >
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                        >
                          Privacy Policy
                        </button>
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 group animate-pulse-button bg-size-200 hover:bg-pos-100"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-4 animate-fade-in-delayed">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full bg-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gray-900 px-3 text-gray-400 font-medium">Or sign up with</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-12 bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                        onClick={() => handleSocialAuth("Google")}
                        disabled={isLoading}
                      >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12 bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-lg"
                        onClick={() => handleSocialAuth("Facebook")}
                        disabled={isLoading}
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-300 mt-6 drop-shadow-lg animate-fade-in-delayed">
            Protected by industry-standard encryption and security measures
          </p>
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
        @keyframes fade-in-up-delayed {
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
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-delayed {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
          }
        }
        @keyframes pulse-button {
          0%, 100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.4);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.8);
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
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-fade-in-up-delayed {
          animation: fade-in-up-delayed 1s ease-out 0.3s both;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s ease-out 0.5s both;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-pulse-button {
          animation: pulse-button 2s ease-in-out infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .hover\\:bg-pos-100:hover {
          background-position: 100% 100%;
        }
      `}</style>
    </div>
  )
}
