
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Building, Palette, Sparkles, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    console.log("Initiating Google Login...");
    setIsAuthenticated(true);
    toast({
      title: "Login Successful",
      description: "Please select your role to continue.",
    });
  };

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    console.log(`Role selected: ${role}`);
    
    toast({
      title: "Role Selected",
      description: `Welcome as ${role}! Redirecting to dashboard...`,
    });

    // Redirect based on role after a short delay
    setTimeout(() => {
      switch (role) {
        case 'creator':
          navigate('/dashboard');
          break;
        case 'brand':
          navigate('/campaigns');
          break;
        case 'agency':
          navigate('/crm/1'); // Default to first CRM instance
          break;
        default:
          navigate('/');
      }
    }, 1500);
  };

  const roles = [
    {
      id: 'creator',
      title: 'Creator',
      description: 'Manage your content and collaborations',
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'brand',
      title: 'Brand',
      description: 'Launch campaigns and discover creators',
      icon: Building,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'agency',
      title: 'Agency',
      description: 'Manage multiple brand accounts',
      icon: Users,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {!isAuthenticated ? (
          // Login Card with Neumorphism
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_64px_0_rgba(0,0,0,0.3)] rounded-3xl">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_8px_16px_0_rgba(0,0,0,0.3)]">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  InfluenceHub
                </span>
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-3">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Sign in to your account to continue your creative journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              <Button 
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 h-14 text-lg font-semibold shadow-[0_8px_32px_0_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_0_rgba(255,255,255,0.3)] transition-all duration-300"
                size="lg"
              >
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/5 text-gray-400 rounded-lg">
                    Secure authentication powered by Firebase
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Role Selection Card with Neumorphism
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_64px_0_rgba(0,0,0,0.3)] rounded-3xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-white mb-3">
                Choose Your Role
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Select how you'll be using InfluenceHub
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelection(role.id)}
                    className={`w-full p-6 rounded-2xl border border-white/20 text-left transition-all duration-300 hover:scale-105 hover:border-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_4px_16px_0_rgba(0,0,0,0.1)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_0_rgba(0,0,0,0.2)] ${
                      selectedRole === role.id 
                        ? 'bg-white/15 border-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_8px_24px_0_rgba(0,0,0,0.2)]' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-r ${role.gradient} rounded-xl flex items-center justify-center shadow-[inset_0_2px_4px_0_rgba(255,255,255,0.2),0_4px_8px_0_rgba(0,0,0,0.2)]`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">{role.title}</h3>
                        <p className="text-gray-300 text-sm">{role.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        )}
        
        <div className="text-center mt-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
            <p className="text-gray-400 text-sm leading-relaxed">
              By signing in, you agree to our{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
