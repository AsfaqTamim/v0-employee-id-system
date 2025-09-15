"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
  { id: "offices", label: "Offices", icon: Briefcase },
  { id: "departments", label: "Departments", icon: UserCheck },
  { id: "designations", label: "Designations", icon: Award },
  { id: "id-cards", label: "ID Cards", icon: CreditCard },
]

const adminOnlyItems = [{ id: "users", label: "User Management", icon: Settings }]

export function Sidebar({ currentUser, currentPage, onPageChange, onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const allMenuItems = [...menuItems, ...(currentUser.role === "admin" ? adminOnlyItems : [])]

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-sidebar-accent" />
            <span className="font-semibold text-sidebar-foreground">EIMS</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
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
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      {/* Logout */}
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
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}
