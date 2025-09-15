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
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Plus, Search, Edit, Trash2, Users } from "lucide-react"

interface Role {
  id: string
  name: string
  code: string
  description: string
  permissions: string[]
  userCount: number
  isSystem: boolean
  status: "active" | "inactive"
  createdAt: string
}

const availablePermissions = [
  "user.create",
  "user.read",
  "user.update",
  "user.delete",
  "employee.create",
  "employee.read",
  "employee.update",
  "employee.delete",
  "department.create",
  "department.read",
  "department.update",
  "department.delete",
  "office.create",
  "office.read",
  "office.update",
  "office.delete",
  "role.create",
  "role.read",
  "role.update",
  "role.delete",
  "id_card.create",
  "id_card.read",
  "id_card.update",
  "id_card.delete",
  "report.generate",
  "report.export",
  "system.configure",
  "system.backup",
]

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Administrator",
    code: "ADMIN",
    description: "Full system access with all permissions",
    permissions: availablePermissions,
    userCount: 1,
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "HR Manager",
    code: "HR_MGR",
    description: "Human resources management with employee access",
    permissions: [
      "employee.create",
      "employee.read",
      "employee.update",
      "employee.delete",
      "department.read",
      "office.read",
      "id_card.create",
      "id_card.read",
      "report.generate",
      "report.export",
    ],
    userCount: 1,
    isSystem: false,
    status: "active",
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    name: "Department Head",
    code: "DEPT_HEAD",
    description: "Department level management access",
    permissions: [
      "employee.read",
      "employee.update",
      "department.read",
      "office.read",
      "id_card.read",
      "report.generate",
    ],
    userCount: 1,
    isSystem: false,
    status: "active",
    createdAt: "2024-01-17",
  },
  {
    id: "4",
    name: "Operator",
    code: "OPERATOR",
    description: "Basic operational access for data entry",
    permissions: [
      "employee.create",
      "employee.read",
      "employee.update",
      "department.read",
      "office.read",
      "id_card.create",
      "id_card.read",
    ],
    userCount: 1,
    isSystem: false,
    status: "active",
    createdAt: "2024-01-18",
  },
  {
    id: "5",
    name: "Viewer",
    code: "VIEWER",
    description: "Read-only access to system data",
    permissions: ["employee.read", "department.read", "office.read", "id_card.read"],
    userCount: 0,
    isSystem: false,
    status: "active",
    createdAt: "2024-01-19",
  },
]

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    permissions: [] as string[],
    status: "active" as const,
  })

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id
            ? { ...role, ...formData, userCount: role.userCount, isSystem: role.isSystem }
            : role,
        ),
      )
    } else {
      const newRole: Role = {
        id: Date.now().toString(),
        ...formData,
        userCount: 0,
        isSystem: false,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setRoles([...roles, newRole])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      permissions: [],
      status: "active",
    })
    setEditingRole(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      code: role.code,
      description: role.description,
      permissions: role.permissions,
      status: role.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, permissions: [...formData.permissions, permission] })
    } else {
      setFormData({ ...formData, permissions: formData.permissions.filter((p) => p !== permission) })
    }
  }

  const groupedPermissions = {
    "User Management": availablePermissions.filter((p) => p.startsWith("user.")),
    "Employee Management": availablePermissions.filter((p) => p.startsWith("employee.")),
    "Department Management": availablePermissions.filter((p) => p.startsWith("department.")),
    "Office Management": availablePermissions.filter((p) => p.startsWith("office.")),
    "Role Management": availablePermissions.filter((p) => p.startsWith("role.")),
    "ID Card Management": availablePermissions.filter((p) => p.startsWith("id_card.")),
    "Reports & System": availablePermissions.filter((p) => p.startsWith("report.") || p.startsWith("system.")),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
          <p className="text-muted-foreground">Manage user roles and their permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRole ? "Edit Role" : "Add New Role"}</DialogTitle>
              <DialogDescription>
                {editingRole
                  ? "Update role information and permissions"
                  : "Create a new user role with specific permissions"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Role Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter role name"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Role Code</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Enter role code"
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
                    placeholder="Enter role description"
                    rows={2}
                  />
                </div>
                <div className="grid gap-4">
                  <Label>Permissions</Label>
                  <div className="space-y-4 max-h-60 overflow-y-auto border rounded-md p-4">
                    {Object.entries(groupedPermissions).map(([group, permissions]) => (
                      <div key={group} className="space-y-2">
                        <h4 className="font-medium text-sm">{group}</h4>
                        <div className="grid grid-cols-2 gap-2 ml-4">
                          {permissions.map((permission) => (
                            <div key={permission} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission}
                                checked={formData.permissions.includes(permission)}
                                onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                              />
                              <Label htmlFor={permission} className="text-sm">
                                {permission.split(".")[1]}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingRole ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.filter((role) => role.isSystem).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.filter((role) => !role.isSystem).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            User Roles
          </CardTitle>
          <CardDescription>Manage roles and their associated permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search roles..."
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
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.code}</TableCell>
                    <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                    <TableCell>{role.userCount}</TableCell>
                    <TableCell>{role.permissions.length}</TableCell>
                    <TableCell>
                      <Badge variant={role.isSystem ? "secondary" : "outline"}>
                        {role.isSystem ? "System" : "Custom"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={role.status === "active" ? "default" : "secondary"}>{role.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(role)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(role.id)}
                          disabled={role.isSystem || role.userCount > 0}
                        >
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
