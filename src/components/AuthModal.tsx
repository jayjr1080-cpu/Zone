import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Mail, User as UserIcon, Phone, Building, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  defaultRole?: 'client' | 'admin';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  defaultRole = 'client'
}) => {
  const { login, register, users } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [role, setRole] = useState<'client' | 'admin'>(defaultRole);

  // Form states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    const success = login(email, role);
    if (success) {
      setError('');
      onClose();
    } else {
      setError(`No account found for ${email} as ${role}. You can register below or select a quick demo account.`);
    }
  };

  const handleQuickDemo = (userEmail: string, userRole: 'client' | 'admin') => {
    login(userEmail, userRole);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Name and Email are required');
      return;
    }
    register(name, email, phone, company);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-200 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="bg-blue-500/30 p-2 rounded-xl backdrop-blur-md border border-blue-400/30">
              <ShieldCheck className="w-6 h-6 text-blue-200" />
            </div>
            <span className="text-2xl font-black tracking-wider uppercase text-white">ZONE</span>
          </div>
          <h2 className="text-xl font-bold">
            {mode === 'login'
              ? (role === 'admin' ? 'Admin Portal Authentication' : 'Client Logistics Portal')
              : 'Create ZONE Client Account'}
          </h2>
          <p className="text-blue-100 text-xs mt-1">
            Trans-corridor vehicle delivery & documentation tracking across SADC region.
          </p>
        </div>

        <div className="p-6">
          {/* Role Switcher tabs for Login */}
          {mode === 'login' && (
            <div className="flex rounded-xl bg-slate-800/80 p-1 mb-6 border border-slate-700">
              <button
                type="button"
                onClick={() => { setRole('client'); setError(''); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  role === 'client'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Client Account Portal
              </button>
              <button
                type="button"
                onClick={() => { setRole('admin'); setError(''); }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  role === 'admin'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Admin Command Access
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={role === 'admin' ? 'admin@zone.zm' : 'mwamba@gmail.com'}
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Access Key / Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    defaultValue="demo1234"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-indigo-950/50'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-blue-950/50'
                }`}
              >
                Sign In to {role === 'admin' ? 'Admin Portal' : 'Client Portal'}
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Logins */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                  Quick Demo Accounts
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {users.filter(u => u.role === role).map(u => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickDemo(u.email, u.role)}
                      className="flex items-center justify-between p-2.5 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-left text-xs transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200 group-hover:text-blue-400">{u.name}</div>
                          <div className="text-[10px] text-slate-500">{u.email}</div>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded font-mono">
                        {u.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Kunda Bwalya"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="kunda@example.zm"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+260 97 000 0000"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization (Optional)</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="e.g. Bwalya Auto Imports"
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-bold text-sm text-white transition-all shadow-lg shadow-blue-950/50 flex items-center justify-center gap-2"
              >
                Complete Client Registration
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Toggle Login / Register mode */}
          <div className="mt-6 text-center text-xs text-slate-400">
            {mode === 'login' ? (
              <p>
                Don't have a client account?{' '}
                <button
                  onClick={() => { setMode('register'); setError(''); }}
                  className="text-blue-400 font-semibold hover:underline"
                >
                  Create Account Portal
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-blue-400 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
