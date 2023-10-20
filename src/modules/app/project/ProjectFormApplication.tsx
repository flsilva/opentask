'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProjectSchema, updateProjectSchema } from './ProjectDomain';
import {
  createProject,
  updateProject,
  CreateProjectDto,
  ProjectDto,
  UpdateProjectDto,
} from './ProjectRepository';
import { ProjectFormUI } from './ProjectFormUI';
import { ProjectModalUI } from './ProjectModalUI';

interface ProjectFormApplicationProps {
  readonly project?: ProjectDto | null;
  readonly shouldRenderOnModal?: boolean;
}

export const ProjectFormApplication = ({
  project,
  shouldRenderOnModal,
}: ProjectFormApplicationProps) => {
  const router = useRouter();
  /*
   * We can't set these initial states as this Modal is first rendered hidden with no project.
   * And we can only initiate a state in the first render, after that it's ignored.
   * So we set this state in the useEffect() below.
   */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    _setName(project);
    _setDescription(project);
  }, [project]);
  /**/

  const generateProjectDto = (): CreateProjectDto => ({
    name,
    description,
  });

  const isValidData = createProjectSchema.safeParse(generateProjectDto()).success;

  const _setName = (project?: ProjectDto | null) => {
    if (project && project.name) {
      setName(project.name);
      return;
    }
    setName('');
  };

  const _setDescription = (project?: ProjectDto | null) => {
    if (project && project.description) {
      setDescription(project.description);
      return;
    }
    setDescription('');
  };

  const onChangeNameHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(event.target.value);
  };

  const onChangeDescriptionHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };

  const onCloseHandler = () => {
    setIsModalOpen(false);
    /*
     * setTimout() used to wait for the leave transition.
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
       * setTimout() used to wait for the leave transition.
       */
      setTimeout(() => {
        router.refresh();
        router.back();
      }, 300);
      /**/

      return;
    }

    // User is creating a project.

    router.push(`/app/project/${newProject.id}`);

    if (shouldRenderOnModal) {
      /*
       * Flavio Silva on Oct. 19th:
       * When we navigate the user to "/app/project/[projectId]" after creating a project
       * this Project Modal doesn't get closed as expected. It seems a bug with Parallel + Intercepting Routes,
       * perhaps because it's also used together with dynamic routes, since we have [projectId] in the URL.
       *
       * If we just close this modal with the line above (setIsOpen(false)) it won't open again,
       * probably because we just hid it, not properly unmounted it.
       *
       * So we have this ugly workaround to close the Project Modal.
       * We hard reload the browser at a "/app/project/[projectId]" URL.
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

  const onSaveProject = async () => {
    let data: CreateProjectDto | UpdateProjectDto = generateProjectDto();
    let newProject;

    if (project) {
      data = { ...data, id: project.id };
      updateProjectSchema.parse(data);
      newProject = await updateProject(data);
      onFormSubmitSuceeded(newProject);
      return;
    }

    createProjectSchema.parse(data);
    newProject = await createProject(data);
    onFormSubmitSuceeded(newProject);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (!createProjectSchema.safeParse(generateProjectDto()).success) return;
    onSaveProject();
  };

  const projectFormUI = (
    <ProjectFormUI
      description={description}
      isValidData={isValidData}
      name={name}
      onCloseHandler={onCloseHandler}
      onChangeDescriptionHandler={onChangeDescriptionHandler}
      onChangeNameHandler={onChangeNameHandler}
      onKeyDown={onKeyDown}
      onSaveProject={onSaveProject}
    />
  );

  if (shouldRenderOnModal) {
    return (
      <ProjectModalUI
        appear={isModalOpen}
        onCloseHandler={onCloseHandler}
        open={isModalOpen}
        title={project ? 'Edit project' : 'Create project'}
      >
        {projectFormUI}
      </ProjectModalUI>
    );
  }

  return projectFormUI;
};
