'use client';

import 'client-only';
import { AlertDialog, AlertDialogBody } from '@/modules/shared/dialog/AlertDialog';
import { Form } from '@/modules/shared/form/Form';
import { FormErrorList } from '@/modules/shared/form/FormErrorList';
import { deleteProject } from './ProjectsRepository';

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
            onConfirmHandler="submit"
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
