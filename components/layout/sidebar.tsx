"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Building2,
  Users,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
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
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
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
  isCollapsed,
  setIsCollapsed,
  onClose,
}: {
  currentUser: { username: string; role: string }
  currentPage: string
  onPageChange: (page: string) => void
  onLogout: () => void
  isCollapsed?: boolean
  setIsCollapsed?: (collapsed: boolean) => void
  onClose?: () => void
}) {
  const allMenuItems = [...menuItems, ...(currentUser.role === "admin" ? adminOnlyItems : [])]

  const handlePageChange = (page: string) => {
    onPageChange(page)
    onClose?.() // Close mobile sheet when navigating
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border",
        isCollapsed !== undefined && (isCollapsed ? "w-16" : "w-64"),
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {(!isCollapsed || isCollapsed === undefined) && (
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-sidebar-accent" />
            <span className="font-semibold text-sidebar-foreground">EIMS</span>
          </div>
        )}
        {setIsCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        )}
      </div>

      {/* User Info */}
      {(!isCollapsed || isCollapsed === undefined) && (
        <div className="p-4 bg-sidebar-primary">
          <div className="text-sm font-medium text-sidebar-primary-foreground">{currentUser.username}</div>
          <div className="text-xs text-sidebar-primary-foreground/70 capitalize">{currentUser.role}</div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 p-2">
        <nav className="space-y-1">
          {allMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 text-sidebar-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  !isActive && "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  isCollapsed && "justify-center px-2",
                )}
                onClick={() => handlePageChange(item.id)}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {(!isCollapsed || isCollapsed === undefined) && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border">
        <div className="p-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground",
              isCollapsed && "justify-center px-2",
            )}
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {(!isCollapsed || isCollapsed === undefined) && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ currentUser, currentPage, onPageChange, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768 // md breakpoint
      setIsMobile(mobile)
      if (mobile) {
        setIsCollapsed(false) // Reset collapse state on mobile
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile header with menu button */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b h-14 flex items-center px-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
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
            <Building2 className="w-5 h-5 text-primary" />
            <span className="font-semibold">EIMS</span>
          </div>
        </div>
        {/* Spacer for fixed header */}
        <div className="h-14 md:hidden" />
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className="hidden md:block">
      <SidebarContent
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLogout={onLogout}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
    </div>
  )
}
