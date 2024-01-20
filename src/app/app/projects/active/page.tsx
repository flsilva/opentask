import 'server-only';
import { Suspense } from 'react';
import { ProjectList } from '@/features/app/projects/ui/ProjectList';
import { ProjectListSkeleton } from '@/features/app/projects/ui/ProjectListSkeleton';
import { ProjectsPageHeader } from '@/features/app/projects/ui/ProjectsPageHeader';
import { ProjectStatus } from '@/features/app/projects/data-access/ProjectStatus';

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
