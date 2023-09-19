import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import { findManyProjects } from '@/modules/app/project/project-model-db';
import AddTask from '@/modules/app/task/AddTask';
import TaskModal from '@/modules/app/task/TaskModal';
import { TaskListController } from '@/modules/app/task/TaskListController';
import { findTaskById, findTasksDueUntilToday } from '@/modules/app/task/task-model-db';
import TodayHeader from '@/modules/app/today/TodayHeader';

interface TodayTaskPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TodayTaskPage({ params: { taskId } }: TodayTaskPageProps) {
  const [projects, tasks, task] = await Promise.all([
    findManyProjects(),
    findTasksDueUntilToday(),
    findTaskById(taskId),
  ]);
  const tasksDueToday = tasks.filter(
    (task) => task.dueDate && task.dueDate.getDate() === new Date().getDate(),
  );
  const tasksOverdue = tasks.filter(
    (task) => task.dueDate && task.dueDate.getDate() !== new Date().getDate(),
  );

  return (
    <AppShell projects={projects}>
      <TodayHeader />
      {tasks.length < 1 && projects.length > 0 && (
        <p className="mb-12 text-sm font-medium text-gray-600">
          No tasks due today. Enjoy your day!
        </p>
      )}
      {projects.length > 0 && (
        <>
          {tasksOverdue.length > 0 && (
            <>
              <p className="text-xs font-semibold mb-4">Overdue</p>
              <TaskListController tasks={tasksOverdue} />
            </>
          )}
          {tasksOverdue.length > 0 && tasksDueToday.length > 0 && (
            <p className="text-xs font-semibold mb-4">Today</p>
          )}
          <TaskListController
            addTask={
              <AddTask defaultDueDate={new Date()} project={projects[0]} projects={projects} />
            }
            tasks={tasksDueToday}
          />
        </>
      )}
      {task && <TaskModal isOpen={true} project={task.project} projects={projects} task={task} />}
    </AppShell>
  );
}
