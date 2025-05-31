
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, TrendingUp, Zap, Sparkles, Rocket, Globe, Check, Star, MessageSquare, Mail, Phone } from "lucide-react";

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
            <a href="#features" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              <span className="relative z-10">Features</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-3 -my-2"></div>
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              <span className="relative z-10">Pricing</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-3 -my-2"></div>
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-all duration-300 relative group">
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-3 -my-2"></div>
            </a>
            <Button variant="outline" size="sm" asChild className="border-white/20 text-white hover:bg-white/10">
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
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-10 py-6 h-auto shadow-[0_8px_32px_0_rgba(139,69,255,0.3)] hover:shadow-[0_12px_40px_0_rgba(139,69,255,0.4)] transition-all duration-300" asChild>
              <Link to="/discover">
                Start Discovering
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 text-lg px-10 py-6 h-auto backdrop-blur-lg" asChild>
              <Link to="/campaigns">
                <Globe className="mr-3 w-6 h-6" />
                Manage Campaigns
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powerful tools and insights to help you build meaningful partnerships with top creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={index} className="group bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_12px_40px_0_rgba(0,0,0,0.3)] transition-all duration-500 hover:transform hover:scale-105">
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
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your influencer marketing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Starter",
              price: "$49",
              description: "Perfect for small businesses getting started",
              features: ["Up to 5 campaigns", "Basic analytics", "Email support", "50 creator contacts"],
              popular: false
            },
            {
              name: "Professional",
              price: "$149",
              description: "Ideal for growing marketing teams",
              features: ["Unlimited campaigns", "Advanced analytics", "Priority support", "Unlimited creator contacts", "Custom reporting"],
              popular: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For large organizations with complex needs",
              features: ["Everything in Professional", "Dedicated account manager", "Custom integrations", "White-label solution"],
              popular: false
            }
          ].map((plan, index) => (
            <div key={index} className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border transition-all duration-500 hover:transform hover:scale-105 ${plan.popular ? 'border-purple-500 shadow-[0_0_50px_0_rgba(139,69,255,0.3)]' : 'border-white/10'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg text-gray-400">/month</span>}
                </div>
                <p className="text-gray-300">{plan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About InfluenceHub
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              We're revolutionizing how brands connect with creators. Our platform combines cutting-edge technology with deep industry insights to create meaningful partnerships that drive real results.
            </p>
            <div className="space-y-6">
              {[
                { number: "50K+", label: "Verified Creators" },
                { number: "500+", label: "Brand Partners" },
                { number: "$10M+", label: "Campaign Budget Managed" },
                { number: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To democratize influencer marketing by providing powerful tools that help brands and creators build authentic, profitable relationships in the digital economy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about InfluenceHub
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              question: "How do you verify creators on your platform?",
              answer: "We use a comprehensive verification process that includes social media authentication, engagement analysis, and manual review to ensure all creators are genuine and active."
            },
            {
              question: "What platforms do you support?",
              answer: "InfluenceHub supports all major social media platforms including Instagram, TikTok, YouTube, Twitter, and emerging platforms. We continuously add new platforms based on market demand."
            },
            {
              question: "How does pricing work for campaigns?",
              answer: "Campaign costs depend on creator rates, campaign scope, and duration. Our platform provides transparent pricing and helps you budget effectively with detailed cost breakdowns."
            },
            {
              question: "Can I track campaign performance in real-time?",
              answer: "Yes! Our analytics dashboard provides real-time tracking of all campaign metrics including reach, engagement, conversions, and ROI across all platforms and creators."
            },
            {
              question: "Do you offer support for campaign management?",
              answer: "Absolutely. We provide comprehensive support including campaign strategy, creator matching, content approval workflows, and dedicated account management for enterprise clients."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-16 border border-white/20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of brands who are already leveraging the power of authentic creator partnerships to drive growth and engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-lg px-10 py-6 h-auto shadow-[0_8px_32px_0_rgba(139,69,255,0.3)] hover:shadow-[0_12px_40px_0_rgba(139,69,255,0.4)] transition-all duration-300" asChild>
              <Link to="/discover">
                Start Your Free Trial
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 text-lg px-10 py-6 h-auto backdrop-blur-lg">
              <MessageSquare className="mr-3 w-6 h-6" />
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">InfluenceHub</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Connecting brands with creators to build authentic partnerships that drive real results in the digital economy.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/discover" className="text-gray-300 hover:text-white transition-colors">Discover Creators</Link></li>
                <li><Link to="/campaigns" className="text-gray-300 hover:text-white transition-colors">Campaigns</Link></li>
                <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
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
