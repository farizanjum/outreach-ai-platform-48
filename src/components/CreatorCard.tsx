
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Heart, MessageCircle, Eye, CheckCircle } from "lucide-react";

interface Creator {
  id: number;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  followers: number;
  engagement: number;
  platform: string;
  category: string;
  language: string;
  averageViews: number;
  posts: number;
  verified: boolean;
}

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return 'bg-red-500';
      case 'instagram': return 'bg-pink-500';
      case 'tiktok': return 'bg-gray-800';
      case 'twitter': return 'bg-blue-500';
      default: return 'bg-purple-500';
    }
  };

  return (
    <Card className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-white/20">
              <AvatarImage src={creator.profileImage} alt={creator.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold">
                {creator.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {creator.verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate">{creator.name}</h3>
            </div>
            <p className="text-gray-300 text-sm truncate">{creator.username}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                className={`text-xs text-white ${getPlatformColor(creator.platform)}`}
              >
                {creator.platform}
              </Badge>
              <Badge variant="outline" className="text-xs border-white/30 text-gray-300">
                {creator.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
          {creator.bio}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {formatNumber(creator.followers)}
              </div>
              <div className="text-gray-400 text-xs">Followers</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {creator.engagement}%
              </div>
              <div className="text-gray-400 text-xs">Engagement</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {formatNumber(creator.averageViews)}
              </div>
              <div className="text-gray-400 text-xs">Avg Views</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4 text-green-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {creator.posts}
              </div>
              <div className="text-gray-400 text-xs">Posts</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            View Profile
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorCard;
