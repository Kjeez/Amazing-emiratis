import type { Metadata } from 'next';
import Link from 'next/link';
import { ADMIN_TABLES, COLUMNS, countAll, isAdminTable, rows, type AdminTable } from '@/lib/admin-data';
import { adminConfigured, isAdmin } from '@/lib/auth';
import { logout } from './actions';
import LoginForm from './LoginForm';
import styles from './admin.module.css';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  if (!adminConfigured()) {
    return (
      <Shell>
        <div className={styles.card}>
          <h1 className={styles.title}>Admin is switched off</h1>
          <p className={styles.note}>Set <code>ADMIN_PASSWORD</code> and <code>ADMIN_SECRET</code> in <code>.env.local</code> (see <code>.env.example</code>), then restart the server.</p>
        </div>
      </Shell>
    );
  }

  if (!(await isAdmin())) {
    return (
      <Shell>
        <div className={styles.card}>
          <h1 className={styles.title}>Editors’ desk</h1>
          <p className={styles.note}>Sign in to read nominations, applications, RSVPs and subscribers.</p>
          <LoginForm />
        </div>
      </Shell>
    );
  }

  const { tab } = await searchParams;
  const active: AdminTable = tab && isAdminTable(tab) ? tab : 'nominations';
  const counts = countAll();
  const data = rows(active);
  const cols = COLUMNS[active];

  return (
    <Shell signedIn>
      <nav className={styles.tabs} aria-label="Submission types">
        {ADMIN_TABLES.map((t) => (
          <Link key={t.key} href={`/admin?tab=${t.key}`} className={styles.tab} aria-current={t.key === active ? 'page' : undefined}>
            {t.label} <span className={styles.count}>{counts[t.key]}</span>
          </Link>
        ))}
        <a href={`/admin/export/${active}`} className={styles.export}>Download CSV</a>
      </nav>

      {data.length === 0 ? (
        <p className={styles.empty}>Nothing here yet.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>{cols.map(([k, h]) => <th key={k} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={String(r.id)}>
                  {cols.map(([k]) => (
                    <td key={k} className={k === 'why' || k === 'story' ? styles.long : undefined}>
                      <Cell table={active} column={k} value={r[k]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}

function Cell({ table, column, value }: { table: AdminTable; column: string; value: unknown }) {
  if (value == null || value === '') return <span className={styles.dim}>—</span>;
  const s = String(value);
  if (table === 'applications' && column === 'photo') return <a href={`/admin/uploads/${encodeURIComponent(s)}`} target="_blank" rel="noopener">View</a>;
  if (column === 'self_nomination') return <>{s === '1' ? 'Yes' : 'No'}</>;
  if (column === 'mode') return <>{s === 'myself' ? 'Themself' : 'Someone else'}</>;
  if (column.endsWith('email')) return <a href={`mailto:${s}`}>{s}</a>;
  if (/^https?:\/\//i.test(s)) return <a href={s} target="_blank" rel="noopener noreferrer nofollow">{s}</a>;
  if (column === 'created_at' || column === 'updated_at') return <span className={styles.nowrap}>{s.replace('T', ' ').slice(0, 16)} UTC</span>;
  return <>{s}</>;
}

function Shell({ children, signedIn }: { children: React.ReactNode; signedIn?: boolean }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>Amazing <em>Emiratis</em></Link>
        <span className={styles.badge}>Admin</span>
        {signedIn && (
          <form action={logout} className={styles.logout}>
            <button type="submit" className="btn btnOutline">Sign out</button>
          </form>
        )}
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
