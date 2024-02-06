import { AccountSettings } from '@/features/app/settings/account/ui/AccountSettings';

export default function AccountSettingsPage() {
  return (
    <div className="flex flex-col mt-10">
      <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
      <AccountSettings />
    </div>
  );
}
