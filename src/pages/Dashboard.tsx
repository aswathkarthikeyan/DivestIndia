
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Wallet, User, LogOut, ArrowRight, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalInvested = user?.investments.reduce((sum, inv) => sum + inv.amountInvested, 0) || 0;
  const currentValue = user?.investments.reduce((sum, inv) => sum + inv.currentValue, 0) || 0;
  const totalReturn = currentValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Divest India
          </h1>
          <div className="flex items-center gap-4">
            <nav className="flex gap-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="text-purple-400 hover:text-purple-300"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/explore')}
                className="text-gray-300 hover:text-purple-300"
              >
                Explore
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/portfolio')}
                className="text-gray-300 hover:text-purple-300"
              >
                Portfolio
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/wallet')}
                className="text-gray-300 hover:text-purple-300"
              >
                Wallet
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/profile')}
                className="text-gray-300 hover:text-purple-300"
              >
                Profile
              </Button>
            </nav>
            <span className="text-gray-300">Welcome, {user?.name}</span>
            <Button
              onClick={logout}
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-300 text-lg">Your investment dashboard</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105 animate-fade-in">
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
          
          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.1s'}}>
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
          
          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.2s'}}>
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

          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.3s'}}>
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
          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
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

          <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.5s'}}>
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
                    <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
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
