import 'server-only';
import { AccountSettings } from '@/modules/app/settings/account/AccountSettings';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

export default function SettingsAccountInterceptingPage() {
  return (
    <Dialog defaultOpen title="Settings" routerActionsOnClose={{ type: RouterActionType.Back }}>
      <AccountSettings />
    </Dialog>
  );
}
