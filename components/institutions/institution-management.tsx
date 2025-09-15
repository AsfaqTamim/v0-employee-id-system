"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Edit, Trash2, Building2, Globe, Phone, Mail } from "lucide-react"

interface Institution {
  id: string
  name: string
  nameBn: string
  phone: string
  email: string
  website: string
  address: string
  pabx: string
  logoUrl?: string
  authoritySignatureUrl?: string
}

// Mock data
const mockInstitutions: Institution[] = [
  {
    id: "1",
    name: "Tech Solutions Ltd.",
    nameBn: "টেক সলিউশনস লিমিটেড",
    phone: "+880123456789",
    email: "info@techsolutions.com",
    website: "www.techsolutions.com",
    address: "123 Main Street, Dhaka, Bangladesh",
    pabx: "02-9876543",
  },
  {
    id: "2",
    name: "Digital Innovation Corp",
    nameBn: "ডিজিটাল ইনোভেশন কর্পোরেশন",
    phone: "+880987654321",
    email: "contact@digitalinnovation.com",
    website: "www.digitalinnovation.com",
    address: "456 Business Avenue, Chittagong, Bangladesh",
    pabx: "031-5432109",
  },
]

export function InstitutionManagement() {
  const [institutions, setInstitutions] = useState<Institution[]>(mockInstitutions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredInstitutions = institutions.filter(
    (institution) =>
      institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Institution Management</h1>
          <p className="text-muted-foreground">Manage institutions and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Institution
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Institution</DialogTitle>
              <DialogDescription>Enter the institution information below</DialogDescription>
            </DialogHeader>
            <InstitutionForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Institutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Institutions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredInstitutions.map((institution) => (
          <Card key={institution.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{institution.name}</CardTitle>
                    <CardDescription className="text-sm">{institution.nameBn}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{institution.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{institution.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span>{institution.website}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="line-clamp-2">{institution.address}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInstitutions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No institutions found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function InstitutionForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Institution Name (English)</Label>
          <Input id="name" placeholder="Enter institution name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameBn">Institution Name (Bengali)</Label>
          <Input id="nameBn" placeholder="প্রতিষ্ঠানের নাম লিখুন" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+880123456789" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pabx">PABX</Label>
          <Input id="pabx" placeholder="02-9876543" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="info@institution.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" placeholder="www.institution.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" placeholder="Enter full address" />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Institution</Button>
      </div>
    </form>
  )
}
