'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';
import { DropdownMenu } from '@/modules/shared/control/dropdown/DropdownMenu';
import { MoreHorizontalIcon } from '@/modules/shared/icon/MoreHorizontalIcon';
import { ArchiveIcon } from '@/modules/shared/icon/ArchiveIcon';
import { DeleteIcon } from '@/modules/shared/icon/DeleteIcon';
import { EditIcon } from '@/modules/shared/icon/EditIcon';
import { UnarchiveIcon } from '@/modules/shared/icon/UnarchiveIcon';
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
  const [alertDialog, setAlertDialog] = useState<React.ReactNode | null>(null);

  /*
   * When the updateProject() Server Action redirect() on a successful mutation,
   * we need to close this dialog. When I tried to do this on a onFormSubmitted() passed to <Form>,
   * I got the React' "bad setState()" error printed below, so I came up with this
   * solution that works but doesn't feel good. I'd love to solve this in a better way.
   *
   * I don't want to add a route for each action, e.g., /app/projects/[projectId]/archive, etc.
   * That doesn't feel good either, and what if we don't want to show a confirmation dialog?
   * We'd have to deal with this issue anyway.
   *
   * Warning: Cannot update a component (`ProjectMutationDropdown`) while rendering
   * a different component (`Form`). To locate the bad setState() call inside `Form`,
   * follow the stack trace as described in https://reactjs.org/link/setstate-in-render
   */
  const [_project, _setProject] = useState<ProjectDto>(project);
  if (_project && _project !== project) {
    _setProject(project);
    setAlertDialog(null);
  }
  /**/

  const onCloseMutationDialog = () => {
    setAlertDialog(null);
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
          (item.action !== ProjectMutationAction.Archive || !project.archivedAt) &&
          (item.action !== ProjectMutationAction.Edit || !project.archivedAt) &&
          (item.action !== ProjectMutationAction.Unarchive || project.archivedAt),
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
          itemsClassName="absolute top-10 right-0 max-h-48 w-56"
          menuButton={
            <Menu.Button className="flex items-center justify-center">
              <MoreHorizontalIcon className=" hover:fill-green-500" />
            </Menu.Button>
          }
        >
          {getDropdownItems()}
        </DropdownMenu>
      </div>
      {alertDialog}
    </>
  );
};
