
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, Trophy, Target, Plus, Trash2 } from "lucide-react";

const MatchResults = () => {
  const [selectedTournament, setSelectedTournament] = useState("");
  const [results, setResults] = useState([
    { teamName: "Fire Squad", placement: 1, kills: 15, totalScore: 515 },
    { teamName: "Storm Riders", placement: 2, kills: 12, totalScore: 424 },
    { teamName: "Night Hawks", placement: 3, kills: 10, totalScore: 320 }
  ]);

  const tournaments = [
    { id: "1", name: "Fire Fight Championship", status: "Running" },
    { id: "2", name: "Weekend Warriors", status: "Completed" },
    { id: "3", name: "Pro Battle Arena", status: "Running" }
  ];

  const addNewResult = () => {
    setResults([...results, { teamName: "", placement: results.length + 1, kills: 0, totalScore: 0 }]);
  };

  const updateResult = (index: number, field: string, value: any) => {
    const updated = [...results];
    updated[index] = { ...updated[index], [field]: value };
    
    // Auto-calculate total score (placement points + kill rewards)
    if (field === "placement" || field === "kills") {
      const placementPoints = getPlacementPoints(updated[index].placement);
      const killRewards = updated[index].kills * 2;
      updated[index].totalScore = placementPoints + killRewards;
    }
    
    setResults(updated);
  };

  const getPlacementPoints = (placement: number) => {
    const pointsMap: {[key: number]: number} = {
      1: 500, 2: 400, 3: 300, 4: 250, 5: 200, 6: 150, 7: 100, 8: 50
    };
    return pointsMap[placement] || 0;
  };

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const saveResults = () => {
    // TODO: Implement save logic
    console.log("Saving results:", { tournament: selectedTournament, results });
    alert("Match results saved and leaderboard updated!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Match Results Upload</h1>
          <p className="text-gray-600">Upload and manage tournament match results</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button 
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            onClick={saveResults}
            disabled={!selectedTournament}
          >
            <Save className="w-4 h-4 mr-2" />
            Save & Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tournament Selection */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">Select Tournament</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedTournament} onValueChange={setSelectedTournament}>
              <SelectTrigger>
                <SelectValue placeholder="Choose tournament" />
              </SelectTrigger>
              <SelectContent>
                {tournaments.map((tournament) => (
                  <SelectItem key={tournament.id} value={tournament.id}>
                    {tournament.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Score Calculation Info */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-500" />
              Scoring System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="font-bold text-yellow-800">1st Place</p>
                <p className="text-yellow-600">500 points</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-800">2nd Place</p>
                <p className="text-gray-600">400 points</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="font-bold text-orange-800">3rd Place</p>
                <p className="text-orange-600">300 points</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="font-bold text-red-800">Per Kill</p>
                <p className="text-red-600">₹2 + 2 points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Match Results
              </CardTitle>
              <CardDescription>Enter team placements and kill counts</CardDescription>
            </div>
            <Button onClick={addNewResult} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Team
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead>Total Kills</TableHead>
                <TableHead>Placement Points</TableHead>
                <TableHead>Kill Rewards</TableHead>
                <TableHead>Total Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      placeholder="Team name"
                      value={result.teamName}
                      onChange={(e) => updateResult(index, "teamName", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={result.placement.toString()} 
                      onValueChange={(value) => updateResult(index, "placement", parseInt(value))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-20"
                      value={result.kills}
                      onChange={(e) => updateResult(index, "kills", parseInt(e.target.value) || 0)}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{getPlacementPoints(result.placement)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-green-600">₹{result.kills * 2}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">
                      {result.totalScore} pts
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => removeResult(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
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

export default MatchResults;
