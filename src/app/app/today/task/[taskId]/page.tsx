import 'server-only';
import AppShell from '@/modules/app/shared/AppShell';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';
import AddTask from '@/modules/app/task/AddTask';
import TaskModal from '@/modules/app/task/TaskModal';
import { TaskListApplication } from '@/modules/app/task/TaskListApplication';
import { getTaskById, getAllTasksDueUntilToday } from '@/modules/app/task/TaskRepository';
import TodayHeader from '@/modules/app/today/TodayHeader';

interface TodayTaskPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TodayTaskPage({ params: { taskId } }: TodayTaskPageProps) {
  const [projects, tasks, task] = await Promise.all([
    getAllProjects(),
    getAllTasksDueUntilToday(),
    getTaskById(taskId),
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
              <TaskListApplication tasks={tasksOverdue} />
            </>
          )}
          {tasksOverdue.length > 0 && tasksDueToday.length > 0 && (
            <p className="text-xs font-semibold mb-4">Today</p>
          )}
          <TaskListApplication
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
