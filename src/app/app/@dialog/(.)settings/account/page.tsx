import 'server-only';
import { Dialog } from '@/features/shared/ui/dialog/Dialog';
import { RouterActions } from '@/features/shared/routing/RouterActions';
import { AccountSettings } from '@/features/app/settings/account/ui/AccountSettings';

export default function AccountSettingsDialogPage() {
  return (
    <Dialog defaultOpen title="Settings" routerActionOnClose={RouterActions.Back}>
      <AccountSettings />
    </Dialog>
  );
}
