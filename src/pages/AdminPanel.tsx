
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Trophy, 
  Users, 
  DollarSign, 
  Settings, 
  FileText, 
  Clock,
  Plus,
  Eye,
  EyeOff,
  LogOut
} from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import TournamentsManager from "@/components/admin/TournamentsManager";
import PaymentsApproval from "@/components/admin/PaymentsApproval";
import MatchRoomAssign from "@/components/admin/MatchRoomAssign";
import MatchResults from "@/components/admin/MatchResults";
import LiveLeaderboard from "@/components/admin/LiveLeaderboard";
import AdminTools from "@/components/admin/AdminTools";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Mock authentication check - replace with Supabase auth
  useEffect(() => {
    const checkAuth = () => {
      const adminToken = localStorage.getItem("admin_token");
      if (adminToken) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Supabase authentication
    if (credentials.email === "admin@firefight.com" && credentials.password === "admin123") {
      localStorage.setItem("admin_token", "mock_admin_token");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Use admin@firefight.com / admin123");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Access the Fire Fight Tournament admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@firefight.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                Login to Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/90 backdrop-blur border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-800">Admin Panel</h2>
                <p className="text-sm text-gray-600">Fire Fight Tournament</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("dashboard")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === "tournaments" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("tournaments")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Tournaments
              </Button>
              <Button
                variant={activeTab === "payments" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("payments")}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Payments
              </Button>
              <Button
                variant={activeTab === "match-rooms" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("match-rooms")}
              >
                <Users className="w-4 h-4 mr-2" />
                Match Rooms
              </Button>
              <Button
                variant={activeTab === "results" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("results")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Match Results
              </Button>
              <Button
                variant={activeTab === "leaderboard" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("leaderboard")}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Live Leaderboard
              </Button>
              <Button
                variant={activeTab === "tools" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("tools")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin Tools
              </Button>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "tournaments" && <TournamentsManager />}
          {activeTab === "payments" && <PaymentsApproval />}
          {activeTab === "match-rooms" && <MatchRoomAssign />}
          {activeTab === "results" && <MatchResults />}
          {activeTab === "leaderboard" && <LiveLeaderboard />}
          {activeTab === "tools" && <AdminTools />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
