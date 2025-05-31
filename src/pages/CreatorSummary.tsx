
import React, { useState } from 'react';
import { CreatorSidebar } from '@/components/CreatorSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, DollarSign, FileCheck, Heart, Sparkles, TrendingUp } from "lucide-react";

interface Testimonial {
  id: string;
  brand: string;
  campaign: string;
  rating: number;
  feedback: string;
  date: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    brand: 'StyleCo',
    campaign: 'Summer Fashion Collection 2024',
    rating: 5,
    feedback: "Amazing content quality and professional collaboration. The engagement rates exceeded our expectations!",
    date: '2024-01-20'
  },
  {
    id: '2',
    brand: 'TechCorp',
    campaign: 'Tech Product Launch',
    rating: 5,
    feedback: "Great storytelling and authentic product integration. Will definitely work together again.",
    date: '2024-01-15'
  },
  {
    id: '3',
    brand: 'FitLife',
    campaign: 'Fitness App Promotion',
    rating: 4,
    feedback: "Professional and timely delivery. The content resonated well with our target audience.",
    date: '2024-01-10'
  }
];

const CreatorSummary = () => {
  const [testimonials] = useState<Testimonial[]>(mockTestimonials);

  // Mock data for summary
  const creatorScore = 87;
  const totalEarnings = 8750;
  const campaignsCompleted = 12;
  const contractsSigned = 15;
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
      />
    ));
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <CreatorSidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Celebration */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              <h1 className="text-4xl font-bold text-white">
                Creator Success Dashboard
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 mb-2">
              You're crushing it! 🚀
            </p>
            <p className="text-gray-400">
              "Success is not just about what you accomplish in your life, it's about what you inspire others to do." - Keep shining!
            </p>
          </div>

          {/* Creator Score Card */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-4">Your Creator Score</CardTitle>
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#scoreGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(creatorScore / 100) * 251.2} 251.2`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(creatorScore)}`}>
                        {creatorScore}
                      </span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-white text-lg font-semibold mb-2">Excellent Rating!</p>
                    <p className="text-gray-300 text-sm">Based on:</p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Profile completeness</li>
                      <li>• Content quality</li>
                      <li>• Client satisfaction</li>
                      <li>• Delivery timeliness</li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Earnings</CardTitle>
                <DollarSign className="h-6 w-6 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  ${totalEarnings.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Campaigns Completed</CardTitle>
                <Trophy className="h-6 w-6 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">{campaignsCompleted}</div>
                <p className="text-xs text-gray-400 mt-2">
                  100% completion rate
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Contracts Signed</CardTitle>
                <FileCheck className="h-6 w-6 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">{contractsSigned}</div>
                <p className="text-xs text-gray-400 mt-2">
                  {contractsSigned - campaignsCompleted} pending delivery
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Client Rating</CardTitle>
                <Heart className="h-6 w-6 text-pink-400" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-2xl font-bold text-pink-400">
                    {averageRating.toFixed(1)}
                  </span>
                  <div className="flex">
                    {renderStars(Math.round(averageRating))}
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  From {testimonials.length} reviews
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Client Testimonials */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Heart className="w-6 h-6 text-pink-400 mr-2" />
              What Brands Say About You
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-white/5 backdrop-blur-xl border-white/10">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-white/10">
                        {testimonial.brand}
                      </Badge>
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{testimonial.campaign}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm italic mb-3">
                      "{testimonial.feedback}"
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Motivational Quote & Next Steps */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
            <div className="mb-4">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-white mb-2">Keep Up the Amazing Work!</h2>
              <p className="text-gray-300 text-lg">
                You're in the top 10% of creators on our platform! 🌟
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 mt-6">
              <h3 className="text-white font-semibold mb-3">Next Milestones to Unlock:</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Reach 20 completed campaigns</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={(campaignsCompleted / 20) * 100} className="w-20" />
                    <span className="text-sm text-gray-400">{campaignsCompleted}/20</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Earn $15,000 total</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={(totalEarnings / 15000) * 100} className="w-20" />
                    <span className="text-sm text-gray-400">${totalEarnings}/15k</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Maintain 4.8+ rating</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={(averageRating / 5) * 100} className="w-20" />
                    <span className="text-sm text-gray-400">{averageRating.toFixed(1)}/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorSummary;
