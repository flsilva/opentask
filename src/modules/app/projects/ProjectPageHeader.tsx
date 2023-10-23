'use client';

import 'client-only';
import { Fragment, useState } from 'react';
import { experimental_useFormState as useFormState } from 'react-dom';
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
import { deleteProject, updateProject, ProjectDto } from './ProjectsRepository';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ServerResponse } from '../shared/errors/ServerResponse';

export enum ProjectAction {
  Archive = 'Archive',
  Edit = 'Edit',
  Delete = 'Delete',
  Unarchive = 'Unarchive',
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

interface UpdateProjectFormProps extends ChildrenProps {
  readonly formAction: (
    prevState: any,
    formData: FormData,
  ) => Promise<ServerResponse<ProjectDto | undefined>>;
  readonly onFormSubmitSuceeded: (updatedProject: ProjectDto) => void;
  readonly projectId: string;
}

const UpdateProjectForm = ({
  children,
  formAction,
  onFormSubmitSuceeded,
  projectId,
}: UpdateProjectFormProps) => {
  const router = useRouter();
  const [isServerResponseHandled, setIsServerResponseHandled] = useState(false);
  const [serverResponse, _formAction] = useFormState(formAction, null);

  if (!isServerResponseHandled && !serverResponse?.errors && serverResponse?.data?.id) {
    setIsServerResponseHandled(true);
    onFormSubmitSuceeded(serverResponse.data);
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  }
  return (
    <form action={_formAction}>
      <input type="hidden" name="id" value={projectId} />
      {children}
      {serverResponse?.errors && (
        <div className="flex flex-col">
          <ErrorList errors={serverResponse.errors} />
        </div>
      )}
    </form>
  );
};

export interface ProjectPageHeaderProps {
  readonly project: ProjectDto;
}

export const ProjectPageHeader = ({ project }: ProjectPageHeaderProps) => {
  const router = useRouter();
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(null);
  };

  const onProjectActionClick = async (action: ProjectAction) => {
    switch (action) {
      /*
       * Archive Project
       */
      case ProjectAction.Archive:
        setConfirmationModalProps({
          confirmButtonLabel: 'Archive',
          confirmButtonLabelSubmitting: 'Archiving...',
          modalBodyWrapper: (children: React.ReactNode) => (
            <UpdateProjectForm
              formAction={updateProject}
              onFormSubmitSuceeded={onCloseConfirmationModal}
              projectId={project.id}
            >
              <input type="hidden" name="isArchived" value="on" />
              {children}
            </UpdateProjectForm>
          ),
          modalCopy: (
            <span>
              Are you sure you want to archive <span className="font-semibold">{project.name}</span>
              ?
            </span>
          ),
          modalTitle: 'Archive Project',
          onCancelHandler: onCloseConfirmationModal,
          onConfirmHandler: 'submit',
          open: true,
        });
        break;
      /*
       * Delete Project
       */
      case ProjectAction.Delete:
        setConfirmationModalProps({
          confirmButtonLabel: 'Delete',
          confirmButtonLabelSubmitting: 'Deleting...',
          modalBodyWrapper: (children: React.ReactNode) => (
            <UpdateProjectForm
              formAction={deleteProject}
              onFormSubmitSuceeded={() => {
                router.push('/app/today');
                onCloseConfirmationModal();
              }}
              projectId={project.id}
            >
              {children}
            </UpdateProjectForm>
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
        break;
      /*
       * Edit Project
       */
      case ProjectAction.Edit:
        router.push(`/app/projects/${project.id}/edit`);
        break;
      /*
       * Unarchive Project
       */
      case ProjectAction.Unarchive:
        setConfirmationModalProps({
          confirmButtonLabel: 'Unarchive',
          confirmButtonLabelSubmitting: 'unarchiving...',
          modalBodyWrapper: (children: React.ReactNode) => (
            <UpdateProjectForm
              formAction={updateProject}
              onFormSubmitSuceeded={onCloseConfirmationModal}
              projectId={project.id}
            >
              <input type="hidden" name="isArchived" value="off" />
              {children}
            </UpdateProjectForm>
          ),
          modalCopy: (
            <span>
              Are you sure you want to unarchive{' '}
              <span className="font-semibold">{project.name}</span>?
            </span>
          ),
          modalTitle: 'Unarchive Project',
          onCancelHandler: onCloseConfirmationModal,
          onConfirmHandler: 'submit',
          open: true,
        });
        break;
      /*
       * Unhandled action error
       */
      default:
        throw new Error(
          `ProjectPageHeaderUI().onProjectActionHandler() - Unhandled ProjectAction: ${action}`,
        );
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
      <div className="flex flex-col">
        <div className="sticky top-0 flex w-full justify-between bg-white py-8">
          <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
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
        </div>
        {project.description && (
          <p className="block whitespace-pre-line text-sm mb-8">{project.description}</p>
        )}
        {project.isArchived && (
          <p className="mt-2 block whitespace-pre-line text-sm mb-8">This project is archived.</p>
        )}
      </div>
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </>
  );
};
