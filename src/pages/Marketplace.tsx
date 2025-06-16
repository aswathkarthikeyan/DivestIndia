
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { mockProperties } from '@/data/mockProperties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, TrendingUp, Users, DollarSign, Plus, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface MarketListing {
  id: string;
  propertyId: string;
  propertyName: string;
  sellerName: string;
  sharesForSale: number;
  pricePerShare: number;
  totalValue: number;
  listedDate: string;
  isOwnListing?: boolean;
}

const Marketplace = () => {
  const { user, updateWalletBalance } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState('');
  const [sharesAmount, setSharesAmount] = useState('');
  const [pricePerShare, setPricePerShare] = useState('');
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  // Mock marketplace listings
  const [marketListings] = useState<MarketListing[]>([
    {
      id: '1',
      propertyId: '1',
      propertyName: 'The White Villa',
      sellerName: 'Raj Sharma',
      sharesForSale: 10,
      pricePerShare: 105000,
      totalValue: 1050000,
      listedDate: '2024-01-15',
    },
    {
      id: '2',
      propertyId: '2',
      propertyName: 'Urban Nest',
      sellerName: 'Priya Patel',
      sharesForSale: 25,
      pricePerShare: 98000,
      totalValue: 2450000,
      listedDate: '2024-01-14',
    },
    {
      id: '3',
      propertyId: '3',
      propertyName: 'Skyline Heights',
      sellerName: 'Amit Kumar',
      sharesForSale: 5,
      pricePerShare: 110000,
      totalValue: 550000,
      listedDate: '2024-01-13',
    },
    {
      id: '4',
      propertyId: '4',
      propertyName: 'Mountain View Resort',
      sellerName: 'Sarah Wilson',
      sharesForSale: 15,
      pricePerShare: 102000,
      totalValue: 1530000,
      listedDate: '2024-01-12',
    }
  ]);

  const handleBuyShares = (listing: MarketListing) => {
    if (!user) return;

    if (user.walletBalance < listing.totalValue) {
      toast.error('Insufficient wallet balance');
      return;
    }

    // Deduct from wallet
    updateWalletBalance(-listing.totalValue);
    
    toast.success(`Successfully purchased ${listing.sharesForSale} shares of ${listing.propertyName} for ₹${listing.totalValue.toLocaleString('en-IN')}`);
  };

  const handleListShares = () => {
    if (!selectedProperty || !sharesAmount || !pricePerShare) {
      toast.error('Please fill all fields');
      return;
    }

    const shares = parseInt(sharesAmount);
    const price = parseFloat(pricePerShare);
    const total = shares * price;

    if (shares <= 0 || price <= 0) {
      toast.error('Please enter valid amounts');
      return;
    }

    toast.success(`Successfully listed ${shares} shares for ₹${total.toLocaleString('en-IN')}`);
    setSelectedProperty('');
    setSharesAmount('');
    setPricePerShare('');
  };

  const userInvestments = user?.investments || [];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-4 lg:p-8 overflow-x-hidden">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Marketplace</h1>
          <p className="text-gray-400">Buy and sell property shares with other investors</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Listings</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">{marketListings.length}</div>
              <p className="text-xs text-muted-foreground">Available for purchase</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">₹55.7L</div>
              <p className="text-xs text-muted-foreground">Listed value</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Active Traders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">247</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Avg Premium</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-white">+3.2%</div>
              <p className="text-xs text-muted-foreground">Over market price</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 lg:mb-8">
          <Button
            onClick={() => setActiveTab('buy')}
            variant={activeTab === 'buy' ? 'default' : 'outline'}
            className={`flex-1 sm:flex-none ${activeTab === 'buy' 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
              : 'border-slate-600 text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy Shares
          </Button>
          <Button
            onClick={() => setActiveTab('sell')}
            variant={activeTab === 'sell' ? 'default' : 'outline'}
            className={`flex-1 sm:flex-none ${activeTab === 'sell' 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
              : 'border-slate-600 text-white hover:bg-slate-800'
            }`}
          >
            <Plus className="mr-2 h-4 w-4" />
            Sell Shares
          </Button>
        </div>

        {activeTab === 'buy' ? (
          // Buy Shares Tab
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Available Shares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-gray-300">Property</TableHead>
                      <TableHead className="text-gray-300 hidden sm:table-cell">Seller</TableHead>
                      <TableHead className="text-gray-300">Shares</TableHead>
                      <TableHead className="text-gray-300">Price/Share</TableHead>
                      <TableHead className="text-gray-300 hidden lg:table-cell">Total Value</TableHead>
                      <TableHead className="text-gray-300 hidden lg:table-cell">Listed Date</TableHead>
                      <TableHead className="text-gray-300">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketListings.map((listing) => (
                      <TableRow key={listing.id} className="border-slate-700 hover:bg-slate-800">
                        <TableCell>
                          <div>
                            <p className="text-white font-medium text-sm">{listing.propertyName}</p>
                            <p className="text-gray-400 text-xs sm:hidden">{listing.sellerName}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300 text-sm hidden sm:table-cell">{listing.sellerName}</TableCell>
                        <TableCell className="text-white font-semibold text-sm">{listing.sharesForSale}</TableCell>
                        <TableCell className="text-white font-semibold text-sm">₹{listing.pricePerShare.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-green-400 font-semibold text-sm hidden lg:table-cell">₹{listing.totalValue.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-gray-300 text-sm hidden lg:table-cell">{new Date(listing.listedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleBuyShares(listing)}
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs px-3 py-1"
                            >
                              Buy
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-white hover:bg-slate-800 text-xs px-3 py-1"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Sell Shares Tab
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">List Your Shares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="property" className="text-white">Select Property</Label>
                  <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white mt-2">
                      <SelectValue placeholder="Choose a property" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      {userInvestments.map((investment) => (
                        <SelectItem key={investment.propertyId} value={investment.propertyId}>
                          {investment.propertyName} ({investment.sharesOwned} shares owned)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="shares" className="text-white">Number of Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    value={sharesAmount}
                    onChange={(e) => setSharesAmount(e.target.value)}
                    placeholder="Enter shares to sell"
                    className="bg-slate-800 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="text-white">Price per Share (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={pricePerShare}
                    onChange={(e) => setPricePerShare(e.target.value)}
                    placeholder="Enter price per share"
                    className="bg-slate-800 border-slate-600 text-white mt-2"
                  />
                </div>

                {sharesAmount && pricePerShare && (
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <p className="text-gray-400 text-sm">Total listing value:</p>
                    <p className="text-white font-semibold text-lg">
                      ₹{(parseInt(sharesAmount) * parseFloat(pricePerShare)).toLocaleString('en-IN')}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleListShares}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
                >
                  List Shares for Sale
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                {userInvestments.length > 0 ? (
                  <div className="space-y-3">
                    {userInvestments.map((investment) => (
                      <div key={investment.propertyId} className="p-3 bg-slate-800 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{investment.propertyName}</p>
                            <p className="text-gray-400 text-xs">Shares owned: {investment.sharesOwned}</p>
                            <p className="text-gray-400 text-xs">Invested: ₹{investment.amountInvested.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-semibold text-sm">₹{investment.currentValue.toLocaleString('en-IN')}</p>
                            <p className="text-xs text-gray-400">Current value</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No investments yet</p>
                    <p className="text-gray-500 text-sm">Start investing to see your portfolio here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
