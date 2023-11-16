import 'server-only';
import { Suspense } from 'react';
import { ProjectList } from '@/modules/app/projects/ProjectList';
import { ProjectListSkeleton } from '@/modules/app/projects/ProjectListSkeleton';
import { ProjectsPageHeader } from '@/modules/app/projects/ProjectsPageHeader';
import { ProjectStatus } from '@/modules/app/projects/ProjectStatus';

export default function ActiveProjectsPage() {
  return (
    <>
      <ProjectsPageHeader archived={false} />
      <Suspense fallback={<ProjectListSkeleton className="max-w-[20rem]" />}>
        <ProjectList itemClassName="pl-2" only={ProjectStatus.Active} />
      </Suspense>
    </>
  );
}
