
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Target, Users, Edit, Eye, EyeOff, Crown } from "lucide-react";

const LiveLeaderboard = () => {
  const [isLeaderboardPublic, setIsLeaderboardPublic] = useState(true);
  const [leaderboard, setLeaderboard] = useState([
    {
      rank: 1,
      teamName: "Fire Squad",
      players: ["John", "Mike", "Sarah", "Alex"],
      kills: 15,
      placement: 1,
      totalScore: 515,
      isMyTeam: false
    },
    {
      rank: 2,
      teamName: "Storm Riders",
      players: ["Emma", "Jake", "Lisa", "Tom"],
      kills: 12,
      placement: 2,
      totalScore: 424,
      isMyTeam: true
    },
    {
      rank: 3,
      teamName: "Night Hawks",
      players: ["Chris", "Maya", "David", "Anna"],
      kills: 10,
      placement: 3,
      totalScore: 320,
      isMyTeam: false
    }
  ]);

  const [editingTeam, setEditingTeam] = useState<any>(null);

  const toggleLeaderboard = () => {
    setIsLeaderboardPublic(!isLeaderboardPublic);
  };

  const updateTeamScore = (teamIndex: number, field: string, value: any) => {
    const updated = [...leaderboard];
    updated[teamIndex] = { ...updated[teamIndex], [field]: value };
    
    // Recalculate total score
    if (field === "kills" || field === "placement") {
      const placementPoints = getPlacementPoints(updated[teamIndex].placement);
      const killRewards = updated[teamIndex].kills * 2;
      updated[teamIndex].totalScore = placementPoints + killRewards;
    }
    
    // Re-sort by total score
    updated.sort((a, b) => b.totalScore - a.totalScore);
    updated.forEach((team, index) => {
      team.rank = index + 1;
    });
    
    setLeaderboard(updated);
  };

  const getPlacementPoints = (placement: number) => {
    const pointsMap: {[key: number]: number} = {
      1: 500, 2: 400, 3: 300, 4: 250, 5: 200, 6: 150, 7: 100, 8: 50
    };
    return pointsMap[placement] || 0;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-orange-500" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Live Leaderboard Control</h1>
          <p className="text-gray-600">Manage real-time tournament leaderboard</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={isLeaderboardPublic ? "default" : "outline"}
            onClick={toggleLeaderboard}
            className={isLeaderboardPublic 
              ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
              : "border-red-200 text-red-600 hover:bg-red-50"
            }
          >
            {isLeaderboardPublic ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
            {isLeaderboardPublic ? "Hide Leaderboard" : "Show Leaderboard"}
          </Button>
        </div>
      </div>

      {/* Status Card */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                Fire Fight Championship - Live Leaderboard
              </CardTitle>
              <CardDescription>Real-time tournament standings</CardDescription>
            </div>
            <Badge className={isLeaderboardPublic ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
              {isLeaderboardPublic ? "Public" : "Hidden"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-800">64</p>
              <p className="text-sm text-blue-600">Total Teams</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-800">256</p>
              <p className="text-sm text-green-600">Total Players</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-lg font-bold text-orange-800">127</p>
              <p className="text-sm text-orange-600">Total Kills</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-800">₹254</p>
              <p className="text-sm text-purple-600">Kill Rewards</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Live Rankings
          </CardTitle>
          <CardDescription>Click on any row to edit team scores</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Players</TableHead>
                <TableHead>Kills</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Kill Rewards</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((team, index) => (
                <TableRow 
                  key={index} 
                  className={`${team.isMyTeam ? 'bg-blue-50 border-blue-200' : ''} ${team.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRankIcon(team.rank)}
                      {team.rank <= 3 && <Badge className="bg-yellow-100 text-yellow-800">TOP {team.rank}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{team.teamName}</span>
                      {team.isMyTeam && <Badge className="bg-blue-100 text-blue-800">MY TEAM</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {team.players.map((player, i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white" title={player}>
                          {player[0]}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-red-100 text-red-800">{team.kills}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-gray-100 text-gray-800">#{team.placement}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold text-green-600">{team.totalScore}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600">₹{team.kills * 2}</span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" onClick={() => setEditingTeam(team)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Team Score - {team.teamName}</DialogTitle>
                          <DialogDescription>Update kills and placement for real-time leaderboard</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Total Kills</Label>
                              <Input
                                type="number"
                                value={team.kills}
                                onChange={(e) => updateTeamScore(index, "kills", parseInt(e.target.value) || 0)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Final Placement</Label>
                              <Input
                                type="number"
                                value={team.placement}
                                onChange={(e) => updateTeamScore(index, "placement", parseInt(e.target.value) || 1)}
                              />
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">
                              Placement Points: {getPlacementPoints(team.placement)} | 
                              Kill Rewards: ₹{team.kills * 2} | 
                              Total Score: {team.totalScore}
                            </p>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                            Update Leaderboard
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveLeaderboard;
