import 'server-only';
import { TaskForm } from '@/modules/app/tasks/TaskForm';

interface TaskPageProps {
  readonly params: { readonly taskId: string };
}

export default function TaskPage({ params: { taskId } }: TaskPageProps) {
  return <TaskForm className="mt-10" taskId={taskId} taskNameClassName="text-2xl" />;
}
