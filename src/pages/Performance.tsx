
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { TrendingUp, Eye, Heart, MessageCircle, DollarSign, Plus, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Performance = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const { toast } = useToast();

  // Mock performance data
  const chartData = [
    { month: 'Jan', views: 45000, likes: 2800, comments: 340 },
    { month: 'Feb', views: 52000, likes: 3200, comments: 420 },
    { month: 'Mar', views: 48000, likes: 2900, comments: 380 },
    { month: 'Apr', views: 61000, likes: 3800, comments: 520 },
    { month: 'May', views: 58000, likes: 3500, comments: 490 },
    { month: 'Jun', views: 67000, likes: 4200, comments: 610 },
  ];

  const chartConfig = {
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
    likes: {
      label: "Likes", 
      color: "hsl(var(--chart-2))",
    },
    comments: {
      label: "Comments",
      color: "hsl(var(--chart-3))",
    },
  };

  const performanceData = [
    {
      id: 1,
      title: "AI in Marketing 2024",
      url: "https://youtube.com/watch?v=abc123",
      views: 67000,
      likes: 4200,
      comments: 610,
      shares: 180,
      roi: 325,
      status: "Active"
    },
    {
      id: 2,
      title: "Future of Social Media",
      url: "https://youtube.com/watch?v=def456",
      views: 45000,
      likes: 2800,
      comments: 340,
      shares: 95,
      roi: 280,
      status: "Completed"
    },
    {
      id: 3,
      title: "Creator Economy Trends",
      url: "https://youtube.com/watch?v=ghi789",
      views: 38000,
      likes: 2200,
      comments: 290,
      shares: 72,
      roi: 210,
      status: "Active"
    }
  ];

  const summaryStats = [
    {
      title: "Total Views",
      value: "2.1M",
      change: "+12.5%",
      icon: Eye,
      trend: "up"
    },
    {
      title: "Total Likes", 
      value: "184K",
      change: "+8.2%",
      icon: Heart,
      trend: "up"
    },
    {
      title: "Total Comments",
      value: "23.4K", 
      change: "+15.3%",
      icon: MessageCircle,
      trend: "up"
    },
    {
      title: "Average ROI",
      value: "271%",
      change: "+4.1%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  const handleAddUrl = () => {
    if (!youtubeUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "URL Added",
      description: "YouTube URL has been added for tracking",
    });
    setYoutubeUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Performance Analytics
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track your content performance and ROI across all campaigns
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      <p className="text-green-400 text-sm font-medium mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Views Chart */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Monthly Views</CardTitle>
              <CardDescription className="text-gray-300">
                Total views across all content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Engagement Chart */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Engagement Trends</CardTitle>
              <CardDescription className="text-gray-300">
                Likes and comments over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="likes" stroke="var(--color-likes)" strokeWidth={2} />
                  <Line type="monotone" dataKey="comments" stroke="var(--color-comments)" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Add Content Form */}
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Add Content for Tracking</CardTitle>
            <CardDescription className="text-gray-300">
              Enter YouTube URLs to track their performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="youtube-url" className="text-white">YouTube URL</Label>
                <Input
                  id="youtube-url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                />
              </div>
              <Button onClick={handleAddUrl} className="mt-6">
                <Plus className="w-4 h-4 mr-2" />
                Add URL
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Table */}
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Content Performance</CardTitle>
            <CardDescription className="text-gray-300">
              Detailed metrics for all tracked content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Content</TableHead>
                  <TableHead className="text-gray-300">Views</TableHead>
                  <TableHead className="text-gray-300">Likes</TableHead>
                  <TableHead className="text-gray-300">Comments</TableHead>
                  <TableHead className="text-gray-300">Shares</TableHead>
                  <TableHead className="text-gray-300">ROI</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-gray-400 text-sm truncate max-w-xs">{item.url}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-white">
                      {item.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.likes.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.comments.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white">
                      {item.shares}
                    </TableCell>
                    <TableCell className="text-white">
                      <span className="text-green-400 font-semibold">
                        {item.roi}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={item.status === 'Active' ? 'default' : 'secondary'}
                        className={item.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
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

export default Performance;
