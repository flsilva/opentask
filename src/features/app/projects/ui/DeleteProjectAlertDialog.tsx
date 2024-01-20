'use client';

import 'client-only';
import { AlertDialog, AlertDialogBody } from '@/features/shared/ui/dialog/AlertDialog';
import { Form } from '@/features/shared/ui/form/Form';
import { FormErrorList } from '@/features/shared/ui/form/FormErrorList';
import { deleteProject } from '../data-access/ProjectsDataAccess';

export interface DeleteProjectAlertDialogProps {
  readonly onOpenChange: (open: boolean) => void;
  readonly projectId: string;
  readonly projectName: string;
}

export const DeleteProjectAlertDialog = ({
  onOpenChange,
  projectId,
  projectName,
}: DeleteProjectAlertDialogProps) => {
  return (
    <AlertDialog
      body={
        <Form action={deleteProject}>
          <input type="hidden" name="id" value={projectId} />
          <AlertDialogBody
            confirmButtonLabel="Delete"
            message={
              <span>
                Are you sure you want to delete <span className="font-semibold">{projectName}</span>
                ?
              </span>
            }
            onConfirm="submit"
          />
          <FormErrorList />
        </Form>
      }
      defaultOpen
      onOpenChange={onOpenChange}
      title="Delete Project"
    />
  );
};
