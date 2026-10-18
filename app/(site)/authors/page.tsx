import { redirect } from 'next/navigation';

/** There is no authors index: the editors are introduced on the About page. */
export default function AuthorsIndex() {
  redirect('/about');
}
