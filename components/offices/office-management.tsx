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
import { Briefcase, Plus, Search, Edit, Trash2 } from "lucide-react"

interface Office {
  id: string
  name: string
  code: string
  officeType: string
  location: string
  address: string
  phone: string
  email: string
  status: "active" | "inactive"
  createdAt: string
}

const mockOffices: Office[] = [
  {
    id: "1",
    name: "Head Office Dhaka",
    code: "HO-DHK",
    officeType: "Head Office",
    location: "Dhaka Metropolitan",
    address: "123 Main Street, Dhaka",
    phone: "+880-2-123456",
    email: "ho.dhaka@company.com",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Regional Office Chittagong",
    code: "RO-CTG",
    officeType: "Regional Office",
    location: "Chittagong Division",
    address: "456 Port Road, Chittagong",
    phone: "+880-31-789012",
    email: "ro.ctg@company.com",
    status: "active",
    createdAt: "2024-01-16",
  },
]

export function OfficeManagement() {
  const [offices, setOffices] = useState<Office[]>(mockOffices)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOffice, setEditingOffice] = useState<Office | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    officeType: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    status: "active" as const,
  })

  const filteredOffices = offices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.officeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingOffice) {
      setOffices(offices.map((office) => (office.id === editingOffice.id ? { ...office, ...formData } : office)))
    } else {
      const newOffice: Office = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setOffices([...offices, newOffice])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      officeType: "",
      location: "",
      address: "",
      phone: "",
      email: "",
      status: "active",
    })
    setEditingOffice(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (office: Office) => {
    setEditingOffice(office)
    setFormData({
      name: office.name,
      code: office.code,
      officeType: office.officeType,
      location: office.location,
      address: office.address,
      phone: office.phone,
      email: office.email,
      status: office.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setOffices(offices.filter((office) => office.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Office Management</h1>
          <p className="text-muted-foreground">Manage office locations and their details</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Office
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingOffice ? "Edit Office" : "Add New Office"}</DialogTitle>
              <DialogDescription>
                {editingOffice ? "Update office information" : "Create a new office location"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Office Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter office name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Office Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Enter office code"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="officeType">Office Type</Label>
                    <Select
                      value={formData.officeType}
                      onValueChange={(value) => setFormData({ ...formData, officeType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select office type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Head Office">Head Office</SelectItem>
                        <SelectItem value="Regional Office">Regional Office</SelectItem>
                        <SelectItem value="Branch Office">Branch Office</SelectItem>
                        <SelectItem value="Sub Office">Sub Office</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData({ ...formData, location: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dhaka Metropolitan">Dhaka Metropolitan</SelectItem>
                        <SelectItem value="Chittagong Division">Chittagong Division</SelectItem>
                        <SelectItem value="Dhaka Division">Dhaka Division</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter office address"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingOffice ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Offices
          </CardTitle>
          <CardDescription>Total offices: {offices.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search offices..."
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
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffices.map((office) => (
                  <TableRow key={office.id}>
                    <TableCell className="font-medium">{office.name}</TableCell>
                    <TableCell>{office.code}</TableCell>
                    <TableCell>{office.officeType}</TableCell>
                    <TableCell>{office.location}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{office.phone}</div>
                        <div className="text-muted-foreground">{office.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={office.status === "active" ? "default" : "secondary"}>{office.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(office)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(office.id)}>
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
