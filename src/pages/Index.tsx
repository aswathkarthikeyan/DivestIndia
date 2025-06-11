
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Shield, Users, LogOut, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-fade-in">
        {/* Header */}
        <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Divest India
            </h1>
            <div className="flex items-center gap-4">
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
          <div className="text-center mb-8 animate-scale-in">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-gray-300 text-lg">Ready to explore new investment opportunities?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-green-400" />
                  Portfolio Value
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
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-400">12</p>
                <p className="text-gray-400 mt-2">Active investments</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700 hover:bg-slate-700 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-400">15.2%</p>
                <p className="text-gray-400 mt-2">Average annual</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center animate-fade-in" style={{animationDelay: '0.3s'}}>
            <Button 
              onClick={() => navigate('/explore')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 group"
            >
              Explore Properties
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6 animate-scale-in">
            Divest India
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Democratizing real estate investment through fractional ownership. 
            Start investing in premium properties with as little as ₹10,000.
          </p>
          
          <div className="flex gap-4 justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button 
              onClick={() => openAuthModal('signup')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => openAuthModal('login')}
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              Login
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.6s'}}>
            <div className="bg-gradient-to-br from-purple-500/20 to-transparent p-6 rounded-xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <Building2 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Premium Properties</h3>
              <p className="text-gray-400">Carefully curated real estate across India's top cities</p>
            </div>
          </div>
          
          <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.8s'}}>
            <div className="bg-gradient-to-br from-blue-500/20 to-transparent p-6 rounded-xl backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">High Returns</h3>
              <p className="text-gray-400">Target returns of 12-18% annually</p>
            </div>
          </div>
          
          <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300" style={{animationDelay: '1s'}}>
            <div className="bg-gradient-to-br from-green-500/20 to-transparent p-6 rounded-xl backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Secure Investment</h3>
              <p className="text-gray-400">SEBI regulated and legally compliant</p>
            </div>
          </div>
          
          <div className="text-center animate-fade-in hover:scale-105 transition-transform duration-300" style={{animationDelay: '1.2s'}}>
            <div className="bg-gradient-to-br from-yellow-500/20 to-transparent p-6 rounded-xl backdrop-blur-sm border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
              <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-400">Join thousands of smart investors</p>
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="text-center animate-fade-in" style={{animationDelay: '1.4s'}}>
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Investing?</h2>
            <p className="text-gray-300 mb-6">Join thousands of investors who are already building wealth through real estate.</p>
            <Button 
              onClick={() => openAuthModal('signup')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-110"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
