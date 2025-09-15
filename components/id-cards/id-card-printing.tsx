"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Printer, Eye, Download, QrCode } from "lucide-react"

interface Employee {
  id: string
  memberId: string
  name: string
  designation: string
  department: string
  office: string
  photo?: string
  lastPrinted?: string
  cardStatus: "pending" | "printed" | "expired"
}

// Mock data
const mockEmployees: Employee[] = [
  {
    id: "1",
    memberId: "EMP001",
    name: "John Doe",
    designation: "Software Engineer",
    department: "IT",
    office: "Head Office",
    lastPrinted: "2024-01-15",
    cardStatus: "printed",
  },
  {
    id: "2",
    memberId: "EMP002",
    name: "Jane Smith",
    designation: "HR Manager",
    department: "Human Resources",
    office: "Head Office",
    cardStatus: "pending",
  },
]

export function IdCardPrinting() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewEmployee, setPreviewEmployee] = useState<Employee | null>(null)

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.memberId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const handleSelectEmployee = (employeeId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId])
    } else {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.id))
    } else {
      setSelectedEmployees([])
    }
  }

  const getStatusBadge = (status: Employee["cardStatus"]) => {
    const variants = {
      pending: "secondary",
      printed: "default",
      expired: "destructive",
    } as const

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  const handlePreview = (employee: Employee) => {
    setPreviewEmployee(employee)
    setIsPreviewOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">ID Card Printing</h1>
          <p className="text-muted-foreground">Generate and print employee ID cards with QR codes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled={selectedEmployees.length === 0}>
            <Eye className="w-4 h-4 mr-2" />
            Preview Selected ({selectedEmployees.length})
          </Button>
          <Button disabled={selectedEmployees.length === 0}>
            <Printer className="w-4 h-4 mr-2" />
            Print Selected ({selectedEmployees.length})
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or member ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label htmlFor="department">Department</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Human Resources">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
          <CardDescription>Select employees to print ID cards</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Member ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Card Status</TableHead>
                <TableHead>Last Printed</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedEmployees.includes(employee.id)}
                      onCheckedChange={(checked) => handleSelectEmployee(employee.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{employee.memberId}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{getStatusBadge(employee.cardStatus)}</TableCell>
                  <TableCell>
                    {employee.lastPrinted ? new Date(employee.lastPrinted).toLocaleDateString() : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handlePreview(employee)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ID Card Preview</DialogTitle>
            <DialogDescription>Preview of {previewEmployee?.name}'s ID card</DialogDescription>
          </DialogHeader>
          {previewEmployee && <IdCardPreview employee={previewEmployee} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function IdCardPreview({ employee }: { employee: Employee }) {
  return (
    <div className="space-y-4">
      {/* Front Side */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-dashed border-primary/20">
        <div className="text-center space-y-4">
          <div className="text-xs text-muted-foreground">FRONT SIDE</div>

          {/* Header */}
          <div className="text-center">
            <h3 className="font-bold text-sm">TECH SOLUTIONS LTD.</h3>
            <p className="text-xs text-muted-foreground">Employee ID Card</p>
          </div>

          {/* Photo placeholder */}
          <div className="w-20 h-24 bg-muted rounded mx-auto flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Photo</span>
          </div>

          {/* Employee Info */}
          <div className="space-y-1 text-xs">
            <div className="font-medium">{employee.name}</div>
            <div className="text-muted-foreground">{employee.designation}</div>
            <div className="text-muted-foreground">{employee.department}</div>
            <div className="font-mono text-primary">{employee.memberId}</div>
          </div>
        </div>
      </div>

      {/* Back Side */}
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-6 rounded-lg border-2 border-dashed border-secondary/20">
        <div className="text-center space-y-4">
          <div className="text-xs text-muted-foreground">BACK SIDE</div>

          {/* QR Code placeholder */}
          <div className="w-16 h-16 bg-muted rounded mx-auto flex items-center justify-center">
            <QrCode className="w-8 h-8 text-muted-foreground" />
          </div>

          <div className="text-xs space-y-1">
            <div>Emergency Contact: +880-XXX-XXXX</div>
            <div>Valid Until: Dec 2025</div>
            <div className="text-muted-foreground">This card is property of Tech Solutions Ltd.</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1">
          <Printer className="w-4 h-4 mr-2" />
          Print Card
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  )
}
