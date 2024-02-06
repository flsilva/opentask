import { RouterActions } from '@/features/shared/routing/RouterActions';
import { Dialog } from '@/features/shared/ui/dialog/Dialog';
import { ProjectForm } from '@/features/app/projects/ui/ProjectForm';

export default function NewProjectDialogPage() {
  return (
    <Dialog defaultOpen title="Create project" routerActionOnClose={RouterActions.Back}>
      <ProjectForm className="mt-6" />
    </Dialog>
  );
}
