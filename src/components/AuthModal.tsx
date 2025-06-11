
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const AuthModal = () => {
  const { showAuthModal, authMode, closeAuthModal, login, signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      
      if (authMode === 'login') {
        success = await login(email, password);
        if (success) {
          toast.success('Successfully logged in!');
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        if (!name.trim()) {
          toast.error('Please enter your name');
          setIsLoading(false);
          return;
        }
        success = await signup(email, password, name);
        if (success) {
          toast.success('Account created successfully! Welcome to Divest India!');
        } else {
          toast.error('User already exists or signup failed');
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    closeAuthModal();
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <Dialog open={showAuthModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {authMode === 'login' ? 'Welcome Back' : 'Join Divest India'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {authMode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="bg-slate-800 border-slate-600 text-white focus:border-purple-400"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-slate-800 border-slate-600 text-white focus:border-purple-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="bg-slate-800 border-slate-600 text-white focus:border-purple-400"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 transition-all duration-300 hover:scale-105"
          >
            {isLoading ? 'Please wait...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-gray-400">
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                const newMode = authMode === 'login' ? 'signup' : 'login';
                closeAuthModal();
                setTimeout(() => {
                  const { openAuthModal } = useAuth();
                  openAuthModal(newMode);
                }, 100);
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
            >
              {authMode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
