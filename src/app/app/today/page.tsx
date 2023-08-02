import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects } from '@/app/app/shared/project/project-model';
import TodayHeader from '@/app/app/shared/today/TodayHeader';
import AddTask from '@/app/app/shared/task/AddTask';
import { TodayPageTaskList } from '@/app/app/shared/today/TodayPageTaskList';
import { findTasksDueUntilToday } from '../shared/task/task-model';

export default async function TodayPage() {
  const [projects, tasks] = await Promise.all([findManyProjects(), findTasksDueUntilToday()]);

  return (
    <AppShell projects={projects}>
      <TodayHeader />
      <TodayPageTaskList tasks={tasks} />
      {projects && projects.length > 0 && tasks.length < 1 && (
        <p className="mb-16 text-sm font-medium text-gray-600">
          No tasks due today. Enjoy your day!
        </p>
      )}
      {projects && projects.length > 0 && <AddTask project={projects[0]} projects={projects} />}
    </AppShell>
  );
}
