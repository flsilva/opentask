import 'server-only';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { TaskProjectsSelect } from '@/modules/app/tasks/TaskProjectsSelect';

interface NewTaskDialogPageProps {
  readonly searchParams: { readonly projectId: string };
}

export default function NewTaskDialogPage({ searchParams: { projectId } }: NewTaskDialogPageProps) {
  return (
    <Dialog defaultOpen routerActionOnClose={RouterActions.BackAndRefresh}>
      <TaskForm
        projectsSelect={<TaskProjectsSelect defaultValue={projectId} />}
        shouldStartOnEditingMode
        taskNameClassName="text-2xl"
      />
    </Dialog>
  );
}
