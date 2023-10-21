import 'server-only';
import { ProjectFormController } from '@/modules/app/projects/ProjectFormController';
import { getProjectById } from '@/modules/app/projects/ProjectsRepository';

interface EditProjectModalInterceptingPageProps {
  readonly params: { readonly projectId: string };
}

export default async function EditProjectModalInterceptingPage({
  params: { projectId },
}: EditProjectModalInterceptingPageProps) {
  const project = await getProjectById({ id: projectId });

  return <ProjectFormController project={project} shouldRenderOnModal />;
}
