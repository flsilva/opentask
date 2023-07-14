import 'server-only';
import { redirect } from 'next/navigation';

export default function App() {
  redirect('/app/today');
}
