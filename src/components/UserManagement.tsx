
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, UserCheck, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'creator' | 'brand' | 'agency' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinedAt: string;
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'creator',
    status: 'active',
    joinedAt: '2024-01-15',
    lastActive: '2024-01-30'
  },
  {
    id: '2',
    name: 'TechCorp Marketing',
    email: 'marketing@techcorp.com',
    role: 'brand',
    status: 'active',
    joinedAt: '2024-01-10',
    lastActive: '2024-01-29'
  },
  {
    id: '3',
    name: 'Alex Chen',
    email: 'alex@example.com',
    role: 'creator',
    status: 'suspended',
    joinedAt: '2024-01-20',
    lastActive: '2024-01-25'
  },
  {
    id: '4',
    name: 'Digital Agency Pro',
    email: 'info@digitalagency.com',
    role: 'agency',
    status: 'active',
    joinedAt: '2024-01-05',
    lastActive: '2024-01-30'
  }
];

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const { toast } = useToast();

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole as User['role'] }
        : user
    ));
    toast({
      title: "Role Updated",
      description: `User role has been changed to ${newRole}`,
    });
  };

  const handleStatusToggle = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
        : user
    ));
    toast({
      title: "Status Updated",
      description: "User status has been changed",
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'creator': return 'bg-purple-500/20 text-purple-300';
      case 'brand': return 'bg-blue-500/20 text-blue-300';
      case 'agency': return 'bg-green-500/20 text-green-300';
      case 'admin': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300';
      case 'suspended': return 'bg-red-500/20 text-red-300';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">User Management</CardTitle>
          <CardDescription className="text-gray-300">
            Manage platform users and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="agency">Agency</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-gray-300">User</TableHead>
                  <TableHead className="text-gray-300">Role</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Joined</TableHead>
                  <TableHead className="text-gray-300">Last Active</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-white/20 hover:bg-white/5">
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-32 bg-white/5 border-white/20">
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="creator">Creator</SelectItem>
                          <SelectItem value="brand">Brand</SelectItem>
                          <SelectItem value="agency">Agency</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{user.joinedAt}</TableCell>
                    <TableCell className="text-gray-300">{user.lastActive}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusToggle(user.id)}
                        className="text-white hover:bg-white/10"
                      >
                        {user.status === 'active' ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
