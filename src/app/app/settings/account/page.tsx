import 'server-only';
import { AccountSettingsController } from '@/modules/app/settings/account/AccountSettingsController';

export default function SettingsAccountPage() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
      <AccountSettingsController />
    </div>
  );
}
