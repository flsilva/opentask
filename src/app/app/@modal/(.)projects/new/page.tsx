import 'server-only';
import { ProjectForm } from '@/modules/app/projects/ProjectForm';
import { Modal } from '@/modules/shared/modals/Modal';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

export default function NewProjectModalInterceptingPage() {
  return (
    <Modal
      defaultOpen
      title="Create project"
      routerActionsOnClose={{ type: RouterActionType.Back }}
    >
      <ProjectForm className="mt-6" />
    </Modal>
  );
}
