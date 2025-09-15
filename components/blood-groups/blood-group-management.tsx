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
import { Droplets, Plus, Search, Edit, Trash2 } from "lucide-react"

interface BloodGroup {
  id: string
  type: string
  rhFactor: string
  description: string
  compatibility: string
  employeeCount: number
  status: "active" | "inactive"
  createdAt: string
}

const mockBloodGroups: BloodGroup[] = [
  {
    id: "1",
    type: "A",
    rhFactor: "Positive",
    description: "Blood type A with Rh positive factor",
    compatibility: "Can receive A+, A-, O+, O-",
    employeeCount: 45,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    type: "A",
    rhFactor: "Negative",
    description: "Blood type A with Rh negative factor",
    compatibility: "Can receive A-, O-",
    employeeCount: 12,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    type: "B",
    rhFactor: "Positive",
    description: "Blood type B with Rh positive factor",
    compatibility: "Can receive B+, B-, O+, O-",
    employeeCount: 38,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    type: "B",
    rhFactor: "Negative",
    description: "Blood type B with Rh negative factor",
    compatibility: "Can receive B-, O-",
    employeeCount: 8,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "5",
    type: "AB",
    rhFactor: "Positive",
    description: "Blood type AB with Rh positive factor",
    compatibility: "Universal plasma recipient",
    employeeCount: 15,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "6",
    type: "AB",
    rhFactor: "Negative",
    description: "Blood type AB with Rh negative factor",
    compatibility: "Can receive AB-, A-, B-, O-",
    employeeCount: 3,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "7",
    type: "O",
    rhFactor: "Positive",
    description: "Blood type O with Rh positive factor",
    compatibility: "Can receive O+, O-",
    employeeCount: 52,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "8",
    type: "O",
    rhFactor: "Negative",
    description: "Blood type O with Rh negative factor",
    compatibility: "Universal donor, can only receive O-",
    employeeCount: 18,
    status: "active",
    createdAt: "2024-01-15",
  },
]

export function BloodGroupManagement() {
  const [bloodGroups, setBloodGroups] = useState<BloodGroup[]>(mockBloodGroups)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBloodGroup, setEditingBloodGroup] = useState<BloodGroup | null>(null)
  const [formData, setFormData] = useState({
    type: "",
    rhFactor: "",
    description: "",
    compatibility: "",
    status: "active" as const,
  })

  const filteredBloodGroups = bloodGroups.filter(
    (bloodGroup) =>
      bloodGroup.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bloodGroup.rhFactor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bloodGroup.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingBloodGroup) {
      setBloodGroups(
        bloodGroups.map((bg) =>
          bg.id === editingBloodGroup.id ? { ...bg, ...formData, employeeCount: bg.employeeCount } : bg,
        ),
      )
    } else {
      const newBloodGroup: BloodGroup = {
        id: Date.now().toString(),
        ...formData,
        employeeCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setBloodGroups([...bloodGroups, newBloodGroup])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      type: "",
      rhFactor: "",
      description: "",
      compatibility: "",
      status: "active",
    })
    setEditingBloodGroup(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (bloodGroup: BloodGroup) => {
    setEditingBloodGroup(bloodGroup)
    setFormData({
      type: bloodGroup.type,
      rhFactor: bloodGroup.rhFactor,
      description: bloodGroup.description,
      compatibility: bloodGroup.compatibility,
      status: bloodGroup.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setBloodGroups(bloodGroups.filter((bg) => bg.id !== id))
  }

  const totalEmployees = bloodGroups.reduce((sum, bg) => sum + bg.employeeCount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blood Group Management</h1>
          <p className="text-muted-foreground">Manage employee blood group information for medical emergencies</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Blood Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingBloodGroup ? "Edit Blood Group" : "Add New Blood Group"}</DialogTitle>
              <DialogDescription>
                {editingBloodGroup ? "Update blood group information" : "Create a new blood group entry"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Blood Type</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      placeholder="A, B, AB, O"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rhFactor">Rh Factor</Label>
                    <Input
                      id="rhFactor"
                      value={formData.rhFactor}
                      onChange={(e) => setFormData({ ...formData, rhFactor: e.target.value })}
                      placeholder="Positive, Negative"
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
                    placeholder="Enter blood group description"
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="compatibility">Compatibility</Label>
                  <Textarea
                    id="compatibility"
                    value={formData.compatibility}
                    onChange={(e) => setFormData({ ...formData, compatibility: e.target.value })}
                    placeholder="Enter compatibility information"
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingBloodGroup ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blood Groups</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bloodGroups.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">O+</div>
            <p className="text-xs text-muted-foreground">52 employees</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rarest</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AB-</div>
            <p className="text-xs text-muted-foreground">3 employees</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Blood Groups
          </CardTitle>
          <CardDescription>Blood group distribution across all employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blood groups..."
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
                  <TableHead>Blood Type</TableHead>
                  <TableHead>Rh Factor</TableHead>
                  <TableHead>Full Type</TableHead>
                  <TableHead>Employee Count</TableHead>
                  <TableHead>Compatibility</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBloodGroups.map((bloodGroup) => (
                  <TableRow key={bloodGroup.id}>
                    <TableCell className="font-medium">{bloodGroup.type}</TableCell>
                    <TableCell>{bloodGroup.rhFactor}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {bloodGroup.type}
                        {bloodGroup.rhFactor === "Positive" ? "+" : "-"}
                      </Badge>
                    </TableCell>
                    <TableCell>{bloodGroup.employeeCount}</TableCell>
                    <TableCell className="max-w-xs truncate">{bloodGroup.compatibility}</TableCell>
                    <TableCell>
                      <Badge variant={bloodGroup.status === "active" ? "default" : "secondary"}>
                        {bloodGroup.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(bloodGroup)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(bloodGroup.id)}>
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
