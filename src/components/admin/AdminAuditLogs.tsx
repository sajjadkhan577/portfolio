import React, { useEffect, useState } from 'react';
import { ShieldCheck, Clock, RefreshCw } from 'lucide-react';
import { Card, Button, Badge } from '../ui/Button';

interface AuditLog {
  id: string;
  admin_email: string;
  action: string;
  entity: string;
  entity_id?: string;
  details?: Record<string, any>;
  ip?: string;
  created_at: string;
}

interface AdminAuditLogsProps {
  token: string;
}

export const AdminAuditLogs: React.FC<AdminAuditLogsProps> = ({ token }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error('Fetch audit logs error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#f8fafc]">
            Security Audit Trail & Activity Logs
          </h2>
          <p className="text-xs text-[#94a3b8]">
            Immutable record of all administrative actions, data edits, status modifications, and logins.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={fetchLogs}
          isLoading={isLoading}
          leftIcon={<RefreshCw className="w-3.5 h-3.5 text-[#00e599]" />}
        >
          Refresh Logs
        </Button>
      </div>

      <Card className="border-[#1e293b] bg-[#111827] p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-xs font-mono text-[#94a3b8]">
            Loading audit events...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#64748b]">
            No audit records logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0a0e17] text-[#94a3b8] border-b border-[#1e293b]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Admin Email</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e293b]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#1e293b]/30">
                    <td className="py-3 px-4 text-[#94a3b8]">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-[#f8fafc]">{log.admin_email}</td>
                    <td className="py-3 px-4">
                      <Badge variant="accent">{log.action}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sky-400">{log.entity}</td>
                    <td className="py-3 px-4 text-[#94a3b8] max-w-xs truncate">
                      {log.details ? JSON.stringify(log.details) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
