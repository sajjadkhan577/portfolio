import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  Settings,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  FileText,
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { AdminLeads } from './AdminLeads';
import { AdminProjects } from './AdminProjects';
import { AdminContent } from './AdminContent';
import { AdminSettings } from './AdminSettings';
import { AdminAuditLogs } from './AdminAuditLogs';

interface AdminLayoutProps {
  token: string;
  adminEmail: string;
  onLogout: () => void;
  onBackToSite: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  token,
  adminEmail,
  onLogout,
  onBackToSite,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'projects' | 'content' | 'settings' | 'audit'>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'leads', label: 'Leads & CRM', icon: <Users className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects & Work', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'content', label: 'Services & FAQs', icon: <Layers className="w-4 h-4" /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'audit', label: 'Audit Trail', icon: <ShieldCheck className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-[var(--accent-color)] flex items-center justify-center font-bold text-xs">
                SK
              </div>
              <h1 className="font-bold text-sm sm:text-base tracking-tight text-[var(--text-primary)]">
                Portfolio Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--border-color)]">
              {adminEmail}
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-[var(--bg-surface-elevated)] hover:bg-rose-950 text-xs font-medium text-[var(--text-muted)] hover:text-rose-300 border border-[var(--border-glow)] hover:border-rose-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container with Tab Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 border-b border-[var(--border-color)] mb-6 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent-color)] text-[var(--bg-primary)] font-bold shadow-md shadow-[var(--accent-color)]/20'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="flex-1">
          {activeTab === 'dashboard' && (
            <AdminDashboard token={token} onNavigateTab={(tab) => setActiveTab(tab as any)} />
          )}
          {activeTab === 'leads' && <AdminLeads token={token} />}
          {activeTab === 'projects' && <AdminProjects token={token} />}
          {activeTab === 'content' && <AdminContent token={token} />}
          {activeTab === 'settings' && <AdminSettings token={token} />}
          {activeTab === 'audit' && <AdminAuditLogs token={token} />}
        </div>
      </div>
    </div>
  );
};
