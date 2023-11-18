'use client';

import 'client-only';
import { AlertDialog } from '@/modules/shared/dialog/AlertDialog';
import { Form } from '@/modules/shared/form/Form';
import { FormErrorList } from '@/modules/shared/form/FormErrorList';
import { ProjectMutationAction } from './ProjectMutationDropdown';
import { updateProject } from './ProjectsRepository';

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
      defaultOpen
      confirmButtonLabel={action}
      renderBodyWrapper={(children: React.ReactNode) => (
        <Form action={updateProject}>
          <input type="hidden" name="id" value={projectId} />
          <input type="hidden" name="isArchived" value={action === 'Archive' ? 'on' : 'off'} />
          {children}
          <FormErrorList />
        </Form>
      )}
      dialogCopy={
        <span>
          Are you sure you want to {action.toLowerCase()}{' '}
          <span className="font-semibold">{projectName}</span>?
        </span>
      }
      dialogTitle={`${action} Project`}
      onConfirmHandler="submit"
      onOpenChange={onOpenChange}
    />
  );
};
