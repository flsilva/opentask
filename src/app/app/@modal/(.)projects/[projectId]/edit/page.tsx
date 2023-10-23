import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { getProjectById } from '@/modules/app/projects/ProjectsRepository';

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

  return <ProjectForm project={project} renderOnModal />;
}
