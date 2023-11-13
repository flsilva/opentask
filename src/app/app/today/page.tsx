import 'server-only';
import { endOfDay, subDays } from 'date-fns';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getProjects } from '@/modules/app/projects/ProjectsRepository';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskList } from '@/modules/app/tasks/TaskList';
import { getTasksDueBy, getTasksDueOn } from '@/modules/app/tasks/TasksRepository';
import { TodayHeader } from '@/modules/app/today/TodayHeader';
import { getServerSideUser } from '@/modules/app/users/UsersRepository';

export default async function TodayPage() {
  const [
    { data: projects, errors: projectsErrors },
    { data: tasksOverdue, errors: tasksOverdueErrors },
    { data: tasksDueToday, errors: tasksDueTodayErrors },
    { timeZone },
  ] = await Promise.all([
    getProjects(),
    getTasksDueBy({ dueBy: subDays(endOfDay(new Date()), 1), isCompleted: false }),
    getTasksDueOn({ dueOn: endOfDay(new Date()), isCompleted: false }),
    getServerSideUser(),
  ]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (tasksOverdueErrors) return <ErrorList errors={tasksOverdueErrors} />;
  if (tasksDueTodayErrors) return <ErrorList errors={tasksDueTodayErrors} />;

  return (
    <>
      <TodayHeader />
      {projects &&
        projects.length > 0 &&
        (!tasksOverdue || tasksOverdue.length < 1) &&
        (!tasksDueToday || tasksDueToday.length < 1) && (
          <p className="mb-12 text-sm font-medium text-gray-600">
            No tasks due today. Enjoy your day!
          </p>
        )}
      {projects && projects.length > 0 && (
        <>
          {tasksOverdue && tasksOverdue.length > 0 && (
            <>
              <p className="text-xs font-semibold mb-4">Overdue</p>
              <TaskList tasks={tasksOverdue} timeZone={timeZone} />
            </>
          )}
          {tasksOverdue && tasksOverdue.length > 0 && tasksDueToday && tasksDueToday.length > 0 && (
            <p className="text-xs font-semibold mb-4">Today</p>
          )}
          <TaskList
            addTask={
              <AddTask defaultDueDate={new Date()} projectId={projects[0].id} projects={projects} />
            }
            tasks={tasksDueToday || []}
            timeZone={timeZone}
          />
        </>
      )}
    </>
  );
}
