import 'server-only';
import { getAllProjects } from '@/modules/app/project/ProjectRepository';
import { AppNavModal } from '@/modules/app/shared/AppNavModal';

export default async function AppNavPage() {
  const projects = await getAllProjects();

  return <AppNavModal projects={projects} />;
}
