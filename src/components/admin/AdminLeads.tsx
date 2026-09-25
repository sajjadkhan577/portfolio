import React, { useEffect, useState } from 'react';
import {
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign,
  AlertCircle,
  Clock,
  Trash2,
  CheckCircle,
  Eye,
  Mail,
  User,
  MessageSquare,
} from 'lucide-react';
import { MessageLead } from '../../data/initialData';
import { Card, Button, Badge } from '../ui/Button';
import { Input, Textarea, Select } from '../ui/FormElements';

interface AdminLeadsProps {
  token: string;
}

export const AdminLeads: React.FC<AdminLeadsProps> = ({ token }) => {
  const [leads, setLeads] = useState<MessageLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<MessageLead | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const url = new URL('/api/admin/messages', window.location.origin);
      if (statusFilter !== 'all') url.searchParams.set('status', statusFilter);
      if (search) url.searchParams.set('search', search);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, search]);

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/messages/${selectedLead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: selectedLead.status,
          notes: selectedLead.notes,
          deal_value: selectedLead.deal_value,
          follow_up_date: selectedLead.follow_up_date,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        setSelectedLead(updated);
      }
    } catch (err) {
      console.error('Update lead error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead?')) return;
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    } catch (err) {
      console.error('Delete lead error:', err);
    }
  };

  const handleExportCSV = () => {
    window.open('/api/admin/messages/export', '_blank');
  };

  const todayStr = new Date().toISOString().split('T')[0];

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
    <div className="space-y-6 animate-fadeIn">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
            Leads & Inquiries CRM
          </h2>
          <p className="text-xs text-[#94a3b8]">
            Manage client prospects, track follow-up dates, set deal values, and log private notes.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleExportCSV}
          leftIcon={<Download className="w-4 h-4 text-[#00e599]" />}
        >
          Export CSV Report
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-[#1e293b] bg-[#111827] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0a0e17] text-sm text-[#f8fafc] border border-[#1e293b] rounded-xl focus:outline-none focus:border-[#00e599]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#64748b]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#0a0e17] text-xs font-mono text-[#f8fafc] border border-[#1e293b] rounded-xl focus:outline-none focus:border-[#00e599]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="won">Won Deal</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </Card>

      {/* Main Grid: Leads Table + Detail Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Leads Table */}
        <div className={`${selectedLead ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <Card className="border-[#1e293b] bg-[#111827] p-0 overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-sm font-mono text-[#94a3b8]">
                Loading leads records...
              </div>
            ) : leads.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#64748b]">
                No leads found matching your criteria.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0a0e17] text-[#94a3b8] font-mono border-b border-[#1e293b]">
                    <tr>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Project & Budget</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Follow-Up</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e293b]">
                    {leads.map((lead) => {
                      const isOverdue =
                        lead.follow_up_date &&
                        lead.follow_up_date < todayStr &&
                        lead.status !== 'won' &&
                        lead.status !== 'lost';

                      const isSelected = selectedLead?.id === lead.id;

                      return (
                        <tr
                          key={lead.id}
                          className={`hover:bg-[#1e293b]/40 transition-colors cursor-pointer ${
                            isSelected ? 'bg-[#1e293b]/70 border-l-2 border-l-[#00e599]' : ''
                          }`}
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#f8fafc] block">{lead.name}</span>
                            <span className="text-[#94a3b8]">{lead.email}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-[#f8fafc] block">{lead.project_type}</span>
                            <span className="text-[#00e599] font-mono">{lead.budget}</span>
                          </td>
                          <td className="py-3.5 px-4">{getStatusBadge(lead.status)}</td>
                          <td className="py-3.5 px-4">
                            {lead.follow_up_date ? (
                              <span
                                className={`font-mono flex items-center gap-1 ${
                                  isOverdue ? 'text-amber-400 font-bold' : 'text-[#94a3b8]'
                                }`}
                              >
                                {isOverdue && <AlertCircle className="w-3.5 h-3.5 text-amber-400" />}
                                {lead.follow_up_date}
                              </span>
                            ) : (
                              <span className="text-[#64748b]">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLead(lead);
                              }}
                              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#00e599] hover:bg-[#0a0e17]"
                              title="Open Lead"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLead(lead.id);
                              }}
                              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-rose-400 hover:bg-[#0a0e17]"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Selected Lead Detail & CRM Notes Drawer */}
        {selectedLead && (
          <div className="lg:col-span-5">
            <Card className="border-[#1e293b] bg-[#111827] p-6 space-y-6 sticky top-24 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]">
                <div>
                  <h3 className="text-lg font-bold text-[#f8fafc]">{selectedLead.name}</h3>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-xs font-mono text-[#00e599] hover:underline"
                  >
                    {selectedLead.email}
                  </a>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-xs text-[#94a3b8] hover:text-[#f8fafc]"
                >
                  Close
                </button>
              </div>

              {/* Inquiry Message */}
              <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-[#1e293b] space-y-1">
                <span className="text-[11px] font-mono text-[#64748b] uppercase">Visitor Message:</span>
                <p className="text-xs sm:text-sm text-[#f8fafc] leading-relaxed whitespace-pre-line">
                  {selectedLead.message}
                </p>
              </div>

              {/* Deal Status & Value Controls */}
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Deal Status"
                  options={[
                    { value: 'new', label: 'New' },
                    { value: 'contacted', label: 'Contacted' },
                    { value: 'proposal_sent', label: 'Proposal Sent' },
                    { value: 'won', label: 'Won Deal' },
                    { value: 'lost', label: 'Lost' },
                  ]}
                  value={selectedLead.status}
                  onChange={(e) =>
                    setSelectedLead({ ...selectedLead, status: e.target.value as MessageLead['status'] })
                  }
                />

                <Input
                  label="Deal Value ($ USD)"
                  type="number"
                  value={selectedLead.deal_value || 0}
                  onChange={(e) =>
                    setSelectedLead({ ...selectedLead, deal_value: Number(e.target.value) || 0 })
                  }
                />
              </div>

              {/* Follow-up Date */}
              <Input
                label="Next Follow-up Due Date"
                type="date"
                value={selectedLead.follow_up_date || ''}
                onChange={(e) =>
                  setSelectedLead({ ...selectedLead, follow_up_date: e.target.value })
                }
                helperText="Overdue dates are highlighted automatically in the pipeline."
              />

              {/* Internal Notes */}
              <Textarea
                label="Private Client Notes & Log"
                rows={4}
                placeholder="Log discussion points, proposal details, meeting links, or blockers..."
                value={selectedLead.notes || ''}
                onChange={(e) => setSelectedLead({ ...selectedLead, notes: e.target.value })}
              />

              {/* Update Button */}
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={handleUpdateLead}
                isLoading={isSaving}
                leftIcon={<CheckCircle className="w-4 h-4 text-[#0a0e17]" />}
              >
                Save Lead Changes
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
