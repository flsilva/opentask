'use client';

import { useState } from 'react';
import {
  experimental_useFormState as useFormState,
  // @ts-ignore
  experimental_useFormStatus as useFormStatus,
} from 'react-dom';
import { useRouter } from 'next/navigation';
import { buttonClassNameGreen } from '@/modules/shared/controls/button/buttonClassName';
import { ProjectDto, createProject, updateProject } from './ProjectsRepository';
import { ProjectModalUI } from './ProjectModalUI';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { useAutoFocus } from '@/modules/shared/utils/useAutoFocus';

interface ProjectFormProps {
  readonly project?: ProjectDto;
  readonly renderOnModal?: boolean;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={buttonClassNameGreen}
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
};

export const ProjectForm = ({ project, renderOnModal }: ProjectFormProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isServerResponseHandled, setIsServerResponseHandled] = useState(false);
  const inputNameRef = useAutoFocus<HTMLInputElement>();

  const name = project && project.name ? project.name : '';
  const description = project && project.description ? project.description : '';
  const _formAction = project && project.id ? updateProject : createProject;
  const [serverResponse, formAction] = useFormState(_formAction, null);

  const onCloseHandler = () => {
    setIsModalOpen(false);
    /*
     * setTimout() used to wait for a leave transition.
     */
    setTimeout(() => {
      router.back();
    }, 300);
    /**/
  };

  const onFormSubmitSuceeded = (newProject: ProjectDto) => {
    setIsModalOpen(false);

    if (project && project.id === newProject.id) {
      // User is editing a project.

      /*
       * setTimout() used to wait for a leave transition.
       */
      setTimeout(() => {
        router.refresh();
        router.back();
      }, 300);
      /**/

      return;
    }

    // User is creating a project.

    router.push(`/app/projects/${newProject.id}`);

    if (renderOnModal) {
      /*
       * Flavio Silva on Oct. 19th:
       * When we navigate the user to "/app/projects/[projectId]" after creating a project
       * this Project Modal doesn't get closed as expected. It seems a bug with Parallel + Intercepting Routes,
       * perhaps because it's also used together with dynamic routes, since we have [projectId] in the URL.
       *
       * If we just close this modal with the line above (setIsOpen(false)) it won't open again,
       * probably because we just hid it, not properly unmounted it.
       *
       * So we have this ugly workaround to close the Project Modal.
       * We hard reload the browser at a "/app/projects/[projectId]" URL.
       * Hopefully this bug gets fixed soon so we can remove this.
       * There are many bugs related to Parallel + Intercepting Routes, including the following one
       * that might be related to this specific bug:
       *
       * https://github.com/vercel/next.js/issues/48719
       */
      setTimeout(() => {
        if (window) window.location.reload();
      }, 300);
      /**/
    } else {
      /*
       * This is necessary to refetch data and rerender the UI.
       * Otherwise, data changes do not display in the UI.
       */
      router.refresh();
      /**/
    }
  };

  /*
   * Flavio Silva on Oct. 22th:
   * I don't like this solution.
   * I hate to have to create this extra state (isFormResultHandled).
   * Could React provide a callback feature to be called after React Action execution?
   */
  if (!isServerResponseHandled && !serverResponse?.errors && serverResponse?.data?.id) {
    setIsServerResponseHandled(true);
    onFormSubmitSuceeded(serverResponse.data);
  }
  /**/

  const formUI = (
    <form action={formAction} className="mt-6 flex flex-col">
      {project && <input type="hidden" name="id" value={project.id} />}
      <input
        defaultValue={name}
        name="name"
        type="text"
        placeholder="Project name"
        className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
        required
        minLength={1}
        maxLength={500}
        autoComplete="off"
        ref={inputNameRef}
      />
      <textarea
        defaultValue={description}
        name="description"
        placeholder="Project description"
        rows={5}
        maxLength={500}
        className="mb-6 block w-full resize-none rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
      ></textarea>
      <div className="flex justify-end gap-4">
        <SubmitButton />
      </div>
      {serverResponse?.errors && (
        <div className="flex flex-col">
          <ErrorList errors={serverResponse.errors} />
        </div>
      )}
    </form>
  );

  if (renderOnModal) {
    return (
      <ProjectModalUI
        appear={isModalOpen}
        onCloseHandler={onCloseHandler}
        open={isModalOpen}
        title={project ? 'Edit project' : 'Create project'}
      >
        {formUI}
      </ProjectModalUI>
    );
  }

  return formUI;
};
