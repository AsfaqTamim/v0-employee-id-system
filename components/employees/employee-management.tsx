"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Employee {
  id: string
  memberId: string
  name: string
  nameBn: string
  designation: string
  department: string
  office: string
  email: string
  phone: string
  status: "active" | "retired" | "suspended" | "resigned"
  joinDate: string
  memberType: "permanent" | "contractual"
}

// Mock data - expanded for pagination testing
const mockEmployees: Employee[] = [
  {
    id: "1",
    memberId: "EMP001",
    name: "John Doe",
    nameBn: "জন ডো",
    designation: "Software Engineer",
    department: "IT",
    office: "Head Office",
    email: "john.doe@company.com",
    phone: "+880123456789",
    status: "active",
    joinDate: "2023-01-15",
    memberType: "permanent",
  },
  {
    id: "2",
    memberId: "EMP002",
    name: "Jane Smith",
    nameBn: "জেন স্মিথ",
    designation: "HR Manager",
    department: "Human Resources",
    office: "Head Office",
    email: "jane.smith@company.com",
    phone: "+880123456790",
    status: "active",
    joinDate: "2022-08-20",
    memberType: "permanent",
  },
  ...Array.from({ length: 23 }, (_, i) => ({
    id: `${i + 3}`,
    memberId: `EMP${String(i + 3).padStart(3, "0")}`,
    name: `Employee ${i + 3}`,
    nameBn: `কর্মচারী ${i + 3}`,
    designation: ["Software Engineer", "Manager", "Analyst", "Coordinator"][i % 4],
    department: ["IT", "HR", "Finance", "Marketing"][i % 4],
    office: "Head Office",
    email: `employee${i + 3}@company.com`,
    phone: `+88012345${String(i + 3).padStart(4, "0")}`,
    status: ["active", "retired", "suspended", "resigned"][i % 4] as Employee["status"],
    joinDate: "2023-01-15",
    memberType: ["permanent", "contractual"][i % 2] as Employee["memberType"],
  })),
]

interface EmployeeManagementProps {
  onViewEmployee?: () => void
}

export function EmployeeManagement({ onViewEmployee }: EmployeeManagementProps) {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: Employee["status"]) => {
    const variants = {
      active: "default",
      retired: "secondary",
      suspended: "destructive",
      resigned: "outline",
    } as const

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  const handleView = (employee: Employee) => {
    console.log("View employee:", employee.id)
    onViewEmployee?.()
  }

  const handleEdit = (employee: Employee) => {
    console.log("Edit employee:", employee.id)
  }

  const handleDelete = (employee: Employee) => {
    if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">Employee Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage employee information and records</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none">
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>Enter the employee information below</DialogDescription>
              </DialogHeader>
              <EmployeeForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-sm font-medium">
                Search
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-w-0"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="resigned">Resigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-lg sm:text-xl">Employees ({filteredEmployees.length})</CardTitle>
              <CardDescription className="text-sm">List of all employees in the system</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Label htmlFor="itemsPerPage">Show:</Label>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Member ID</TableHead>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[120px]">Designation</TableHead>
                  <TableHead className="min-w-[100px]">Department</TableHead>
                  <TableHead className="min-w-[200px]">Contact</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[80px]">Type</TableHead>
                  <TableHead className="min-w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.memberId}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.nameBn}</div>
                      </div>
                    </TableCell>
                    <TableCell>{employee.designation}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="truncate max-w-[180px]">{employee.email}</div>
                        <div className="text-muted-foreground">{employee.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {employee.memberType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(employee)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(employee)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(employee)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of{" "}
                {filteredEmployees.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function EmployeeForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name (English)</Label>
          <Input id="name" placeholder="Enter full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameBn">Full Name (Bengali)</Label>
          <Input id="nameBn" placeholder="পূর্ণ নাম লিখুন" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software-engineer">Software Engineer</SelectItem>
              <SelectItem value="hr-manager">HR Manager</SelectItem>
              <SelectItem value="accountant">Accountant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Official Email</Label>
          <Input id="email" type="email" placeholder="email@company.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Primary Contact</Label>
          <Input id="phone" placeholder="+880123456789" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Present Address</Label>
        <Textarea id="address" placeholder="Enter present address" />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose} className="order-2 sm:order-1 bg-transparent">
          Cancel
        </Button>
        <Button type="submit" className="order-1 sm:order-2">
          Add Employee
        </Button>
      </div>
    </form>
  )
}
