"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"

interface IdCardCorrectionProps {
  onBack: () => void
}

export function IdCardCorrection({ onBack }: IdCardCorrectionProps) {
  const [formData, setFormData] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    corrections: [] as string[],
    details: "",
    otherCorrection: "",
  })

  const correctionOptions = [
    { id: "name", label: "Name spelling correction" },
    { id: "photo", label: "Photo replacement" },
    { id: "designation", label: "Designation update" },
    { id: "department", label: "Department change" },
    { id: "contact", label: "Contact information update" },
    { id: "other", label: "Other (please specify)" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Correction request submitted:", formData)
    alert("ID Card correction request submitted successfully!")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCorrectionChange = (correctionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      corrections: checked ? [...prev.corrections, correctionId] : prev.corrections.filter((id) => id !== correctionId),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 mr-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-gray-900">ID Card Correction</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>ID Card Correction Request</CardTitle>
            <CardDescription>Submit a request to correct information on your existing ID card</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID *</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange("employeeId", e.target.value)}
                    placeholder="Enter your employee ID"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>What needs to be corrected? *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {correctionOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={formData.corrections.includes(option.id)}
                        onCheckedChange={(checked) => handleCorrectionChange(option.id, checked as boolean)}
                      />
                      <Label htmlFor={option.id} className="text-sm font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {formData.corrections.includes("other") && (
                <div className="space-y-2">
                  <Label htmlFor="otherCorrection">Please specify other correction</Label>
                  <Input
                    id="otherCorrection"
                    value={formData.otherCorrection}
                    onChange={(e) => handleInputChange("otherCorrection", e.target.value)}
                    placeholder="Describe the correction needed"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="details">Detailed Description *</Label>
                <Textarea
                  id="details"
                  placeholder="Please provide detailed information about the corrections needed, including current incorrect information and what it should be changed to..."
                  value={formData.details}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Important Notes:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Correction requests typically take 5-7 business days to process</li>
                  <li>• You may need to provide supporting documents for certain corrections</li>
                  <li>• A replacement fee may apply for some corrections</li>
                  <li>• You will be contacted if additional information is required</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  Submit Correction Request
                </Button>
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
