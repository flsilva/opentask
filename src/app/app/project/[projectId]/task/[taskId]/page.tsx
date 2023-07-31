import 'server-only';
import AppShellServer from '@/app/app/shared/ui/AppShellServer';

export default function ProjectTaskPage({
  params: { projectId, taskId },
}: {
  params: { projectId: string; taskId: string };
}) {
  return <AppShellServer projectId={projectId} taskId={taskId} />;
}
