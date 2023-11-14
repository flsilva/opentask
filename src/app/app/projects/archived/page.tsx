import 'server-only';
import { ProjectList } from '@/modules/app/projects/ProjectList';
import { ProjectsPageHeader } from '@/modules/app/projects/ProjectsPageHeader';
import { ProjectStatus } from '@/modules/app/projects/ProjectStatus';

export default function ArchivedProjectsPage() {
  return (
    <>
      <ProjectsPageHeader archived={true} />
      <ProjectList itemClassName="pl-2" only={ProjectStatus.Archived} />
    </>
  );
}
