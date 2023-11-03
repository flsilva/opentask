'use client';

import 'client-only';
import { ConfirmationModal } from '@/modules/shared/modals/ConfirmationModal';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { FormAction } from '@/modules/app/shared/form/FormAction';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { updateProject, ProjectDto } from './ProjectsRepository';
import { ProjectMutationAction } from './ProjectMutationDropdown';

export interface ArchiveProjectModalProps {
  readonly action: ProjectMutationAction.Archive | ProjectMutationAction.Unarchive;
  readonly onFormSubmitted: (response: ServerResponse<ProjectDto | undefined> | undefined) => void;
  readonly onOpenChange: (open: boolean) => void;
  readonly projectId: string;
  readonly projectName: string;
}

export const ArchiveProjectModal = ({
  action,
  onFormSubmitted,
  onOpenChange,
  projectId,
  projectName,
}: ArchiveProjectModalProps) => {
  return (
    <ConfirmationModal
      defaultOpen
      confirmButtonLabel={action}
      confirmButtonLabelSubmitting={action === 'Archive' ? 'Archiving...' : 'Unarchiving...'}
      renderBodyWrapper={(children: React.ReactNode) => (
        <FormAction action={updateProject} onFormSubmitted={onFormSubmitted}>
          {({ response }) => (
            <>
              <input type="hidden" name="id" value={projectId} />
              <input type="hidden" name="isArchived" value={action === 'Archive' ? 'on' : 'off'} />
              {children}
              {response && response.errors && <ErrorList errors={response.errors} />}
            </>
          )}
        </FormAction>
      )}
      modalCopy={
        <span>
          Are you sure you want to {action.toLowerCase()}{' '}
          <span className="font-semibold">{projectName}</span>?
        </span>
      }
      modalTitle={`${action} Project`}
      onConfirmHandler="submit"
      onOpenChange={onOpenChange}
    />
  );
};
