
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Building, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = () => {
    // Simulate Google login process
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
    // Here you would typically redirect to the appropriate dashboard
  };

  const roles = [
    {
      id: 'creator',
      title: 'Creator',
      description: 'Manage your content and collaborations',
      icon: Palette,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'brand',
      title: 'Brand',
      description: 'Launch campaigns and discover creators',
      icon: Building,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'agency',
      title: 'Agency',
      description: 'Manage multiple brand accounts',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {!isAuthenticated ? (
          // Login Card
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">CreatorConnect</span>
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-300">
                Sign in to your account to continue your creative journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button 
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-900 hover:bg-gray-100 h-12 text-base font-medium"
                size="lg"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">Secure authentication powered by Firebase</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Role Selection Card
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Choose Your Role
              </CardTitle>
              <CardDescription className="text-gray-300">
                Select how you'll be using CreatorConnect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelection(role.id)}
                    className={`w-full p-4 rounded-lg border border-white/20 text-left transition-all duration-200 hover:scale-105 hover:border-white/40 ${
                      selectedRole === role.id 
                        ? 'bg-white/20 border-white/40' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{role.title}</h3>
                        <p className="text-gray-300 text-sm">{role.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
              
              <div className="pt-4">
                <Button 
                  disabled={!selectedRole}
                  onClick={() => selectedRole && handleRoleSelection(selectedRole)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
                  size="lg"
                >
                  Continue to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <p className="text-center text-gray-400 text-sm mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
