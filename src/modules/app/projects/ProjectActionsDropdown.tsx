'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { DropdownMenu } from '@/modules/shared/controls/dropdown/DropdownMenu';
import { MoreHorizontalIcon } from '@/modules/shared/icons/MoreHorizontalIcon';
import { ArchiveIcon } from '@/modules/shared/icons/ArchiveIcon';
import { DeleteIcon } from '@/modules/shared/icons/DeleteIcon';
import { EditIcon } from '@/modules/shared/icons/EditIcon';
import { UnarchiveIcon } from '@/modules/shared/icons/UnarchiveIcon';
import {
  ConfirmationModal,
  ConfirmationModalProps,
} from '@/modules/shared/modals/ConfirmationModal';
import { FormAction } from '@/modules/app/shared/form/FormAction';
import { deleteProject, updateProject, ProjectDto } from './ProjectsRepository';

export enum ProjectAction {
  Archive = 'Archive',
  Edit = 'Edit',
  Delete = 'Delete',
  Unarchive = 'Unarchive',
}

export interface MenuItem {
  readonly action: ProjectAction;
  readonly icon: React.ReactNode;
  readonly label: string;
}

const menuItems: Array<MenuItem> = [
  {
    action: ProjectAction.Edit,
    label: 'Edit project',
    icon: <EditIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectAction.Archive,
    label: 'Archive project',
    icon: <ArchiveIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectAction.Unarchive,
    label: 'Unarchive project',
    icon: <UnarchiveIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectAction.Delete,
    label: 'Delete project',
    icon: <DeleteIcon className="mr-3 group-hover:fill-white" />,
  },
];

export interface ProjectActionsDropdownProps {
  readonly project: ProjectDto;
}

export const ProjectActionsDropdown = ({ project }: ProjectActionsDropdownProps) => {
  const router = useRouter();
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(null);
  };

  const onArchiveProject = (project: ProjectDto) => {
    setConfirmationModalProps({
      confirmButtonLabel: 'Archive',
      confirmButtonLabelSubmitting: 'Archiving...',
      modalBodyWrapper: (children: React.ReactNode) => (
        <FormAction
          action={updateProject}
          onFormSubmitted={() => {
            onCloseConfirmationModal();
            // router.refresh() is necessary to refetch and rerender mutated data.
            router.refresh();
          }}
        >
          <input type="hidden" name="id" value={project.id} />
          <input type="hidden" name="isArchived" value="on" />
          {children}
        </FormAction>
      ),
      modalCopy: (
        <span>
          Are you sure you want to archive <span className="font-semibold">{project.name}</span>?
        </span>
      ),
      modalTitle: 'Archive Project',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: 'submit',
      open: true,
    });
  };

  const onUnarchiveProject = (project: ProjectDto) => {
    setConfirmationModalProps({
      confirmButtonLabel: 'Unarchive',
      confirmButtonLabelSubmitting: 'unarchiving...',
      modalBodyWrapper: (children: React.ReactNode) => (
        <FormAction
          action={updateProject}
          onFormSubmitted={() => {
            onCloseConfirmationModal();
            // router.refresh() is necessary to refetch and rerender mutated data.
            router.refresh();
          }}
        >
          <input type="hidden" name="id" value={project.id} />
          <input type="hidden" name="isArchived" value="off" />
          {children}
        </FormAction>
      ),
      modalCopy: (
        <span>
          Are you sure you want to unarchive <span className="font-semibold">{project.name}</span>?
        </span>
      ),
      modalTitle: 'Unarchive Project',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: 'submit',
      open: true,
    });
  };

  const onDeleteProject = (project: ProjectDto) => {
    setConfirmationModalProps({
      confirmButtonLabel: 'Delete',
      confirmButtonLabelSubmitting: 'Deleting...',
      modalBodyWrapper: (children: React.ReactNode) => (
        <FormAction
          action={deleteProject}
          onFormSubmitted={() => {
            router.push('/app/today');
            onCloseConfirmationModal();
            // router.refresh() is necessary to refetch and rerender mutated data.
            router.refresh();
          }}
        >
          <input type="hidden" name="id" value={project.id} />
          {children}
        </FormAction>
      ),
      modalCopy: (
        <span>
          Are you sure you want to delete <span className="font-semibold">{project.name}</span>?
        </span>
      ),
      modalTitle: 'Delete Project',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: 'submit',
      open: true,
    });
  };

  const onProjectActionClick = async (action: ProjectAction) => {
    switch (action) {
      case ProjectAction.Archive:
        onArchiveProject(project);
        break;
      case ProjectAction.Delete:
        onDeleteProject(project);
        break;
      case ProjectAction.Edit:
        router.push(`/app/projects/${project.id}/edit`);
        break;
      case ProjectAction.Unarchive:
        onUnarchiveProject(project);
        break;
      /*
       * Unhandled action error
       */
      default:
        throw new Error(`Unhandled ProjectAction: ${action}`);
    }
  };

  const getDropdownItems = () =>
    menuItems
      .filter(
        (item) =>
          (item.action !== ProjectAction.Archive || !project.isArchived) &&
          (item.action !== ProjectAction.Edit || !project.isArchived) &&
          (item.action !== ProjectAction.Unarchive || project.isArchived),
      )
      .map((item) => (
        <Menu.Item key={item.action} as={Fragment}>
          {({ active }: { active: boolean }) => (
            <button
              type="button"
              onClick={() => onProjectActionClick(item.action)}
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

  return (
    <>
      <div className="relative [&>div]:flex">
        <DropdownMenu
          items={getDropdownItems()}
          itemsClassName="absolute top-10 right-0 max-h-80 w-56"
          menuButton={
            <Menu.Button className="flex items-center justify-center">
              <MoreHorizontalIcon className=" hover:fill-green-500" />
            </Menu.Button>
          }
        />
      </div>
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </>
  );
};
