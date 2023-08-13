import 'server-only';
import TodayHeader from '@/app/app/shared/today/TodayHeader';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects } from '@/app/app/shared/project/project-model';
import AddTask from '@/app/app/shared/task/AddTask';
import { TaskData } from '@/app/app/shared/task/TaskData';
import TaskModal from '@/app/app/shared/task/TaskModal';
import { TaskListController } from '@/app/app/shared/task/TaskListController';
import { findTaskById, findTasksDueUntilToday } from '@/app/app/shared/task/task-model';

interface TodayTaskPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TodayTaskPage({ params: { taskId } }: TodayTaskPageProps) {
  const [projects, tasks, task] = await Promise.all([
    findManyProjects(),
    findTasksDueUntilToday(),
    findTaskById(taskId),
  ]);

  return (
    <AppShell projects={projects}>
      <TodayHeader />
      {tasks.length > 0 && <TaskListController tasks={tasks} />}
      {tasks.length < 1 && projects && projects.length > 0 && (
        <p className="mb-12 text-sm font-medium text-gray-600">
          No tasks due today. Enjoy your day!
        </p>
      )}
      <TaskListController tasks={tasks} />
      {projects && projects.length > 0 && (
        <AddTask defaultDueDate={new Date()} project={projects[0]} projects={projects} />
      )}
      {task && <TaskModal project={task.project} projects={projects} task={task} />}
    </AppShell>
  );
}
