
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, PieChart, Wallet, User, LogOut, TrendingUp, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Explore Properties', path: '/explore' },
    { icon: TrendingUp, label: 'Market Trends', path: '/market-trends' },
    { icon: ShoppingCart, label: 'Marketplace', path: '/marketplace' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30" 
             onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={cn(
        "bg-slate-900 border-r border-slate-800 flex flex-col h-screen z-40",
        "lg:relative lg:translate-x-0 lg:w-64",
        "fixed inset-y-0 left-0 w-80 transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-slate-800">
          <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Divest India
          </h2>
        </div>

        {/* User Info */}
        <div className="p-4 lg:p-6 border-b border-slate-800">
          <div className="text-white font-semibold text-base lg:text-lg truncate">{user?.name}</div>
          <div className="text-gray-400 text-sm truncate">{user?.email}</div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-gray-400 text-sm">Wallet Balance:</span>
            <span className="text-green-400 font-semibold text-base">
              ₹{user?.walletBalance?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-gray-300 hover:text-white hover:bg-slate-800 px-4 py-3 text-base font-medium transition-all duration-200",
                  location.pathname === item.path && "bg-slate-800 text-white border-l-2 border-purple-500"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 lg:p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-red-900/50 px-4 py-3 text-base font-medium transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
