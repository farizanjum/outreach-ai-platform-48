
import React, { useState } from 'react';
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Calendar, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";

interface Payment {
  id: string;
  campaign: string;
  milestone: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'failed';
  paidDate?: string;
  transactionId?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    campaign: 'Summer Fashion Collection 2024',
    milestone: 'Content Creation & Posting',
    amount: 2500,
    dueDate: '2024-02-15',
    status: 'pending'
  },
  {
    id: '2',
    campaign: 'Tech Product Launch',
    milestone: 'Product Review Video',
    amount: 5000,
    dueDate: '2024-01-30',
    status: 'paid',
    paidDate: '2024-01-28',
    transactionId: 'TXN_5432109876'
  },
  {
    id: '3',
    campaign: 'Fitness App Promotion',
    milestone: 'Initial Post & Stories',
    amount: 900,
    dueDate: '2024-02-01',
    status: 'paid',
    paidDate: '2024-02-01',
    transactionId: 'TXN_1234567890'
  },
  {
    id: '4',
    campaign: 'Fitness App Promotion',
    milestone: 'Follow-up Content',
    amount: 900,
    dueDate: '2024-02-20',
    status: 'failed'
  }
];

const CreatorPayments = () => {
  const [payments] = useState<Payment[]>(mockPayments);

  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pending', icon: Clock },
      paid: { variant: 'default' as const, label: 'Paid ✅', icon: CheckCircle },
      failed: { variant: 'destructive' as const, label: 'Failed ❌', icon: XCircle }
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <IconComponent className="w-3 h-3" />
        <span>{config.label}</span>
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const upcomingPayments = payments.filter(p => p.status === 'pending');
  const paidPayments = payments.filter(p => p.status === 'paid');
  const totalEarnings = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 w-full">
        <CreatorSidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Payment Dashboard
              </h1>
              <p className="text-gray-300">
                Track your earnings and payment milestones
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Earnings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{formatCurrency(totalEarnings)}</div>
                  <p className="text-xs text-gray-400">
                    From {paidPayments.length} completed milestones
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Pending Payments</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">{formatCurrency(pendingAmount)}</div>
                  <p className="text-xs text-gray-400">
                    From {upcomingPayments.length} pending milestones
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">{formatCurrency(5000)}</div>
                  <p className="text-xs text-gray-400">
                    +20% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Tables */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_64px_0_rgba(0,0,0,0.3)]">
              <Tabs defaultValue="upcoming" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-white/10">
                  <TabsTrigger value="upcoming" className="text-white data-[state=active]:bg-white/20">
                    Upcoming Payments
                  </TabsTrigger>
                  <TabsTrigger value="history" className="text-white data-[state=active]:bg-white/20">
                    Payment History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Upcoming Payments</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <CreditCard className="w-4 h-4" />
                      <span>{upcomingPayments.length} pending payments</span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                          <TableHead className="text-gray-300 font-medium">Campaign</TableHead>
                          <TableHead className="text-gray-300 font-medium">Milestone</TableHead>
                          <TableHead className="text-gray-300 font-medium">Amount</TableHead>
                          <TableHead className="text-gray-300 font-medium">Due Date</TableHead>
                          <TableHead className="text-gray-300 font-medium">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingPayments.map((payment) => (
                          <TableRow key={payment.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="text-white font-medium">
                              {payment.campaign}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {payment.milestone}
                            </TableCell>
                            <TableCell className="text-green-400 font-semibold">
                              {formatCurrency(payment.amount)}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {new Date(payment.dueDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(payment.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Payment History</h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>{paidPayments.length} completed payments</span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                          <TableHead className="text-gray-300 font-medium">Campaign</TableHead>
                          <TableHead className="text-gray-300 font-medium">Milestone</TableHead>
                          <TableHead className="text-gray-300 font-medium">Amount</TableHead>
                          <TableHead className="text-gray-300 font-medium">Paid Date</TableHead>
                          <TableHead className="text-gray-300 font-medium">Transaction ID</TableHead>
                          <TableHead className="text-gray-300 font-medium">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.filter(p => p.status !== 'pending').map((payment) => (
                          <TableRow key={payment.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="text-white font-medium">
                              {payment.campaign}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {payment.milestone}
                            </TableCell>
                            <TableCell className="text-green-400 font-semibold">
                              {formatCurrency(payment.amount)}
                            </TableCell>
                            <TableCell className="text-gray-300">
                              {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : '-'}
                            </TableCell>
                            <TableCell className="text-gray-400 font-mono text-xs">
                              {payment.transactionId || '-'}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(payment.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CreatorPayments;
