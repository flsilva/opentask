import 'server-only';
import AppShellServer from '@/app/app/shared/ui/AppShellServer';

export default function ProjectPage({ params: { projectId } }: { params: { projectId: string } }) {
  console.log('ProjectPage()');
  return <AppShellServer projectId={projectId} />;
}
