import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building2, CreditCard, UserCheck, TrendingUp, Activity, Clock, ArrowUpRight } from "lucide-react"

interface DashboardOverviewProps {
  currentUser: { username: string; role: string }
}

export function DashboardOverview({ currentUser }: DashboardOverviewProps) {
  // Mock data - in real app this would come from API
  const stats = {
    totalEmployees: 1247,
    activeEmployees: 1189,
    institutions: 12,
    idCardsPrinted: 856,
    pendingCards: 58,
  }

  const recentActivity = [
    { action: "New employee added", user: "John Doe", time: "2 hours ago", type: "success" },
    { action: "ID card printed", user: "Jane Smith", time: "4 hours ago", type: "info" },
    { action: "Employee updated", user: "Mike Johnson", time: "6 hours ago", type: "warning" },
    { action: "Institution created", user: "Admin", time: "1 day ago", type: "success" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {currentUser.username}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>{stats.activeEmployees} active</span>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Institutions</CardTitle>
            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
              <Building2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.institutions}</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ID Cards Printed</CardTitle>
            <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
              <CreditCard className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.idCardsPrinted}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Cards</CardTitle>
            <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
              <UserCheck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingCards}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Awaiting print</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest actions performed in the system</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add New Employee
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Print ID Cards
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Manage Institutions
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <UserCheck className="mr-2 h-4 w-4" />
              Review Pending
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
