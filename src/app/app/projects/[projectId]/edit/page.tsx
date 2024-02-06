import { Suspense } from 'react';
import { ProjectForm } from '@/features/app/projects/ui/ProjectForm';
import { ProjectFormSkeleton } from '@/features/app/projects/ui/ProjectFormSkeleton';

interface EditProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default function EditProjectPage({ params: { projectId } }: EditProjectPageProps) {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-xl text-gray-800">Edit project</h1>
      <Suspense fallback={<ProjectFormSkeleton className="mt-6" ssrOnly="Loading project..." />}>
        <ProjectForm className="mt-6" projectId={projectId} />
      </Suspense>
    </div>
  );
}
