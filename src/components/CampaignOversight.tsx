
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Ban, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Campaign {
  id: string;
  title: string;
  brand: string;
  budget: number;
  status: 'active' | 'paused' | 'completed' | 'draft';
  createdAt: string;
  applicants: number;
  approved: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Fashion Collection',
    brand: 'FashionBrand Inc',
    budget: 25000,
    status: 'active',
    createdAt: '2024-01-15',
    applicants: 45,
    approved: 12
  },
  {
    id: '2',
    title: 'Tech Product Launch',
    brand: 'TechCorp',
    budget: 50000,
    status: 'active',
    createdAt: '2024-01-10',
    applicants: 78,
    approved: 8
  },
  {
    id: '3',
    title: 'Fitness Challenge',
    brand: 'HealthyCorp',
    budget: 15000,
    status: 'completed',
    createdAt: '2024-01-05',
    applicants: 32,
    approved: 15
  },
  {
    id: '4',
    title: 'Food Festival Promo',
    brand: 'FoodieApp',
    budget: 12000,
    status: 'paused',
    createdAt: '2024-01-20',
    applicants: 23,
    approved: 5
  }
];

export const CampaignOversight = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleStatusChange = (campaignId: string, newStatus: Campaign['status']) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: newStatus }
        : campaign
    ));
    toast({
      title: "Campaign Status Updated",
      description: `Campaign status changed to ${newStatus}`,
    });
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'paused': return 'bg-yellow-500/20 text-yellow-300';
      case 'completed': return 'bg-blue-500/20 text-blue-300';
      case 'draft': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const totalBudget = campaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalApplicants = campaigns.reduce((sum, campaign) => sum + campaign.applicants, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Campaigns</p>
                <p className="text-3xl font-bold text-white">{campaigns.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Campaigns</p>
                <p className="text-3xl font-bold text-white">{activeCampaigns}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Budget</p>
                <p className="text-3xl font-bold text-white">${totalBudget.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-300 font-bold">$</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Campaign Oversight</CardTitle>
          <CardDescription className="text-gray-300">
            Monitor and manage all platform campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
          </div>

          <div className="rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-gray-300">Campaign</TableHead>
                  <TableHead className="text-gray-300">Budget</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Applicants</TableHead>
                  <TableHead className="text-gray-300">Approved</TableHead>
                  <TableHead className="text-gray-300">Created</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="border-white/20 hover:bg-white/5">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{campaign.title}</div>
                        <div className="text-sm text-gray-400">{campaign.brand}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      ${campaign.budget.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{campaign.applicants}</TableCell>
                    <TableCell className="text-gray-300">{campaign.approved}</TableCell>
                    <TableCell className="text-gray-300">{campaign.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {campaign.status === 'active' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(campaign.id, 'paused')}
                            className="text-yellow-300 hover:bg-yellow-500/10"
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : campaign.status === 'paused' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(campaign.id, 'active')}
                            className="text-green-300 hover:bg-green-500/10"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
