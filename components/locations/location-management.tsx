"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { MapPin, Plus, Search, Edit, Trash2 } from "lucide-react"

interface Location {
  id: string
  name: string
  code: string
  type: string
  parentLocation?: string
  status: "active" | "inactive"
  createdAt: string
}

const mockLocations: Location[] = [
  { id: "1", name: "Dhaka Division", code: "DHK", type: "Division", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Chittagong Division", code: "CTG", type: "Division", status: "active", createdAt: "2024-01-15" },
  {
    id: "3",
    name: "Dhaka District",
    code: "DHK-D",
    type: "District",
    parentLocation: "Dhaka Division",
    status: "active",
    createdAt: "2024-01-16",
  },
  {
    id: "4",
    name: "Dhaka Metropolitan",
    code: "DHK-M",
    type: "Upazila",
    parentLocation: "Dhaka District",
    status: "active",
    createdAt: "2024-01-17",
  },
]

export function LocationManagement() {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<Location | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    parentLocation: "",
    status: "active" as const,
  })

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingLocation) {
      setLocations(locations.map((loc) => (loc.id === editingLocation.id ? { ...loc, ...formData } : loc)))
    } else {
      const newLocation: Location = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setLocations([...locations, newLocation])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      type: "",
      parentLocation: "",
      status: "active",
    })
    setEditingLocation(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (location: Location) => {
    setEditingLocation(location)
    setFormData({
      name: location.name,
      code: location.code,
      type: location.type,
      parentLocation: location.parentLocation || "",
      status: location.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Location Management</h1>
          <p className="text-muted-foreground">Manage geographical locations and administrative divisions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingLocation ? "Edit Location" : "Add New Location"}</DialogTitle>
              <DialogDescription>
                {editingLocation ? "Update location information" : "Create a new geographical location"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Location Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter location name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Location Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Enter location code"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Location Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g., Division, District, Upazila"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="parentLocation">Parent Location</Label>
                  <Input
                    id="parentLocation"
                    value={formData.parentLocation}
                    onChange={(e) => setFormData({ ...formData, parentLocation: e.target.value })}
                    placeholder="Enter parent location (optional)"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingLocation ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Locations
          </CardTitle>
          <CardDescription>Total locations: {locations.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
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
                  <TableHead>Parent Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>{location.code}</TableCell>
                    <TableCell>{location.type}</TableCell>
                    <TableCell>{location.parentLocation || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={location.status === "active" ? "default" : "secondary"}>{location.status}</Badge>
                    </TableCell>
                    <TableCell>{location.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(location)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(location.id)}>
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
