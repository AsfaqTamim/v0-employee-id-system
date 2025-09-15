"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Building, User } from "lucide-react"

interface EmployeeDetailsProps {
  onBack: () => void
}

export function EmployeeDetails({ onBack }: EmployeeDetailsProps) {
  // Mock employee data - in real app this would come from props or API
  const employee = {
    id: "EMP001",
    name: "John Doe",
    designation: "Senior Software Engineer",
    department: "Information Technology",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-01-15",
    location: "New York Office",
    manager: "Jane Smith",
    employeeType: "Full-time",
    status: "Active",
    photo: "/professional-headshot.png",
    address: "123 Main Street, New York, NY 10001",
    emergencyContact: {
      name: "Mary Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    projects: [
      { name: "Employee Management System", role: "Lead Developer", status: "Active" },
      { name: "Customer Portal", role: "Frontend Developer", status: "Completed" },
    ],
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Employees
        </Button>
        <h1 className="text-2xl font-bold">Employee Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <img
                src={employee.photo || "/placeholder.svg"}
                alt={employee.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mx-auto"
              />
            </div>
            <CardTitle className="text-xl">{employee.name}</CardTitle>
            <p className="text-gray-600">{employee.designation}</p>
            <Badge variant={employee.status === "Active" ? "default" : "secondary"}>{employee.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Employee ID</p>
                <p className="text-sm text-gray-600">{employee.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Department</p>
                <p className="text-sm text-gray-600">{employee.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">{employee.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Join Date</p>
                <p className="text-sm text-gray-600">{new Date(employee.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-sm text-gray-600">{employee.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-sm text-gray-600">{employee.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-700">Address</p>
                <p className="text-sm text-gray-600">{employee.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Employee Type</p>
                <p className="text-sm text-gray-600">{employee.employeeType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Manager</p>
                <p className="text-sm text-gray-600">{employee.manager}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Department</p>
                <p className="text-sm text-gray-600">{employee.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Designation</p>
                <p className="text-sm text-gray-600">{employee.designation}</p>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Name</p>
                <p className="text-sm text-gray-600">{employee.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Relationship</p>
                <p className="text-sm text-gray-600">{employee.emergencyContact.relationship}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-sm text-gray-600">{employee.emergencyContact.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employee.projects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-gray-600">{project.role}</p>
                    </div>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
