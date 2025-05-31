
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, TrendingUp, Zap, Sparkles, Rocket, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_16px_0_rgba(0,0,0,0.3)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              InfluenceHub
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/discover" 
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              <span className="relative z-10">Discover Creators</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-3 -my-2"></div>
            </Link>
            <Link 
              to="/campaigns" 
              className="text-gray-300 hover:text-white transition-all duration-300 relative group"
            >
              <span className="relative z-10">Campaigns</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-3 -my-2"></div>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              asChild
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-6 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_32px_0_rgba(0,0,0,0.2)]">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 text-sm">The Future of Influencer Marketing</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Connect with
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Top Creators
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover, connect, and collaborate with the most influential content creators. 
            Build authentic partnerships that drive real results for your brand in the digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-10 py-6 h-auto shadow-[0_8px_32px_0_rgba(139,69,255,0.3)] hover:shadow-[0_12px_40px_0_rgba(139,69,255,0.4)] transition-all duration-300"
              asChild
            >
              <Link to="/discover">
                Start Discovering
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/20 text-white hover:bg-white/10 text-lg px-10 py-6 h-auto backdrop-blur-lg"
              asChild
            >
              <Link to="/campaigns">
                <Globe className="mr-3 w-6 h-6" />
                Manage Campaigns
              </Link>
            </Button>
          </div>

          {/* Feature Cards with Neumorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
            {[
              {
                icon: Users,
                title: "Discover Creators",
                description: "Browse through thousands of verified creators across all major platforms with detailed analytics and audience insights.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Target,
                title: "Campaign Management",
                description: "Create, track, and optimize your influencer marketing campaigns with comprehensive analytics and performance metrics.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                description: "Get detailed insights on engagement rates, audience demographics, and campaign performance in real-time.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_12px_40px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_16px_0_rgba(0,0,0,0.3)] group-hover:shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.3),0_12px_24px_0_rgba(0,0,0,0.4)] transition-all duration-500`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Section with Neumorphism */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 pt-16 border-t border-white/10">
            {[
              { number: "50K+", label: "Verified Creators" },
              { number: "500+", label: "Brand Partners" },
              { number: "$10M+", label: "Campaign Budget" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_16px_0_rgba(0,0,0,0.1)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_0_rgba(0,0,0,0.2)] transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2 group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <p className="text-gray-400 text-sm">
              © 2024 InfluenceHub. Shaping the future of digital partnerships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
