
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Wallet, ArrowRight, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalInvested = user?.investments.reduce((sum, inv) => sum + inv.amountInvested, 0) || 0;
  const currentValue = user?.investments.reduce((sum, inv) => sum + inv.currentValue, 0) || 0;
  const totalReturn = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.name}! Here's your investment overview.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-400" />
                Wallet Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">₹{user?.walletBalance?.toLocaleString('en-IN')}</p>
              <p className="text-gray-400 mt-2">Available for investment</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-400" />
                Total Invested
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">₹{totalInvested.toLocaleString('en-IN')}</p>
              <p className="text-gray-400 mt-2">Across {user?.investments.length || 0} properties</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-400">₹{currentValue.toLocaleString('en-IN')}</p>
              <p className="text-gray-400 mt-2">Portfolio value</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700 hover:bg-slate-800 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
                Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalReturn >= 0 ? '+' : ''}₹{totalReturn.toLocaleString('en-IN')}
              </p>
              <p className="text-gray-400 mt-2">
                {returnPercentage >= 0 ? '+' : ''}{returnPercentage.toFixed(2)}% total return
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-700 hover:bg-slate-800 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your investments and wallet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/explore')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-300 hover:scale-105"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Explore Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={() => navigate('/wallet')}
                variant="outline"
                className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all duration-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Money to Wallet
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700 hover:bg-slate-800 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-white">Recent Investments</CardTitle>
              <CardDescription className="text-gray-400">
                Your latest property investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user?.investments.length ? (
                <div className="space-y-3">
                  {user.investments.slice(-3).reverse().map((investment, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{investment.propertyName}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(investment.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-green-400 font-bold">₹{investment.amountInvested.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                  <Button 
                    onClick={() => navigate('/portfolio')}
                    variant="ghost" 
                    className="w-full text-purple-400 hover:text-purple-300"
                  >
                    View All Investments
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Building2 className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">No investments yet</p>
                  <Button 
                    onClick={() => navigate('/explore')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Start Investing
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
