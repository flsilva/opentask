import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects } from '@/app/app/shared/project/project-model';
import TodayHeader from '@/app/app/shared/today/TodayHeader';
import AddTask from '@/app/app/shared/task/AddTask';
import { TaskData } from '@/app/app/shared/task/TaskData';
import { TodayPageTaskList } from '@/app/app/shared/today/TodayPageTaskList';

const tasks: Array<TaskData> = [];

for (let x = 0; x < 30; x++) {
  tasks.push({
    id: String(x + 1),
    name: `My task #${
      x + 1
    }: this one is pretty easy, just tick it! Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    projectId: '1',
  });
}

export default async function TodayPage() {
  const projects = await findManyProjects();
  return (
    <AppShell projects={projects}>
      <TodayHeader />
      <TodayPageTaskList tasks={tasks} />
      <AddTask projects={projects} />
    </AppShell>
  );
}
