"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Search, CreditCard, FileEdit, HelpCircle, ArrowRight } from "lucide-react"

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
    <div className="flex min-h-screen flex-col">
      <Navbar onLogin={() => onPageChange("login")} />

      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center space-y-4 py-24 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              What can we help you manage?
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Search for employee information, request new ID cards, or manage your organization efficiently
            </p>
          </div>

          <div className="w-full max-w-2xl space-y-4">
            <div className="flex w-full items-center space-x-2 rounded-lg border bg-background p-2">
              <div className="flex items-center space-x-2 px-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10">
                  <Search className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Search employee...</span>
              </div>
              <Input
                placeholder="Enter Employee ID (e.g., EMP001)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button onClick={handleSearch} disabled={isSearching || !searchId.trim()} size="sm">
                {isSearching ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => onPageChange("new-id-request")} className="gap-2">
                <CreditCard className="h-4 w-4" />
                New ID Request
              </Button>
              <Button variant="outline" size="sm" onClick={() => onPageChange("id-correction")} className="gap-2">
                <FileEdit className="h-4 w-4" />
                ID Correction
              </Button>
              <Button variant="outline" size="sm" onClick={() => onPageChange("faq")} className="gap-2">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </Button>
            </div>
          </div>
        </section>

        {(employee || notFound) && (
          <section className="container py-8">
            {employee && (
              <Card className="mx-auto max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-center">Employee Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={employee.photo || "/placeholder.svg?height=128&width=128"}
                        alt={employee.name}
                        className="w-32 h-32 rounded-lg object-cover border-2 border-border"
                      />
                    </div>
                    <div className="flex-1 space-y-3 text-center md:text-left">
                      <div>
                        <h3 className="text-xl font-semibold">{employee.name}</h3>
                        <p className="text-muted-foreground">{employee.designation}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium">Employee ID:</span>
                          <p className="text-muted-foreground">{employee.id}</p>
                        </div>
                        <div>
                          <span className="font-medium">Department:</span>
                          <p className="text-muted-foreground">{employee.department}</p>
                        </div>
                        <div>
                          <span className="font-medium">Email:</span>
                          <p className="text-muted-foreground">{employee.email}</p>
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>
                          <p className="text-muted-foreground">{employee.phone}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <span className="font-medium">Join Date:</span>
                          <p className="text-muted-foreground">{new Date(employee.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {notFound && (
              <Card className="mx-auto max-w-md border-destructive/50">
                <CardContent className="pt-6 text-center">
                  <p className="text-destructive">No employee found with ID: {searchId}</p>
                  <p className="text-sm text-muted-foreground mt-2">Please check the ID and try again</p>
                </CardContent>
              </Card>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
