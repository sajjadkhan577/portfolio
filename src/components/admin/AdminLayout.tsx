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
    <div className="min-h-screen bg-[#0a0e17] text-[#f8fafc] flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#111827] border-b border-[#1e293b] px-4 sm:px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b] transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#00e599]/10 border border-[#00e599]/30 text-[#00e599] flex items-center justify-center font-bold text-xs">
                SK
              </div>
              <h1 className="font-bold text-sm sm:text-base tracking-tight text-[#f8fafc]">
                Portfolio Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono text-[#94a3b8] bg-[#0a0e17] px-3 py-1 rounded-full border border-[#1e293b]">
              {adminEmail}
            </span>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-[#1e293b] hover:bg-rose-950 text-xs font-medium text-[#94a3b8] hover:text-rose-300 border border-[#334155] hover:border-rose-800 transition-colors flex items-center gap-1.5 cursor-pointer"
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
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 border-b border-[#1e293b] mb-6 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#00e599] text-[#0a0e17] font-bold shadow-md shadow-[#00e599]/20'
                    : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#111827]'
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
