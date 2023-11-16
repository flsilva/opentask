import 'server-only';
import { notFound } from 'next/navigation';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { getProjectById } from '@/modules/app/projects/ProjectsRepository';

interface EditProjectDialogPageProps {
  readonly params: { readonly projectId: string };
}

export default async function EditProjectDialogPage({
  params: { projectId },
}: EditProjectDialogPageProps) {
  const { data: project, errors } = await getProjectById({ id: projectId });

  if (errors) return <ErrorList errors={errors} />;
  if (!project) notFound();

  return (
    <Dialog defaultOpen title="Edit project" routerActionOnClose={RouterActions.Back}>
      <ProjectForm className="mt-6" project={project} />
    </Dialog>
  );
}
