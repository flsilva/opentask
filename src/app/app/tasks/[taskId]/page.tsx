import 'server-only';
import { Suspense } from 'react';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { TaskFormSkeletonSkeleton } from '@/modules/app/tasks/TaskFormSkeleton';

interface TaskPageProps {
  readonly params: { readonly taskId: string };
}

export default function TaskPage({ params: { taskId } }: TaskPageProps) {
  return (
    <Suspense fallback={<TaskFormSkeletonSkeleton className="mt-14" ssrOnly="Loading task..." />}>
      <TaskForm className="mt-10" taskId={taskId} taskNameClassName="text-2xl" />
    </Suspense>
  );
}
