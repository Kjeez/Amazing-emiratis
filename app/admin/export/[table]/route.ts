import { isAdminTable, toCsv } from '@/lib/admin-data';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ table: string }> }) {
  if (!(await isAdmin())) return new Response('Not found', { status: 404 });
  const { table } = await params;
  if (!isAdminTable(table)) return new Response('Not found', { status: 404 });
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(toCsv(table), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="amazing-emiratis-${table}-${stamp}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
