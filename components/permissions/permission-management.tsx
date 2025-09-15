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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Plus, Search, Edit, Trash2, Shield, Key } from "lucide-react"

interface Permission {
  id: string
  name: string
  code: string
  module: string
  action: string
  description: string
  isSystem: boolean
  status: "active" | "inactive"
  createdAt: string
}

interface PermissionGroup {
  module: string
  permissions: Permission[]
  description: string
}

const mockPermissions: Permission[] = [
  // User Management Permissions
  {
    id: "1",
    name: "Create User",
    code: "user.create",
    module: "User Management",
    action: "create",
    description: "Create new user accounts",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "View Users",
    code: "user.read",
    module: "User Management",
    action: "read",
    description: "View user information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Update User",
    code: "user.update",
    module: "User Management",
    action: "update",
    description: "Update user information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "4",
    name: "Delete User",
    code: "user.delete",
    module: "User Management",
    action: "delete",
    description: "Delete user accounts",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },

  // Employee Management Permissions
  {
    id: "5",
    name: "Create Employee",
    code: "employee.create",
    module: "Employee Management",
    action: "create",
    description: "Create new employee records",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "6",
    name: "View Employees",
    code: "employee.read",
    module: "Employee Management",
    action: "read",
    description: "View employee information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "7",
    name: "Update Employee",
    code: "employee.update",
    module: "Employee Management",
    action: "update",
    description: "Update employee information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "8",
    name: "Delete Employee",
    code: "employee.delete",
    module: "Employee Management",
    action: "delete",
    description: "Delete employee records",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },

  // Department Management Permissions
  {
    id: "9",
    name: "Create Department",
    code: "department.create",
    module: "Department Management",
    action: "create",
    description: "Create new departments",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "10",
    name: "View Departments",
    code: "department.read",
    module: "Department Management",
    action: "read",
    description: "View department information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "11",
    name: "Update Department",
    code: "department.update",
    module: "Department Management",
    action: "update",
    description: "Update department information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "12",
    name: "Delete Department",
    code: "department.delete",
    module: "Department Management",
    action: "delete",
    description: "Delete departments",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },

  // Office Management Permissions
  {
    id: "13",
    name: "Create Office",
    code: "office.create",
    module: "Office Management",
    action: "create",
    description: "Create new offices",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "14",
    name: "View Offices",
    code: "office.read",
    module: "Office Management",
    action: "read",
    description: "View office information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "15",
    name: "Update Office",
    code: "office.update",
    module: "Office Management",
    action: "update",
    description: "Update office information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "16",
    name: "Delete Office",
    code: "office.delete",
    module: "Office Management",
    action: "delete",
    description: "Delete offices",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },

  // Role Management Permissions
  {
    id: "17",
    name: "Create Role",
    code: "role.create",
    module: "Role Management",
    action: "create",
    description: "Create new roles",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "18",
    name: "View Roles",
    code: "role.read",
    module: "Role Management",
    action: "read",
    description: "View role information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "19",
    name: "Update Role",
    code: "role.update",
    module: "Role Management",
    action: "update",
    description: "Update role information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "20",
    name: "Delete Role",
    code: "role.delete",
    module: "Role Management",
    action: "delete",
    description: "Delete roles",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },

  // ID Card Management Permissions
  {
    id: "21",
    name: "Create ID Card",
    code: "id_card.create",
    module: "ID Card Management",
    action: "create",
    description: "Create new ID cards",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "22",
    name: "View ID Cards",
    code: "id_card.read",
    module: "ID Card Management",
    action: "read",
    description: "View ID card information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "23",
    name: "Update ID Card",
    code: "id_card.update",
    module: "ID Card Management",
    action: "update",
    description: "Update ID card information",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "24",
    name: "Delete ID Card",
    code: "id_card.delete",
    module: "ID Card Management",
    action: "delete",
    description: "Delete ID cards",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },

  // Reports & System Permissions
  {
    id: "25",
    name: "Generate Reports",
    code: "report.generate",
    module: "Reports & System",
    action: "generate",
    description: "Generate system reports",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "26",
    name: "Export Reports",
    code: "report.export",
    module: "Reports & System",
    action: "export",
    description: "Export reports to various formats",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "27",
    name: "System Configuration",
    code: "system.configure",
    module: "Reports & System",
    action: "configure",
    description: "Configure system settings",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "28",
    name: "System Backup",
    code: "system.backup",
    module: "Reports & System",
    action: "backup",
    description: "Perform system backups",
    isSystem: true,
    status: "active",
    createdAt: "2024-01-15",
  },
]

export function PermissionManagement() {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    module: "",
    action: "",
    description: "",
    status: "active" as const,
  })

  const modules = Array.from(new Set(permissions.map((p) => p.module)))

  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesModule = selectedModule === "all" || permission.module === selectedModule

    return matchesSearch && matchesModule
  })

  const groupedPermissions: PermissionGroup[] = modules.map((module) => ({
    module,
    permissions: permissions.filter((p) => p.module === module),
    description: getModuleDescription(module),
  }))

  function getModuleDescription(module: string): string {
    const descriptions: Record<string, string> = {
      "User Management": "Permissions for managing system users and accounts",
      "Employee Management": "Permissions for managing employee records and information",
      "Department Management": "Permissions for managing organizational departments",
      "Office Management": "Permissions for managing office locations and details",
      "Role Management": "Permissions for managing user roles and access levels",
      "ID Card Management": "Permissions for managing employee ID cards and printing",
      "Reports & System": "Permissions for system administration and reporting",
    }
    return descriptions[module] || "Module permissions"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPermission) {
      setPermissions(
        permissions.map((permission) =>
          permission.id === editingPermission.id
            ? { ...permission, ...formData, isSystem: permission.isSystem }
            : permission,
        ),
      )
    } else {
      const newPermission: Permission = {
        id: Date.now().toString(),
        ...formData,
        isSystem: false,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setPermissions([...permissions, newPermission])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      module: "",
      action: "",
      description: "",
      status: "active",
    })
    setEditingPermission(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (permission: Permission) => {
    setEditingPermission(permission)
    setFormData({
      name: permission.name,
      code: permission.code,
      module: permission.module,
      action: permission.action,
      description: permission.description,
      status: permission.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setPermissions(permissions.filter((permission) => permission.id !== id))
  }

  const systemPermissions = permissions.filter((p) => p.isSystem).length
  const customPermissions = permissions.length - systemPermissions

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permission Management</h1>
          <p className="text-muted-foreground">Manage system permissions and access controls</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingPermission ? "Edit Permission" : "Add New Permission"}</DialogTitle>
              <DialogDescription>
                {editingPermission ? "Update permission information" : "Create a new system permission"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Permission Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter permission name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Permission Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="e.g., user.create"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="module">Module</Label>
                    <Select
                      value={formData.module}
                      onValueChange={(value) => setFormData({ ...formData, module: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select module" />
                      </SelectTrigger>
                      <SelectContent>
                        {modules.map((module) => (
                          <SelectItem key={module} value={module}>
                            {module}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="action">Action</Label>
                    <Select
                      value={formData.action}
                      onValueChange={(value) => setFormData({ ...formData, action: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="create">Create</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                        <SelectItem value="delete">Delete</SelectItem>
                        <SelectItem value="export">Export</SelectItem>
                        <SelectItem value="generate">Generate</SelectItem>
                        <SelectItem value="configure">Configure</SelectItem>
                        <SelectItem value="backup">Backup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter permission description"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">{editingPermission ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Permissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemPermissions}</div>
            <p className="text-xs text-muted-foreground">Built-in permissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Permissions</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customPermissions}</div>
            <p className="text-xs text-muted-foreground">User-defined permissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modules.length}</div>
            <p className="text-xs text-muted-foreground">Permission modules</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Permission List</TabsTrigger>
          <TabsTrigger value="groups">By Module</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                All Permissions
              </CardTitle>
              <CardDescription>Complete list of system permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search permissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    {modules.map((module) => (
                      <SelectItem key={module} value={module}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">{permission.name}</TableCell>
                        <TableCell className="font-mono text-sm">{permission.code}</TableCell>
                        <TableCell>{permission.module}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {permission.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={permission.isSystem ? "secondary" : "outline"}>
                            {permission.isSystem ? "System" : "Custom"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={permission.status === "active" ? "default" : "secondary"}>
                            {permission.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(permission)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(permission.id)}
                              disabled={permission.isSystem}
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
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          {groupedPermissions.map((group) => (
            <Card key={group.module}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {group.module}
                </CardTitle>
                <CardDescription>
                  {group.description} ({group.permissions.length} permissions)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {group.permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{permission.name}</div>
                        <div className="font-mono text-xs text-muted-foreground">{permission.code}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize text-xs">
                          {permission.action}
                        </Badge>
                        <Badge variant={permission.isSystem ? "secondary" : "outline"} className="text-xs">
                          {permission.isSystem ? "System" : "Custom"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
