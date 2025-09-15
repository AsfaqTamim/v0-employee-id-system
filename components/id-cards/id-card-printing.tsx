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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Printer, Eye, Download, QrCode, MoreHorizontal, Upload } from "lucide-react"

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

// Mock data - expanded for better testing
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
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `${i + 3}`,
    memberId: `EMP${String(i + 3).padStart(3, "0")}`,
    name: `Employee ${i + 3}`,
    designation: ["Software Engineer", "Manager", "Analyst", "Coordinator"][i % 4],
    department: ["IT", "HR", "Finance", "Marketing"][i % 4],
    office: "Head Office",
    lastPrinted: i % 3 === 0 ? "2024-01-15" : undefined,
    cardStatus: ["pending", "printed", "expired"][i % 3] as Employee["cardStatus"],
  })),
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

  const handlePrint = (employee: Employee) => {
    console.log("Print card for:", employee.id)
    // Update status to printed
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === employee.id
          ? { ...emp, cardStatus: "printed" as const, lastPrinted: new Date().toISOString().split("T")[0] }
          : emp,
      ),
    )
  }

  const handleDelete = (employee: Employee) => {
    if (confirm(`Are you sure you want to remove ${employee.name} from the printing queue?`)) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== employee.id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">ID Card Printing</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Generate and print employee ID cards with QR codes
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={selectedEmployees.length === 0}
            className="flex-1 sm:flex-none bg-transparent"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview ({selectedEmployees.length})
          </Button>
          <Button size="sm" disabled={selectedEmployees.length === 0} className="flex-1 sm:flex-none">
            <Printer className="w-4 h-4 mr-2" />
            Print ({selectedEmployees.length})
          </Button>
        </div>
      </div>

      {/* Filters */}
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
                  placeholder="Search by name or member ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-w-0"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="department" className="text-sm font-medium">
                Department
              </Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HR">Human Resources</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Employees ({filteredEmployees.length})</CardTitle>
          <CardDescription className="text-sm">Select employees to print ID cards</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[100px]">Member ID</TableHead>
                  <TableHead className="min-w-[150px]">Name</TableHead>
                  <TableHead className="min-w-[120px]">Designation</TableHead>
                  <TableHead className="min-w-[100px]">Department</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Last Printed</TableHead>
                  <TableHead className="min-w-[80px] text-right">Actions</TableHead>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePreview(employee)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrint(employee)}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(employee)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
      {/* Front Side - CR-80 dimensions (85.60 × 53.98 mm) */}
      <div
        className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg border-2 border-dashed border-primary/20 mx-auto"
        style={{
          width: "256px", // 85.60mm * 3 for better visibility
          height: "162px", // 53.98mm * 3 for better visibility
          aspectRatio: "85.60 / 53.98",
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="text-center space-y-1">
            <div className="text-xs text-muted-foreground">FRONT SIDE</div>

            {/* Header */}
            <div className="text-center">
              <h3 className="font-bold text-xs">TECH SOLUTIONS LTD.</h3>
              <p className="text-[10px] text-muted-foreground">Employee ID Card</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Photo placeholder */}
            <div className="w-12 h-14 bg-muted rounded flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] text-muted-foreground">Photo</span>
            </div>

            {/* Employee Info */}
            <div className="flex-1 space-y-0.5 text-left">
              <div className="font-medium text-xs truncate">{employee.name}</div>
              <div className="text-muted-foreground text-[10px] truncate">{employee.designation}</div>
              <div className="text-muted-foreground text-[10px] truncate">{employee.department}</div>
              <div className="font-mono text-primary text-[10px]">{employee.memberId}</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-[8px] text-muted-foreground">Valid Until: Dec 2025</div>
          </div>
        </div>
      </div>

      {/* Back Side - CR-80 dimensions */}
      <div
        className="bg-gradient-to-br from-secondary/10 to-primary/10 p-4 rounded-lg border-2 border-dashed border-secondary/20 mx-auto"
        style={{
          width: "256px", // 85.60mm * 3 for better visibility
          height: "162px", // 53.98mm * 3 for better visibility
          aspectRatio: "85.60 / 53.98",
        }}
      >
        <div className="h-full flex flex-col justify-between items-center">
          <div className="text-xs text-muted-foreground">BACK SIDE</div>

          {/* QR Code placeholder */}
          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
            <QrCode className="w-8 h-8 text-muted-foreground" />
          </div>

          <div className="text-center space-y-0.5">
            <div className="text-[10px]">Emergency: +880-XXX-XXXX</div>
            <div className="text-[8px] text-muted-foreground">Property of Tech Solutions Ltd.</div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground">CR-80 Standard Size (85.60 × 53.98 mm)</div>

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
