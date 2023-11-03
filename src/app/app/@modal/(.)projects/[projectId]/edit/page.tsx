import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { Modal } from '@/modules/shared/modals/Modal';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

interface EditProjectModalInterceptingPageProps {
  readonly params: { readonly projectId: string };
}

export default async function EditProjectModalInterceptingPage({
  params: { projectId },
}: EditProjectModalInterceptingPageProps) {
  const { data: project, errors } = await getProjectById({ id: projectId });

  if (errors) return <ErrorList errors={errors} />;

  if (!project) {
    return (
      <p className="text-sm my-20">We couldn&apos;t find that Project. Maybe it got deleted?</p>
    );
  }

  return (
    <Modal defaultOpen title="Edit project" routerActionsOnClose={{ type: RouterActionType.Back }}>
      <ProjectForm className="mt-6" project={project} />
    </Modal>
  );
}
