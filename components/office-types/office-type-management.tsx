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
import { Building2, Plus, Search, Edit, Trash2 } from "lucide-react"

interface OfficeType {
  id: string
  name: string
  code: string
  description: string
  status: "active" | "inactive"
  createdAt: string
}

const mockOfficeTypes: OfficeType[] = [
  {
    id: "1",
    name: "Head Office",
    code: "HO",
    description: "Main administrative office",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Regional Office",
    code: "RO",
    description: "Regional administrative office",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Branch Office",
    code: "BO",
    description: "Local branch office",
    status: "active",
    createdAt: "2024-01-16",
  },
  {
    id: "4",
    name: "Sub Office",
    code: "SO",
    description: "Sub-administrative office",
    status: "active",
    createdAt: "2024-01-17",
  },
]

export function OfficeTypeManagement() {
  const [officeTypes, setOfficeTypes] = useState<OfficeType[]>(mockOfficeTypes)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOfficeType, setEditingOfficeType] = useState<OfficeType | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "active" as const,
  })

  const filteredOfficeTypes = officeTypes.filter(
    (officeType) =>
      officeType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officeType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officeType.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingOfficeType) {
      setOfficeTypes(officeTypes.map((ot) => (ot.id === editingOfficeType.id ? { ...ot, ...formData } : ot)))
    } else {
      const newOfficeType: OfficeType = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setOfficeTypes([...officeTypes, newOfficeType])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      status: "active",
    })
    setEditingOfficeType(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (officeType: OfficeType) => {
    setEditingOfficeType(officeType)
    setFormData({
      name: officeType.name,
      code: officeType.code,
      description: officeType.description,
      status: officeType.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setOfficeTypes(officeTypes.filter((ot) => ot.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Office Type Management</h1>
          <p className="text-muted-foreground">Manage different types of office classifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Office Type
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingOfficeType ? "Edit Office Type" : "Add New Office Type"}</DialogTitle>
              <DialogDescription>
                {editingOfficeType ? "Update office type information" : "Create a new office type classification"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Office Type Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter office type name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Office Type Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Enter office type code"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter office type description"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingOfficeType ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Office Types
          </CardTitle>
          <CardDescription>Total office types: {officeTypes.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search office types..."
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
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOfficeTypes.map((officeType) => (
                  <TableRow key={officeType.id}>
                    <TableCell className="font-medium">{officeType.name}</TableCell>
                    <TableCell>{officeType.code}</TableCell>
                    <TableCell className="max-w-xs truncate">{officeType.description}</TableCell>
                    <TableCell>
                      <Badge variant={officeType.status === "active" ? "default" : "secondary"}>
                        {officeType.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{officeType.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(officeType)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(officeType.id)}>
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
