
import React, { useState } from 'react';
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, TrendingUp, Calendar } from "lucide-react";

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
    milestone: 'Content Creation Complete',
    amount: 1250,
    dueDate: '2024-02-01',
    status: 'pending'
  },
  {
    id: '2',
    campaign: 'Tech Product Launch',
    milestone: 'Final Content Delivery',
    amount: 2500,
    dueDate: '2024-01-25',
    status: 'paid',
    paidDate: '2024-01-25',
    transactionId: 'TXN123456789'
  },
  {
    id: '3',
    campaign: 'Fitness App Promotion',
    milestone: 'Initial Post Publication',
    amount: 900,
    dueDate: '2024-01-20',
    status: 'paid',
    paidDate: '2024-01-20',
    transactionId: 'TXN987654321'
  },
  {
    id: '4',
    campaign: 'Travel Gear Campaign',
    milestone: 'Story Series Complete',
    amount: 750,
    dueDate: '2024-01-15',
    status: 'failed'
  }
];

const CreatorPayments = () => {
  const [payments] = useState<Payment[]>(mockPayments);

  const upcomingPayments = payments.filter(p => p.status === 'pending');
  const paidPayments = payments.filter(p => p.status === 'paid');
  const failedPayments = payments.filter(p => p.status === 'failed');

  const totalEarnings = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = upcomingPayments.reduce((sum, p) => sum + p.amount, 0);

  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pending', emoji: '⏳' },
      paid: { variant: 'default' as const, label: 'Paid', emoji: '✅' },
      failed: { variant: 'destructive' as const, label: 'Failed', emoji: '❌' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant}>
        {config.emoji} {config.label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <CreatorSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Payments & Earnings
            </h1>
            <p className="text-gray-300">
              Track your payments, milestones, and earnings
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">{formatCurrency(totalEarnings)}</div>
                <p className="text-xs text-gray-400">From {paidPayments.length} completed milestones</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Pending Payments</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">{formatCurrency(pendingAmount)}</div>
                <p className="text-xs text-gray-400">{upcomingPayments.length} payments awaiting</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Success Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round((paidPayments.length / payments.length) * 100)}%
                </div>
                <p className="text-xs text-gray-400">Payment success rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Payments Table */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_64px_0_rgba(0,0,0,0.3)]">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10 mb-6">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-500/30">
                  Upcoming ({upcomingPayments.length})
                </TabsTrigger>
                <TabsTrigger value="paid" className="data-[state=active]:bg-purple-500/30">
                  Paid ({paidPayments.length})
                </TabsTrigger>
                <TabsTrigger value="failed" className="data-[state=active]:bg-purple-500/30">
                  Failed ({failedPayments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
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
                          <TableCell className="text-white font-medium">{payment.campaign}</TableCell>
                          <TableCell className="text-gray-300">{payment.milestone}</TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="paid">
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
                      {paidPayments.map((payment) => (
                        <TableRow key={payment.id} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-white font-medium">{payment.campaign}</TableCell>
                          <TableCell className="text-gray-300">{payment.milestone}</TableCell>
                          <TableCell className="text-green-400 font-semibold">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : '-'}
                          </TableCell>
                          <TableCell className="text-gray-400 font-mono text-sm">
                            {payment.transactionId || '-'}
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="failed">
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-gray-300 font-medium">Campaign</TableHead>
                        <TableHead className="text-gray-300 font-medium">Milestone</TableHead>
                        <TableHead className="text-gray-300 font-medium">Amount</TableHead>
                        <TableHead className="text-gray-300 font-medium">Due Date</TableHead>
                        <TableHead className="text-gray-300 font-medium">Status</TableHead>
                        <TableHead className="text-gray-300 font-medium">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {failedPayments.map((payment) => (
                        <TableRow key={payment.id} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-white font-medium">{payment.campaign}</TableCell>
                          <TableCell className="text-gray-300">{payment.milestone}</TableCell>
                          <TableCell className="text-red-400 font-semibold">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(payment.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Contact Support
                            </Button>
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
  );
};

export default CreatorPayments;
