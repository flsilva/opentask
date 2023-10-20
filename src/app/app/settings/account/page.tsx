import 'server-only';
import { SettingsApplication } from '@/modules/app/settings/SettingsApplication';

export default function SettingsAccountPage() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
      <SettingsApplication />
    </div>
  );
}
