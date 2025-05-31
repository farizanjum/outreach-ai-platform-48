
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  User, 
  MessageCircle, 
  FileText, 
  CreditCard, 
  BarChart3, 
  LogOut,
  Sparkles,
  Bell
} from "lucide-react";

export function CreatorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Mock creator data
  const creatorData = {
    name: "Alex Chen",
    email: "alex@example.com",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    unreadMessages: 3
  };

  const menuItems = [
    {
      title: "My Dashboard",
      url: "/dashboard",
      icon: Home,
      badge: null
    },
    {
      title: "My Profile",
      url: "/dashboard/profile",
      icon: User,
      badge: null
    },
    {
      title: "Messages",
      url: "/dashboard/crm",
      icon: MessageCircle,
      badge: creatorData.unreadMessages > 0 ? creatorData.unreadMessages.toString() : null
    },
    {
      title: "Contracts",
      url: "/contracts",
      icon: FileText,
      badge: null
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
      badge: null
    },
    {
      title: "Performance",
      url: "/performance",
      icon: BarChart3,
      badge: null
    }
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login');
  };

  return (
    <Sidebar className="bg-gradient-to-b from-slate-900 to-purple-900 border-r border-white/10">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              InfluenceHub
            </h2>
            <p className="text-gray-400 text-xs">Creator Dashboard</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
          <Avatar className="w-10 h-10">
            <AvatarImage src={creatorData.profileImage} alt={creatorData.name} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              {creatorData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{creatorData.name}</p>
            <p className="text-gray-400 text-xs truncate">{creatorData.email}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <Bell className="w-4 h-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={`w-full justify-start space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <button onClick={() => navigate(item.url)} className="flex items-center space-x-3 w-full">
                        <IconComponent className="w-5 h-5" />
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.badge && (
                          <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="w-full justify-start space-x-3 text-gray-300 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
