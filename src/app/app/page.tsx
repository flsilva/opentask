import 'server-only';
import { redirect } from 'next/navigation';

export default function AppPage() {
  redirect('/app/today');
}
