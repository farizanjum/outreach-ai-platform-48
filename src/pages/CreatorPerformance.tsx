import React, { useState } from 'react';
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Play, Eye, Heart, MessageCircle, TrendingUp, Youtube, ExternalLink } from "lucide-react";

interface ContentMetrics {
  id: string;
  campaign: string;
  contentUrl: string;
  thumbnail: string;
  title: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
  publishedDate: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  engagementRate: number;
}

interface ChartData {
  date: string;
  views: number;
  likes: number;
  comments: number;
}

const mockContent: ContentMetrics[] = [
  {
    id: '1',
    campaign: 'Summer Fashion Collection 2024',
    contentUrl: 'https://youtube.com/watch?v=example1',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
    title: 'Summer Fashion Haul 2024 | StyleCo Collection Review',
    platform: 'youtube',
    publishedDate: '2024-01-20',
    views: 45230,
    likes: 2134,
    comments: 342,
    shares: 156,
    engagementRate: 5.8
  },
  {
    id: '2',
    campaign: 'Tech Product Launch',
    contentUrl: 'https://youtube.com/watch?v=example2',
    thumbnail: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=300&h=200&fit=crop',
    title: 'Unboxing the Latest Tech Gadget | Full Review',
    platform: 'youtube',
    publishedDate: '2024-01-15',
    views: 78540,
    likes: 4521,
    comments: 678,
    shares: 289,
    engagementRate: 7.2
  },
  {
    id: '3',
    campaign: 'Fitness App Promotion',
    contentUrl: 'https://instagram.com/p/example',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
    title: '30-Day Fitness Challenge Results',
    platform: 'instagram',
    publishedDate: '2024-01-10',
    views: 23450,
    likes: 1876,
    comments: 234,
    shares: 98,
    engagementRate: 9.3
  }
];

const chartData: ChartData[] = [
  { date: '2024-01-01', views: 12000, likes: 890, comments: 145 },
  { date: '2024-01-05', views: 18500, likes: 1340, comments: 200 },
  { date: '2024-01-10', views: 23450, likes: 1876, comments: 234 },
  { date: '2024-01-15', views: 35600, likes: 2890, comments: 356 },
  { date: '2024-01-20', views: 45230, likes: 3456, comments: 445 },
  { date: '2024-01-25', views: 52340, likes: 4123, comments: 567 }
];

const CreatorPerformance = () => {
  const [content] = useState<ContentMetrics[]>(mockContent);

  const totalViews = content.reduce((sum, c) => sum + c.views, 0);
  const totalLikes = content.reduce((sum, c) => sum + c.likes, 0);
  const avgEngagement = content.reduce((sum, c) => sum + c.engagementRate, 0) / content.length;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'instagram':
        return <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded" />;
      case 'tiktok':
        return <div className="w-4 h-4 bg-black rounded" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 w-full">
        <CreatorSidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                Performance Analytics
              </h1>
              <p className="text-gray-300">
                Track your content performance and engagement metrics
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">{formatNumber(totalViews)}</div>
                  <p className="text-xs text-gray-400">Across all content</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Likes</CardTitle>
                  <Heart className="h-4 w-4 text-pink-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pink-400">{formatNumber(totalLikes)}</div>
                  <p className="text-xs text-gray-400">Total engagement</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Avg Engagement</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{avgEngagement.toFixed(1)}%</div>
                  <p className="text-xs text-gray-400">Engagement rate</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Content Pieces</CardTitle>
                  <Play className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{content.length}</div>
                  <p className="text-xs text-gray-400">Published content</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Performance Over Time</h2>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Youtube className="w-4 h-4 mr-2" />
                  Sync with YouTube
                </Button>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="likes" stroke="#ec4899" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {avgEngagement > 5 && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                  <p className="text-green-100 text-sm">
                    🚀 Great news! Your engagement rate is above 5%, which is excellent for your niche. Keep up the amazing work!
                  </p>
                </div>
              )}
            </div>

            {/* Content Performance Grid */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Individual Content Performance</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {content.map((item) => (
                  <Card key={item.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all">
                    <CardHeader className="space-y-0 pb-3">
                      <div className="aspect-video rounded-lg overflow-hidden mb-3">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-white/10">
                          {getPlatformIcon(item.platform)}
                          <span className="ml-1 capitalize">{item.platform}</span>
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={item.contentUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="text-white font-medium text-sm mb-3 line-clamp-2">{item.title}</h3>
                      <div className="text-xs text-gray-400 mb-3">
                        {item.campaign} • {new Date(item.publishedDate).toLocaleDateString()}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-blue-400" />
                          <span className="text-blue-400">{formatNumber(item.views)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3 text-pink-400" />
                          <span className="text-pink-400">{formatNumber(item.likes)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">{formatNumber(item.comments)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-purple-400" />
                          <span className="text-purple-400">{item.engagementRate}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CreatorPerformance;
