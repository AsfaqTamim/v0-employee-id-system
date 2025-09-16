"use client"

import { Button } from "@/components/ui/button"
import { Building2 } from "lucide-react"

interface NavbarProps {
  onLogin?: () => void
  showLogin?: boolean
}

export function Navbar({ onLogin, showLogin = true }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Building2 className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">EIMS</span>
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#about">
              About
            </a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#contact">
              Contact
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex items-center space-x-2 md:hidden">
              <Building2 className="h-6 w-6" />
              <span className="font-bold">EIMS</span>
            </div>
          </div>
          {showLogin && (
            <nav className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onLogin}>
                Sign In
              </Button>
              <Button size="sm" onClick={onLogin}>
                Admin Login
              </Button>
            </nav>
          )}
        </div>
      </div>
    </nav>
  )
}
