'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CreateProjectDto,
  createProjectSchema,
  ProjectDto,
  UpdateProjectDto,
  updateProjectSchema,
} from './ProjectDomain';
import ProjectModalUI from './ProjectModalUI';

interface ProjectModalApplicationProps {
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly onCreateProject: (data: CreateProjectDto) => void;
  readonly onUpdateProject: (data: UpdateProjectDto) => void;
  readonly project?: ProjectDto | null;
}

export default function ProjectModalApplication({
  onCloseHandler,
  onCreateProject,
  onUpdateProject,
  open,
  project,
}: ProjectModalApplicationProps) {
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

  const inputNameRef = useRef<HTMLInputElement | null>(null);
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

  const onCloseHandlerInternal = () => {
    /*
     * Reset form changes before closing.
     */
    setNameAccordingToProject(project);
    setDescriptionAccordingToProject(project);
    /**/
    inputNameRef.current?.blur();
    onCloseHandler();
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

  const onSaveProject = async () => {
    let data: CreateProjectDto | UpdateProjectDto = generateProjectDto();

    if (project) {
      data = { ...data, id: project.id };
      updateProjectSchema.parse(data);
      onUpdateProject(data);
      return;
    }

    createProjectSchema.parse(data);
    onCreateProject(data);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    if (!createProjectSchema.safeParse(generateProjectDto()).success) return;
    onSaveProject();
  };

  return (
    <ProjectModalUI
      description={description}
      inputNameRef={inputNameRef}
      isValidData={isValidData}
      name={name}
      onCloseHandler={onCloseHandlerInternal}
      onChangeDescriptionHandler={onChangeDescriptionHandler}
      onChangeNameHandler={onChangeNameHandler}
      onKeyDown={onKeyDown}
      onSaveProject={onSaveProject}
      open={open}
      project={project}
    />
  );
}
