"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Mail, Phone, Clock } from "lucide-react"

interface FaqPageProps {
  onBack: () => void
}

export function FaqPage({ onBack }: FaqPageProps) {
  const faqData = [
    {
      question: "How do I request a new ID card?",
      answer:
        "You can request a new ID card by clicking the 'New ID Card Request' button on the homepage and filling out the required form. You'll need to provide your personal information, department details, and reason for the request.",
    },
    {
      question: "How long does it take to get a new ID card?",
      answer:
        "Processing times vary based on urgency: Normal requests take 7-10 business days, Urgent requests take 3-5 business days, and Emergency requests take 1-2 business days. Additional fees may apply for urgent processing.",
    },
    {
      question: "What should I do if my ID card information is incorrect?",
      answer:
        "Use the 'ID Card Correction' option on the homepage to submit a correction request. Specify what information needs to be corrected and provide detailed descriptions of the changes needed.",
    },
    {
      question: "What documents do I need for ID card requests?",
      answer:
        "For new requests, you typically need a passport-size photo and employment verification. For corrections, you may need supporting documents depending on the type of correction (e.g., official name change documents, updated employment letter).",
    },
    {
      question: "Is there a fee for ID card services?",
      answer:
        "New employee ID cards are typically provided free of charge. Replacement cards due to loss or damage may incur a fee. Urgent processing requests may have additional charges. Contact HR for specific fee information.",
    },
    {
      question: "How can I check the status of my request?",
      answer:
        "After submitting your request, you'll receive a confirmation email with a reference number. You can contact HR with this reference number to check the status of your request.",
    },
    {
      question: "What if I lose my ID card?",
      answer:
        "Report the loss immediately to your supervisor and HR department. Submit a new ID card request through the system, selecting 'Lost card replacement' as the reason. A replacement fee may apply.",
    },
    {
      question: "Can I update my photo on an existing ID card?",
      answer:
        "Yes, you can request a photo update through the ID Card Correction system. Select 'Photo replacement' and provide a new passport-size photo that meets the required specifications.",
    },
    {
      question: "What are the photo requirements for ID cards?",
      answer:
        "Photos should be passport-size (2x2 inches), recent (taken within the last 6 months), clear and in color, with a plain white or light-colored background. The person should be facing forward with a neutral expression.",
    },
    {
      question: "Who can I contact for additional help?",
      answer:
        "For technical issues with the system, contact IT support. For ID card policy questions or request status, contact the HR department. Contact information is provided below.",
    },
  ]

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
            <h1 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about the Employee ID system</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="space-y-2">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Email Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-2">For general inquiries</p>
              <p className="font-medium">hr@company.com</p>
              <p className="text-sm text-gray-600 mt-2">IT Support</p>
              <p className="font-medium">it-support@company.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Phone Support</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-2">HR Department</p>
              <p className="font-medium">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-600 mt-2">IT Helpdesk</p>
              <p className="font-medium">+1 (555) 123-4568</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <CardTitle className="text-lg">Office Hours</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-2">Monday - Friday</p>
              <p className="font-medium">9:00 AM - 5:00 PM</p>
              <p className="text-sm text-gray-600 mt-2">Emergency Support</p>
              <p className="font-medium">24/7 Available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
