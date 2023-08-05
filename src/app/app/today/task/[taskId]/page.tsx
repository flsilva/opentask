import 'server-only';
import TodayHeader from '@/app/app/shared/today/TodayHeader';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects } from '@/app/app/shared/project/project-model';
import AddTask from '@/app/app/shared/task/AddTask';
import { TaskData } from '@/app/app/shared/task/TaskData';
import TaskModal from '@/app/app/shared/task/TaskModal';
import { TodayPageTaskList } from '@/app/app/shared/today/TodayPageTaskList';
import { findTaskById, findTasksDueUntilToday } from '@/app/app/shared/task/task-model';

interface TodayTaskPageProps {
  readonly params: { readonly taskId: string };
}

const task: TaskData = {
  id: '1',
  name: 'My simple task lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.',
  description: 'This task is pretty simple indeed.',
  projectId: '1',
};

export default async function TodayTaskPage({ params: { taskId } }: TodayTaskPageProps) {
  const [projects, tasks, task] = await Promise.all([
    findManyProjects(),
    findTasksDueUntilToday(),
    findTaskById(taskId),
  ]);

  return (
    <AppShell projects={projects}>
      <TodayHeader />
      <TodayPageTaskList tasks={tasks} />
      {projects && projects.length > 0 && <AddTask defaultDueDate={new Date()} project={projects[0]} projects={projects} />}
      {task && (
        <TaskModal project={task.project} projects={projects} task={task} />
      )}
    </AppShell>
  );
}
