
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  CreditCard, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  Plus,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  campaign: string;
  creator?: string;
  brand?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'processing';
  dueDate: string;
  createdAt: string;
  razorpayLink?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    campaign: 'Summer Fashion Collection 2024',
    creator: 'Sarah Johnson',
    amount: 5000,
    currency: 'USD',
    status: 'paid',
    dueDate: '2024-02-15',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    campaign: 'Tech Product Launch',
    brand: 'TechCorp Inc.',
    amount: 12000,
    currency: 'USD',
    status: 'pending',
    dueDate: '2024-02-20',
    createdAt: '2024-01-20',
    razorpayLink: 'https://rzp.io/i/sample-link'
  },
  {
    id: '3',
    campaign: 'Fitness App Promotion',
    creator: 'Mike Chen',
    amount: 3500,
    currency: 'USD',
    status: 'processing',
    dueDate: '2024-02-10',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    campaign: 'Travel Gear Campaign',
    creator: 'Emma Rodriguez',
    amount: 7500,
    currency: 'USD',
    status: 'failed',
    dueDate: '2024-02-05',
    createdAt: '2024-01-05'
  }
];

const Payments = () => {
  const [payments] = useState<Payment[]>(mockPayments);
  const [selectedView, setSelectedView] = useState<'brand' | 'creator'>('brand');
  const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    campaign: '',
    amount: '',
    dueDate: '',
    creator: ''
  });
  const { toast } = useToast();

  // Calculate summary stats
  const summaryStats = {
    pending: payments.filter(p => p.status === 'pending'),
    paid: payments.filter(p => p.status === 'paid'),
    failed: payments.filter(p => p.status === 'failed'),
    processing: payments.filter(p => p.status === 'processing')
  };

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = summaryStats.paid.reduce((sum, payment) => sum + payment.amount, 0);
  const collectionRate = totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, icon: Clock, label: 'Pending' },
      paid: { variant: 'default' as const, icon: CheckCircle, label: 'Paid' },
      failed: { variant: 'destructive' as const, icon: AlertCircle, label: 'Failed' },
      processing: { variant: 'outline' as const, icon: TrendingUp, label: 'Processing' }
    };

    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const handleCreatePayment = () => {
    if (!newPayment.campaign || !newPayment.amount || !newPayment.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate Razorpay link generation
    const razorpayLink = `https://rzp.io/i/${Math.random().toString(36).substr(2, 9)}`;
    
    toast({
      title: "Payment Link Created",
      description: `Razorpay payment link generated for ${newPayment.campaign}`,
    });

    // Copy link to clipboard
    navigator.clipboard.writeText(razorpayLink);
    
    setIsCreatePaymentOpen(false);
    setNewPayment({ campaign: '', amount: '', dueDate: '', creator: '' });
  };

  const handleRazorpayLink = (link: string) => {
    window.open(link, '_blank');
    toast({
      title: "Redirecting to Razorpay",
      description: "Opening payment link in new tab",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Payments Dashboard
          </h1>
          <p className="text-gray-300">
            Manage payments, track collections, and initiate transactions
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(summaryStats.pending.reduce((sum, p) => sum + p.amount, 0))}
              </div>
              <p className="text-xs text-gray-400">
                {summaryStats.pending.length} payments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Paid</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(paidAmount)}
              </div>
              <p className="text-xs text-gray-400">
                {summaryStats.paid.length} payments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Failed</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {formatCurrency(summaryStats.failed.reduce((sum, p) => sum + p.amount, 0))}
              </div>
              <p className="text-xs text-gray-400">
                {summaryStats.failed.length} payments
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Collection Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {collectionRate.toFixed(1)}%
              </div>
              <Progress value={collectionRate} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_64px_0_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Payment Management</h2>
            <div className="flex items-center space-x-4">
              <Select value={selectedView} onValueChange={(value: 'brand' | 'creator') => setSelectedView(value)}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand">Brand View</SelectItem>
                  <SelectItem value="creator">Creator View</SelectItem>
                </SelectContent>
              </Select>
              
              {selectedView === 'brand' && (
                <Dialog open={isCreatePaymentOpen} onOpenChange={setIsCreatePaymentOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white/10 backdrop-blur-xl border-white/20">
                    <DialogHeader>
                      <DialogTitle className="text-white">Create New Payment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="campaign" className="text-white">Campaign</Label>
                        <Input
                          id="campaign"
                          placeholder="Campaign name"
                          value={newPayment.campaign}
                          onChange={(e) => setNewPayment({...newPayment, campaign: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="creator" className="text-white">Creator</Label>
                        <Input
                          id="creator"
                          placeholder="Creator name"
                          value={newPayment.creator}
                          onChange={(e) => setNewPayment({...newPayment, creator: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount" className="text-white">Amount (USD)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="5000"
                          value={newPayment.amount}
                          onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dueDate" className="text-white">Due Date</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newPayment.dueDate}
                          onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <Button onClick={handleCreatePayment} className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                        Generate Razorpay Link
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Payments Table */}
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-white/5">
                  <TableHead className="text-gray-300 font-medium">Campaign</TableHead>
                  <TableHead className="text-gray-300 font-medium">
                    {selectedView === 'brand' ? 'Creator' : 'Brand'}
                  </TableHead>
                  <TableHead className="text-gray-300 font-medium">Amount</TableHead>
                  <TableHead className="text-gray-300 font-medium">Status</TableHead>
                  <TableHead className="text-gray-300 font-medium">Due Date</TableHead>
                  <TableHead className="text-gray-300 font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments
                  .filter(payment => selectedView === 'brand' ? payment.creator : payment.brand)
                  .map((payment) => (
                  <TableRow key={payment.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">
                      {payment.campaign}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {selectedView === 'brand' ? payment.creator : payment.brand}
                    </TableCell>
                    <TableCell className="text-white font-mono">
                      {formatCurrency(payment.amount, payment.currency)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.status)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(payment.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {selectedView === 'brand' && payment.razorpayLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRazorpayLink(payment.razorpayLink!)}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Pay Now
                          </Button>
                        )}
                        {selectedView === 'creator' && payment.status === 'paid' && (
                          <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                            <DollarSign className="w-3 h-3 mr-1" />
                            Received
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Payment Statistics */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(totalAmount)}
                </div>
                <p className="text-sm text-gray-400">Total Payment Volume</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {payments.length}
                </div>
                <p className="text-sm text-gray-400">Total Transactions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(totalAmount / payments.length)}
                </div>
                <p className="text-sm text-gray-400">Average Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
