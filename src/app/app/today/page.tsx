import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { subDays } from 'date-fns';
import { ErrorList } from '@/features/shared/ui/error/ErrorList';
import { getProjects } from '@/features/app/projects/data-access/ProjectsDataAccess';
import { AddTask } from '@/features/app/tasks/ui/AddTask';
import { TaskForm } from '@/features/app/tasks/ui/TaskForm';
import { TaskList } from '@/features/app/tasks/ui/TaskList';
import { TaskListSkeleton } from '@/features/app/tasks/ui/TaskListSkeleton';
import { TodayPageHeader } from '@/features/app/today/ui/TodayPageHeader';

export default async function TodayPage() {
  const { data: projects, errors } = await getProjects();
  if (errors) return <ErrorList errors={errors} />;
  if (!projects || projects.length <= 0) redirect('/app/onboarding');

  const yesterday = subDays(new Date(), 1);
  const today = new Date();

  return (
    <>
      <TodayPageHeader />
      <Suspense fallback={<TaskListSkeleton className="mt-3" ssrOnly="Loading tasks..." />}>
        <TaskList dueBy={yesterday} only="incomplete" onlyProject="active">
          {({ list: listOverdue, tasks: tasksOverdue }) => (
            <>
              {tasksOverdue.length > 0 && <p className="mb-4 text-xs font-semibold">Overdue</p>}
              {listOverdue}
              {tasksOverdue.length > 0 && <p className="mt-8 mb-4 text-xs font-semibold">Today</p>}

              <TaskList dueOn={today} only="incomplete" onlyProject="active">
                {({ list: listDueToday, tasks: tasksDueToday }) => (
                  <>
                    {listDueToday}
                    {tasksDueToday.length < 1 && (
                      <p className="mt-6 mb-6 text-sm font-medium text-gray-600">
                        No tasks due today. {tasksOverdue.length < 1 && 'Enjoy your day!'}
                      </p>
                    )}
                  </>
                )}
              </TaskList>
            </>
          )}
        </TaskList>
        <AddTask containerClassName="my-8" defaultDueDate="today">
          <TaskForm
            className="rounded-md bg-gray-100 px-2 py-6 sm:px-6 mt-4"
            defaultDueDate={today}
            startOnEditingMode
          />
        </AddTask>
      </Suspense>
    </>
  );
}
