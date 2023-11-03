import 'server-only';
import { AccountSettings } from '@/modules/app/settings/account/AccountSettings';
import { Modal } from '@/modules/shared/modals/Modal';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

export default function SettingsAccountInterceptingPage() {
  return (
    <Modal defaultOpen title="Settings" routerActionsOnClose={{ type: RouterActionType.Back }}>
      <AccountSettings />
    </Modal>
  );
}
