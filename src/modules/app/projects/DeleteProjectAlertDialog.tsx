'use client';

import 'client-only';
import { AlertDialog } from '@/modules/shared/dialog/AlertDialog';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { FormAction } from '@/modules/shared/form/FormAction';
import { deleteProject, ProjectDto } from './ProjectsRepository';

export interface DeleteProjectAlertDialogProps {
  readonly onFormSubmitted: (response: ServerResponse<ProjectDto | undefined> | undefined) => void;
  readonly onOpenChange: (open: boolean) => void;
  readonly projectId: string;
  readonly projectName: string;
}

export const DeleteProjectAlertDialog = ({
  onFormSubmitted,
  onOpenChange,
  projectId,
  projectName,
}: DeleteProjectAlertDialogProps) => {
  return (
    <AlertDialog
      defaultOpen
      confirmButtonLabel="Delete"
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
      dialogCopy={
        <span>
          Are you sure you want to delete <span className="font-semibold">{projectName}</span>?
        </span>
      }
      dialogTitle="Delete Project"
      onConfirmHandler="submit"
      onOpenChange={onOpenChange}
    />
  );
};
