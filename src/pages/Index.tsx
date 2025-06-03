
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { 
  Trophy, 
  Users, 
  Target, 
  Clock, 
  Star, 
  Medal,
  Crown,
  Zap
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const tournaments = [
    {
      id: 1,
      name: "Fire Fury Championship",
      entryFee: 9,
      totalPlayers: 384,
      status: "Ongoing",
      prize: "₹15,000",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Blazing Battles Pro",
      entryFee: 9,
      totalPlayers: 256,
      status: "Upcoming",
      prize: "₹12,000",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Ultimate Fire Arena",
      entryFee: 9,
      totalPlayers: 512,
      status: "Registration Open",
      prize: "₹20,000",
      image: "/placeholder.svg"
    }
  ];

  const leaderboard = [
    { rank: 1, team: "Fire Dragons", kills: 45, points: 1250 },
    { rank: 2, team: "Blazing Eagles", kills: 42, points: 1180 },
    { rank: 3, team: "Storm Warriors", kills: 38, points: 1090 },
    { rank: 4, team: "Thunder Bolts", kills: 35, points: 980 },
    { rank: 5, team: "Phoenix Rising", kills: 32, points: 890 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 text-lg">
              <Zap className="w-5 h-5 mr-2" />
              Live Tournament Platform
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6">
              FIRE FIGHT
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tournament Arena
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join the ultimate gaming tournament experience. Create your team, compete with the best, and claim your victory!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-xl"
                onClick={() => navigate('/create-team')}
              >
                <Trophy className="w-6 h-6 mr-2" />
                Start Tournament Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg font-semibold rounded-xl"
                onClick={() => navigate('/join-tournament')}
              >
                <Users className="w-6 h-6 mr-2" />
                Join Existing Tournament
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Active Tournaments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.map((tournament, index) => (
              <Card key={tournament.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur">
                <div className="h-48 bg-gradient-to-br from-red-400 to-orange-400 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${
                      tournament.status === 'Ongoing' ? 'bg-green-500' :
                      tournament.status === 'Upcoming' ? 'bg-blue-500' : 'bg-purple-500'
                    } text-white`}>
                      {tournament.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{tournament.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Entry Fee</p>
                      <p className="text-2xl font-bold text-green-600">₹{tournament.entryFee}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Prize Pool</p>
                      <p className="text-2xl font-bold text-orange-600">{tournament.prize}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-gray-700">{tournament.totalPlayers} Players</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-gray-700">₹2 per kill</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                    onClick={() => navigate(`/tournament/${tournament.id}`)}
                  >
                    View Tournament
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Create Your Team</h3>
              <p className="text-gray-600">Form your squad, upload team logo, and invite your best players to join the battle.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Join Tournament</h3>
              <p className="text-gray-600">Choose your tournament, pay the entry fee, and get ready for intense battles.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Medal className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Confirm & Battle</h3>
              <p className="text-gray-600">Get approved, receive room codes, and fight your way to victory and rewards!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Leaderboard */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Live Leaderboard Preview
          </h2>
          <Card className="max-w-4xl mx-auto border-0 shadow-xl bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center">
                <Crown className="w-8 h-8 inline mr-2" />
                Top Performing Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {leaderboard.map((team, index) => (
                <div key={team.rank} className="flex items-center justify-between p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                      team.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      team.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                      team.rank === 3 ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                      'bg-gradient-to-r from-blue-500 to-blue-600'
                    }`}>
                      {team.rank}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{team.team}</h4>
                      <p className="text-sm text-gray-600">{team.kills} kills</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{team.points}</p>
                    <p className="text-sm text-gray-600">points</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Dominate?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of players in the ultimate tournament experience. Form your team and claim your victory!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => navigate('/register')}
            >
              <Star className="w-6 h-6 mr-2" />
              Register Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={() => navigate('/login')}
            >
              <Users className="w-6 h-6 mr-2" />
              Login to Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
