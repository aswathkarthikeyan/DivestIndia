
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const MarketplacePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateWalletBalance, addInvestment } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'payment' | 'success'>('payment');

  const { listing } = location.state || {};

  if (!listing) {
    navigate('/marketplace');
    return null;
  }

  const handlePayment = async () => {
    if (!user) return;

    if (user.walletBalance < listing.totalValue) {
      toast.error('Insufficient wallet balance');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Deduct from wallet
      updateWalletBalance(-listing.totalValue);

      // Add to investments
      addInvestment({
        propertyId: listing.propertyId,
        propertyName: listing.propertyName,
        amountInvested: listing.totalValue,
        sharesOwned: listing.sharesForSale,
        purchaseDate: new Date().toISOString()
      });

      setPaymentStep('success');
      toast.success('Payment successful!');

    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-6">
              You have successfully purchased {listing.sharesForSale} shares of {listing.propertyName}
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/portfolio')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                View Portfolio
              </Button>
              <Button 
                onClick={() => navigate('/marketplace')}
                variant="outline"
                className="w-full border-slate-600 text-white hover:bg-slate-700"
              >
                Back to Marketplace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/marketplace')}
            variant="ghost"
            className="text-gray-300 hover:text-purple-300 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          <h1 className="text-3xl font-bold text-white">Complete Your Purchase</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-white mb-2">{listing.propertyName}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shares:</span>
                    <span className="text-white">{listing.sharesForSale}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price per share:</span>
                    <span className="text-white">₹{listing.pricePerShare.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Seller:</span>
                    <span className="text-white">{listing.sellerName}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-300">Total Amount:</span>
                      <span className="text-green-400">₹{listing.totalValue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-900/50 rounded-lg border border-blue-700">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">Secure Transaction</span>
                </div>
                <p className="text-xs text-gray-300">
                  Your payment is protected by our secure payment system
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-slate-700 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Wallet Balance:</span>
                  <span className="text-white font-semibold">₹{user?.walletBalance?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {user?.walletBalance && user.walletBalance < listing.totalValue && (
                <div className="p-3 bg-red-900/50 rounded-lg border border-red-700">
                  <p className="text-red-400 text-sm">
                    Insufficient wallet balance. Please add ₹{(listing.totalValue - user.walletBalance).toLocaleString('en-IN')} to your wallet.
                  </p>
                  <Button 
                    onClick={() => navigate('/wallet')}
                    variant="outline"
                    size="sm"
                    className="mt-2 border-red-600 text-red-400 hover:bg-red-900"
                  >
                    Add Money to Wallet
                  </Button>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <Label className="text-white">Cardholder Name</Label>
                  <Input 
                    placeholder="John Doe"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    defaultValue={user?.name}
                  />
                </div>
                <div>
                  <Label className="text-white">Card Number</Label>
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-white">Expiry Date</Label>
                    <Input 
                      placeholder="MM/YY"
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-white">CVV</Label>
                    <Input 
                      placeholder="123"
                      className="bg-slate-700 border-slate-600 text-white mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handlePayment}
                disabled={isProcessing || (user?.walletBalance || 0) < listing.totalValue}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
              >
                {isProcessing ? 'Processing Payment...' : `Pay ₹${listing.totalValue.toLocaleString('en-IN')}`}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By completing this purchase, you agree to our terms and conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePayment;
