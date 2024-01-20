import 'server-only';
import { Dialog } from '@/features/shared/ui/dialog/Dialog';
import { MainMenu } from '@/features/app/shared/ui/MainMenu';
import { RouterActions } from '@/features/shared/routing/RouterActions';

export default function MainMenuDialogPage() {
  return (
    <Dialog defaultOpen noCloseButton routerActionOnClose={RouterActions.Back}>
      <MainMenu />
    </Dialog>
  );
}
