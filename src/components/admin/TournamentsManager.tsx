
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Users, 
  Calendar, 
  DollarSign, 
  Upload,
  Eye,
  Lock,
  Play,
  Trophy
} from "lucide-react";

const TournamentsManager = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tournaments, setTournaments] = useState([
    {
      id: 1,
      name: "Fire Fight Championship",
      game: "Free Fire",
      entryFee: 9,
      maxPlayers: 384,
      currentPlayers: 256,
      startTime: "2024-06-03T18:00",
      status: "Running",
      prizePool: 3456,
      heroImage: "/placeholder.svg?height=200&width=400"
    },
    {
      id: 2,
      name: "Weekend Warriors",
      game: "Free Fire",
      entryFee: 9,
      maxPlayers: 128,
      currentPlayers: 89,
      startTime: "2024-06-04T20:00",
      status: "Open",
      prizePool: 1152,
      heroImage: "/placeholder.svg?height=200&width=400"
    },
    {
      id: 3,
      name: "Pro Battle Arena",
      game: "Free Fire",
      entryFee: 15,
      maxPlayers: 256,
      currentPlayers: 0,
      startTime: "2024-06-05T19:00",
      status: "Draft",
      prizePool: 3840,
      heroImage: "/placeholder.svg?height=200&width=400"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    game: "Free Fire",
    entryFee: 9,
    maxPlayers: 128,
    teamSize: 4,
    startTime: "",
    description: "",
    heroImage: null as File | null
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running": return "bg-green-100 text-green-800";
      case "Open": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Finished": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    const newTournament = {
      id: tournaments.length + 1,
      name: formData.name,
      game: formData.game,
      entryFee: formData.entryFee,
      maxPlayers: formData.maxPlayers,
      currentPlayers: 0,
      startTime: formData.startTime,
      status: "Draft",
      prizePool: (formData.maxPlayers * formData.entryFee * 0.9), // 10% commission
      heroImage: "/placeholder.svg?height=200&width=400"
    };
    setTournaments([...tournaments, newTournament]);
    setShowCreateForm(false);
    setFormData({
      name: "",
      game: "Free Fire",
      entryFee: 9,
      maxPlayers: 128,
      teamSize: 4,
      startTime: "",
      description: "",
      heroImage: null
    });
  };

  const duplicateTournament = (tournament: any) => {
    const duplicate = {
      ...tournament,
      id: tournaments.length + 1,
      name: `${tournament.name} (Copy)`,
      currentPlayers: 0,
      status: "Draft"
    };
    setTournaments([...tournaments, duplicate]);
  };

  const deleteTournament = (id: number) => {
    setTournaments(tournaments.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tournaments Manager</h1>
          <p className="text-gray-600">Create and manage tournament competitions</p>
        </div>
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Tournament
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Tournament</DialogTitle>
              <DialogDescription>Set up a new tournament with all details</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTournament} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tournament Name</Label>
                  <Input
                    id="name"
                    placeholder="Fire Fight Championship"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="game">Game</Label>
                  <Select value={formData.game} onValueChange={(value) => setFormData({...formData, game: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free Fire">Free Fire</SelectItem>
                      <SelectItem value="PUBG Mobile">PUBG Mobile</SelectItem>
                      <SelectItem value="Call of Duty Mobile">Call of Duty Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryFee">Entry Fee (₹)</Label>
                  <Input
                    id="entryFee"
                    type="number"
                    value={formData.entryFee}
                    onChange={(e) => setFormData({...formData, entryFee: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPlayers">Max Players</Label>
                  <Select value={formData.maxPlayers.toString()} onValueChange={(value) => setFormData({...formData, maxPlayers: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="64">64 Players</SelectItem>
                      <SelectItem value="128">128 Players</SelectItem>
                      <SelectItem value="256">256 Players</SelectItem>
                      <SelectItem value="384">384 Players</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select value={formData.teamSize.toString()} onValueChange={(value) => setFormData({...formData, teamSize: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Solo</SelectItem>
                      <SelectItem value="2">Duo</SelectItem>
                      <SelectItem value="4">Squad (4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tournament description and rules..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload tournament banner</p>
                  <Input
                    id="heroImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFormData({...formData, heroImage: e.target.files?.[0] || null})}
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Prize Distribution Preview</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>Total Prize Pool: ₹{(formData.maxPlayers * formData.entryFee * 0.9).toLocaleString()}</p>
                  <p>1st Place: ₹{((formData.maxPlayers * formData.entryFee * 0.9) * 0.4).toLocaleString()}</p>
                  <p>2nd Place: ₹{((formData.maxPlayers * formData.entryFee * 0.9) * 0.25).toLocaleString()}</p>
                  <p>3rd Place: ₹{((formData.maxPlayers * formData.entryFee * 0.9) * 0.15).toLocaleString()}</p>
                  <p>Kill Rewards: ₹2 per kill</p>
                  <p>Platform Commission: 10%</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Create Tournament
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="border-0 shadow-lg bg-white/90 backdrop-blur overflow-hidden">
            <div className="relative">
              <img 
                src={tournament.heroImage} 
                alt={tournament.name}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-3 right-3 ${getStatusColor(tournament.status)}`}>
                {tournament.status}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{tournament.name}</CardTitle>
                  <CardDescription>{tournament.game}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₹{tournament.prizePool.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Prize Pool</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span>₹{tournament.entryFee} entry</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>{tournament.currentPlayers}/{tournament.maxPlayers}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{new Date(tournament.startTime).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => duplicateTournament(tournament)}>
                  <Copy className="w-3 h-3 mr-1" />
                  Duplicate
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Eye className="w-3 h-3 mr-1" />
                  Teams
                </Button>
              </div>

              <div className="flex gap-2">
                {tournament.status === "Draft" && (
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    <Play className="w-3 h-3 mr-1" />
                    Publish
                  </Button>
                )}
                {tournament.status === "Open" && (
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    <Lock className="w-3 h-3 mr-1" />
                    Lock
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => deleteTournament(tournament.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TournamentsManager;
