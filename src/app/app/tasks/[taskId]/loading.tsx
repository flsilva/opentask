import { TaskFormSkeletonSkeleton } from '@/features/app/tasks/ui/TaskFormSkeleton';

export default function TaskPageLoading() {
  return <TaskFormSkeletonSkeleton className="mt-14" ssrOnly="Loading task..." />;
}
