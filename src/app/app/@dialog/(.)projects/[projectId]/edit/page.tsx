import 'server-only';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';

interface EditProjectDialogPageProps {
  readonly params: { readonly projectId: string };
}

export default function EditProjectDialogPage({
  params: { projectId },
}: EditProjectDialogPageProps) {
  return (
    <Dialog defaultOpen title="Edit project" routerActionOnClose={RouterActions.Back}>
      <ProjectForm className="mt-6" projectId={projectId} />
    </Dialog>
  );
}
