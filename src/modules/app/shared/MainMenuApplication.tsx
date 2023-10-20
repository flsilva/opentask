'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ProjectDto } from '@/modules/app/projects/ProjectsRepository';
import { MainMenuUI } from './MainMenuUI';
import { ModalUI } from '@/modules/shared/modals/ModalUI';

interface MainMenuApplicationProps {
  readonly projects: Array<ProjectDto>;
  readonly shouldRenderOnModal?: boolean;
}

export const MainMenuApplication = ({
  projects,
  shouldRenderOnModal,
}: MainMenuApplicationProps) => {
  const router = useRouter();

  const onNewProjectClick = () => {
    // setIsShowingProjectModal(true);
    router.push('/app/projects/new');
  };

  const onTodayItemClick = () => {
    router.push('/app/today');
  };

  const onProjectItemClick = (project: ProjectDto) => {
    router.push(`/app/projects/${project.id}`);
  };

  const onProjectsItemClick = () => {
    router.push('/app/projects/active');
  };

  const mainMenuUI = (
    <MainMenuUI
      onNewProjectClick={onNewProjectClick}
      onTodayItemClick={onTodayItemClick}
      onProjectItemClick={onProjectItemClick}
      onProjectsItemClick={onProjectsItemClick}
      projects={projects}
    />
  );

  if (shouldRenderOnModal) {
    return (
      <ModalUI appear onCloseHandler={() => null} open>
        {mainMenuUI}
      </ModalUI>
    );
  }

  return mainMenuUI;
};
