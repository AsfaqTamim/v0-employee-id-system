"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Star, Plus, Search, Edit, Trash2 } from "lucide-react"

interface Grade {
  id: string
  name: string
  code: string
  level: number
  description: string
  salaryMin: number
  salaryMax: number
  benefits: string
  status: "active" | "inactive"
  createdAt: string
}

const mockGrades: Grade[] = [
  {
    id: "1",
    name: "Grade A",
    code: "GA",
    level: 1,
    description: "Executive level position",
    salaryMin: 100000,
    salaryMax: 150000,
    benefits: "Full benefits package, company car, housing allowance",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Grade B",
    code: "GB",
    level: 2,
    description: "Senior management position",
    salaryMin: 80000,
    salaryMax: 120000,
    benefits: "Full benefits package, performance bonus",
    status: "active",
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    name: "Grade C",
    code: "GC",
    level: 3,
    description: "Mid-level management position",
    salaryMin: 60000,
    salaryMax: 90000,
    benefits: "Health insurance, annual bonus",
    status: "active",
    createdAt: "2024-01-17",
  },
  {
    id: "4",
    name: "Grade D",
    code: "GD",
    level: 4,
    description: "Junior level position",
    salaryMin: 40000,
    salaryMax: 60000,
    benefits: "Health insurance, training opportunities",
    status: "active",
    createdAt: "2024-01-18",
  },
]

export function GradeManagement() {
  const [grades, setGrades] = useState<Grade[]>(mockGrades)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    level: 1,
    description: "",
    salaryMin: 0,
    salaryMax: 0,
    benefits: "",
    status: "active" as const,
  })

  const filteredGrades = grades.filter(
    (grade) =>
      grade.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingGrade) {
      setGrades(grades.map((grade) => (grade.id === editingGrade.id ? { ...grade, ...formData } : grade)))
    } else {
      const newGrade: Grade = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setGrades([...grades, newGrade])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      level: 1,
      description: "",
      salaryMin: 0,
      salaryMax: 0,
      benefits: "",
      status: "active",
    })
    setEditingGrade(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (grade: Grade) => {
    setEditingGrade(grade)
    setFormData({
      name: grade.name,
      code: grade.code,
      level: grade.level,
      description: grade.description,
      salaryMin: grade.salaryMin,
      salaryMax: grade.salaryMax,
      benefits: grade.benefits,
      status: grade.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setGrades(grades.filter((grade) => grade.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grade Management</h1>
          <p className="text-muted-foreground">Manage employee grades and salary structures</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Grade
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingGrade ? "Edit Grade" : "Add New Grade"}</DialogTitle>
              <DialogDescription>
                {editingGrade ? "Update grade information" : "Create a new employee grade"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Grade Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter grade name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Grade Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Enter grade code"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="level">Level</Label>
                    <Input
                      id="level"
                      type="number"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: Number.parseInt(e.target.value) || 1 })}
                      placeholder="Enter level"
                      min="1"
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
                    placeholder="Enter grade description"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="salaryMin">Minimum Salary</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => setFormData({ ...formData, salaryMin: Number.parseInt(e.target.value) || 0 })}
                      placeholder="Enter minimum salary"
                      min="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="salaryMax">Maximum Salary</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => setFormData({ ...formData, salaryMax: Number.parseInt(e.target.value) || 0 })}
                      placeholder="Enter maximum salary"
                      min="0"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    placeholder="Enter benefits and perks"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingGrade ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Employee Grades
          </CardTitle>
          <CardDescription>Total grades: {grades.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search grades..."
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
                  <TableHead>Level</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.name}</TableCell>
                    <TableCell>{grade.code}</TableCell>
                    <TableCell>{grade.level}</TableCell>
                    <TableCell>
                      ${grade.salaryMin.toLocaleString()} - ${grade.salaryMax.toLocaleString()}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{grade.description}</TableCell>
                    <TableCell>
                      <Badge variant={grade.status === "active" ? "default" : "secondary"}>{grade.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(grade)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(grade.id)}>
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
