
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Users, TrendingUp, Star, MessageCircle, DollarSign, Edit } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock creator data - in real app this would come from useCreatorProfile hook
  const creatorData = {
    name: "Alex Chen",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    profileScore: 85,
    totalCollaborations: 12,
    avgEngagement: 4.2,
    unreadMessages: 3,
    monthlyEarnings: 2850,
    profileCompleteness: 75
  };

  const stats = [
    {
      title: "Profile Strength",
      value: `${creatorData.profileScore}/100`,
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      description: "Complete your profile to boost visibility"
    },
    {
      title: "Past Collaborations",
      value: creatorData.totalCollaborations,
      icon: Users,
      gradient: "from-blue-500 to-purple-500",
      description: "Successful brand partnerships"
    },
    {
      title: "Avg Engagement Rate",
      value: `${creatorData.avgEngagement}%`,
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      description: "Last 30 days performance"
    }
  ];

  const quickActions = [
    {
      title: "Complete Profile",
      description: "Add missing information to boost your visibility",
      action: () => navigate('/dashboard/profile'),
      color: "bg-purple-500",
      urgent: creatorData.profileCompleteness < 80
    },
    {
      title: "View Messages",
      description: `${creatorData.unreadMessages} new collaboration requests`,
      action: () => navigate('/dashboard/crm'),
      color: "bg-blue-500",
      urgent: creatorData.unreadMessages > 0
    },
    {
      title: "Update Rates",
      description: "Keep your pricing competitive",
      action: () => navigate('/dashboard/profile'),
      color: "bg-green-500",
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CreatorSidebar />
          <SidebarInset className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="p-6 space-y-6">
              {/* Welcome Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-purple-500">
                    <AvatarImage src={creatorData.profileImage} alt={creatorData.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-bold">
                      {creatorData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Hey {creatorData.name}, let's make some magic! ✨
                    </h1>
                    <p className="text-gray-400 mt-1">
                      Welcome back to your creator dashboard
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/dashboard/profile')} 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Profile Completion */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg">Profile Completion</h3>
                      <p className="text-gray-400 text-sm">
                        Complete your profile to attract more brands
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                      {creatorData.profileCompleteness}% Complete
                    </Badge>
                  </div>
                  <Progress 
                    value={creatorData.profileCompleteness} 
                    className="h-3 bg-gray-700"
                  />
                  <p className="text-gray-400 text-xs mt-2">
                    {100 - creatorData.profileCompleteness}% remaining to boost your visibility
                  </p>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                          </div>
                        </div>
                        <h3 className="text-white font-semibold mb-1">{stat.title}</h3>
                        <p className="text-gray-400 text-sm">{stat.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      onClick={action.action}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${action.color}`} />
                        <div>
                          <h4 className="text-white font-medium flex items-center gap-2">
                            {action.title}
                            {action.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Action Required
                              </Badge>
                            )}
                          </h4>
                          <p className="text-gray-400 text-sm">{action.description}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                        Go →
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Recent Messages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">TechCorp Campaign</p>
                        <p className="text-gray-400 text-sm">New collaboration request</p>
                      </div>
                      <Badge className="bg-blue-500">New</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">EcoLife Partnership</p>
                        <p className="text-gray-400 text-sm">Contract ready for signature</p>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="w-full text-purple-400 hover:text-purple-300"
                      onClick={() => navigate('/dashboard/crm')}
                    >
                      View All Messages
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      This Month's Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        ${creatorData.monthlyEarnings.toLocaleString()}
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        +23% from last month
                      </p>
                      <div className="flex justify-center">
                        <Badge className="bg-green-500">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Growing
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
