import 'server-only';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActions } from '@/modules/shared/router/RouterActions';

export default function NewProjectDialogInterceptingPage() {
  return (
    <Dialog defaultOpen title="Create project" routerActionOnClose={RouterActions.Back}>
      <ProjectForm className="mt-6" />
    </Dialog>
  );
}
