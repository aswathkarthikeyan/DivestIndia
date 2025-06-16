
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

const Wallet = () => {
  const { user, updateWalletBalance } = useAuth();
  const [addMoneyAmount, setAddMoneyAmount] = useState('');
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');

  // Mock transaction history
  const transactions = [
    { id: 1, type: 'credit', amount: 5000, description: 'Added money via UPI', date: '2024-01-15', time: '10:30 AM' },
    { id: 2, type: 'debit', amount: 25000, description: 'Investment in Luxury Apartment Mumbai', date: '2024-01-14', time: '2:15 PM' },
    { id: 3, type: 'credit', amount: 1250, description: 'Returns from Property Investment', date: '2024-01-13', time: '11:45 AM' },
    { id: 4, type: 'debit', amount: 15000, description: 'Investment in Beach Resort Goa', date: '2024-01-12', time: '4:20 PM' },
  ];

  const handleAddMoney = () => {
    const amount = parseFloat(addMoneyAmount);
    if (amount && amount > 0) {
      updateWalletBalance(amount);
      toast.success(`₹${amount.toLocaleString('en-IN')} added to your wallet!`);
      setAddMoneyAmount('');
      setIsAddMoneyOpen(false);
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI apps' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Pay using cards' },
    { id: 'netbanking', name: 'Net Banking', icon: WalletIcon, description: 'Pay via bank account' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
          <p className="text-gray-400">Manage your funds and view transaction history</p>
        </div>

        {/* Wallet Balance */}
        <Card className="bg-gradient-to-r from-purple-900 to-blue-900 border-purple-700 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 mb-2">Available Balance</p>
                <p className="text-3xl font-bold text-white">₹{user?.walletBalance?.toLocaleString('en-IN')}</p>
              </div>
              <WalletIcon className="h-12 w-12 text-purple-400" />
            </div>
            <div className="mt-4">
              <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-purple-900 hover:bg-gray-100">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Money
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-slate-700 text-white">
                  <DialogHeader>
                    <DialogTitle>Add Money to Wallet</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Amount</label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={addMoneyAmount}
                        onChange={(e) => setAddMoneyAmount(e.target.value)}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Method</label>
                      <div className="space-y-2">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedPaymentMethod === method.id
                                ? 'border-purple-500 bg-purple-900/20'
                                : 'border-slate-600 bg-slate-800 hover:bg-slate-700'
                            }`}
                            onClick={() => setSelectedPaymentMethod(method.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <method.icon className="h-5 w-5 text-purple-400" />
                              <div>
                                <p className="font-medium">{method.name}</p>
                                <p className="text-sm text-gray-400">{method.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button onClick={handleAddMoney} className="w-full bg-purple-600 hover:bg-purple-700">
                      Add ₹{addMoneyAmount || '0'} to Wallet
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <Plus className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Add Money</p>
              <p className="text-gray-400 text-sm">Top up your wallet</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <ArrowUpRight className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Invest</p>
              <p className="text-gray-400 text-sm">Start investing in properties</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-4 text-center">
              <ArrowDownLeft className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Withdraw</p>
              <p className="text-gray-400 text-sm">Transfer to bank account</p>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-400" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">{transaction.description}</p>
                      <p className="text-gray-400 text-sm">{transaction.date} • {transaction.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
