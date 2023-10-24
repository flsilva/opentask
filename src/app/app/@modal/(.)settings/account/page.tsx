import 'server-only';
import { AccountSettings } from '@/modules/app/settings/account/AccountSettings';

export default function SettingsAccountInterceptingPage() {
  return <AccountSettings renderOnModal />;
}
