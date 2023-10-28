'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buttonClassNameGreen } from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { useAutoFocus } from '@/modules/shared/utils/useAutoFocus';
import { ServerResponse } from '@/modules/app/shared/errors/ServerResponse';
import { useFormAction } from '@/modules/app/shared/form/useFormAction';
import { ProjectModal } from './ProjectModal';
import { ProjectDto, createProject, updateProject } from './ProjectsRepository';

export interface ProjectFormProps {
  readonly project?: ProjectDto;
  readonly renderOnModal?: boolean;
}

export const ProjectForm = ({ project, renderOnModal }: ProjectFormProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const inputNameRef = useAutoFocus<HTMLInputElement>();

  const name = project && project.name ? project.name : '';
  const description = project && project.description ? project.description : '';

  const onFormSubmitted = (response: ServerResponse<ProjectDto | undefined> | undefined) => {
    if (!response || !response.data || response.errors) return;

    const { data: newProject } = response;
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
      // router.refresh() is necessary to refetch and rerender mutated data.
      router.refresh();
    }
  };

  const [serverResponse, formAction] = useFormAction({
    action: project ? updateProject : createProject,
    onFormSubmitted,
  });

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

  const formJSX = (
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
      {serverResponse && serverResponse.errors && <ErrorList errors={serverResponse.errors} />}
      <SubmitButton
        className={`flex self-end ${buttonClassNameGreen}`}
        label="Save"
        submittingLabel="Saving..."
      />
    </form>
  );

  if (renderOnModal) {
    return (
      <ProjectModal
        appear={isModalOpen}
        onCloseHandler={onCloseHandler}
        open={isModalOpen}
        title={project ? 'Edit project' : 'Create project'}
      >
        {formJSX}
      </ProjectModal>
    );
  }

  return formJSX;
};
