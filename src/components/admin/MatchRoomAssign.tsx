
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, Send, CheckCircle } from "lucide-react";

const MatchRoomAssign = () => {
  const [selectedTournament, setSelectedTournament] = useState("");
  const [roomData, setRoomData] = useState({
    roomCode: "",
    password: "",
    gameMode: "Squad",
    startTime: ""
  });

  const tournaments = [
    { id: "1", name: "Fire Fight Championship", status: "Running", teams: 64 },
    { id: "2", name: "Weekend Warriors", status: "Open", teams: 32 },
    { id: "3", name: "Pro Battle Arena", status: "Draft", teams: 0 }
  ];

  const handleAssignRoom = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement room assignment logic
    console.log("Assigning room:", { tournament: selectedTournament, ...roomData });
    alert("Room assigned successfully! Players will be notified.");
  };

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomData({...roomData, roomCode: code});
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).substring(2, 8);
    setRoomData({...roomData, password: password});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Match Room Assignment</h1>
          <p className="text-gray-600">Assign room codes and passwords for tournament matches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignment Form */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Assign Match Room
            </CardTitle>
            <CardDescription>Configure room details for tournament matches</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAssignRoom} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tournament">Select Tournament</Label>
                <Select value={selectedTournament} onValueChange={setSelectedTournament}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a tournament" />
                  </SelectTrigger>
                  <SelectContent>
                    {tournaments.map((tournament) => (
                      <SelectItem key={tournament.id} value={tournament.id}>
                        {tournament.name} ({tournament.teams} teams)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomCode">Room Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="roomCode"
                    placeholder="Enter room code"
                    value={roomData.roomCode}
                    onChange={(e) => setRoomData({...roomData, roomCode: e.target.value})}
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateRoomCode}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Room Password</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    placeholder="Enter password"
                    value={roomData.password}
                    onChange={(e) => setRoomData({...roomData, password: e.target.value})}
                    required
                  />
                  <Button type="button" variant="outline" onClick={generatePassword}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gameMode">Game Mode</Label>
                <Select value={roomData.gameMode} onValueChange={(value) => setRoomData({...roomData, gameMode: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solo">Solo</SelectItem>
                    <SelectItem value="Duo">Duo</SelectItem>
                    <SelectItem value="Squad">Squad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Match Start Time</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={roomData.startTime}
                  onChange={(e) => setRoomData({...roomData, startTime: e.target.value})}
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Notification Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-blue-700">
                    <input type="checkbox" defaultChecked />
                    Send in-app notification
                  </label>
                  <label className="flex items-center gap-2 text-sm text-blue-700">
                    <input type="checkbox" />
                    Send WhatsApp message
                  </label>
                  <label className="flex items-center gap-2 text-sm text-blue-700">
                    <input type="checkbox" />
                    Send email notification
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                disabled={!selectedTournament}
              >
                <Send className="w-4 h-4 mr-2" />
                Assign Room & Notify Players
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              Recent Assignments
            </CardTitle>
            <CardDescription>Latest room assignments and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  tournament: "Fire Fight Championship",
                  roomCode: "FF2024A",
                  password: "battle1",
                  startTime: "2024-06-03T18:00",
                  status: "Active",
                  playersJoined: 64
                },
                {
                  tournament: "Weekend Warriors",
                  roomCode: "WW2024B",
                  password: "combat2",
                  startTime: "2024-06-04T20:00",
                  status: "Scheduled",
                  playersJoined: 0
                }
              ].map((assignment, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{assignment.tournament}</h4>
                    <Badge className={assignment.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                      {assignment.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p><span className="font-medium">Room:</span> {assignment.roomCode}</p>
                    <p><span className="font-medium">Password:</span> {assignment.password}</p>
                    <p><span className="font-medium">Start:</span> {new Date(assignment.startTime).toLocaleString()}</p>
                    <p><span className="font-medium">Players:</span> {assignment.playersJoined}/64</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatchRoomAssign;
