
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Upload, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Share, 
  Copy,
  Camera,
  User,
  Mail,
  Phone,
  Trophy
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Player {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  gameId: string;
  avatar: string;
}

const CreateTeam = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState('');
  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    gameId: '',
    avatar: ''
  });

  const teamCode = 'FIRE2024XYZ';

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTeamLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlayerAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewPlayer({ ...newPlayer, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addPlayer = () => {
    if (!newPlayer.name || !newPlayer.role || !newPlayer.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const player: Player = {
      id: Date.now().toString(),
      ...newPlayer
    };

    setPlayers([...players, player]);
    setNewPlayer({
      name: '',
      role: '',
      email: '',
      phone: '',
      gameId: '',
      avatar: ''
    });
    setIsAddPlayerOpen(false);
    
    toast({
      title: "Success",
      description: "Player added to team successfully",
    });
  };

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter(p => p.id !== playerId));
    toast({
      title: "Player Removed",
      description: "Player has been removed from the team",
    });
  };

  const copyTeamCode = () => {
    navigator.clipboard.writeText(teamCode);
    toast({
      title: "Copied!",
      description: "Team code copied to clipboard",
    });
  };

  const shareTeam = () => {
    const shareUrl = `https://firefight.tournament/join/${teamCode}`;
    if (navigator.share) {
      navigator.share({
        title: `Join ${teamName} team`,
        text: `Join my Fire Fight tournament team: ${teamName}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Share Link Copied!",
        description: "Team invitation link copied to clipboard",
      });
    }
  };

  const proceedToTournament = () => {
    if (!teamName || players.length === 0) {
      toast({
        title: "Incomplete Team",
        description: "Please add a team name and at least one player",
        variant: "destructive"
      });
      return;
    }
    navigate('/join-tournament');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 text-lg">
              Step 1 of 3
            </Badge>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Your Team</h1>
            <p className="text-gray-600 text-lg">Build your squad and invite the best players</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Team Setup */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-orange-500" />
                  Team Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Team Logo Upload */}
                <div className="text-center">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Team Logo</Label>
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                      {teamLogo ? (
                        <img src={teamLogo} alt="Team Logo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Upload Logo</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Team Name */}
                <div>
                  <Label htmlFor="teamName" className="text-sm font-medium text-gray-700">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="Enter your team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Team Code */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Team Invite Code</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={teamCode} readOnly className="bg-gray-50" />
                    <Button variant="outline" size="sm" onClick={copyTeamCode}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={shareTeam}>
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Share this code with your teammates</p>
                </div>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Users className="w-6 h-6 mr-2 text-blue-500" />
                    Team Members ({players.length})
                  </CardTitle>
                  <Dialog open={isAddPlayerOpen} onOpenChange={setIsAddPlayerOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Player
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Player</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* Player Avatar */}
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                            {newPlayer.avatar ? (
                              <img src={newPlayer.avatar} alt="Player Avatar" className="w-full h-full object-cover rounded-full" />
                            ) : (
                              <User className="w-8 h-8 text-gray-400" />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePlayerAvatarUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Player Name *</Label>
                          <Input
                            placeholder="Enter player name"
                            value={newPlayer.name}
                            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label>Role *</Label>
                          <Input
                            placeholder="e.g., Sniper, Support, Leader"
                            value={newPlayer.role}
                            onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            placeholder="player@email.com"
                            value={newPlayer.email}
                            onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label>Phone</Label>
                          <Input
                            placeholder="Phone number"
                            value={newPlayer.phone}
                            onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label>Game ID</Label>
                          <Input
                            placeholder="In-game ID"
                            value={newPlayer.gameId}
                            onChange={(e) => setNewPlayer({ ...newPlayer, gameId: e.target.value })}
                          />
                        </div>

                        <Button onClick={addPlayer} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                          Add Player
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {players.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No players added yet</p>
                    <p className="text-sm">Click "Add Player" to start building your team</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            {player.avatar ? (
                              <img src={player.avatar} alt={player.name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                              <User className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{player.name}</p>
                            <p className="text-sm text-gray-600">{player.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => removePlayer(player.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Team Card Preview */}
          {teamName && (
            <Card className="mt-8 border-0 shadow-xl bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      {teamLogo ? (
                        <img src={teamLogo} alt="Team Logo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <Trophy className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{teamName}</h3>
                      <p className="text-white/80">{players.length} members</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {players.slice(0, 4).map((player, index) => (
                      <div key={player.id} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        {player.avatar ? (
                          <img src={player.avatar} alt={player.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                    ))}
                    {players.length > 4 && (
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">+{players.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center mt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-6 text-lg font-semibold rounded-xl"
              onClick={proceedToTournament}
            >
              Proceed to Tournament Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
