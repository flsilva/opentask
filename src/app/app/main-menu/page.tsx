import 'server-only';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { MainMenu } from '@/modules/app/shared/main-menu/MainMenu';
import { RouterActions } from '@/modules/shared/router/RouterActions';

export default function MainMenuPage() {
  return <MainMenu className="mt-8" />;
}
