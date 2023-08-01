import 'server-only';
import ProjectHeader from '@/app/app/shared/project/ProjectHeader';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import AddTask from '@/app/app/shared/task/AddTask';
import { ProjectPageTaskList } from '@/app/app/shared/project/ProjectPageTaskList';
import { ProjectData } from '@/app/app/shared/project/ProjectData';
import { TaskData } from '@/app/app/shared/task/TaskData';
import TaskModal from '@/app/app/shared/task/TaskModal';

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

const task: TaskData = {
  id: '1',
  name: 'My simple task lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.',
  description: 'This task is pretty simple indeed.',
  projectId: '1',
};

export default async function ProjectTaskPage({
  params: { projectId },
}: {
  params: { projectId: string };
}) {
  console.log('ProjectTaskPage() - RENDER - projectId: ', projectId);
  let project: ProjectData | null = null;
  let projects: Array<ProjectData> = [];
  const projectsPromise = findManyProjects().then((res) => {
    console.log('ProjectTaskPage().findManyProjects().then() - res: ', res);
    projects = res;
    return projects;
  });
  const promises: Array<Promise<any>> = [projectsPromise];

  if (typeof projectId === 'string' && projectId !== '') {
    console.log('ProjectTaskPage() - HAS projectId - call findProjectById()');
    const projectPromise = findProjectById(projectId).then((res) => {
      console.log('ProjectTaskPage().findProjectById().then() - res: ', res);
      project = res;
      return project;
    });
    promises.push(projectPromise);
  }

  await Promise.all(promises);

  console.log('ProjectTaskPage() - RENDER - project: ', project);

  return (
    <AppShell projects={projects}>
      <ProjectHeader project={project} />
      <ProjectPageTaskList project={project} tasks={tasks} />
      <AddTask projects={projects} />
      <TaskModal projects={projects} task={task} />
    </AppShell>
  );
}
