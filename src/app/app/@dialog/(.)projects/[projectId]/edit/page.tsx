import { Suspense } from 'react';
import { Dialog } from '@/features/shared/ui/dialog/Dialog';
import { RouterActions } from '@/features/shared/routing/RouterActions';
import { ProjectForm } from '@/features/app/projects/ui/ProjectForm';
import { ProjectFormSkeleton } from '@/features/app/projects/ui/ProjectFormSkeleton';

interface EditProjectDialogPageProps {
  readonly params: { readonly projectId: string };
}

export default function EditProjectDialogPage({
  params: { projectId },
}: EditProjectDialogPageProps) {
  return (
    <Dialog defaultOpen title="Edit project" routerActionOnClose={RouterActions.Back}>
      <Suspense fallback={<ProjectFormSkeleton className="mt-6" ssrOnly="Loading project..." />}>
        <ProjectForm className="mt-6" projectId={projectId} />
      </Suspense>
    </Dialog>
  );
}
