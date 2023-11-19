import 'server-only';
import { Suspense } from 'react';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskList } from '@/modules/app/tasks/TaskList';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { TaskProjectsSelect } from '@/modules/app/tasks/TaskProjectsSelect';
import { TaskStatus } from '@/modules/app/tasks/TaskStatus';
import { TodayPageHeader } from '@/modules/app/today/TodayPageHeader';
import { TaskListSkeleton } from '@/modules/app/tasks/TaskListSkeleton';

export default function TodayPage() {
  return (
    <>
      <TodayPageHeader />
      <Suspense fallback={<TaskListSkeleton className="mt-3" ssrOnly="Loading tasks..." />}>
        <TaskList dueBy={subDays(endOfDay(new Date()), 1)} only={TaskStatus.Incomplete}>
          {({ list: listOverdue, tasks: tasksOverdue }) => (
            <>
              {tasksOverdue.length > 0 && <p className="mb-4 text-xs font-semibold">Overdue</p>}
              {listOverdue}
              {tasksOverdue.length > 0 && <p className="mt-8 mb-4 text-xs font-semibold">Today</p>}

              <TaskList dueOn={endOfDay(new Date())} only={TaskStatus.Incomplete}>
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
        <AddTask containerClassName="my-8">
          <TaskForm
            className="rounded-md bg-gray-100 px-2 py-6 sm:px-6 mt-4"
            defaultDueDate={startOfDay(new Date())}
            projectsSelect={<TaskProjectsSelect />}
            startOnEditingMode
          />
        </AddTask>
      </Suspense>
    </>
  );
}
