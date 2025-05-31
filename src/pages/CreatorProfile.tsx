
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Users, Heart, MessageCircle, Eye, TrendingUp, MapPin, Calendar, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock creator data - in real app this would come from API
const mockCreator = {
  id: 1,
  name: "Alex Chen",
  username: "@alexcreates",
  bio: "Tech reviewer & lifestyle content creator passionate about emerging technologies and sustainable living. I help my audience make informed decisions about the latest gadgets while promoting eco-friendly alternatives.",
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop",
  followers: 125000,
  engagement: 4.2,
  platforms: [
    { name: "YouTube", followers: 85000, engagement: 4.5, handle: "@alexcreates" },
    { name: "Instagram", followers: 40000, engagement: 3.8, handle: "@alex.creates" }
  ],
  location: "San Francisco, CA",
  joinedDate: "March 2020",
  category: "Technology",
  language: "English",
  verified: true,
  demographics: {
    age: [
      { name: '18-24', value: 25, color: '#8884d8' },
      { name: '25-34', value: 45, color: '#82ca9d' },
      { name: '35-44', value: 20, color: '#ffc658' },
      { name: '45+', value: 10, color: '#ff7300' }
    ],
    gender: [
      { name: 'Male', value: 60, color: '#8884d8' },
      { name: 'Female', value: 35, color: '#82ca9d' },
      { name: 'Other', value: 5, color: '#ffc658' }
    ],
    locations: [
      { country: 'United States', percentage: 45 },
      { country: 'Canada', percentage: 15 },
      { country: 'United Kingdom', percentage: 12 },
      { country: 'Australia', percentage: 8 },
      { country: 'Germany', percentage: 6 },
      { country: 'Others', percentage: 14 }
    ]
  },
  metrics: {
    averageViews: 85000,
    totalViews: 12500000,
    posts: 156,
    collaborations: 24,
    growth: [
      { month: 'Jan', followers: 98000 },
      { month: 'Feb', followers: 102000 },
      { month: 'Mar', followers: 108000 },
      { month: 'Apr', followers: 115000 },
      { month: 'May', followers: 120000 },
      { month: 'Jun', followers: 125000 }
    ]
  },
  collaborations: [
    { brand: "TechCorp", campaign: "Smartphone Review", date: "May 2024", performance: "4.8M views" },
    { brand: "EcoLife", campaign: "Sustainable Tech", date: "April 2024", performance: "2.1M views" },
    { brand: "GadgetPro", campaign: "Product Launch", date: "March 2024", performance: "3.5M views" }
  ],
  rates: {
    youtube: { post: 2500, story: 800, reel: 1200 },
    instagram: { post: 1800, story: 600, reel: 1000 }
  }
};

const CreatorProfile = () => {
  const { id } = useParams();
  const [showOutreachModal, setShowOutreachModal] = useState(false);
  const creator = mockCreator; // In real app, fetch by id

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Banner Section */}
      <div className="relative h-80 bg-cover bg-center" style={{ backgroundImage: `url(${creator.bannerImage})` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={creator.profileImage} alt={creator.name} />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl font-bold">
                  {creator.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {creator.verified && (
                <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-blue-500 bg-white rounded-full" />
              )}
            </div>
            <div className="flex-1 text-white mb-4">
              <h1 className="text-4xl font-bold mb-2">{creator.name}</h1>
              <p className="text-xl text-gray-300 mb-2">{creator.username}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {creator.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {creator.joinedDate}
                </div>
                <Badge className="bg-purple-500">{creator.category}</Badge>
              </div>
            </div>
            <Dialog open={showOutreachModal} onOpenChange={setShowOutreachModal}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 mb-4">
                  Send Outreach
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white">
                <DialogHeader>
                  <DialogTitle>Send Outreach to {creator.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-300">Reach out to collaborate with this creator. Our team will help facilitate the connection.</p>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                    Contact Creator
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(creator.followers)}</div>
              <div className="text-gray-400 text-sm">Total Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{creator.engagement}%</div>
              <div className="text-gray-400 text-sm">Avg Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatNumber(creator.metrics.averageViews)}</div>
              <div className="text-gray-400 text-sm">Avg Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{creator.metrics.collaborations}</div>
              <div className="text-gray-400 text-sm">Collaborations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">Overview</TabsTrigger>
            <TabsTrigger value="audience" className="data-[state=active]:bg-purple-500">Audience</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-purple-500">Performance</TabsTrigger>
            <TabsTrigger value="collaborations" className="data-[state=active]:bg-purple-500">Collaborations</TabsTrigger>
            <TabsTrigger value="rates" className="data-[state=active]:bg-purple-500">Rates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bio */}
              <Card className="lg:col-span-2 bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{creator.bio}</p>
                </CardContent>
              </Card>

              {/* Platforms */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Platforms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {creator.platforms.map((platform, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{platform.name}</div>
                        <div className="text-gray-400 text-sm">{platform.handle}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{formatNumber(platform.followers)}</div>
                        <div className="text-gray-400 text-sm">{platform.engagement}% eng.</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Age Demographics */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Age Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={creator.demographics.age}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {creator.demographics.age.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gender Demographics */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Gender Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={creator.demographics.gender}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="name" stroke="#ffffff80" />
                      <YAxis stroke="#ffffff80" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                        labelStyle={{ color: '#ffffff' }}
                      />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Geographic Distribution */}
              <Card className="lg:col-span-2 bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Top Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {creator.demographics.locations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-300">{location.country}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            />
                          </div>
                          <span className="text-white text-sm w-8">{location.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={creator.metrics.growth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#ffffff80" />
                    <YAxis stroke="#ffffff80" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                      labelStyle={{ color: '#ffffff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="followers" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatNumber(creator.metrics.totalViews)}</div>
                  <div className="text-gray-400 text-sm">Total Views</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{creator.metrics.posts}</div>
                  <div className="text-gray-400 text-sm">Total Posts</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">+8.2%</div>
                  <div className="text-gray-400 text-sm">Growth Rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collaborations" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Past Collaborations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {creator.collaborations.map((collab, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <div className="text-white font-semibold">{collab.brand}</div>
                        <div className="text-gray-400">{collab.campaign}</div>
                        <div className="text-gray-500 text-sm">{collab.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{collab.performance}</div>
                        <div className="text-gray-400 text-sm">Performance</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(creator.rates).map(([platform, rates]) => (
                <Card key={platform} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white capitalize">{platform} Rates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(rates).map(([type, rate]) => (
                      <div key={type} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <div className="text-gray-300 capitalize">{type}</div>
                        <div className="flex items-center text-white font-semibold">
                          <DollarSign className="w-4 h-4" />
                          {rate.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorProfile;
