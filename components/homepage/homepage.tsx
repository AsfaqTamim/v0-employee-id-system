"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CreditCard, FileEdit, HelpCircle, User } from "lucide-react"

interface Employee {
  id: string
  name: string
  designation: string
  department: string
  email: string
  phone: string
  joinDate: string
  photo: string
}

interface HomepageProps {
  onPageChange: (page: string) => void
  onLogin: (credentials: { username: string; password: string }) => void
}

export function Homepage({ onPageChange, onLogin }: HomepageProps) {
  const [searchId, setSearchId] = useState("")
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  // Mock employee data - in real app this would come from API
  const mockEmployees: Employee[] = [
    {
      id: "EMP001",
      name: "John Doe",
      designation: "Software Engineer",
      department: "IT Department",
      email: "john.doe@company.com",
      phone: "+1 234 567 8900",
      joinDate: "2023-01-15",
      photo: "/professional-headshot.png",
    },
    {
      id: "EMP002",
      name: "Jane Smith",
      designation: "HR Manager",
      department: "Human Resources",
      email: "jane.smith@company.com",
      phone: "+1 234 567 8901",
      joinDate: "2022-03-20",
      photo: "/professional-woman-headshot.png",
    },
  ]

  const handleSearch = () => {
    if (!searchId.trim()) return

    setIsSearching(true)
    setNotFound(false)

    // Simulate API call
    setTimeout(() => {
      const foundEmployee = mockEmployees.find((emp) => emp.id.toLowerCase() === searchId.toLowerCase())

      if (foundEmployee) {
        setEmployee(foundEmployee)
        setNotFound(false)
      } else {
        setEmployee(null)
        setNotFound(true)
      }
      setIsSearching(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">EIMS</h1>
              <span className="ml-2 text-sm text-gray-600">Employee Information Management System</span>
            </div>
            <Button variant="outline" onClick={() => onPageChange("login")} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Admin Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Employee Information System</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for employee information, request new ID cards, or apply for corrections
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Button
            size="lg"
            onClick={() => onPageChange("new-id-request")}
            className="h-16 flex items-center justify-center gap-3 text-base bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
          >
            <CreditCard className="h-5 w-5" />
            New ID Card Request
          </Button>
          <Button
            size="lg"
            onClick={() => onPageChange("id-correction")}
            className="h-16 flex items-center justify-center gap-3 text-base bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
          >
            <FileEdit className="h-5 w-5" />
            ID Card Correction
          </Button>
          <Button
            size="lg"
            onClick={() => onPageChange("faq")}
            className="h-16 flex items-center justify-center gap-3 text-base bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
          >
            <HelpCircle className="h-5 w-5" />
            FAQ
          </Button>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Search Employee</h3>
            <p className="text-gray-600">Enter an employee ID to view their information</p>
          </div>

          <div className="flex gap-2 max-w-md mx-auto mb-6">
            <Input
              placeholder="Enter Employee ID (e.g., EMP001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 text-base border-2 border-gray-200 focus:border-blue-500 rounded-full px-4"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchId.trim()}
              className="px-6 h-12 rounded-full bg-blue-600 hover:bg-blue-700"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Search Results */}
          {employee && (
            <Card className="max-w-2xl mx-auto mt-6">
              <CardHeader>
                <CardTitle className="text-center">Employee Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={employee.photo || "/placeholder.svg"}
                      alt={employee.name}
                      className="w-32 h-32 rounded-lg object-cover border-2 border-gray-200"
                    />
                  </div>
                  <div className="flex-1 space-y-3 text-center md:text-left">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{employee.name}</h3>
                      <p className="text-gray-600">{employee.designation}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Employee ID:</span>
                        <p className="text-gray-600">{employee.id}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Department:</span>
                        <p className="text-gray-600">{employee.department}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <p className="text-gray-600">{employee.email}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <p className="text-gray-600">{employee.phone}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-medium text-gray-700">Join Date:</span>
                        <p className="text-gray-600">{new Date(employee.joinDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {notFound && (
            <Card className="max-w-md mx-auto mt-6 border-red-200">
              <CardContent className="pt-6 text-center">
                <p className="text-red-600">No employee found with ID: {searchId}</p>
                <p className="text-sm text-gray-500 mt-2">Please check the ID and try again</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">EIMS</h3>
              <p className="text-gray-600 text-sm">
                Employee Information Management System for efficient ID card management and employee data handling.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <button onClick={() => onPageChange("new-id-request")} className="hover:text-blue-600">
                    New ID Card Request
                  </button>
                </li>
                <li>
                  <button onClick={() => onPageChange("id-correction")} className="hover:text-blue-600">
                    ID Card Correction
                  </button>
                </li>
                <li>
                  <button onClick={() => onPageChange("faq")} className="hover:text-blue-600">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: support@eims.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Hours: Mon-Fri 9AM-5PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            <p>&copy; 2024 Employee Information Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
