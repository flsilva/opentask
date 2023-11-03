import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { MainMenu } from '@/modules/app/shared/MainMenu';
import { Modal } from '@/modules/shared/modals/Modal';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

export default async function MainMenuPage() {
  const { data: projects, errors } = await getAllProjects();

  if (errors) return <ErrorList errors={errors} />;

  return (
    <Modal defaultOpen noCloseButton routerActionsOnClose={{ type: RouterActionType.Back }}>
      <MainMenu projects={projects || []} />
    </Modal>
  );
}
