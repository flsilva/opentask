'use client';

import 'client-only';
import { AlertDialog, AlertDialogBody } from '@/features/shared/ui/dialog/AlertDialog';
import { Form } from '@/features/shared/ui/form/Form';
import { FormErrorList } from '@/features/shared/ui/form/FormErrorList';
import { ProjectMutationAction } from './ProjectMutationDropdown';
import { updateProject } from '../data-access/ProjectsDataAccess';

export interface ArchiveProjectAlertDialogProps {
  readonly action: ProjectMutationAction.Archive | ProjectMutationAction.Unarchive;
  readonly onOpenChange: (open: boolean) => void;
  readonly projectId: string;
  readonly projectName: string;
}

export const ArchiveProjectAlertDialog = ({
  action,
  onOpenChange,
  projectId,
  projectName,
}: ArchiveProjectAlertDialogProps) => {
  return (
    <AlertDialog
      body={
        <Form action={updateProject}>
          <input type="hidden" name="id" value={projectId} />
          <input
            type="hidden"
            name="archivedAt"
            value={action === ProjectMutationAction.Archive ? new Date().toString() : 'null'}
          />
          <AlertDialogBody
            confirmButtonLabel={action}
            message={
              <span>
                Are you sure you want to {action.toLowerCase()}{' '}
                <span className="font-semibold">{projectName}</span>?
              </span>
            }
            onConfirm="submit"
          />
          <FormErrorList />
        </Form>
      }
      defaultOpen
      onOpenChange={onOpenChange}
      title={`${action} Project`}
    />
  );
};
