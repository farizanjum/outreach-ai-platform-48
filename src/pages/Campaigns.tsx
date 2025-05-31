
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, DollarSign, Users, TrendingUp } from "lucide-react";
import CreateCampaignModal from "@/components/CreateCampaignModal";

interface Campaign {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'draft' | 'paused';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  creators: number;
  engagement: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Summer Fashion Collection",
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 50000,
    spent: 32000,
    creators: 12,
    engagement: 4.2
  },
  {
    id: 2,
    name: "Tech Product Launch",
    status: "completed",
    startDate: "2024-03-15",
    endDate: "2024-05-15",
    budget: 75000,
    spent: 73500,
    creators: 8,
    engagement: 3.8
  },
  {
    id: 3,
    name: "Holiday Special",
    status: "draft",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    budget: 100000,
    spent: 0,
    creators: 0,
    engagement: 0
  },
  {
    id: 4,
    name: "Fitness App Promotion",
    status: "paused",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    budget: 40000,
    spent: 15000,
    creators: 5,
    engagement: 2.9
  }
];

const Campaigns = () => {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredCampaigns = campaigns.filter(campaign => 
    statusFilter === 'all' || campaign.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-500',
      completed: 'bg-blue-500',
      draft: 'bg-gray-500',
      paused: 'bg-yellow-500'
    };
    
    return (
      <Badge className={`${statusColors[status as keyof typeof statusColors]} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Campaign Management</h1>
            <p className="text-gray-300">Manage and track your influencer marketing campaigns</p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <CreateCampaignModal onClose={() => setIsCreateModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Campaigns</p>
                  <p className="text-2xl font-bold text-white">{campaigns.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Campaigns</p>
                  <p className="text-2xl font-bold text-white">
                    {campaigns.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Budget</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(campaigns.reduce((sum, c) => sum + c.budget, 0))}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Creators</p>
                  <p className="text-2xl font-bold text-white">
                    {campaigns.reduce((sum, c) => sum + c.creators, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-pink-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? 'bg-purple-500 hover:bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'active' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('active')}
            className={statusFilter === 'active' ? 'bg-green-500 hover:bg-green-600' : 'border-white/20 text-white hover:bg-white/10'}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === 'completed' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('completed')}
            className={statusFilter === 'completed' ? 'bg-blue-500 hover:bg-blue-600' : 'border-white/20 text-white hover:bg-white/10'}
          >
            Completed
          </Button>
          <Button
            variant={statusFilter === 'draft' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('draft')}
            className={statusFilter === 'draft' ? 'bg-gray-500 hover:bg-gray-600' : 'border-white/20 text-white hover:bg-white/10'}
          >
            Draft
          </Button>
          <Button
            variant={statusFilter === 'paused' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('paused')}
            className={statusFilter === 'paused' ? 'bg-yellow-500 hover:bg-yellow-600' : 'border-white/20 text-white hover:bg-white/10'}
          >
            Paused
          </Button>
        </div>

        {/* Campaigns Table */}
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/20">
                  <TableHead className="text-gray-300">Campaign Name</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Duration</TableHead>
                  <TableHead className="text-gray-300">Budget</TableHead>
                  <TableHead className="text-gray-300">Spent</TableHead>
                  <TableHead className="text-gray-300">Creators</TableHead>
                  <TableHead className="text-gray-300">Engagement</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="border-white/20 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{campaign.name}</TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                    </TableCell>
                    <TableCell className="text-gray-300">{formatCurrency(campaign.budget)}</TableCell>
                    <TableCell className="text-gray-300">{formatCurrency(campaign.spent)}</TableCell>
                    <TableCell className="text-gray-300">{campaign.creators}</TableCell>
                    <TableCell className="text-gray-300">{campaign.engagement}%</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                        asChild
                      >
                        <Link to={`/campaign/${campaign.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Campaigns;
