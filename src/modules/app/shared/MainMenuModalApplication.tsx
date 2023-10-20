'use client';

import 'client-only';
import { useEffect, useState } from 'react';
import { ProjectDto } from '@/modules/app/projects/ProjectRepository';
import { ModalUI } from '@/modules/shared/modals/ModalUI';
import { MainMenuApplication } from './MainMenuApplication';

interface MainMenuModalApplicationProps {
  readonly projects: Array<ProjectDto>;
}

export const MainMenuModalApplication = ({ projects }: MainMenuModalApplicationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  /*
   * Flavio Silva on Oct. 13th, 2023:
   * This is necessary to have the on enter <Transition> animation.
   */
  useEffect(() => setIsOpen(true), []);
  /**/

  return (
    <ModalUI onCloseHandler={() => null} open={isOpen}>
      <MainMenuApplication projects={projects} />
    </ModalUI>
  );
};
