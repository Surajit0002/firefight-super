
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Eye, Clock, DollarSign, User, Calendar } from "lucide-react";

const PaymentsApproval = () => {
  const [payments] = useState([
    {
      id: 1,
      teamName: "Fire Squad",
      playerName: "John Doe",
      tournament: "Fire Fight Championship",
      amount: 36,
      screenshot: "/placeholder.svg?height=400&width=300",
      uploadTime: "2024-06-03T14:30:00",
      status: "Pending"
    },
    {
      id: 2,
      teamName: "Storm Riders",
      playerName: "Sarah Smith",
      tournament: "Weekend Warriors",
      amount: 36,
      screenshot: "/placeholder.svg?height=400&width=300",
      uploadTime: "2024-06-03T13:15:00",
      status: "Pending"
    },
    {
      id: 3,
      teamName: "Night Hawks",
      playerName: "Mike Johnson",
      tournament: "Fire Fight Championship",
      amount: 36,
      screenshot: "/placeholder.svg?height=400&width=300",
      uploadTime: "2024-06-03T12:45:00",
      status: "Approved"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const pendingPayments = payments.filter(p => p.status === "Pending");
  const approvedPayments = payments.filter(p => p.status === "Approved");
  const rejectedPayments = payments.filter(p => p.status === "Rejected");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payments Approval</h1>
          <p className="text-gray-600">Review and approve payment screenshots</p>
        </div>
        <div className="flex gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-lg font-bold text-yellow-600">{pendingPayments.length}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingPayments.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedPayments.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Rejected ({rejectedPayments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingPayments.map((payment) => (
              <Card key={payment.id} className="border-0 shadow-lg bg-white/90 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{payment.teamName}</CardTitle>
                      <CardDescription>{payment.playerName}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span>₹{payment.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>{payment.tournament}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>{new Date(payment.uploadTime).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <img 
                      src={payment.screenshot} 
                      alt="Payment Screenshot"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View Full
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Payment Screenshot - {payment.teamName}</DialogTitle>
                          <DialogDescription>
                            {payment.playerName} • {payment.tournament} • ₹{payment.amount}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <img 
                            src={payment.screenshot} 
                            alt="Payment Screenshot"
                            className="w-full max-h-96 object-contain rounded-lg border"
                          />
                          <div className="flex gap-3">
                            <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve Payment
                            </Button>
                            <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject Payment
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {approvedPayments.map((payment) => (
              <Card key={payment.id} className="border-0 shadow-lg bg-white/90 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{payment.teamName}</CardTitle>
                      <CardDescription>{payment.playerName}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span>₹{payment.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>{payment.tournament}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>{new Date(payment.uploadTime).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="text-center py-12">
            <XCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Rejected Payments</h3>
            <p className="text-gray-500">All payment reviews have been approved</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsApproval;
