'use client';

import 'client-only';
import { AlertDialog } from '@/modules/shared/dialog/AlertDialog';
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
      defaultOpen
      confirmButtonLabel="Delete"
      renderBodyWrapper={(children: React.ReactNode) => (
        <Form action={deleteProject}>
          <input type="hidden" name="id" value={projectId} />
          {children}
          <FormErrorList />
        </Form>
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
