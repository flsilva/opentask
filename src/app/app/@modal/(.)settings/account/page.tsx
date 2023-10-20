import 'server-only';
import { SettingsApplication } from '@/modules/app/settings/SettingsApplication';

export default function SettingsAccountInterceptingPage() {
  return <SettingsApplication shouldRenderOnModal />;
}
