
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockProperties } from '@/data/mockProperties';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, Building2, Calendar, TrendingUp, Users, Shield } from 'lucide-react';
import { toast } from 'sonner';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateWalletBalance, addInvestment } = useAuth();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);

  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Property not found</h1>
          <Button onClick={() => navigate('/explore')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const handleInvest = async () => {
    const amount = parseFloat(investmentAmount);
    
    if (!amount || amount < property.minInvestment) {
      toast.error(`Minimum investment is ₹${property.minInvestment.toLocaleString('en-IN')}`);
      return;
    }
    
    if (amount > (user?.walletBalance || 0)) {
      toast.error('Insufficient wallet balance');
      return;
    }

    setIsInvesting(true);
    
    try {
      // Calculate shares based on investment amount
      const sharePrice = property.value / property.totalShares;
      const shares = Math.floor(amount / sharePrice);
      const actualAmount = shares * sharePrice;

      // Deduct from wallet
      updateWalletBalance(-actualAmount);
      
      // Add investment
      addInvestment({
        propertyId: property.id,
        propertyName: property.name,
        amountInvested: actualAmount,
        sharesOwned: shares,
        purchaseDate: new Date().toISOString()
      });

      toast.success(`Successfully invested ₹${actualAmount.toLocaleString('en-IN')} in ${property.name}!`);
      setInvestmentAmount('');
      
      // Navigate to portfolio after successful investment
      setTimeout(() => {
        navigate('/portfolio');
      }, 2000);
      
    } catch (error) {
      toast.error('Investment failed. Please try again.');
    } finally {
      setIsInvesting(false);
    }
  };

  const sharePrice = property.value / property.totalShares;
  const maxShares = Math.floor((user?.walletBalance || 0) / sharePrice);
  const investmentShares = investmentAmount ? Math.floor(parseFloat(investmentAmount) / sharePrice) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button 
            onClick={() => navigate('/explore')}
            variant="ghost"
            className="text-gray-300 hover:text-purple-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {property.name}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.images.map((image, index) => (
                <div key={index} className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${property.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Property Info */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  {property.location}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {property.propertyType} • {property.area}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">{property.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-gray-400 text-sm">Property Value</p>
                    <p className="text-white font-bold">₹{(property.value / 10000000).toFixed(1)}Cr</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-gray-400 text-sm">Expected ROI</p>
                    <p className="text-green-400 font-bold">{property.roi}%</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-gray-400 text-sm">Year Built</p>
                    <p className="text-white font-bold">{property.yearBuilt}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <p className="text-gray-400 text-sm">Available Shares</p>
                    <p className="text-blue-400 font-bold">{property.availableShares}/{property.totalShares}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-slate-700 rounded-lg">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Key Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {property.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Panel */}
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700 sticky top-4">
              <CardHeader>
                <CardTitle className="text-white">Invest in this Property</CardTitle>
                <CardDescription className="text-gray-400">
                  Minimum investment: ₹{property.minInvestment.toLocaleString('en-IN')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="investment" className="text-white">Investment Amount (₹)</Label>
                  <Input
                    id="investment"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder={`Min ₹${property.minInvestment.toLocaleString('en-IN')}`}
                    className="bg-slate-700 border-slate-600 text-white mt-2"
                  />
                </div>

                {investmentAmount && (
                  <div className="p-3 bg-slate-700 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Shares you'll get:</span>
                      <span className="text-white">{investmentShares}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Share price:</span>
                      <span className="text-white">₹{sharePrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Your wallet:</span>
                      <span className="text-white">₹{user?.walletBalance?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleInvest}
                  disabled={isInvesting || !investmentAmount || parseFloat(investmentAmount) < property.minInvestment}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 transition-all duration-300 hover:scale-105"
                >
                  {isInvesting ? 'Processing...' : 'Invest Now'}
                </Button>

                <div className="text-center">
                  <Button 
                    onClick={() => navigate('/wallet')}
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Add money to wallet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Investment Summary */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Expected Returns:</span>
                  <span className="text-green-400">{property.expectedReturns}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Management Fee:</span>
                  <span className="text-gray-300">{property.managementFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Investors:</span>
                  <span className="text-gray-300">{property.totalShares - property.availableShares}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
