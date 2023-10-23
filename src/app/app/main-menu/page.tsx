import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { MainMenuController } from '@/modules/app/shared/MainMenuController';

export default async function MainMenuPage() {
  const { data: projects, errors } = await getAllProjects();

  if (errors) return <ErrorList errors={errors} />;

  return <MainMenuController projects={projects || []} shouldRenderOnModal />;
}
