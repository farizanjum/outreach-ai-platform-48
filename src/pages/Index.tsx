
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
            <h1 className="text-2xl font-bold text-white">InfluenceHub</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/discover" className="text-gray-300 hover:text-white transition-colors">
              Discover Creators
            </Link>
            <Link to="/campaigns" className="text-gray-300 hover:text-white transition-colors">
              Campaigns
            </Link>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Connect with
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Top Creators
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover, connect, and collaborate with the most influential content creators. 
            Build authentic partnerships that drive real results for your brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-8 py-4"
              asChild
            >
              <Link to="/discover">
                Start Discovering
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4"
              asChild
            >
              <Link to="/campaigns">
                Manage Campaigns
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Discover Creators</h3>
              <p className="text-gray-300">
                Browse through thousands of verified creators across all major platforms with detailed analytics and audience insights.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Campaign Management</h3>
              <p className="text-gray-300">
                Create, track, and optimize your influencer marketing campaigns with comprehensive analytics and performance metrics.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Analytics</h3>
              <p className="text-gray-300">
                Get detailed insights on engagement rates, audience demographics, and campaign performance in real-time.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-300">Verified Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Brand Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">$10M+</div>
              <div className="text-gray-300">Campaign Budget</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
