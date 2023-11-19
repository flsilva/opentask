import 'server-only';
import { Suspense } from 'react';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { ProjectFormSkeleton } from '@/modules/app/projects/ProjectFormSkeleton';

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
