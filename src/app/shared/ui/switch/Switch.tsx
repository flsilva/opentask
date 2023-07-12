'use client';

import 'client-only';
import { useState } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchProps {
  readonly onClick: (enabled: boolean) => void;
}

export const Switch = ({ onClick }: SwitchProps) => {
  const [enabled, setEnabled] = useState(true);

  const onSwitchClick = (enabled: boolean) => {
    setEnabled(enabled);
    onClick(enabled);
  };

  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={onSwitchClick}
      className={`${
        enabled ? 'bg-green-700' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Toggle between active and archived projects</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  );
};
