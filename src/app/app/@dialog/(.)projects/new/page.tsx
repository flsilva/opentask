import 'server-only';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActionType } from '@/modules/shared/router/RouterActions';

export default function NewProjectDialogInterceptingPage() {
  return (
    <Dialog
      defaultOpen
      title="Create project"
      routerActionsOnClose={{ type: RouterActionType.Back }}
    >
      <ProjectForm className="mt-6" />
    </Dialog>
  );
}
