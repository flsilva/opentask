import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { MainMenu } from '@/modules/app/shared/MainMenu';

export default async function MainMenuPage() {
  const { data: projects, errors } = await getAllProjects();

  if (errors) return <ErrorList errors={errors} />;

  return <MainMenu projects={projects || []} renderOnModal />;
}
