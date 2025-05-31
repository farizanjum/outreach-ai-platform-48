
import React from 'react';
import { Link } from 'react-router-dom';
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
      case 'youtube': return 'from-red-500 to-red-600';
      case 'instagram': return 'from-pink-500 to-purple-600';
      case 'tiktok': return 'from-gray-800 to-black';
      case 'twitter': return 'from-blue-500 to-blue-600';
      default: return 'from-purple-500 to-blue-500';
    }
  };

  return (
    <Card className="group bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_16px_48px_0_rgba(0,0,0,0.3)] rounded-2xl">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-white/20 shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]">
              <AvatarImage src={creator.profileImage} alt={creator.name} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-lg">
                {creator.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {creator.verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-500 bg-white rounded-full shadow-lg" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white truncate text-lg group-hover:text-gray-100 transition-colors duration-300">{creator.name}</h3>
            </div>
            <p className="text-gray-300 text-sm truncate group-hover:text-gray-200 transition-colors duration-300">{creator.username}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge 
                className={`text-xs text-white bg-gradient-to-r ${getPlatformColor(creator.platform)} shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_2px_8px_0_rgba(0,0,0,0.2)] border-0`}
              >
                {creator.platform}
              </Badge>
              <Badge 
                variant="outline" 
                className="text-xs border-white/30 text-gray-300 bg-white/5 backdrop-blur-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
              >
                {creator.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {creator.bio}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-3 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <Users className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {formatNumber(creator.followers)}
              </div>
              <div className="text-gray-400 text-xs">Followers</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-3 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <Heart className="w-5 h-5 text-pink-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {creator.engagement}%
              </div>
              <div className="text-gray-400 text-xs">Engagement</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-3 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <Eye className="w-5 h-5 text-blue-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {formatNumber(creator.averageViews)}
              </div>
              <div className="text-gray-400 text-xs">Avg Views</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-white/5 rounded-xl p-3 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <MessageCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white font-semibold text-sm">
                {creator.posts}
              </div>
              <div className="text-gray-400 text-xs">Posts</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            asChild
          >
            <Link to={`/creator/${creator.id}`}>
              View Profile
            </Link>
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-[0_4px_16px_0_rgba(139,69,255,0.3)] hover:shadow-[0_6px_20px_0_rgba(139,69,255,0.4)] transition-all duration-300"
          >
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorCard;
