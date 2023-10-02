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
import ProjectFormUI from './ProjectFormUI';

interface ProjectFormApplicationProps {
  readonly inputNameRef: React.MutableRefObject<HTMLInputElement | null>;
  readonly onCloseHandler: () => void;
  readonly project?: ProjectDto | null;
}

export default function ProjectFormApplication({
  inputNameRef,
  onCloseHandler,
  project,
}: ProjectFormApplicationProps) {
  const router = useRouter();
  /*
   * We can't set these initial states as this Modal is first rendered hidden with no project.
   * And we can only initiate a state in the first render, after that it's ignored.
   * So we set this state in the useEffect() below.
   */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setNameAccordingToProject(project);
    setDescriptionAccordingToProject(project);
  }, [project]);
  /**/

  const generateProjectDto = (): CreateProjectDto => ({
    name,
    description,
  });

  const isValidData = createProjectSchema.safeParse(generateProjectDto()).success;

  const setNameAccordingToProject = (project?: ProjectDto | null) => {
    if (
      project !== undefined &&
      project !== null &&
      project.name !== undefined &&
      project.name !== null
    ) {
      setName(project.name);
      return;
    }
    setName('');
  };

  const setDescriptionAccordingToProject = (project?: ProjectDto | null) => {
    if (
      project !== undefined &&
      project !== null &&
      project.description !== undefined &&
      project.description !== null
    ) {
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

  const _createProject = async (data: CreateProjectDto) => {
    const project = await createProject(data);
    onCloseHandler();
    router.push(`/app/project/${project.id}`);
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const _updateProject = async (data: UpdateProjectDto) => {
    const project = await updateProject(data);
    onCloseHandler();
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const onSaveProject = async () => {
    let data: CreateProjectDto | UpdateProjectDto = generateProjectDto();

    if (project) {
      data = { ...data, id: project.id };
      updateProjectSchema.parse(data);
      _updateProject(data);
      return;
    }

    createProjectSchema.parse(data);
    _createProject(data);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (!createProjectSchema.safeParse(generateProjectDto()).success) return;
    onSaveProject();
  };

  return (
    <ProjectFormUI
      description={description}
      inputNameRef={inputNameRef}
      isValidData={isValidData}
      name={name}
      onCloseHandler={onCloseHandler}
      onChangeDescriptionHandler={onChangeDescriptionHandler}
      onChangeNameHandler={onChangeNameHandler}
      onKeyDown={onKeyDown}
      onSaveProject={onSaveProject}
    />
  );
}
