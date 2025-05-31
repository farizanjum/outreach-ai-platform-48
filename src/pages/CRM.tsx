
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, Send, Bot, Clock, CheckCircle2, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'ai' | 'creator' | 'brand';
  status: 'sent' | 'delivered' | 'read';
  isVoice?: boolean;
}

interface Campaign {
  id: string;
  name: string;
  creator: {
    name: string;
    username: string;
    profileImage: string;
  };
  status: 'negotiating' | 'agreed' | 'rejected';
  lastActivity: Date;
}

const CRM = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi Alex! We'd love to collaborate with you on our new tech product launch. Are you interested in discussing partnership opportunities?",
      timestamp: new Date(2024, 0, 15, 10, 30),
      sender: 'ai',
      status: 'read'
    },
    {
      id: '2',
      content: "Hello! Thanks for reaching out. I'd definitely be interested in learning more about your product and the collaboration details.",
      timestamp: new Date(2024, 0, 15, 14, 20),
      sender: 'creator',
      status: 'read'
    },
    {
      id: '3',
      content: "Perfect! We're launching a new smart home device and think your tech review audience would be a great fit. We can offer $5,000 for a dedicated review video plus product seeding.",
      timestamp: new Date(2024, 0, 16, 9, 15),
      sender: 'ai',
      status: 'delivered'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [campaignStatus, setCampaignStatus] = useState<'negotiating' | 'agreed' | 'rejected'>('negotiating');
  const [isRecording, setIsRecording] = useState(false);

  const campaign: Campaign = {
    id: id || '1',
    name: 'Tech Product Launch Campaign',
    creator: {
      name: 'Alex Chen',
      username: '@alexcreates',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    status: campaignStatus,
    lastActivity: new Date()
  };

  const generateAIDraft = () => {
    const drafts = [
      "Thanks for your interest! Could we discuss the timeline and deliverables in more detail?",
      "I appreciate the offer. Would it be possible to include usage rights for the content?",
      "This sounds great! When would you need the content delivered?",
      "I'd love to move forward with this. Can we schedule a call to discuss the brief?"
    ];
    setAiDraft(drafts[Math.floor(Math.random() * drafts.length)]);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date(),
      sender: 'brand',
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setAiDraft('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'negotiating': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'agreed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'negotiating': return <AlertCircle className="w-4 h-4" />;
      case 'agreed': return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10">
                <Link to="/campaigns">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Campaigns
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12 border-2 border-white/20">
                  <AvatarImage src={campaign.creator.profileImage} alt={campaign.creator.name} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {campaign.creator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold text-white">{campaign.creator.name}</h1>
                  <p className="text-gray-300 text-sm">{campaign.creator.username}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className={`border ${getStatusColor(campaignStatus)}`}>
                {getStatusIcon(campaignStatus)}
                <span className="ml-1 capitalize">{campaignStatus}</span>
              </Badge>
              <Select value={campaignStatus} onValueChange={(value: any) => setCampaignStatus(value)}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="negotiating">Negotiating</SelectItem>
                  <SelectItem value="agreed">Agreed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Messages */}
          <div className="lg:col-span-3">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <span>{campaign.name}</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages Timeline */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'creator' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.sender === 'creator'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                          : message.sender === 'ai'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-white/10 border border-white/20'
                      } rounded-lg p-3`}>
                        {message.sender === 'ai' && (
                          <div className="flex items-center mb-2">
                            <Bot className="w-4 h-4 text-white mr-2" />
                            <span className="text-xs text-white/80">AI Draft</span>
                          </div>
                        )}
                        <p className="text-white text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-white/60">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          <div className="flex items-center space-x-1">
                            {message.status === 'read' && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
                            {message.status === 'delivered' && <CheckCircle2 className="w-3 h-3 text-gray-400" />}
                            {message.status === 'sent' && <Clock className="w-3 h-3 text-gray-400" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Draft Preview */}
                {aiDraft && (
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center mb-2">
                      <Bot className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-sm text-green-400">AI Suggested Response</span>
                    </div>
                    <p className="text-white text-sm mb-2">{aiDraft}</p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setNewMessage(aiDraft)}
                        className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                      >
                        Use This
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setAiDraft('')}
                        className="text-gray-400 hover:bg-white/10"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button 
                    onClick={generateAIDraft}
                    variant="outline"
                    size="sm"
                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Bot className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setIsRecording(!isRecording)}
                    variant="outline"
                    size="sm"
                    className={`border-white/20 ${isRecording ? 'bg-red-500/20 text-red-400' : 'text-white hover:bg-white/10'}`}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Details */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Budget</label>
                  <p className="text-white font-semibold">$5,000</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Platform</label>
                  <p className="text-white">YouTube</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Deliverables</label>
                  <p className="text-white text-sm">1x Review Video (10-15 min)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Timeline</label>
                  <p className="text-white text-sm">2 weeks from agreement</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                  Send Contract
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Schedule Call
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    Tech Review
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                    High Priority
                  </Badge>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    Hot Lead
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;
