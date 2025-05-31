import React, { useState } from 'react';
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Camera, 
  Save, 
  Plus, 
  X, 
  Instagram, 
  Youtube, 
  Twitter,
  Globe,
  Users,
  TrendingUp,
  DollarSign
} from "lucide-react";

const CreatorProfile = () => {
  const { toast } = useToast();
  
  // Mock profile data - in real app this would come from useCreatorProfile hook
  const [profileData, setProfileData] = useState({
    displayName: "Alex Chen",
    bio: "Tech reviewer & lifestyle content creator passionate about emerging technologies and sustainable living.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    socialLinks: {
      instagram: "@alex.creates",
      youtube: "@alexcreates",
      twitter: "@alexchen",
      website: "alexcreates.com"
    },
    audienceDemographics: {
      age: "25-34",
      gender: "Mixed",
      location: "United States"
    },
    engagementMetrics: {
      avgLikes: 15000,
      avgViews: 85000,
      avgShares: 1200,
      ctr: 4.2
    },
    languages: ["English", "Spanish"],
    rates: {
      instagram: {
        post: 1800,
        story: 600,
        reel: 1000
      },
      youtube: {
        video: 2500,
        short: 800,
        integration: 1200
      }
    },
    pastCollaborations: [
      { brand: "TechCorp", campaign: "Smartphone Review", year: "2024" },
      { brand: "EcoLife", campaign: "Sustainable Tech", year: "2024" }
    ]
  });

  const [newCollaboration, setNewCollaboration] = useState({ brand: "", campaign: "", year: "" });

  const handleSave = () => {
    console.log("Saving profile:", profileData);
    toast({
      title: "Profile Updated",
      description: "Your creator profile has been successfully updated.",
    });
  };

  const addCollaboration = () => {
    if (newCollaboration.brand && newCollaboration.campaign && newCollaboration.year) {
      setProfileData(prev => ({
        ...prev,
        pastCollaborations: [...prev.pastCollaborations, newCollaboration]
      }));
      setNewCollaboration({ brand: "", campaign: "", year: "" });
      toast({
        title: "Collaboration Added",
        description: "Past collaboration has been added to your profile.",
      });
    }
  };

  const removeCollaboration = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      pastCollaborations: prev.pastCollaborations.filter((_, i) => i !== index)
    }));
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
                    My Profile
                  </h1>
                  <p className="text-gray-400 mt-1">
                    Manage your creator profile and showcase your work
                  </p>
                </div>
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="bg-white/10 border-white/20">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-purple-500">Personal Info</TabsTrigger>
                  <TabsTrigger value="social" className="data-[state=active]:bg-purple-500">Social Links</TabsTrigger>
                  <TabsTrigger value="audience" className="data-[state=active]:bg-purple-500">Audience Data</TabsTrigger>
                  <TabsTrigger value="metrics" className="data-[state=active]:bg-purple-500">Metrics</TabsTrigger>
                  <TabsTrigger value="rates" className="data-[state=active]:bg-purple-500">Rates</TabsTrigger>
                  <TabsTrigger value="portfolio" className="data-[state=active]:bg-purple-500">Past Work</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Profile Picture */}
                      <div className="flex items-center space-x-6">
                        <div className="relative">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={profileData.profileImage} alt={profileData.displayName} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xl font-bold">
                              {profileData.displayName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <Button 
                            size="sm" 
                            className="absolute -bottom-2 -right-2 bg-purple-500 hover:bg-purple-600 rounded-full w-8 h-8 p-0"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex-1 space-y-2">
                          <Label htmlFor="displayName" className="text-gray-300">Display Name</Label>
                          <Input
                            id="displayName"
                            value={profileData.displayName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white min-h-[100px]"
                          placeholder="Tell brands about yourself and what makes you unique..."
                        />
                      </div>

                      {/* Languages */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">Languages</Label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
                              {lang}
                              <button 
                                onClick={() => setProfileData(prev => ({
                                  ...prev,
                                  languages: prev.languages.filter((_, i) => i !== index)
                                }))}
                                className="ml-2"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                          <Button variant="outline" size="sm" className="border-white/20 text-gray-300">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Language
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Social Media Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@username' },
                        { key: 'youtube', label: 'YouTube', icon: Youtube, placeholder: '@channel' },
                        { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: '@username' },
                        { key: 'website', label: 'Website', icon: Globe, placeholder: 'yourwebsite.com' }
                      ].map((platform) => {
                        const IconComponent = platform.icon;
                        return (
                          <div key={platform.key} className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <Label htmlFor={platform.key} className="text-gray-300">{platform.label}</Label>
                              <Input
                                id={platform.key}
                                value={profileData.socialLinks[platform.key as keyof typeof profileData.socialLinks]}
                                onChange={(e) => setProfileData(prev => ({
                                  ...prev,
                                  socialLinks: { ...prev.socialLinks, [platform.key]: e.target.value }
                                }))}
                                className="bg-white/10 border-white/20 text-white"
                                placeholder={platform.placeholder}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audience" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Audience Demographics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-300">Primary Age Group</Label>
                          <Select value={profileData.audienceDemographics.age}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="18-24">18-24</SelectItem>
                              <SelectItem value="25-34">25-34</SelectItem>
                              <SelectItem value="35-44">35-44</SelectItem>
                              <SelectItem value="45+">45+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Gender Split</Label>
                          <Select value={profileData.audienceDemographics.gender}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mixed">Mixed</SelectItem>
                              <SelectItem value="Mostly Male">Mostly Male</SelectItem>
                              <SelectItem value="Mostly Female">Mostly Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-300">Primary Location</Label>
                          <Select value={profileData.audienceDemographics.location}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Global">Global</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Engagement Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="avgLikes" className="text-gray-300">Average Likes</Label>
                          <Input
                            id="avgLikes"
                            type="number"
                            value={profileData.engagementMetrics.avgLikes}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              engagementMetrics: { ...prev.engagementMetrics, avgLikes: parseInt(e.target.value) || 0 }
                            }))}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avgViews" className="text-gray-300">Average Views</Label>
                          <Input
                            id="avgViews"
                            type="number"
                            value={profileData.engagementMetrics.avgViews}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              engagementMetrics: { ...prev.engagementMetrics, avgViews: parseInt(e.target.value) || 0 }
                            }))}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avgShares" className="text-gray-300">Average Shares</Label>
                          <Input
                            id="avgShares"
                            type="number"
                            value={profileData.engagementMetrics.avgShares}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              engagementMetrics: { ...prev.engagementMetrics, avgShares: parseInt(e.target.value) || 0 }
                            }))}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ctr" className="text-gray-300">Click-through Rate (%)</Label>
                          <Input
                            id="ctr"
                            type="number"
                            step="0.1"
                            value={profileData.engagementMetrics.ctr}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              engagementMetrics: { ...prev.engagementMetrics, ctr: parseFloat(e.target.value) || 0 }
                            }))}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rates" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(profileData.rates).map(([platform, rates]) => (
                      <Card key={platform} className="bg-white/10 backdrop-blur-lg border-white/20">
                        <CardHeader>
                          <CardTitle className="text-white capitalize">{platform} Rates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {Object.entries(rates).map(([type, rate]) => (
                            <div key={type} className="flex items-center justify-between">
                              <Label className="text-gray-300 capitalize">{type}</Label>
                              <div className="flex items-center space-x-2">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                <Input
                                  type="number"
                                  value={rate}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    rates: {
                                      ...prev.rates,
                                      [platform]: {
                                        ...prev.rates[platform as keyof typeof prev.rates],
                                        [type]: parseInt(e.target.value) || 0
                                      }
                                    }
                                  }))}
                                  className="bg-white/10 border-white/20 text-white w-24"
                                />
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="portfolio" className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardHeader>
                      <CardTitle className="text-white">Past Collaborations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Add new collaboration */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <Input
                          placeholder="Brand name"
                          value={newCollaboration.brand}
                          onChange={(e) => setNewCollaboration(prev => ({ ...prev, brand: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                        <Input
                          placeholder="Campaign name"
                          value={newCollaboration.campaign}
                          onChange={(e) => setNewCollaboration(prev => ({ ...prev, campaign: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                        <Input
                          placeholder="Year"
                          value={newCollaboration.year}
                          onChange={(e) => setNewCollaboration(prev => ({ ...prev, year: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white"
                        />
                        <Button 
                          onClick={addCollaboration}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>

                      {/* Existing collaborations */}
                      <div className="space-y-3">
                        {profileData.pastCollaborations.map((collab, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                            <div>
                              <div className="text-white font-medium">{collab.brand}</div>
                              <div className="text-gray-400 text-sm">{collab.campaign} • {collab.year}</div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeCollaboration(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default CreatorProfile;
