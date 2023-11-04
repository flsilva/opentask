import 'server-only';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { MainMenu } from '@/modules/app/shared/MainMenu';
import { RouterActionType } from '@/modules/shared/router/RouterActions';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';

export default async function MainMenuDialogPage() {
  const { data: projects, errors } = await getAllProjects();

  if (errors) return <ErrorList errors={errors} />;

  return (
    <Dialog defaultOpen noCloseButton routerActionsOnClose={{ type: RouterActionType.Back }}>
      <MainMenu projects={projects || []} />
    </Dialog>
  );
}
