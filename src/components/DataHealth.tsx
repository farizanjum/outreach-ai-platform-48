
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Zap, Database, CheckCircle, AlertTriangle } from 'lucide-react';

interface HealthMetric {
  label: string;
  value: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  description: string;
}

const healthMetrics: HealthMetric[] = [
  {
    label: 'Complete Creator Profiles',
    value: 87,
    status: 'good',
    description: '87% of creators have complete profiles with all required information'
  },
  {
    label: 'Active Social Integrations',
    value: 92,
    status: 'excellent',
    description: '92% of creators have successfully connected their social media accounts'
  },
  {
    label: 'Campaign Completion Rate',
    value: 78,
    status: 'good',
    description: '78% of accepted campaigns are completed on time'
  },
  {
    label: 'Payment Processing',
    value: 99,
    status: 'excellent',
    description: '99% of payments are processed without issues'
  },
  {
    label: 'User Engagement',
    value: 65,
    status: 'warning',
    description: '65% of users are actively engaging with the platform monthly'
  },
  {
    label: 'API Response Time',
    value: 95,
    status: 'excellent',
    description: '95% of API calls respond within acceptable time limits'
  }
];

const systemStatus = [
  { name: 'Database', status: 'online', uptime: '99.9%' },
  { name: 'Payment Gateway', status: 'online', uptime: '99.7%' },
  { name: 'Social Media APIs', status: 'online', uptime: '98.5%' },
  { name: 'File Storage', status: 'online', uptime: '99.8%' },
  { name: 'Email Service', status: 'maintenance', uptime: '97.2%' },
  { name: 'Analytics Engine', status: 'online', uptime: '99.1%' }
];

export const DataHealth = () => {
  const getStatusColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'excellent': return 'text-green-300';
      case 'good': return 'text-blue-300';
      case 'warning': return 'text-yellow-300';
      case 'critical': return 'text-red-300';
      default: return 'text-gray-300';
    }
  };

  const getProgressColor = (status: HealthMetric['status']) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSystemStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-500/20 text-green-300">Online</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-500/20 text-yellow-300">Maintenance</Badge>;
      case 'offline':
        return <Badge className="bg-red-500/20 text-red-300">Offline</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-300">Unknown</Badge>;
    }
  };

  const averageHealth = Math.round(healthMetrics.reduce((sum, metric) => sum + metric.value, 0) / healthMetrics.length);

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Activity className="w-6 h-6" />
            <span>Platform Health Score</span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Overall platform performance and data quality metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-white">{averageHealth}%</div>
            <div className="flex-1">
              <Progress value={averageHealth} className="h-3" />
              <p className="text-sm text-gray-400 mt-2">
                Platform is performing {averageHealth >= 90 ? 'excellently' : averageHealth >= 75 ? 'well' : 'below expectations'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm font-medium">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                  <Badge className={`${getStatusColor(metric.status)} border border-current`}>
                    {metric.status}
                  </Badge>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
                <p className="text-xs text-gray-400 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Database className="w-6 h-6" />
            <span>System Status</span>
          </CardTitle>
          <CardDescription className="text-gray-300">
            Current status of all platform services and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemStatus.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-white font-medium">{system.name}</p>
                    <p className="text-xs text-gray-400">Uptime: {system.uptime}</p>
                  </div>
                </div>
                {getSystemStatusBadge(system.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
