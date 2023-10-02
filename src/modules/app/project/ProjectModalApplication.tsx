'use client';

import { useRef } from 'react';
import ProjectModalUI from './ProjectModalUI';
import { ProjectDto } from './ProjectRepository';
import ProjectFormApplication from './ProjectFormApplication';

interface ProjectModalApplicationProps {
  readonly open: boolean;
  readonly onCloseHandler: () => void;
  readonly project?: ProjectDto | null;
}

export default function ProjectModalApplication({
  onCloseHandler,
  open,
  project,
}: ProjectModalApplicationProps) {
  const inputNameRef = useRef<HTMLInputElement | null>(null);

  const onCloseHandlerInternal = () => {
    inputNameRef.current?.blur();
    onCloseHandler();
  };

  return (
    <ProjectModalUI
      inputNameRef={inputNameRef}
      onCloseHandler={onCloseHandlerInternal}
      open={open}
      project={project}
    >
      <ProjectFormApplication
        inputNameRef={inputNameRef}
        onCloseHandler={onCloseHandlerInternal}
        project={project}
      />
    </ProjectModalUI>
  );
}
