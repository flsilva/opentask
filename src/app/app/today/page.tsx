import 'server-only';
import { compareAsc, format } from 'date-fns';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskList } from '@/modules/app/tasks/TaskList';
import { getAllTasksDueUntilToday } from '@/modules/app/tasks/TasksRepository';
import { TodayHeader } from '@/modules/app/today/TodayHeader';

export default async function TodayPage() {
  const [{ data: projects, errors: projectsErrors }, { data: tasks, errors: tasksErrors }] =
    await Promise.all([getAllProjects(), getAllTasksDueUntilToday()]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (tasksErrors) return <ErrorList errors={tasksErrors} />;

  const todayStr = format(new Date(), 'yyyy/MM/d');

  const tasksDueToday = tasks
    ? tasks
        .filter((task) => task.dueDate && format(task.dueDate, 'yyyy/MM/d') === todayStr)
        .sort((taskA, taskB) => compareAsc(taskA.dueDate as Date, taskB.dueDate as Date))
    : [];

  const tasksOverdue = tasks
    ? tasks
        .filter((task) => task.dueDate && format(task.dueDate, 'yyyy/MM/d') !== todayStr)
        .sort((taskA, taskB) => compareAsc(taskA.dueDate as Date, taskB.dueDate as Date))
    : [];

  return (
    <>
      <TodayHeader />
      {projects && projects.length > 0 && (!tasks || tasks.length < 1) && (
        <p className="mb-12 text-sm font-medium text-gray-600">
          No tasks due today. Enjoy your day!
        </p>
      )}
      {projects && projects.length > 0 && (
        <>
          {tasksOverdue.length > 0 && (
            <>
              <p className="text-xs font-semibold mb-4">Overdue</p>
              <TaskList tasks={tasksOverdue} />
            </>
          )}
          {tasksOverdue.length > 0 && tasksDueToday.length > 0 && (
            <p className="text-xs font-semibold mb-4">Today</p>
          )}
          <TaskList
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
