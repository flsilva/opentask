import 'server-only';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { MainMenuApplication } from '@/modules/app/shared/MainMenuApplication';

export default async function MainMenuPage() {
  const projects = await getAllProjects();

  return <MainMenuApplication projects={projects} shouldRenderOnModal />;
}
