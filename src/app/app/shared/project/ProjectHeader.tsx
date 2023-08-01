'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import DropdownMenu from '@/app/shared/ui/dropdown/DropdownMenu';
import { MoreHorizontalIcon } from '@/app/shared/ui/icon/MoreHorizontalIcon';
import { ArchiveIcon } from '@/app/shared/ui/icon/ArchiveIcon';
import { DeleteIcon } from '@/app/shared/ui/icon/DeleteIcon';
import { EditIcon } from '@/app/shared/ui/icon/EditIcon';
import { UnarchiveIcon } from '@/app/shared/ui/icon/UnarchiveIcon';
import { ConfirmationModal, ConfirmationModalProps } from '@/app/app/shared/ui/ConfirmationModal';
import { deleteProject, updateProject } from '@/app/app/shared/project/project-model';
import { CreateProjectData, UpdateProjectData } from '@/app/app/shared/project/ProjectData';
import { ProjectData } from './ProjectData';
import ProjectModal from './ProjectModal';

export enum ProjectAction {
  Archive = 'Archive',
  Edit = 'Edit',
  Delete = 'Delete',
  Unarchive = 'Unarchive',
}

interface ProjectHeaderProps {
  readonly project: ProjectData | null;
}

interface MenuItem {
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

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  console.log('ProjectHeader() - project: ', project);

  const router = useRouter();
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);

  const onCloseProjectModal = () => {
    console.log('ProjectHeader().onCloseProjectModal()');
    setShowProjectModal(false);
  };

  const onCloseConfirmationModal = () => {
    console.log('ProjectHeader().confirmationModalCancelHandler()');
    setConfirmationModalProps(null);
  };

  const onCreateProject = (data: CreateProjectData) => {
    throw new Error('This operation should be handler by a different component.');
  };

  const onUpdateProject = async (data: UpdateProjectData) => {
    console.log('ProjectHeader().onUpdateProject() - data: ', data);

    const project = await updateProject(data);
    onCloseProjectModal();
    /*
     * This is necessary to refetch and rerender the updated data.
     */
    router.refresh();
    /**/
  };

  const archiveUnarchiveProjectHandler = (project: ProjectData, archive: boolean) => {
    console.log('ProjectHeader().updateProjectHandler()');
    return updateProject({ id: project.id, name: project.name, isArchived: archive });
  };

  const deleteProjectHandler = async (project: ProjectData) => {
    console.log('ProjectHeader().deleteProjectHandler()');
    await deleteProject(project.id);
    setConfirmationModalProps(null);
    router.push('/app/today');
    /*
     * This is necessary to refetch and rerender the updated data.
     */
    router.refresh();
    /**/
  };

  const onProjectActionClick = async (action: ProjectAction) => {
    console.log(`ProjectHeader().onProjectActionHandler() - action: ${action}`);
    switch (action) {
      /*
       * Archive Project
       */
      case ProjectAction.Archive:
        console.log('ProjectHeader().onProjectActionHandler() - Archive project');
        if (project === null || project === undefined) return;
        setConfirmationModalProps({
          confirmButtonLabel: 'Archive',
          modalCopy: (
            <span>
              Are you sure you want to archive <span className="font-semibold">{project.name}</span>
              ?
            </span>
          ),
          modalTitle: 'Archive Project',
          onCancelHandler: onCloseConfirmationModal,
          onConfirmHandler: async () => {
            await archiveUnarchiveProjectHandler(project, true);
            setConfirmationModalProps(null);
            router.push('/app/today');
            /*
             * This is necessary to refetch and rerender the updated data.
             */
            router.refresh();
            /**/
          },
          open: true,
        });
        break;
      /*
       * Delete Project
       */
      case ProjectAction.Delete:
        console.log('ProjectHeader().onProjectActionHandler() - Delete project');
        if (project === null || project === undefined) return;
        setConfirmationModalProps({
          confirmButtonLabel: 'Delete',
          modalCopy: (
            <span>
              Are you sure you want to delete <span className="font-semibold">{project.name}</span>?
            </span>
          ),
          modalTitle: 'Delete Project',
          onCancelHandler: onCloseConfirmationModal,
          onConfirmHandler: () => deleteProjectHandler(project),
          open: true,
        });
        break;
      /*
       * Edit Project
       */
      case ProjectAction.Edit:
        console.log('ProjectHeader().onProjectActionHandler() - Edit project');
        setShowProjectModal(true);
        break;
      /*
       * Unarchive Project
       */
      case ProjectAction.Unarchive:
        console.log('ProjectHeader().onProjectActionHandler() - Unarchive project');
        if (project === null || project === undefined) return;
        await archiveUnarchiveProjectHandler(project, false);
        /*
         * This is necessary to refetch and rerender the updated data.
         */
        router.refresh();
        /**/
        break;
      /*
       * Unhandled action error
       */
      default:
        throw new Error(
          `ProjectHeader().onProjectActionHandler() - Unhandled ProjectAction: ${action}`,
        );
    }
  };

  const getDropdownItems = () =>
    menuItems
      .filter(
        (item) =>
          project &&
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
      <div className="flex flex-col pb-8">
        <div className="sticky top-0 flex w-full justify-between bg-white py-8">
          <h1 className="text-lg font-semibold text-gray-800">{project?.name ?? ''}</h1>
          <div className="relative ml-0 h-12">
            <DropdownMenu
              items={getDropdownItems()}
              itemsClassName="absolute top-10 right-0 max-h-80 w-56"
              menuButton={
                <Menu.Button className="flex items-center justify-center focus-visible:outline  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                  <MoreHorizontalIcon className=" hover:fill-green-500" />
                </Menu.Button>
              }
            />
          </div>
        </div>
        <p className="block whitespace-pre-line text-sm">{project?.description || ''}</p>
        {project && project.isArchived && (
          <p className="mt-2 block whitespace-pre-line text-sm">This project is archived.</p>
        )}
        <div className="mb-8" />
      </div>
      <ProjectModal
        open={showProjectModal}
        onCloseHandler={onCloseProjectModal}
        onCreateProject={onCreateProject}
        onUpdateProject={onUpdateProject}
        project={project}
      />
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </>
  );
}
