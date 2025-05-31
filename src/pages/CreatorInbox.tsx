
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MessageCircle, 
  Clock, 
  DollarSign, 
  Calendar,
  Filter,
  Eye,
  Reply
} from "lucide-react";

const CreatorInbox = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock inbox messages data
  const messages = [
    {
      id: 1,
      campaignName: "Summer Tech Review Series",
      brandName: "TechCorp",
      brandLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
      status: "new",
      budget: 2500,
      deadline: "2024-06-15",
      message: "We'd love to collaborate with you on our new smartphone review series. Your tech content aligns perfectly with our brand values.",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      campaignName: "Sustainable Living Campaign",
      brandName: "EcoLife",
      brandLogo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=50&h=50&fit=crop",
      status: "replied",
      budget: 1800,
      deadline: "2024-06-20",
      message: "Your eco-friendly content resonates with our audience. We're looking for creators who can showcase sustainable technology solutions.",
      timestamp: "1 day ago",
      unread: false
    },
    {
      id: 3,
      campaignName: "Gadget Launch Event",
      brandName: "GadgetPro",
      brandLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop",
      status: "negotiating",
      budget: 3200,
      deadline: "2024-06-10",
      message: "We're launching our newest product line and would like you to be part of our influencer program. Exclusive early access included!",
      timestamp: "3 days ago",
      unread: false
    },
    {
      id: 4,
      campaignName: "Lifestyle Brand Partnership",
      brandName: "ModernLife",
      brandLogo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=50&h=50&fit=crop",
      status: "confirmed",
      budget: 2200,
      deadline: "2024-07-01",
      message: "Thanks for accepting our collaboration! Contract details have been sent to your email. Looking forward to working together.",
      timestamp: "5 days ago",
      unread: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'replied': return 'bg-yellow-500';
      case 'negotiating': return 'bg-orange-500';
      case 'confirmed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'replied': return 'Replied';
      case 'negotiating': return 'Negotiating';
      case 'confirmed': return 'Confirmed';
      default: return status;
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMessageClick = (messageId: number) => {
    navigate(`/dashboard/crm/${messageId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <CreatorSidebar />
          <SidebarInset className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Messages
                  </h1>
                  <p className="text-gray-400 mt-1">
                    Manage your collaboration requests and conversations
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={`${messages.filter(m => m.unread).length > 0 ? 'bg-red-500' : 'bg-gray-500'}`}>
                    {messages.filter(m => m.unread).length} Unread
                  </Badge>
                </div>
              </div>

              {/* Search and Filters */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search campaigns or brands..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white text-sm"
                      >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="replied">Replied</option>
                        <option value="negotiating">Negotiating</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Messages List */}
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <Card 
                    key={message.id} 
                    className={`bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer ${
                      message.unread ? 'border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => handleMessageClick(message.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={message.brandLogo} alt={message.brandName} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                              {message.brandName.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <h3 className={`font-semibold ${message.unread ? 'text-white' : 'text-gray-300'}`}>
                                  {message.campaignName}
                                </h3>
                                <Badge className={getStatusColor(message.status)}>
                                  {getStatusText(message.status)}
                                </Badge>
                              </div>
                              <span className="text-gray-400 text-sm">{message.timestamp}</span>
                            </div>
                            
                            <p className="text-gray-500 text-sm mb-1">From: {message.brandName}</p>
                            <p className={`text-sm mb-3 line-clamp-2 ${message.unread ? 'text-gray-300' : 'text-gray-400'}`}>
                              {message.message}
                            </p>
                            
                            <div className="flex items-center space-x-6 text-sm">
                              <div className="flex items-center space-x-1 text-green-400">
                                <DollarSign className="w-4 h-4" />
                                <span>${message.budget.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-blue-400">
                                <Calendar className="w-4 h-4" />
                                <span>Due: {message.deadline}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                            <Reply className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMessages.length === 0 && (
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-2">No messages found</h3>
                    <p className="text-gray-400">
                      {searchQuery || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filters' 
                        : 'New collaboration requests will appear here'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CreatorInbox;
