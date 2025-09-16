"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Building2,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Home,
  MapPin,
  Briefcase,
  Award,
  UserCheck,
  Droplets,
  Star,
  Shield,
  UserCog,
  Menu,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  currentUser: { username: string; role: string }
  currentPage: string
  onPageChange: (page: string) => void
  onLogout: () => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "employees", label: "Employees", icon: Users },
  { id: "institutions", label: "Institutions", icon: Building2 },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "office-types", label: "Office Types", icon: Building2 },
  { id: "offices", label: "Offices", icon: Briefcase },
  { id: "departments", label: "Departments", icon: UserCheck },
  { id: "designations", label: "Designations", icon: Award },
  { id: "grades", label: "Grades", icon: Star },
  { id: "blood-groups", label: "Blood Groups", icon: Droplets },
  { id: "id-cards", label: "ID Cards", icon: CreditCard },
]

const adminOnlyItems = [
  { id: "users", label: "User Management", icon: UserCog },
  { id: "roles", label: "Role Management", icon: Shield },
  { id: "permissions", label: "Permissions", icon: Settings },
]

function SidebarContent({
  currentUser,
  currentPage,
  onPageChange,
  onLogout,
  onClose,
}: {
  currentUser: { username: string; role: string }
  currentPage: string
  onPageChange: (page: string) => void
  onLogout: () => void
  onClose?: () => void
}) {
  const allMenuItems = [...menuItems, ...(currentUser.role === "admin" ? adminOnlyItems : [])]

  const handlePageChange = (page: string) => {
    onPageChange(page)
    onClose?.()
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold">EIMS Admin</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{currentUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{currentUser.username}</p>
            <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {allMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-9 px-3",
                  isActive && "bg-secondary text-secondary-foreground font-medium",
                )}
                onClick={() => handlePageChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Logout */}
      <div className="p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-9 px-3 text-muted-foreground hover:text-foreground"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign out</span>
        </Button>
      </div>
    </div>
  )
}

export function AdminSidebar({ currentUser, currentPage, onPageChange, onLogout }: AdminSidebarProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (isMobile) {
    return (
      <>
        <div className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SidebarContent
                currentUser={currentUser}
                currentPage={currentPage}
                onPageChange={onPageChange}
                onLogout={onLogout}
                onClose={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <span className="font-semibold">EIMS</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="hidden lg:block">
      <SidebarContent
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLogout={onLogout}
      />
    </div>
  )
}
