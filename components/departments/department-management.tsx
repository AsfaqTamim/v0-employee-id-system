"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Plus, Search, Edit, Trash2 } from "lucide-react"

interface Department {
  id: string
  name: string
  code: string
  description: string
  office: string
  headOfDepartment: string
  employeeCount: number
  status: "active" | "inactive"
  createdAt: string
}

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Human Resources",
    code: "HR",
    description: "Manages employee relations and policies",
    office: "Head Office Dhaka",
    headOfDepartment: "John Doe",
    employeeCount: 15,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Information Technology",
    code: "IT",
    description: "Manages technology infrastructure and systems",
    office: "Head Office Dhaka",
    headOfDepartment: "Jane Smith",
    employeeCount: 25,
    status: "active",
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    name: "Finance & Accounting",
    code: "FIN",
    description: "Handles financial operations and accounting",
    office: "Head Office Dhaka",
    headOfDepartment: "Mike Johnson",
    employeeCount: 12,
    status: "active",
    createdAt: "2024-01-17",
  },
]

export function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    office: "",
    headOfDepartment: "",
    status: "active" as const,
  })

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.office.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingDepartment) {
      setDepartments(
        departments.map((dept) =>
          dept.id === editingDepartment.id ? { ...dept, ...formData, employeeCount: dept.employeeCount } : dept,
        ),
      )
    } else {
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...formData,
        employeeCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setDepartments([...departments, newDepartment])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      office: "",
      headOfDepartment: "",
      status: "active",
    })
    setEditingDepartment(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (department: Department) => {
    setEditingDepartment(department)
    setFormData({
      name: department.name,
      code: department.code,
      description: department.description,
      office: department.office,
      headOfDepartment: department.headOfDepartment,
      status: department.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Department Management</h1>
          <p className="text-muted-foreground">Manage organizational departments and their structure</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingDepartment ? "Edit Department" : "Add New Department"}</DialogTitle>
              <DialogDescription>
                {editingDepartment ? "Update department information" : "Create a new organizational department"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Department Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter department name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Department Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Enter department code"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter department description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="office">Office</Label>
                    <Select
                      value={formData.office}
                      onValueChange={(value) => setFormData({ ...formData, office: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select office" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Head Office Dhaka">Head Office Dhaka</SelectItem>
                        <SelectItem value="Regional Office Chittagong">Regional Office Chittagong</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="headOfDepartment">Head of Department</Label>
                    <Input
                      id="headOfDepartment"
                      value={formData.headOfDepartment}
                      onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })}
                      placeholder="Enter head of department"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingDepartment ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Departments
          </CardTitle>
          <CardDescription>
            Total departments: {departments.length} | Total employees:{" "}
            {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Office</TableHead>
                  <TableHead>Head of Department</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">{department.name}</TableCell>
                    <TableCell>{department.code}</TableCell>
                    <TableCell>{department.office}</TableCell>
                    <TableCell>{department.headOfDepartment}</TableCell>
                    <TableCell>{department.employeeCount}</TableCell>
                    <TableCell>
                      <Badge variant={department.status === "active" ? "default" : "secondary"}>
                        {department.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(department)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(department.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
