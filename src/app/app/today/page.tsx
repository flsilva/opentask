import 'server-only';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';
import { TodayHeader } from '@/modules/app/today/TodayHeader';
import { AddTask } from '@/modules/app/task/AddTask';
import { TaskListApplication } from '@/modules/app/task/TaskListApplication';
import { getAllTasksDueUntilToday } from '@/modules/app/task/TaskRepository';

export default async function TodayPage() {
  const [projects, tasks] = await Promise.all([getAllProjects(), getAllTasksDueUntilToday()]);
  const tasksDueToday = tasks.filter(
    (task) => task.dueDate && task.dueDate.getDate() === new Date().getDate(),
  );
  const tasksOverdue = tasks.filter(
    (task) => task.dueDate && task.dueDate.getDate() !== new Date().getDate(),
  );

  return (
    <>
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
    </>
  );
}
