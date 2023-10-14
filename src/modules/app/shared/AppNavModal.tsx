'use client';

import 'client-only';
import { useEffect, useState } from 'react';
import { ProjectDto } from '@/modules/app/project/ProjectRepository';
import ModalUI from '@/modules/shared/modal/ModalUI';
import AppNav from './AppNav';

interface AppNavModalProps {
  readonly projects: Array<ProjectDto>;
}

export default function AppNavModal({ projects }: AppNavModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  /*
   * Flavio Silva on Oct. 13th, 2023:
   * This is necessary to have the on enter <Transition> animation.
   */
  useEffect(() => setIsOpen(true), []);
  /**/

  return (
    <ModalUI onCloseHandler={() => null} open={isOpen}>
      <AppNav projects={projects} />
    </ModalUI>
  );
}
