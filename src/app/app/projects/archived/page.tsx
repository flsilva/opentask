import 'server-only';
import { Suspense } from 'react';
import { ProjectList } from '@/features/app/projects/ui/ProjectList';
import { ProjectListSkeleton } from '@/features/app/projects/ui/ProjectListSkeleton';
import { ProjectsPageHeader } from '@/features/app/projects/ui/ProjectsPageHeader';

export default function ArchivedProjectsPage() {
  const empty = <p className="text-sm font-medium text-gray-600">No archived projects.</p>;

  return (
    <>
      <ProjectsPageHeader archived={true} />
      <Suspense fallback={<ProjectListSkeleton ssrOnly="Loading projects..." />}>
        <ProjectList empty={empty} itemClassName="pl-2" only="archived" />
      </Suspense>
    </>
  );
}
