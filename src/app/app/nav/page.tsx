import 'server-only';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';
import { MainMenuModalApplication } from '@/modules/app/shared/MainMenuModalApplication';

export default async function MainMenuPage() {
  const projects = await getAllProjects();

  return <MainMenuModalApplication projects={projects} />;
}
