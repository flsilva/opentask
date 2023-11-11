'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';
import { DropdownMenu } from '@/modules/shared/controls/dropdown/DropdownMenu';
import { MoreHorizontalIcon } from '@/modules/shared/icons/MoreHorizontalIcon';
import { ArchiveIcon } from '@/modules/shared/icons/ArchiveIcon';
import { DeleteIcon } from '@/modules/shared/icons/DeleteIcon';
import { EditIcon } from '@/modules/shared/icons/EditIcon';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { UnarchiveIcon } from '@/modules/shared/icons/UnarchiveIcon';
import { ArchiveProjectAlertDialog } from './ArchiveProjectAlertDialog';
import { DeleteProjectAlertDialog } from './DeleteProjectAlertDialog';
import { ProjectDto } from './ProjectsRepository';

export enum ProjectMutationAction {
  Archive = 'Archive',
  Edit = 'Edit',
  Delete = 'Delete',
  Unarchive = 'Unarchive',
}

interface ProjectMutationDropdownItem {
  readonly action: ProjectMutationAction;
  readonly icon: React.ReactNode;
  readonly label: string;
}

const menuItems: Array<ProjectMutationDropdownItem> = [
  {
    action: ProjectMutationAction.Edit,
    label: 'Edit project',
    icon: <EditIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectMutationAction.Archive,
    label: 'Archive project',
    icon: <ArchiveIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectMutationAction.Unarchive,
    label: 'Unarchive project',
    icon: <UnarchiveIcon className="mr-3 group-hover:fill-white" />,
  },
  {
    action: ProjectMutationAction.Delete,
    label: 'Delete project',
    icon: <DeleteIcon className="mr-3 group-hover:fill-white" />,
  },
];

export interface ProjectMutationDropdownProps {
  readonly project: ProjectDto;
}

export const ProjectMutationDropdown = ({ project }: ProjectMutationDropdownProps) => {
  const router = useRouter();
  const [mutationAlertDialog, setAlertDialog] = useState<React.ReactNode | null>(null);

  const onCloseMutationDialog = () => {
    setAlertDialog(null);
  };

  const onArchiveUnarchiveFormSubmitted = (
    response: ServerResponse<ProjectDto | undefined> | undefined,
  ) => {
    if (!response || response.errors) return;

    onCloseMutationDialog();

    // router.refresh() is necessary to refetch and rerender mutated data.
    router.refresh();
  };

  const onDeleteFormSubmitted = (response: ServerResponse<ProjectDto | undefined> | undefined) => {
    if (!response || response.errors) return;

    router.push('/app/today');
    onCloseMutationDialog();

    // router.refresh() is necessary to refetch and rerender mutated data.
    router.refresh();
  };

  const onArchiveUnarchiveProject = (
    action: ProjectMutationAction.Archive | ProjectMutationAction.Unarchive,
    project: ProjectDto,
  ) => {
    setAlertDialog(
      <ArchiveProjectAlertDialog
        action={action}
        onOpenChange={(open: boolean) => {
          if (!open) onCloseMutationDialog();
        }}
        onFormSubmitted={onArchiveUnarchiveFormSubmitted}
        projectId={project.id}
        projectName={project.name}
      />,
    );
  };

  const onDeleteProject = (project: ProjectDto) => {
    setAlertDialog(
      <DeleteProjectAlertDialog
        onOpenChange={(open: boolean) => {
          if (!open) onCloseMutationDialog();
        }}
        onFormSubmitted={onDeleteFormSubmitted}
        projectId={project.id}
        projectName={project.name}
      />,
    );
  };

  const onProjectActionClick = async (action: ProjectMutationAction) => {
    switch (action) {
      case ProjectMutationAction.Archive:
        onArchiveUnarchiveProject(ProjectMutationAction.Archive, project);
        break;
      case ProjectMutationAction.Delete:
        onDeleteProject(project);
        break;
      case ProjectMutationAction.Edit:
        router.push(`/app/projects/${project.id}/edit`);
        break;
      case ProjectMutationAction.Unarchive:
        onArchiveUnarchiveProject(ProjectMutationAction.Unarchive, project);
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
          (item.action !== ProjectMutationAction.Archive || !project.isArchived) &&
          (item.action !== ProjectMutationAction.Edit || !project.isArchived) &&
          (item.action !== ProjectMutationAction.Unarchive || project.isArchived),
      )
      .map((item) => (
        <Menu.Item key={item.action} as={Fragment}>
          {({ active }: { active: boolean }) => (
            <button
              type="button"
              onClick={() => onProjectActionClick(item.action)}
              className={twJoin(
                'group flex w-full items-center rounded-md px-2 py-3 text-sm',
                active ? 'group bg-green-500 text-white' : 'text-gray-900',
              )}
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
          itemsClassName="absolute top-10 right-0 max-h-48 w-56"
          menuButton={
            <Menu.Button className="flex items-center justify-center">
              <MoreHorizontalIcon className=" hover:fill-green-500" />
            </Menu.Button>
          }
        />
      </div>
      {mutationAlertDialog && mutationAlertDialog}
    </>
  );
};
