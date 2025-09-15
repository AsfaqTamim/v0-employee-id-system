"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { EmployeeManagement } from "@/components/employees/employee-management"
import { InstitutionManagement } from "@/components/institutions/institution-management"
import { IdCardPrinting } from "@/components/id-cards/id-card-printing"

interface User {
  username: string
  role: string
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState("dashboard")

  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    // In a real app, this would validate against a backend
    setCurrentUser({ username: credentials.username, role: credentials.role })
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentPage("dashboard")
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview currentUser={currentUser} />
      case "employees":
        return <EmployeeManagement />
      case "institutions":
        return <InstitutionManagement />
      case "id-cards":
        return <IdCardPrinting />
      case "locations":
        return <div className="p-6">Location Management - Coming Soon</div>
      case "offices":
        return <div className="p-6">Office Management - Coming Soon</div>
      case "departments":
        return <div className="p-6">Department Management - Coming Soon</div>
      case "designations":
        return <div className="p-6">Designation Management - Coming Soon</div>
      case "users":
        return <div className="p-6">User Management - Coming Soon</div>
      default:
        return <DashboardOverview currentUser={currentUser} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  )
}
