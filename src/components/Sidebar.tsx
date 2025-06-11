
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, PieChart, Wallet, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Home, label: 'Explore Properties', path: '/explore' },
    { icon: PieChart, label: 'Portfolio', path: '/portfolio' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Divest India
        </h2>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-slate-800">
        <div className="text-white font-semibold">{user?.name}</div>
        <div className="text-gray-400 text-sm">{user?.email}</div>
        <div className="mt-2 text-green-400 font-semibold">
          ₹{user?.walletBalance?.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-300 hover:text-white hover:bg-slate-800",
                location.pathname === item.path && "bg-slate-800 text-white"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-slate-800"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
