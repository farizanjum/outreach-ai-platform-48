
import React from 'react';
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
} from '@/components/ui/sidebar';
import { Users, Megaphone, Activity, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  {
    id: 'users',
    title: 'User Management',
    icon: Users,
    description: 'Manage platform users'
  },
  {
    id: 'campaigns',
    title: 'Campaign Oversight',
    icon: Megaphone,
    description: 'Monitor all campaigns'
  },
  {
    id: 'health',
    title: 'Data Health',
    icon: Activity,
    description: 'Platform metrics'
  }
];

export const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
    <Sidebar className="border-r border-white/20 bg-black/40 backdrop-blur-lg">
      <SidebarHeader className="p-4 bg-transparent">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-gray-400">InfluenceHub</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start text-white hover:bg-white/10 data-[active=true]:bg-white/20"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 bg-transparent">
        <Button variant="outline" asChild className="w-full border-white/20 text-white hover:bg-white/10">
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Back to Platform
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
