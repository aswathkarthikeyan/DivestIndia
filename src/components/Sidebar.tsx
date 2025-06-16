
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, PieChart, Wallet, User, LogOut, TrendingUp, ShoppingCart, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
  };

  return (
    <div className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-slate-800">
        <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Divest India
        </h2>
      </div>

      {/* User Info */}
      <div className="p-4 lg:p-6 border-b border-slate-800">
        <div className="text-white font-semibold text-sm lg:text-base">{user?.name}</div>
        <div className="text-gray-400 text-xs lg:text-sm truncate">{user?.email}</div>
        <div className="mt-2 text-green-400 font-semibold text-sm lg:text-base">
          ₹{user?.walletBalance?.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 lg:p-4 overflow-y-auto">
        <div className="space-y-1 lg:space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-300 hover:text-white hover:bg-slate-800 text-xs lg:text-sm px-2 lg:px-3 py-2 lg:py-3",
                location.pathname === item.path && "bg-slate-800 text-white"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 lg:mr-3 h-4 w-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-2 lg:p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-800 text-xs lg:text-sm px-2 lg:px-3 py-2 lg:py-3"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 lg:mr-3 h-4 w-4" />
          <span className="hidden lg:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
