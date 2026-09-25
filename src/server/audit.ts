import { memoryDb, supabaseAdmin } from './db';

export async function logAdminAction(params: {
  userEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
}): Promise<void> {
  const logEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    user_email: params.userEmail,
    action: params.action,
    entity: params.entity,
    entity_id: params.entityId,
    details: params.details || {},
    created_at: new Date().toISOString(),
  };

  // Add to in-memory fallback
  memoryDb.auditLogs.unshift(logEntry);
  if (memoryDb.auditLogs.length > 200) {
    memoryDb.auditLogs.pop();
  }

  // Attempt write to Supabase if configured
  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from('audit_logs').insert({
        user_email: params.userEmail,
        action: params.action,
        entity: params.entity,
        entity_id: params.entityId,
        details: params.details || {},
      });
    } catch (err) {
      console.warn('Could not persist audit log to Supabase:', err);
    }
  }
}
