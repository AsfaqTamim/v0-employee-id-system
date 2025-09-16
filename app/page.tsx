"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { AdminSidebar } from "@/components/layout/admin-sidebar"
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
import { Homepage } from "@/components/homepage/homepage"
import { NewIdCardRequest } from "@/components/pages/new-id-card-request"
import { IdCardCorrection } from "@/components/pages/id-card-correction"
import { FaqPage } from "@/components/pages/faq-page"
import { EmployeeDetails } from "@/components/employees/employee-details"

interface User {
  username: string
  role: string
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState("homepage")

  const handleLogin = (credentials: { username: string; password: string }) => {
    // In a real app, this would validate against a backend and determine role
    setCurrentUser({ username: credentials.username, role: "admin" })
    setCurrentPage("dashboard")
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentPage("homepage")
  }

  if (!currentUser && currentPage === "homepage") {
    return <Homepage onPageChange={setCurrentPage} onLogin={handleLogin} />
  }

  if (!currentUser && currentPage === "login") {
    return <LoginForm onLogin={handleLogin} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "homepage":
        return <Homepage onPageChange={setCurrentPage} onLogin={handleLogin} />
      case "dashboard":
        return <DashboardOverview currentUser={currentUser} />
      case "employees":
        return <EmployeeManagement onViewEmployee={() => setCurrentPage("employee-details")} />
      case "employee-details":
        return <EmployeeDetails onBack={() => setCurrentPage("employees")} />
      case "institutions":
        return <InstitutionManagement />
      case "id-cards":
        return <IdCardPrinting />
      case "new-id-request":
        return <NewIdCardRequest onBack={() => setCurrentPage("homepage")} />
      case "id-correction":
        return <IdCardCorrection onBack={() => setCurrentPage("homepage")} />
      case "faq":
        return <FaqPage onBack={() => setCurrentPage("homepage")} />
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

  if (
    currentPage === "homepage" ||
    currentPage === "new-id-request" ||
    currentPage === "id-correction" ||
    currentPage === "faq"
  ) {
    return <div className="min-h-screen bg-background">{renderPage()}</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-hidden">{renderPage()}</main>
    </div>
  )
}
