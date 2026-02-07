import React, { useState } from 'react';
import { Dumbbell, Lock, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication for single user
    if (email === 'admin@gym.com' && password === 'admin') {
      onLogin();
    } else {
      setError('Invalid credentials. (Hint: admin@gym.com / admin)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gym-900 px-4">
      <div className="max-w-md w-full bg-gym-800 rounded-2xl shadow-2xl border border-gym-700 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gym-accent/10 rounded-full">
              <Dumbbell className="w-12 h-12 text-gym-accent" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-white mb-2">IronPulse Gym</h2>
          <p className="text-center text-slate-400 mb-8">Owner Administration Portal</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gym-700 rounded-lg bg-gym-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gym-accent focus:border-transparent transition-all"
                  placeholder="admin@gym.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gym-700 rounded-lg bg-gym-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gym-accent focus:border-transparent transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gym-accent hover:bg-gym-accentHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gym-accent focus:ring-offset-gym-800 transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gym-900 border-t border-gym-700">
          <p className="text-xs text-center text-slate-500">
            Secure Single-Tenant Environment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;