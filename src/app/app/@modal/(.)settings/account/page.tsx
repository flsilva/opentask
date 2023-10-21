import 'server-only';
import { AccountSettingsController } from '@/modules/app/settings/account/AccountSettingsController';

export default function SettingsAccountInterceptingPage() {
  return <AccountSettingsController shouldRenderOnModal />;
}
