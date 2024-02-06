import { Dialog } from '@/features/shared/ui/dialog/Dialog';
import { RouterActions } from '@/features/shared/routing/RouterActions';
import { TaskForm } from '@/features/app/tasks/ui/TaskForm';

interface NewTaskDialogPageProps {
  readonly searchParams: { readonly projectId: string };
}

export default function NewTaskDialogPage({ searchParams: { projectId } }: NewTaskDialogPageProps) {
  return (
    <Dialog defaultOpen routerActionOnClose={RouterActions.BackAndRefresh}>
      <TaskForm projectId={projectId} startOnEditingMode taskNameClassName="text-2xl" />
    </Dialog>
  );
}
