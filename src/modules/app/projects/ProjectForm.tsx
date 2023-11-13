'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { buttonGreenClassName } from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ServerResponse } from '@/modules/shared/data-access/ServerResponse';
import { useFormAction } from '@/modules/shared/form/useFormAction';
import { ProjectDto, createProject, updateProject } from './ProjectsRepository';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';

export interface ProjectFormProps extends ClassNamePropsOptional {
  readonly project?: ProjectDto;
}

export const ProjectForm = ({ className, project }: ProjectFormProps) => {
  const router = useRouter();
  const name = project && project.name ? project.name : '';
  const description = project && project.description ? project.description : '';

  const onFormSubmitted = (response: ServerResponse<ProjectDto | undefined> | undefined) => {
    if (!response || !response.data || response.errors) return;

    const { data: newProject } = response;

    if (project && project.id === newProject.id) {
      // User is editing a project.

      router.back();

      // router.refresh() is necessary to refetch and rerender mutated data.
      router.refresh();
      return;
    }

    // User is creating a project.

    // router.replace(`/app/projects/${newProject.id}`);

    // router.refresh() is necessary to refetch and rerender mutated data.
    // router.refresh();

    /*
     * Flavio Silva on Oct. 19th:
     * The above call to router.replace() (or it can be router.push) to navigate the user
     * to the just created project isn't working at all when we're on a Dialog
     * (so in a Intercepting Route).
     * It doesn't change the URL. Nothing happens, and so the Dialog doesn't get closed.
     * It seems a bug with Parallel + Intercepting Routes.
     * But I found out that the URL never changes only if the call router.refresh()
     * right after calling router.push().
     * If we only call router.push() the URL changes, the content below the Dialog gets updated,
     * i.e., the just created project is rendered, but the Dialog doesn't close.
     * Plus, the just created project doesn't get rendered in the <MainMenu> if we don't call
     * router.refresh().
     *
     * If we tap outside the Dialog, which calls router.back(), it works, but sends
     * users to the previous route, not to the just created project.
     *
     * So we have this ugly workaround to get out of the Dialog,
     * and navigate to the page of the created project.
     *
     * Hopefully this bug gets fixed soon so we can remove this.
     * There are many bugs related to Parallel + Intercepting Routes, including the following one
     * that might be related to this specific bug:
     * https://github.com/vercel/next.js/issues/48719
     */
    if (window) window.location.href = `/app/projects/${newProject.id}`;
    /**/
  };

  const [serverResponse, formAction] = useFormAction({
    action: project ? updateProject : createProject,
    onFormSubmitted,
  });

  return (
    <form action={formAction} className={twMerge('flex flex-col', className)}>
      {project && <input type="hidden" name="id" value={project.id} />}
      <input
        autoFocus
        defaultValue={name}
        name="name"
        type="text"
        placeholder="Project name"
        className="mb-6 block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 ring-0 placeholder:text-gray-400 focus:border-gray-900 focus:outline-0 focus:ring-0"
        required
        minLength={1}
        maxLength={500}
        autoComplete="off"
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
      <SubmitButton className={twMerge(buttonGreenClassName, 'flex self-end')}>Save</SubmitButton>
    </form>
  );
};
