'use client';

import 'client-only';
import { useState } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';

interface SwitchProps {
  readonly enabled?: boolean;
  readonly onClick: (enabled: boolean) => void;
}

export const Switch = ({ enabled = false, onClick }: SwitchProps) => {
  const [_enabled, setEnabled] = useState(enabled);

  const onSwitchClick = (__enabled: boolean) => {
    setEnabled(__enabled);
    onClick(__enabled);
  };

  return (
    <HeadlessSwitch
      checked={_enabled}
      onChange={onSwitchClick}
      className={`${
        _enabled ? 'bg-green-700' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Toggle between active and archived projects</span>
      <span
        className={`${
          _enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </HeadlessSwitch>
  );
};
