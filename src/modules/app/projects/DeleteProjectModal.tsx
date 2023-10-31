'use client';

import 'client-only';
import { ConfirmationModal } from '@/modules/shared/modals/ConfirmationModal';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { FormAction } from '@/modules/app/shared/form/FormAction';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { deleteProject, ProjectDto } from './ProjectsRepository';

export interface DeleteProjectModalProps {
  readonly onClose: () => void;
  readonly onFormSubmitted: (response: ServerResponse<ProjectDto | undefined> | undefined) => void;
  readonly projectId: string;
  readonly projectName: string;
}

export const DeleteProjectModal = ({
  onClose,
  onFormSubmitted,
  projectId,
  projectName,
}: DeleteProjectModalProps) => {
  return (
    <ConfirmationModal
      appear
      confirmButtonLabel="Delete"
      confirmButtonLabelSubmitting="Deleting..."
      renderBodyWrapper={(children: React.ReactNode) => (
        <FormAction action={deleteProject} onFormSubmitted={onFormSubmitted}>
          {({ response }) => (
            <>
              <input type="hidden" name="id" value={projectId} />
              {children}
              {response && response.errors && <ErrorList errors={response.errors} />}
            </>
          )}
        </FormAction>
      )}
      modalCopy={
        <span>
          Are you sure you want to delete <span className="font-semibold">{projectName}</span>?
        </span>
      }
      modalTitle="Delete Project"
      onCancelHandler={onClose}
      onConfirmHandler="submit"
      show
    />
  );
};
