
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, Wallet, Shield, Bell, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Personal Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      disabled={!isEditing}
                      className="bg-slate-800 border-slate-600 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      disabled={!isEditing}
                      className="bg-slate-800 border-slate-600 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                      className="bg-slate-800 border-slate-600 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-white">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Enter address"
                      className="bg-slate-800 border-slate-600 text-white mt-1"
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Security</p>
                      <p className="text-gray-400 text-sm">Change password and security settings</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Notifications</p>
                      <p className="text-gray-400 text-sm">Manage email and push notifications</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300">
                    Configure
                  </Button>
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-800">
                  <div className="flex items-center space-x-3">
                    <LogOut className="h-5 w-5 text-red-400" />
                    <div>
                      <p className="text-white font-medium">Sign Out</p>
                      <p className="text-gray-400 text-sm">Sign out from your account</p>
                    </div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{user?.name}</h3>
                <p className="text-gray-400 mb-4">{user?.email}</p>
                <div className="flex items-center justify-center text-green-400">
                  <Wallet className="h-4 w-4 mr-2" />
                  <span className="font-semibold">₹{user?.walletBalance?.toLocaleString('en-IN')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Member since</span>
                  </div>
                  <span className="text-white font-medium">
                    {user?.joinDate ? formatDate(user.joinDate) : 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Total Investments</span>
                  </div>
                  <span className="text-white font-medium">{user?.investments?.length || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">Total Invested</span>
                  </div>
                  <span className="text-white font-medium">
                    ₹{user?.investments?.reduce((sum, inv) => sum + inv.amountInvested, 0).toLocaleString('en-IN') || '0'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
