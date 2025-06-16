
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

const Portfolio = () => {
  const { user } = useAuth();

  const portfolioData = user?.investments?.map(investment => ({
    name: investment.propertyName,
    value: investment.currentValue,
    invested: investment.amountInvested,
    gain: investment.currentValue - investment.amountInvested,
    gainPercent: ((investment.currentValue - investment.amountInvested) / investment.amountInvested * 100).toFixed(2)
  })) || [];

  const totalInvested = portfolioData.reduce((sum, item) => sum + item.invested, 0);
  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const totalGain = totalValue - totalInvested;
  const totalGainPercent = totalInvested > 0 ? ((totalGain / totalInvested) * 100).toFixed(2) : "0.00";

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
          <p className="text-gray-400">Track your property investments and returns</p>
        </div>

        {portfolioData.length === 0 ? (
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-8 text-center">
              <p className="text-gray-400 text-lg">No investments yet</p>
              <p className="text-gray-500 mt-2">Start investing in properties to see your portfolio here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-400 text-sm">Total Invested</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">₹{totalInvested.toLocaleString('en-IN')}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-gray-400 text-sm">Current Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-white">₹{totalValue.toLocaleString('en-IN')}</p>
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
                    <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
                  <p className={`text-2xl font-bold ${parseFloat(totalGainPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
                      <div>
                        <h3 className="font-semibold text-white">{investment.name}</h3>
                        <div className="flex items-center text-gray-400 mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">Invested: ₹{investment.invested.toLocaleString('en-IN')}</span>
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
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
