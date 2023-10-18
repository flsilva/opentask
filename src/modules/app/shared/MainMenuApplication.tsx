'use client';

import 'client-only';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectDto } from '@/modules/app/project/ProjectRepository';
import { ProjectModalApplication } from '../project/ProjectModalApplication';
import { MainMenuUI } from './MainMenuUI';

interface MainMenuApplicationProps {
  readonly projects: Array<ProjectDto>;
}

export const MainMenuApplication = ({ projects }: MainMenuApplicationProps) => {
  const router = useRouter();
  const [isShowingProjectModal, setIsShowingProjectModal] = useState(false);

  const onCloseProjectModal = () => {
    setIsShowingProjectModal(false);
  };

  const onNewProjectClick = () => {
    setIsShowingProjectModal(true);
  };

  const onTodayItemClick = () => {
    router.push('/app/today');
  };

  const onProjectItemClick = (project: ProjectDto) => {
    router.push(`/app/project/${project.id}`);
  };

  const onProjectsItemClick = () => {
    router.push('/app/projects/active');
  };

  return (
    <>
      <MainMenuUI
        onNewProjectClick={onNewProjectClick}
        onTodayItemClick={onTodayItemClick}
        onProjectItemClick={onProjectItemClick}
        onProjectsItemClick={onProjectsItemClick}
        projects={projects}
      />
      <ProjectModalApplication open={isShowingProjectModal} onCloseHandler={onCloseProjectModal} />
    </>
  );
};
