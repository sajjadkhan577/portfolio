import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { Button, Card } from '../ui/Button';
import { Input } from '../ui/FormElements';

interface AdminLoginProps {
  onLoginSuccess: (token: string, user: { email: string }) => void;
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToSite }) => {
  const [email, setEmail] = useState('sajjad2003khan@gmail.com');
  const [password, setPassword] = useState('sajjad_admin_2026!');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        localStorage.setItem('admin_token', data.token);
        onLoginSuccess(data.token, data.user);
      } else {
        setError(data.error || 'Invalid credentials or unauthorized email.');
      }
    } catch {
      setError('Connection failure. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('sajjad2003khan@gmail.com');
    setPassword('sajjad_admin_2026!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0e17] relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00e599]/10 rounded-full blur-3xl pointer-events-none"></div>

      <Card className="w-full max-w-md border-[#1e293b] bg-[#111827] p-8 space-y-6 relative shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#00e599]/10 border border-[#00e599]/30 text-[#00e599] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#f8fafc]">Admin Access Portal</h2>
          <p className="text-xs font-mono text-[#94a3b8]">
            Protected by Server Allow-List & Signed Token Auth
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Admin Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sajjad2003khan@gmail.com"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            leftIcon={<ShieldCheck className="w-4 h-4 text-[#0a0e17]" />}
          >
            Authenticate & Open Dashboard
          </Button>
        </form>

        {/* Quick Demo Pre-fill */}
        <div className="pt-2 border-t border-[#1e293b] text-center space-y-3">
          <button
            onClick={handleQuickFill}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00e599] hover:underline cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fill Admin Credentials</span>
          </button>

          <div>
            <button
              onClick={onBackToSite}
              className="text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors"
            >
              ← Back to Public Portfolio
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
