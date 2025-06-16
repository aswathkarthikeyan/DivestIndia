
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Group investments by property ID and sum up shares
  const groupedInvestments = user?.investments?.reduce((acc, investment) => {
    const existing = acc.find(item => item.propertyId === investment.propertyId);
    if (existing) {
      existing.sharesOwned += investment.sharesOwned;
      existing.amountInvested += investment.amountInvested;
      existing.currentValue += investment.currentValue || investment.amountInvested * 1.05; // 5% default growth
    } else {
      acc.push({
        ...investment,
        currentValue: investment.currentValue || investment.amountInvested * 1.05 // 5% default growth
      });
    }
    return acc;
  }, [] as any[]) || [];

  const portfolioData = groupedInvestments.map(investment => ({
    name: investment.propertyName,
    value: investment.currentValue,
    invested: investment.amountInvested,
    gain: investment.currentValue - investment.amountInvested,
    gainPercent: ((investment.currentValue - investment.amountInvested) / investment.amountInvested * 100).toFixed(2),
    shares: investment.sharesOwned
  }));

  const totalInvested = portfolioData.reduce((sum, item) => sum + item.invested, 0);
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalGain = totalValue - totalInvested;
  const totalGainPercent = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(2) : "0.00";

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 overflow-x-hidden">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-400">Track your property investments and returns</p>
        </div>

        {portfolioData.length === 0 ? (
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400 text-lg">No investments yet</p>
              <p className="text-gray-500 mt-2 mb-6">Start investing in properties to see your portfolio here</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => navigate('/explore')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Explore Properties
                </Button>
                <Button 
                  onClick={() => navigate('/marketplace')}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  Visit Marketplace
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-400 text-sm">Total Invested</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl lg:text-2xl font-bold text-white">₹{totalInvested.toLocaleString('en-IN')}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-400 text-sm">Current Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl lg:text-2xl font-bold text-white">₹{totalValue.toLocaleString('en-IN')}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-400 text-sm">Total Gain/Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {totalGain >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <p className={`text-xl lg:text-2xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ₹{Math.abs(totalGain).toLocaleString('en-IN')}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-400 text-sm">Return %</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-xl lg:text-2xl font-bold ${parseFloat(totalGainPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalGainPercent}%
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Portfolio Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Investment vs Current Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar dataKey="invested" fill="#8b5cf6" name="Invested" />
                      <Bar dataKey="value" fill="#06b6d4" name="Current Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Investment Details */}
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Investment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map((investment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{investment.name}</h3>
                        <div className="flex items-center text-gray-400 mt-1 text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Shares: {investment.shares} | Invested: ₹{investment.invested.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">₹{investment.value.toLocaleString('en-IN')}</p>
                        <div className="flex items-center justify-end">
                          {parseFloat(investment.gainPercent) >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                          )}
                          <span className={`text-sm ${parseFloat(investment.gainPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {investment.gainPercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => navigate('/marketplace')}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Trade Shares
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => navigate('/explore')}
                      variant="outline"
                      className="flex-1 border-slate-600 text-white hover:bg-slate-800"
                    >
                      Explore More Properties
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
