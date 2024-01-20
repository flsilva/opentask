import 'server-only';
import { Suspense } from 'react';
import { subDays } from 'date-fns';
import { AddTask } from '@/features/app/tasks/ui/AddTask';
import { TaskList } from '@/features/app/tasks/ui/TaskList';
import { TaskForm } from '@/features/app/tasks/ui/TaskForm';
import { TodayPageHeader } from '@/features/app/today/ui/TodayPageHeader';
import { TaskListSkeleton } from '@/features/app/tasks/ui/TaskListSkeleton';

export default function TodayPage() {
  return (
    <>
      <TodayPageHeader />
      <Suspense fallback={<TaskListSkeleton className="mt-3" ssrOnly="Loading tasks..." />}>
        <TaskList dueBy={subDays(new Date(), 1)} only="incomplete" onlyProject="active">
          {({ list: listOverdue, tasks: tasksOverdue }) => (
            <>
              {tasksOverdue.length > 0 && <p className="mb-4 text-xs font-semibold">Overdue</p>}
              {listOverdue}
              {tasksOverdue.length > 0 && <p className="mt-8 mb-4 text-xs font-semibold">Today</p>}

              <TaskList dueOn={new Date()} only="incomplete" onlyProject="active">
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
            defaultDueDate={new Date()}
            startOnEditingMode
          />
        </AddTask>
      </Suspense>
    </>
  );
}
