import 'server-only';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { MainMenu } from '@/modules/app/shared/main-menu/MainMenu';
import { RouterActions } from '@/modules/shared/router/RouterActions';

export default function MainMenuDialogPage() {
  return (
    <Dialog defaultOpen noCloseButton routerActionOnClose={RouterActions.Back}>
      <MainMenu />
    </Dialog>
  );
}
