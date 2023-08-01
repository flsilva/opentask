import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import ProjectList from '@/app/app/shared/project/ProjectList';
import ProjectsHeader from '@/app/app/shared/project/ProjectsHeader';
import { ProjectData } from '@/app/app/shared/project/ProjectData';
import { findManyProjects } from '@/app/app/shared/project/project-model';

export default async function ArchivedProjectsPage() {
  const promises: Array<Promise<any>> = [];

  let activeProjects: Array<ProjectData> = [];
  const activeProjectsPromise = findManyProjects().then((res) => {
    activeProjects = res;
    return activeProjects;
  });
  promises.push(activeProjectsPromise);

  let archivedProjects: Array<ProjectData> = [];
  const archivedProjectsPromise = findManyProjects(true).then((res) => {
    archivedProjects = res;
    return archivedProjects;
  });
  promises.push(archivedProjectsPromise);

  await Promise.all(promises);

  return (
    <AppShell projects={activeProjects}>
      <ProjectsHeader archived={true} />
      <ProjectList projects={archivedProjects} />
    </AppShell>
  );
}
