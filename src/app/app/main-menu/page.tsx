import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { MainMenu } from '@/modules/app/shared/MainMenu';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

export default async function MainMenuDialogPage() {
  const { data: projects, errors } = await getAllProjects();

  if (errors) return <ErrorList errors={errors} />;

  return (
    <Dialog defaultOpen noCloseButton routerActionsOnClose={{ type: RouterActionType.Back }}>
      <MainMenu projects={projects || []} />
    </Dialog>
  );
}
