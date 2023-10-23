'use client';

import 'client-only';
import { useState } from 'react';
import { experimental_useFormState as useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { ProjectDto } from './ProjectsRepository';
import { ChildrenProps } from '@/modules/shared/ChildrenProps';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ServerResponse } from '../shared/errors/ServerResponse';

export interface ProjectActionFormProps extends ChildrenProps {
  readonly formAction: (
    prevState: any,
    formData: FormData,
  ) => Promise<ServerResponse<ProjectDto | undefined>>;
  readonly onFormSubmitSuceeded: (updatedProject: ProjectDto) => void;
  readonly projectId: string;
}

export const ProjectActionForm = ({
  children,
  formAction,
  onFormSubmitSuceeded,
  projectId,
}: ProjectActionFormProps) => {
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
