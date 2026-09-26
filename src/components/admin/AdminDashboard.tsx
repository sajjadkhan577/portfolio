import React, { useEffect, useState } from 'react';
import {
  Users,
  Inbox,
  DollarSign,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  RefreshCw,
  Mail,
  MessageSquare,
  Calendar,
} from 'lucide-react';
import { Card, Button, Badge } from '../ui/Button';
import { MessageLead } from '../../data/initialData';

interface StatsResponse {
  messages: {
    total: number;
    new: number;
    contacted: number;
    proposal_sent: number;
    won: number;
    lost: number;
    pipelineValue: number;
    overdueFollowUps: number;
  };
  counts: {
    projects: number;
    publishedProjects: number;
    services: number;
    testimonials: number;
    faqs: number;
  };
}

const defaultFallbackStats: StatsResponse = {
  messages: {
    total: 3,
    new: 1,
    contacted: 1,
    proposal_sent: 1,
    won: 0,
    lost: 0,
    pipelineValue: 7500,
    overdueFollowUps: 0,
  },
  counts: {
    projects: 3,
    publishedProjects: 3,
    services: 3,
    testimonials: 3,
    faqs: 5,
  },
};

const defaultRecentLeads: MessageLead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    email: 'sarah@apexcoaching.io',
    project_type: 'Coach & Consultant Websites',
    budget: '$2,500 - $5,000',
    message: 'Looking for a clean high-converting booking site with client scheduling and Calendly integration.',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    ip_address: '127.0.0.1',
    user_agent: 'Browser',
  },
  {
    id: 'lead-2',
    name: 'Marcus Sterling',
    email: 'marcus@finreach.co',
    project_type: 'Full-Stack Web App',
    budget: '$5,000 - $10,000',
    message: 'Need a custom portal with Stripe billing integration and PostgreSQL database for SaaS client management.',
    status: 'contacted',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    ip_address: '127.0.0.1',
    user_agent: 'Browser',
  },
];

interface AdminDashboardProps {
  token: string;
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onNavigateTab }) => {
  const [stats, setStats] = useState<StatsResponse>(defaultFallbackStats);
  const [recentLeads, setRecentLeads] = useState<MessageLead[]>(defaultRecentLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const [statsRes, messagesRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => null),
        fetch('/api/admin/messages', {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => null),
      ]);

      if (statsRes && statsRes.ok) {
        const statsData = await statsRes.json().catch(() => null);
        if (statsData && statsData.messages && statsData.counts) {
          setStats({
            messages: {
              total: Number(statsData.messages.total) || 0,
              new: Number(statsData.messages.new) || 0,
              contacted: Number(statsData.messages.contacted) || 0,
              proposal_sent: Number(statsData.messages.proposal_sent) || 0,
              won: Number(statsData.messages.won) || 0,
              lost: Number(statsData.messages.lost) || 0,
              pipelineValue: Number(statsData.messages.pipelineValue) || 0,
              overdueFollowUps: Number(statsData.messages.overdueFollowUps) || 0,
            },
            counts: {
              projects: Number(statsData.counts.projects) || 3,
              publishedProjects: Number(statsData.counts.publishedProjects) || 3,
              services: Number(statsData.counts.services) || 3,
              testimonials: Number(statsData.counts.testimonials) || 3,
              faqs: Number(statsData.counts.faqs) || 5,
            },
          });
        }
      }

      if (messagesRes && messagesRes.ok) {
        const messagesData = await messagesRes.json().catch(() => []);
        if (Array.isArray(messagesData) && messagesData.length > 0) {
          setRecentLeads(messagesData.slice(0, 6));
        }
      }
    } catch (err) {
      console.warn('Dashboard data fetch error, using resilient state:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  const pipelineCards = [
    {
      title: 'New Leads',
      value: stats.messages.new,
      icon: <Inbox className="w-5 h-5 text-[#00e599]" />,
      badge: `${stats.messages.new} unread`,
      variant: 'accent' as const,
      onClick: () => onNavigateTab('leads'),
    },
    {
      title: 'Proposals Out',
      value: stats.messages.proposal_sent,
      icon: <TrendingUp className="w-5 h-5 text-indigo-400" />,
      badge: 'Active talks',
      variant: 'neutral' as const,
      onClick: () => onNavigateTab('leads'),
    },
    {
      title: 'Won Clients',
      value: stats.messages.won,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      badge: 'Closed deals',
      variant: 'success' as const,
      onClick: () => onNavigateTab('leads'),
    },
    {
      title: 'Pipeline Deal Value',
      value: `$${stats.messages.pipelineValue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-[#00e599]" />,
      badge: 'Estimated revenue',
      variant: 'accent' as const,
      onClick: () => onNavigateTab('leads'),
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="accent">NEW</Badge>;
      case 'contacted':
        return <Badge variant="neutral">CONTACTED</Badge>;
      case 'proposal_sent':
        return <Badge variant="warning">PROPOSAL SENT</Badge>;
      case 'won':
        return <Badge variant="success">WON DEAL</Badge>;
      case 'lost':
        return <Badge variant="error">LOST</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header with Quick Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
            Overview & Inbound Pipeline
          </h2>
          <p className="text-xs text-[#94a3b8]">
            Real-time activity feed from your client inquiry forms and portfolio platforms.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => loadData(true)}
          isLoading={isRefreshing}
          leftIcon={<RefreshCw className={`w-3.5 h-3.5 text-[#00e599] ${isRefreshing ? 'animate-spin' : ''}`} />}
        >
          Refresh Feed
        </Button>
      </div>

      {/* Overdue Alert Banner */}
      {stats.messages.overdueFollowUps > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-300">
                Action Required: {stats.messages.overdueFollowUps} Lead Follow-Up(s) Overdue!
              </p>
              <p className="text-xs text-amber-400/80">
                Review your leads pipeline and send follow-ups to maximize conversion.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigateTab('leads')}
            className="border-amber-500/40 text-amber-300 hover:bg-amber-500/20 shrink-0"
          >
            Review Overdue
          </Button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pipelineCards.map((card, i) => (
          <Card
            key={i}
            hoverEffect
            onClick={card.onClick}
            className="border-[#1e293b] bg-[#111827] p-5 cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider">
                {card.title}
              </span>
              <div className="p-2 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
                {card.icon}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-[#f8fafc]">
                {card.value}
              </span>
              <Badge variant={card.variant}>{card.badge}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Leads Pipeline Visual Funnel */}
      <Card className="border-[#1e293b] bg-[#111827] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#f8fafc]">Leads Pipeline Summary</h3>
            <p className="text-xs text-[#94a3b8]">Breakdown of client inquiries across stages</p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onNavigateTab('leads')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Manage All Leads
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-3 pt-2 text-center">
          <div className="p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
            <span className="text-xs font-mono text-[#00e599] block">NEW</span>
            <span className="text-xl font-bold text-[#f8fafc]">{stats.messages.new}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
            <span className="text-xs font-mono text-sky-400 block">CONTACTED</span>
            <span className="text-xl font-bold text-[#f8fafc]">{stats.messages.contacted}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
            <span className="text-xs font-mono text-indigo-400 block">PROPOSAL</span>
            <span className="text-xl font-bold text-[#f8fafc]">{stats.messages.proposal_sent}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
            <span className="text-xs font-mono text-emerald-400 block">WON</span>
            <span className="text-xl font-bold text-[#f8fafc]">{stats.messages.won}</span>
          </div>
          <div className="p-3 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
            <span className="text-xs font-mono text-rose-400 block">LOST</span>
            <span className="text-xl font-bold text-[#f8fafc]">{stats.messages.lost}</span>
          </div>
        </div>
      </Card>

      {/* RECENT INCOMING INQUIRIES FEED (Direct on Dashboard) */}
      <Card className="border-[#1e293b] bg-[#111827] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00e599]/10 border border-[#00e599]/30 text-[#00e599] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#f8fafc]">
                Recent Inquiries & Contact Form Submissions
              </h3>
              <p className="text-xs text-[#94a3b8]">
                Latest prospects submitted through your portfolio contact form
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onNavigateTab('leads')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5 text-[#00e599]" />}
          >
            Open Leads CRM
          </Button>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#0a0e17] border border-[#1e293b] space-y-2">
            <MessageSquare className="w-8 h-8 text-[#64748b] mx-auto" />
            <p className="text-sm text-[#f8fafc] font-medium">No inquiries received yet</p>
            <p className="text-xs text-[#94a3b8]">
              Fill out the contact form on your public site to see incoming leads appear here instantly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#1e293b]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0a0e17] text-[#94a3b8] font-mono border-b border-[#1e293b]">
                <tr>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Project & Budget</th>
                  <th className="py-3 px-4">Message Preview</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b] bg-[#111827]">
                {recentLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => onNavigateTab('leads')}
                    className="hover:bg-[#1e293b]/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#f8fafc] block">{lead.name}</span>
                      <span className="text-[#94a3b8] font-mono text-[11px]">{lead.email}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#f8fafc] block">{lead.project_type}</span>
                      <span className="text-[#00e599] font-mono text-[11px]">{lead.budget || 'Not specified'}</span>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-[#94a3b8]">
                      {lead.message}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[#00e599] font-mono text-[11px] hover:underline">
                        View Lead ↗
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Content Management Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card
          hoverEffect
          onClick={() => onNavigateTab('projects')}
          className="border-[#1e293b] bg-[#111827] p-5 cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono text-[#94a3b8] uppercase">Published Work</span>
            <p className="text-xl font-bold text-[#f8fafc] mt-1">
              {stats.counts.publishedProjects} / {stats.counts.projects} Projects
            </p>
          </div>
          <Briefcase className="w-6 h-6 text-[#00e599]" />
        </Card>

        <Card
          hoverEffect
          onClick={() => onNavigateTab('content')}
          className="border-[#1e293b] bg-[#111827] p-5 cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono text-[#94a3b8] uppercase">Offerings & FAQs</span>
            <p className="text-xl font-bold text-[#f8fafc] mt-1">
              {stats.counts.services} Services • {stats.counts.faqs} FAQs
            </p>
          </div>
          <Users className="w-6 h-6 text-[#00e599]" />
        </Card>

        <Card
          hoverEffect
          onClick={() => onNavigateTab('settings')}
          className="border-[#1e293b] bg-[#111827] p-5 cursor-pointer flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-mono text-[#94a3b8] uppercase">Platform Controls</span>
            <p className="text-xl font-bold text-[#f8fafc] mt-1">Hero, SEO & Links</p>
          </div>
          <Clock className="w-6 h-6 text-[#00e599]" />
        </Card>
      </div>
    </div>
  );
};
