'use client';

import { useActionState } from 'react';
import { login } from './actions';
import styles from './admin.module.css';

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className={styles.login}>
      <div className="field">
        <label htmlFor="admin-password" className="label">PASSWORD</label>
        <input id="admin-password" name="password" type="password" required autoComplete="current-password" className="input" />
      </div>
      {error && <p className="formError" role="alert">{error}</p>}
      <button type="submit" className="btn btnTeal" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
