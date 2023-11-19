import 'server-only';
import { Suspense } from 'react';
import { ProjectList } from '@/modules/app/projects/ProjectList';
import { ProjectListSkeleton } from '@/modules/app/projects/ProjectListSkeleton';
import { ProjectsPageHeader } from '@/modules/app/projects/ProjectsPageHeader';
import { ProjectStatus } from '@/modules/app/projects/ProjectStatus';

export default function ActiveProjectsPage() {
  const empty = <p className="text-sm font-medium text-gray-600">No active projects.</p>;

  return (
    <>
      <ProjectsPageHeader archived={false} />
      <Suspense fallback={<ProjectListSkeleton ssrOnly="Loading projects..." />}>
        <ProjectList empty={empty} itemClassName="pl-2" only={ProjectStatus.Active} />
      </Suspense>
    </>
  );
}
