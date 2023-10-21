import 'server-only';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { MainMenuController } from '@/modules/app/shared/MainMenuController';

export default async function MainMenuPage() {
  const projects = await getAllProjects();

  return <MainMenuController projects={projects} shouldRenderOnModal />;
}
