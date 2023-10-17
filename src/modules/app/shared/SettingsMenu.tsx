'use client';

import { Fragment, useContext, useState } from 'react';
import { Menu } from '@headlessui/react';
import { SettingsModal } from '@/modules/app/settings/SettingsModal';
import { DropdownMenu } from '@/modules/shared/controls/dropdown/DropdownMenu';
import { PersonIcon } from '@/modules/shared/icon/PersonIcon';
import { SettingsIcon } from '@/modules/shared/icon/SettingsIcon';
import { LogoutIcon } from '@/modules/shared/icon/LogoutIcon';
import { UserContext } from '@/modules/app/user/UserProvider';
import { deleteUserAccount, signOut } from '@/modules/app/user/UserRepository';
import { ConfirmationModal, ConfirmationModalProps } from './ConfirmationModal';

enum SettingsMenuAction {
  Settings = 'Settings',
  Logout = 'Logout',
}

interface SettingsMenuItem {
  readonly action: SettingsMenuAction;
  readonly icon: React.ReactNode;
  readonly label: string;
}

const settingsMenuItems: Array<SettingsMenuItem> = [
  {
    action: SettingsMenuAction.Settings,
    label: 'Settings',
    icon: <SettingsIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: SettingsMenuAction.Logout,
    label: 'Log out',
    icon: <LogoutIcon className="mr-3 group-hover:fill-white" />,
  },
];

export const SettingsMenu = () => {
  const user = useContext(UserContext);
  const [isShowingSettingsModal, setIsShowingSettingsModal] = useState(false);
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);

  const onCloseSettingsModal = () => {
    if (confirmationModalProps) return;
    setIsShowingSettingsModal(false);
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(null);
  };

  const onDeleteAccount = () => {
    setConfirmationModalProps({
      confirmButtonLabel: 'Delete',
      modalCopy: (
        <span>Are you sure you want to delete you account and all data associated to it?</span>
      ),
      modalTitle: 'Delete Task',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: async () => {
        deleteUserAccount();
      },
      open: true,
    });
  };

  const onSettingsMenuActionClick = async (action: SettingsMenuAction) => {
    switch (action) {
      case SettingsMenuAction.Logout:
        signOut();
        break;
      case SettingsMenuAction.Settings:
        setIsShowingSettingsModal(true);
        break;
      default:
        throw new Error(
          'AppHeader().onSettingsActionClick() - SettingsAction not handled: ',
          action,
        );
    }
  };

  const getMenuItems = () => {
    const items = settingsMenuItems.map((item) => (
      <Menu.Item key={item.action} as={Fragment}>
        {({ active }: { active: boolean }) => (
          <button
            type="button"
            onClick={() => onSettingsMenuActionClick(item.action)}
            className={`${
              active ? 'group bg-green-500 text-white' : 'text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-3 text-sm`}
          >
            <div className="flex items-center">
              {item.icon}
              {item.label}
            </div>
          </button>
        )}
      </Menu.Item>
    ));
    items.unshift(
      <p key="user" className="truncate p-2 text-sm">
        Hello, {user.name}
      </p>,
    );
    return items;
  };

  return (
    <div className="flex">
      <DropdownMenu
        items={getMenuItems()}
        itemsClassName="absolute top-8 right-0 max-h-80 w-56 z-10"
        menuButton={
          <Menu.Button className="flex items-center justify-center outline-none">
            <PersonIcon className="fill-white hover:fill-green-500" />
          </Menu.Button>
        }
      />
      <SettingsModal
        open={isShowingSettingsModal}
        onCloseModal={onCloseSettingsModal}
        onDeleteAccount={onDeleteAccount}
      />
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </div>
  );
};
