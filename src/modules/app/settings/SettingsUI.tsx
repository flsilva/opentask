'use client';

import 'client-only';
import { buttonClassNameRed } from '@/modules/shared/controls/button/buttonClassName';

interface SettingsUIProps {
  readonly onDeleteAccount: () => void;
}

export const SettingsUI = ({ onDeleteAccount }: SettingsUIProps) => {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onDeleteAccount}
        className={`${buttonClassNameRed} mt-12 self-start`}
      >
        Delete account
      </button>
      <p className="mt-4 text-xs font-medium text-gray-600">
        You will immediately delete all your data, including your projects and tasks, by clicking
        the button above. You can&apos;t undo it.
      </p>
    </div>
  );
};
