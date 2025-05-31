
import React, { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { UserManagement } from '@/components/UserManagement';
import { CampaignOversight } from '@/components/CampaignOversight';
import { DataHealth } from '@/components/DataHealth';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'campaigns':
        return <CampaignOversight />;
      case 'health':
        return <DataHealth />;
      default:
        return (
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Welcome to Admin Panel</CardTitle>
              <CardDescription className="text-gray-300">
                Select a section from the sidebar to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Use the sidebar to navigate between different admin sections.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <SidebarInset className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 mt-2">
                  Manage users, oversee campaigns, and monitor platform health
                </p>
              </div>
              {renderContent()}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;
