
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { mockProperties } from '@/data/mockProperties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketTrends = () => {
  const navigate = useNavigate();
  const [marketData, setMarketData] = useState(mockProperties);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => 
        prevData.map(property => ({
          ...property,
          currentPrice: property.currentPrice + (Math.random() - 0.5) * 1000,
          priceChange: (Math.random() - 0.5) * 5000,
          priceChangePercent: (Math.random() - 0.5) * 5
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const topGainers = marketData
    .filter(p => p.priceChangePercent > 0)
    .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
    .slice(0, 3);

  const topLosers = marketData
    .filter(p => p.priceChangePercent < 0)
    .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
    .slice(0, 3);

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
  const formatChange = (change: number) => change > 0 ? `+${change.toFixed(0)}` : change.toFixed(0);
  const formatPercent = (percent: number) => `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 overflow-x-hidden">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Market Trends</h1>
          <p className="text-gray-400">Real-time property share prices and market analysis</p>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Market Cap</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹29.5Cr</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Properties</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{marketData.length}</div>
              <p className="text-xs text-muted-foreground">+3 new listings</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">11.2%</div>
              <p className="text-xs text-muted-foreground">+0.8% this quarter</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Trading Volume</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹1.2Cr</div>
              <p className="text-xs text-muted-foreground">24h volume</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Gainers and Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topGainers.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{property.name}</p>
                      <p className="text-gray-400 text-xs">{property.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold text-sm">{formatPrice(property.currentPrice)}</p>
                      <div className="flex items-center gap-1 text-green-400 text-xs">
                        <ArrowUpRight className="h-3 w-3" />
                        {formatPercent(property.priceChangePercent)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-400" />
                Top Losers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topLosers.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{property.name}</p>
                      <p className="text-gray-400 text-xs">{property.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold text-sm">{formatPrice(property.currentPrice)}</p>
                      <div className="flex items-center gap-1 text-red-400 text-xs">
                        <ArrowDownRight className="h-3 w-3" />
                        {formatPercent(property.priceChangePercent)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Table */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">All Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Property</TableHead>
                    <TableHead className="text-gray-300 hidden sm:table-cell">Location</TableHead>
                    <TableHead className="text-gray-300">Price/Share</TableHead>
                    <TableHead className="text-gray-300">24h Change</TableHead>
                    <TableHead className="text-gray-300 hidden lg:table-cell">ROI</TableHead>
                    <TableHead className="text-gray-300 hidden lg:table-cell">Available</TableHead>
                    <TableHead className="text-gray-300">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((property) => (
                    <TableRow key={property.id} className="border-slate-700 hover:bg-slate-800">
                      <TableCell>
                        <div>
                          <p className="text-white font-medium text-sm">{property.name}</p>
                          <p className="text-gray-400 text-xs sm:hidden">{property.location}</p>
                          {property.isLimited && (
                            <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded mt-1">
                              Limited
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 text-sm hidden sm:table-cell">{property.location}</TableCell>
                      <TableCell className="text-white font-semibold text-sm">{formatPrice(property.currentPrice)}</TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1 text-sm ${property.priceChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {property.priceChangePercent >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {formatPercent(property.priceChangePercent)}
                        </div>
                      </TableCell>
                      <TableCell className="text-purple-400 font-semibold text-sm hidden lg:table-cell">{property.roi}%</TableCell>
                      <TableCell className="text-blue-400 text-sm hidden lg:table-cell">{property.availableShares}/{property.totalShares}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => navigate(`/property/${property.id}`)}
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs px-3 py-1"
                        >
                          Trade
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
    </div>
  );
};

export default MarketTrends;
