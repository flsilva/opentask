import 'server-only';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { RouterActions } from '@/modules/shared/router/RouterActions';
import { AccountSettings } from '@/modules/app/settings/account/AccountSettings';

export default function SettingsAccountInterceptingPage() {
  return (
    <Dialog defaultOpen title="Settings" routerActionOnClose={RouterActions.Back}>
      <AccountSettings />
    </Dialog>
  );
}
