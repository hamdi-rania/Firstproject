import React, { useState } from 'react';
import { Plane, Lock, Mail, Key, User2, Shield, Smartphone } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

type Role = 'agent' | 'director';
type AuthStep = 'credentials' | '2fa';
type TwoFactorMethod = 'email' | 'sms' | 'authenticator';

function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('credentials');
  const [role, setRole] = useState<Role>('agent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] = useState<TwoFactorMethod>('email');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authStep === 'credentials') {
      // In a real app, validate credentials here
      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }
      setAuthStep('2fa');
      toast.success('Credentials verified! Please complete 2FA.');
    } else {
      // In a real app, validate 2FA code here
      if (!twoFactorCode) {
        toast.error('Please enter your 2FA code');
        return;
      }
      toast.success('Login successful!');
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info('Password reset link sent to your email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 to-indigo-900 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-xl border border-white/20">
        <div className="flex items-center justify-center mb-8 text-white">
          <Plane className="w-10 h-10 mr-3" />
          <h1 className="text-2xl font-bold">Marrakech Airport Portal</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {authStep === 'credentials' ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Role</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('agent')}
                      className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        role === 'agent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <User2 className="w-4 h-4" />
                      Agent
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('director')}
                      className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        role === 'director'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      Director
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Professional Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@marrakech-airport.ma"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 block text-sm text-white">
                      Remember me
                    </label>
                  </div>
                  <button
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Two-Factor Authentication
                </label>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setTwoFactorMethod('email')}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      twoFactorMethod === 'email'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setTwoFactorMethod('sms')}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      twoFactorMethod === 'sms'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    SMS
                  </button>
                  <button
                    type="button"
                    onClick={() => setTwoFactorMethod('authenticator')}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      twoFactorMethod === 'authenticator'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Lock className="w-4 h-4" />
                    TOTP
                  </button>
                </div>
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter verification code"
                  maxLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            {authStep === 'credentials' ? 'Continue' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;