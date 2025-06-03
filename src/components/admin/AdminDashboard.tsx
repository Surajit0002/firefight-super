
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Users, 
  DollarSign, 
  Clock, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Tournaments",
      value: "12",
      icon: Trophy,
      description: "3 active, 9 completed",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Registered Users",
      value: "1,247",
      icon: Users,
      description: "+89 this week",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Joined Teams",
      value: "156",
      icon: Users,
      description: "24 pending approval",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Ongoing Matches",
      value: "8",
      icon: Clock,
      description: "2 starting soon",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Total Revenue",
      value: "₹45,680",
      icon: DollarSign,
      description: "₹12,450 this month",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  const recentTournaments = [
    {
      id: 1,
      name: "Fire Fight Championship",
      status: "Running",
      players: 384,
      entryFee: 9,
      startTime: "2024-06-03 18:00"
    },
    {
      id: 2,
      name: "Weekend Warriors",
      status: "Open",
      players: 128,
      entryFee: 9,
      startTime: "2024-06-04 20:00"
    },
    {
      id: 3,
      name: "Pro Battle Arena",
      status: "Draft",
      players: 0,
      entryFee: 15,
      startTime: "2024-06-05 19:00"
    }
  ];

  const pendingPayments = [
    {
      id: 1,
      teamName: "Fire Squad",
      player: "John Doe",
      amount: 36,
      uploadTime: "2 hours ago"
    },
    {
      id: 2,
      teamName: "Storm Riders",
      player: "Sarah Smith",
      amount: 36,
      uploadTime: "3 hours ago"
    },
    {
      id: 3,
      teamName: "Night Hawks",
      player: "Mike Johnson",
      amount: 36,
      uploadTime: "4 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running": return "bg-green-100 text-green-800";
      case "Open": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back to Fire Fight Tournament Admin</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Tournament
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tournaments */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-500" />
              Recent Tournaments
            </CardTitle>
            <CardDescription>Latest tournament activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTournaments.map((tournament) => (
                <div key={tournament.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{tournament.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(tournament.status)}>{tournament.status}</Badge>
                      <span className="text-sm text-gray-600">{tournament.players} players</span>
                      <span className="text-sm text-gray-600">₹{tournament.entryFee}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{tournament.startTime}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tournaments
            </Button>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Pending Payments
              <Badge className="ml-2 bg-red-100 text-red-800">{pendingPayments.length}</Badge>
            </CardTitle>
            <CardDescription>Payment screenshots awaiting approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{payment.teamName}</h4>
                    <p className="text-sm text-gray-600">{payment.player} • ₹{payment.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{payment.uploadTime}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        <CheckCircle className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        <AlertCircle className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Review All Payments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Plus className="w-6 h-6 mb-2" />
              Create Tournament
            </Button>
            <Button className="h-20 flex-col bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <CheckCircle className="w-6 h-6 mb-2" />
              Approve Payments
            </Button>
            <Button className="h-20 flex-col bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
              <TrendingUp className="w-6 h-6 mb-2" />
              Live Leaderboard
            </Button>
            <Button className="h-20 flex-col bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <Calendar className="w-6 h-6 mb-2" />
              Schedule Match
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
