
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, DollarSign, TrendingUp, Calendar } from "lucide-react";

const CampaignDetail = () => {
  const { id } = useParams();

  // Mock campaign data - in real app, you'd fetch this based on ID
  const campaign = {
    id: parseInt(id || '1'),
    name: "Summer Fashion Collection",
    status: "active",
    description: "Promote our new summer fashion line targeting young adults interested in sustainable fashion.",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 50000,
    spent: 32000,
    creators: 12,
    engagement: 4.2,
    platform: "Instagram",
    category: "Fashion"
  };

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
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link to="/campaigns">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Campaigns
            </Link>
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{campaign.name}</h1>
              {getStatusBadge(campaign.status)}
            </div>
            <p className="text-gray-300">{campaign.description}</p>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Budget</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(campaign.budget)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Amount Spent</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(campaign.spent)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Creators</p>
                  <p className="text-2xl font-bold text-white">{campaign.creators}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Avg Engagement</p>
                  <p className="text-2xl font-bold text-white">{campaign.engagement}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-pink-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Campaign Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Start Date:</span>
                <span className="text-white font-medium">{formatDate(campaign.startDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">End Date:</span>
                <span className="text-white font-medium">{formatDate(campaign.endDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Platform:</span>
                <Badge variant="outline" className="border-white/30 text-gray-300">
                  {campaign.platform}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Category:</span>
                <Badge variant="outline" className="border-white/30 text-gray-300">
                  {campaign.category}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Allocated Budget:</span>
                  <span className="text-white font-medium">{formatCurrency(campaign.budget)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Amount Spent:</span>
                  <span className="text-white font-medium">{formatCurrency(campaign.spent)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Remaining:</span>
                  <span className="text-green-400 font-medium">{formatCurrency(campaign.budget - campaign.spent)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400">
                  {((campaign.spent / campaign.budget) * 100).toFixed(1)}% of budget used
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            Edit Campaign
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            View Analytics
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link to="/discover">
              Find More Creators
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
