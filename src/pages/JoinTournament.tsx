
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Trophy, 
  Users, 
  Target, 
  Clock, 
  Upload,
  QrCode,
  Camera,
  CheckCircle,
  Calendar,
  DollarSign
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Tournament {
  id: string;
  name: string;
  entryFee: number;
  totalPlayers: number;
  registeredPlayers: number;
  prizePool: string;
  startDate: string;
  status: 'Open' | 'Starting Soon' | 'Full';
  description: string;
  rules: string[];
}

const JoinTournament = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const tournaments: Tournament[] = [
    {
      id: '1',
      name: 'Fire Fury Championship',
      entryFee: 9,
      totalPlayers: 384,
      registeredPlayers: 320,
      prizePool: '₹15,000',
      startDate: '2024-01-15 18:00',
      status: 'Open',
      description: 'The ultimate battle royale tournament with intense competition',
      rules: ['4-player teams', 'Single elimination', 'Custom maps only', 'No third-party software']
    },
    {
      id: '2',
      name: 'Blazing Battles Pro',
      entryFee: 9,
      totalPlayers: 256,
      registeredPlayers: 240,
      prizePool: '₹12,000',
      startDate: '2024-01-16 20:00',
      status: 'Starting Soon',
      description: 'Professional level tournament for experienced players',
      rules: ['4-player teams', 'Best of 3 rounds', 'Standard rules apply', 'Fair play enforced']
    },
    {
      id: '3',
      name: 'Ultimate Fire Arena',
      entryFee: 9,
      totalPlayers: 512,
      registeredPlayers: 512,
      prizePool: '₹20,000',
      startDate: '2024-01-14 16:00',
      status: 'Full',
      description: 'Massive tournament with the biggest prize pool',
      rules: ['4-player teams', 'Multiple rounds', 'Skills-based matchmaking', 'Zero tolerance for cheating']
    },
    {
      id: '4',
      name: 'Rookie Fire Challenge',
      entryFee: 9,
      totalPlayers: 128,
      registeredPlayers: 45,
      prizePool: '₹8,000',
      startDate: '2024-01-17 19:00',
      status: 'Open',
      description: 'Perfect tournament for newcomers and beginners',
      rules: ['4-player teams', 'Beginner friendly', 'Practice rounds available', 'Learning focused']
    }
  ];

  const handlePaymentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPaymentScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJoinTournament = (tournament: Tournament) => {
    if (tournament.status === 'Full') {
      toast({
        title: "Tournament Full",
        description: "This tournament has reached maximum capacity",
        variant: "destructive"
      });
      return;
    }
    setSelectedTournament(tournament);
    setIsPaymentDialogOpen(true);
  };

  const submitPayment = () => {
    if (!paymentScreenshot) {
      toast({
        title: "Payment Required",
        description: "Please upload your payment screenshot",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Submitted!",
      description: "Your payment is being verified. You'll be notified once approved.",
    });

    setIsPaymentDialogOpen(false);
    navigate('/confirm-review');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-500';
      case 'Starting Soon': return 'bg-yellow-500';
      case 'Full': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg">
              Step 2 of 3
            </Badge>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Join Tournament</h1>
            <p className="text-gray-600 text-lg">Choose your battle and pay the entry fee</p>
          </div>

          {/* Tournament Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {tournaments.map((tournament) => (
              <Card key={tournament.id} className="border-0 shadow-xl bg-white/90 backdrop-blur hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-bold text-gray-800">{tournament.name}</CardTitle>
                    <Badge className={`${getStatusColor(tournament.status)} text-white`}>
                      {tournament.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{tournament.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Tournament Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Entry Fee</p>
                      <p className="text-xl font-bold text-green-600">₹{tournament.entryFee}</p>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <Trophy className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Prize Pool</p>
                      <p className="text-xl font-bold text-orange-600">{tournament.prizePool}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Players</p>
                      <p className="text-lg font-bold text-blue-600">
                        {tournament.registeredPlayers}/{tournament.totalPlayers}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Start Time</p>
                      <p className="text-sm font-bold text-purple-600">
                        {new Date(tournament.startDate).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(tournament.registeredPlayers / tournament.totalPlayers) * 100}%` }}
                    ></div>
                  </div>

                  {/* Rules Preview */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Tournament Rules:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tournament.rules.map((rule, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">₹2 reward per kill</span>
                  </div>

                  <Button 
                    className={`w-full py-6 text-lg font-semibold ${
                      tournament.status === 'Full' 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
                    } text-white`}
                    onClick={() => handleJoinTournament(tournament)}
                    disabled={tournament.status === 'Full'}
                  >
                    {tournament.status === 'Full' ? 'Tournament Full' : 'Join Tournament'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Dialog */}
          <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Join {selectedTournament?.name}
                </DialogTitle>
              </DialogHeader>
              
              {selectedTournament && (
                <div className="grid md:grid-cols-2 gap-6">
                  {/* QR Code Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment QR Code</h3>
                    <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="w-48 h-48 bg-white rounded-lg shadow-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Scan to pay ₹{selectedTournament.entryFee}</p>
                      <Badge className="bg-green-500 text-white">UPI Payment</Badge>
                    </Card>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Payment Instructions:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Scan the QR code with any UPI app</li>
                        <li>• Pay exactly ₹{selectedTournament.entryFee}</li>
                        <li>• Take a screenshot of successful payment</li>
                        <li>• Upload the screenshot on the right</li>
                      </ul>
                    </div>
                  </div>

                  {/* Upload Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Upload Payment Screenshot</h3>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                      {paymentScreenshot ? (
                        <div className="space-y-4">
                          <img 
                            src={paymentScreenshot} 
                            alt="Payment Screenshot" 
                            className="max-w-full h-48 object-contain mx-auto rounded-lg"
                          />
                          <p className="text-sm text-green-600 font-medium">Screenshot uploaded successfully!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-700">Upload Payment Proof</p>
                            <p className="text-sm text-gray-500">Click or drag your screenshot here</p>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePaymentUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2">Tournament Details:</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p><strong>Entry Fee:</strong> ₹{selectedTournament.entryFee}</p>
                        <p><strong>Prize Pool:</strong> {selectedTournament.prizePool}</p>
                        <p><strong>Start Time:</strong> {new Date(selectedTournament.startDate).toLocaleString()}</p>
                        <p><strong>Kill Reward:</strong> ₹2 per kill</p>
                      </div>
                    </div>

                    <Button 
                      onClick={submitPayment}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-6 text-lg font-semibold"
                      disabled={!paymentScreenshot}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Payment & Join Tournament
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default JoinTournament;
