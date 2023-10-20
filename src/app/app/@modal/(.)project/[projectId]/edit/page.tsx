import 'server-only';
import { ProjectFormApplication } from '@/modules/app/project/ProjectFormApplication';
import { getProjectById } from '@/modules/app/project/ProjectRepository';

interface EditProjectModalInterceptingPageProps {
  readonly params: { readonly projectId: string };
}

export default async function EditProjectModalInterceptingPage({
  params: { projectId },
}: EditProjectModalInterceptingPageProps) {
  const project = await getProjectById({ id: projectId });

  return <ProjectFormApplication project={project} shouldRenderOnModal />;
}
