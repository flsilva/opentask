import 'server-only';
import ProjectHeader from '@/app/app/shared/project/ProjectHeader';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import AddTask from '@/app/app/shared/task/AddTask';
import { TaskData } from '@/app/app/shared/task/TaskData';
import { ProjectPageTaskList } from '@/app/app/shared/project/ProjectPageTaskList';
import { ProjectData } from '@/app/app/shared/project/ProjectData';

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

export default async function ProjectPage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  console.log('ProjectPage() - projectId: ', projectId);
  const promises: Array<Promise<any>> = [];
  let project: ProjectData | null = null;
  let projects: Array<ProjectData> = [];
  const projectsPromise = findManyProjects().then((res) => {
    console.log('ProjectPage().findManyProjects().then() - res: ', res);
    projects = res;
    return projects;
  });
  promises.push(projectsPromise);

  const projectPromise = findProjectById(projectId).then((res) => {
    console.log('ProjectPage().findProjectById().then() - res: ', res);
    project = res;
    return project;
  });
  promises.push(projectPromise);

  await Promise.all(promises);

  console.log('ProjectPage() - RENDER - project: ', project);

  return (
    <AppShell projects={projects}>
      <ProjectHeader project={project} />
      <ProjectPageTaskList project={project} tasks={tasks} />
      <AddTask projects={projects} />
    </AppShell>
  );
}
