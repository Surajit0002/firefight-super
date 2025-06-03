
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  AlertTriangle, 
  Download, 
  Settings, 
  Bell, 
  FileText, 
  Shield,
  Mail,
  MessageSquare
} from "lucide-react";

const AdminTools = () => {
  const reportedUsers = [
    {
      id: 1,
      reportedUser: "ToxicPlayer123",
      reportedBy: "CleanGamer456",
      reason: "Inappropriate language",
      tournament: "Fire Fight Championship",
      date: "2024-06-03T14:30:00",
      status: "Pending"
    },
    {
      id: 2,
      reportedUser: "CheaterPro",
      reportedBy: "FairPlayer789",
      reason: "Suspected cheating",
      tournament: "Weekend Warriors",
      date: "2024-06-03T12:15:00",
      status: "Under Review"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Tournament Starting Soon",
      message: "Fire Fight Championship begins in 30 minutes",
      recipients: "All registered players",
      scheduled: "2024-06-03T17:30:00"
    },
    {
      id: 2,
      title: "Payment Approved",
      message: "Your payment has been approved. Good luck!",
      recipients: "Recently approved teams",
      scheduled: "Immediate"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Under Review": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Tools</h1>
          <p className="text-gray-600">Additional administrative functions and reports</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur cursor-pointer hover:shadow-xl transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Export Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Download tournament data</p>
            <Button size="sm" variant="outline" className="w-full">
              <Download className="w-3 h-3 mr-1" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur cursor-pointer hover:shadow-xl transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">User Management</h3>
            <p className="text-sm text-gray-600 mb-4">Manage user accounts</p>
            <Button size="sm" variant="outline" className="w-full">
              <Shield className="w-3 h-3 mr-1" />
              Manage
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur cursor-pointer hover:shadow-xl transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Send Notifications</h3>
            <p className="text-sm text-gray-600 mb-4">Broadcast messages</p>
            <Button size="sm" variant="outline" className="w-full">
              <MessageSquare className="w-3 h-3 mr-1" />
              Send
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur cursor-pointer hover:shadow-xl transition-shadow">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-medium text-gray-800 mb-2">Platform Settings</h3>
            <p className="text-sm text-gray-600 mb-4">Configure system</p>
            <Button size="sm" variant="outline" className="w-full">
              <Settings className="w-3 h-3 mr-1" />
              Configure
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reported Users */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Reported Users
              <Badge className="ml-2 bg-red-100 text-red-800">{reportedUsers.length}</Badge>
            </CardTitle>
            <CardDescription>User reports requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportedUsers.map((report) => (
                <div key={report.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{report.reportedUser}</h4>
                      <p className="text-sm text-gray-600">Reported by: {report.reportedBy}</p>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-red-600 mb-2">{report.reason}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{report.tournament}</span>
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                      Suspend User
                    </Button>
                    <Button size="sm" variant="outline">
                      Dismiss Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications Queue */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              Notification Queue
            </CardTitle>
            <CardDescription>Scheduled and recent notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{notification.title}</h4>
                    <Badge className="bg-blue-100 text-blue-800">
                      {notification.scheduled === "Immediate" ? "Sent" : "Scheduled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>To: {notification.recipients}</span>
                    <span>{notification.scheduled}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Bell className="w-4 h-4 mr-2" />
              Create New Notification
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-green-500" />
            Export Data
          </CardTitle>
          <CardDescription>Download reports and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Tournament Results
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              User Database
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              Payment Records
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTools;
