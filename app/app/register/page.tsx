"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

declare module 'next/navigation';

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = () => {
    localStorage.setItem("registered", "true") // Save registration
    router.push("/dashboard") // Redirect to dashboard
}
return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="p-6 bg-white rounded-xl shadow-xl space-y-6 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center">Welcome to SkillShare+</h1>
        <p className="text-gray-600 text-center">Register to start using your dashboard</p>
        <button
          onClick={handleRegister}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow"
        >
          Register Now
        </button>
      </div>
    </div>
  )
}
