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
import { Award, Plus, Search, Edit, Trash2 } from "lucide-react"

interface Designation {
  id: string
  title: string
  code: string
  description: string
  department: string
  level: string
  salaryRange: string
  responsibilities: string
  status: "active" | "inactive"
  createdAt: string
}

const mockDesignations: Designation[] = [
  {
    id: "1",
    title: "Software Engineer",
    code: "SE",
    description: "Develops and maintains software applications",
    department: "Information Technology",
    level: "Mid-Level",
    salaryRange: "50,000 - 70,000",
    responsibilities: "Code development, testing, documentation",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "HR Manager",
    code: "HRM",
    description: "Manages human resources operations",
    department: "Human Resources",
    level: "Senior",
    salaryRange: "80,000 - 100,000",
    responsibilities: "Team management, policy implementation, recruitment",
    status: "active",
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    title: "Financial Analyst",
    code: "FA",
    description: "Analyzes financial data and trends",
    department: "Finance & Accounting",
    level: "Mid-Level",
    salaryRange: "45,000 - 65,000",
    responsibilities: "Financial reporting, analysis, budgeting",
    status: "active",
    createdAt: "2024-01-17",
  },
]

export function DesignationManagement() {
  const [designations, setDesignations] = useState<Designation[]>(mockDesignations)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    department: "",
    level: "",
    salaryRange: "",
    responsibilities: "",
    status: "active" as const,
  })

  const filteredDesignations = designations.filter(
    (designation) =>
      designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      designation.level.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingDesignation) {
      setDesignations(
        designations.map((designation) =>
          designation.id === editingDesignation.id ? { ...designation, ...formData } : designation,
        ),
      )
    } else {
      const newDesignation: Designation = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setDesignations([...designations, newDesignation])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      code: "",
      description: "",
      department: "",
      level: "",
      salaryRange: "",
      responsibilities: "",
      status: "active",
    })
    setEditingDesignation(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (designation: Designation) => {
    setEditingDesignation(designation)
    setFormData({
      title: designation.title,
      code: designation.code,
      description: designation.description,
      department: designation.department,
      level: designation.level,
      salaryRange: designation.salaryRange,
      responsibilities: designation.responsibilities,
      status: designation.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDesignations(designations.filter((designation) => designation.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Designation Management</h1>
          <p className="text-muted-foreground">Manage job positions and their requirements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Designation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingDesignation ? "Edit Designation" : "Add New Designation"}</DialogTitle>
              <DialogDescription>
                {editingDesignation ? "Update designation information" : "Create a new job designation"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Designation Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter designation title"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Designation Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Enter designation code"
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
                    placeholder="Enter designation description"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Information Technology">Information Technology</SelectItem>
                        <SelectItem value="Finance & Accounting">Finance & Accounting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="level">Level</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => setFormData({ ...formData, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry-Level">Entry-Level</SelectItem>
                        <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                        <SelectItem value="Senior">Senior</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salaryRange">Salary Range</Label>
                  <Input
                    id="salaryRange"
                    value={formData.salaryRange}
                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    placeholder="e.g., 50,000 - 70,000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsibilities">Key Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    placeholder="Enter key responsibilities"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingDesignation ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Designations
          </CardTitle>
          <CardDescription>Total designations: {designations.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search designations..."
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
                  <TableHead>Title</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDesignations.map((designation) => (
                  <TableRow key={designation.id}>
                    <TableCell className="font-medium">{designation.title}</TableCell>
                    <TableCell>{designation.code}</TableCell>
                    <TableCell>{designation.department}</TableCell>
                    <TableCell>{designation.level}</TableCell>
                    <TableCell>{designation.salaryRange}</TableCell>
                    <TableCell>
                      <Badge variant={designation.status === "active" ? "default" : "secondary"}>
                        {designation.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(designation)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(designation.id)}>
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
