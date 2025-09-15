"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { EmployeeManagement } from "@/components/employees/employee-management"
import { InstitutionManagement } from "@/components/institutions/institution-management"
import { IdCardPrinting } from "@/components/id-cards/id-card-printing"
import { LocationManagement } from "@/components/locations/location-management"
import { OfficeTypeManagement } from "@/components/office-types/office-type-management"
import { OfficeManagement } from "@/components/offices/office-management"
import { DepartmentManagement } from "@/components/departments/department-management"
import { DesignationManagement } from "@/components/designations/designation-management"
import { GradeManagement } from "@/components/grades/grade-management"
import { BloodGroupManagement } from "@/components/blood-groups/blood-group-management"
import { UserManagement } from "@/components/users/user-management"
import { RoleManagement } from "@/components/roles/role-management"
import { PermissionManagement } from "@/components/permissions/permission-management"

interface User {
  username: string
  role: string
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState("dashboard")

  const handleLogin = (credentials: { username: string; password: string }) => {
    // In a real app, this would validate against a backend and determine role
    setCurrentUser({ username: credentials.username, role: "admin" })
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
        return <LocationManagement />
      case "office-types":
        return <OfficeTypeManagement />
      case "offices":
        return <OfficeManagement />
      case "departments":
        return <DepartmentManagement />
      case "designations":
        return <DesignationManagement />
      case "grades":
        return <GradeManagement />
      case "blood-groups":
        return <BloodGroupManagement />
      case "users":
        return <UserManagement />
      case "roles":
        return <RoleManagement />
      case "permissions":
        return <PermissionManagement />
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
