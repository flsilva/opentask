import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects } from '@/app/app/shared/project/project-model';
import TodayHeader from '@/app/app/shared/today/TodayHeader';
import AddTask from '@/app/app/shared/task/AddTask';
import { TaskListController } from '@/app/app/shared/task/TaskListController';
import { findTasksDueUntilToday } from '../shared/task/task-model';

export default async function TodayPage() {
  const [projects, tasks] = await Promise.all([findManyProjects(), findTasksDueUntilToday()]);
  const tasksDueToday = tasks.filter(
    (task) => task.dueDate && task.dueDate.getDate() === new Date().getDate(),
  );
  const tasksOverdue = tasks.filter(
    (task) => task.dueDate && task.dueDate.getDate() !== new Date().getDate(),
  );

  return (
    <AppShell projects={projects}>
      <TodayHeader />
      {projects.length > 0 && tasks.length < 1 && (
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
    </AppShell>
  );
}
