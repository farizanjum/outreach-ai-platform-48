
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Filter, Users, Heart, MessageCircle, Eye } from "lucide-react";
import CreatorCard from '../components/CreatorCard';
import SearchFilters from '../components/SearchFilters';

// Mock data for creators
const mockCreators = [
  {
    id: 1,
    name: "Alex Chen",
    username: "@alexcreates",
    bio: "Tech reviewer & lifestyle content creator. Passionate about emerging technologies and sustainable living.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    followers: 125000,
    engagement: 4.2,
    platform: "YouTube",
    category: "Technology",
    language: "English",
    averageViews: 85000,
    posts: 156,
    verified: true
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    username: "@mariafashion",
    bio: "Fashion influencer sharing style tips and sustainable fashion choices.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    followers: 89000,
    engagement: 5.1,
    platform: "Instagram",
    category: "Fashion",
    language: "Spanish",
    averageViews: 45000,
    posts: 234,
    verified: true
  },
  {
    id: 3,
    name: "James Wilson",
    username: "@jamesfitness",
    bio: "Fitness coach helping people achieve their health goals through sustainable workouts.",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    followers: 67000,
    engagement: 3.8,
    platform: "TikTok",
    category: "Fitness",
    language: "English",
    averageViews: 125000,
    posts: 89,
    verified: false
  }
];

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    platform: '',
    followers: '',
    language: '',
    category: ''
  });

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-12 w-full mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search creators by name, niche, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1">
              <Input
                placeholder="AI Search: 'Find tech creators with high engagement in gaming'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/30 text-white placeholder-gray-300 focus:border-purple-400"
              />
            </div>
            
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-black/10 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <SearchFilters filters={filters} setFilters={setFilters} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Discover Creators</h1>
          <div className="text-gray-300">
            {isLoading ? 'Searching...' : `${mockCreators.length} creators found`}
          </div>
        </div>

        {/* Creator Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockCreators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    className="text-white hover:bg-white/10 border-white/20" 
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    isActive 
                    className="bg-purple-500 text-white hover:bg-purple-600"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    className="text-white hover:bg-white/10 border-white/20"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink 
                    href="#" 
                    className="text-white hover:bg-white/10 border-white/20"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    className="text-white hover:bg-white/10 border-white/20" 
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;
