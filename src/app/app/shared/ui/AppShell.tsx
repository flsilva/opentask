'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { ChildrenProps } from '@/app/shared/ui//ChildrenProps';
import AppHeader from '@/app/app/shared/ui/AppHeader';
import AppNav from '@/app/app/shared/ui/AppNav';
import { ProjectData } from '../project/ProjectData';
import CreateProjectModal from '../project/CreateProjectModal';

interface AppShellProps extends ChildrenProps {
  readonly projects: Array<ProjectData>;
}

export default function AppShell({ children, projects }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (headerRef.current === undefined || headerRef.current === null) return;
    const headerWidth = headerRef.current.getBoundingClientRect().width;
    setIsMenuOpen(headerWidth >= 768);
  }, []);

  // const newProjecthandler = () => {};

  return (
    <>
      <AppHeader onMenuClick={() => setIsMenuOpen(!isMenuOpen)} ref={headerRef} />
      <div className="flex h-full overflow-hidden">
        <AppNav
          isOpen={isMenuOpen}
          projects={projects}
          onNewProjectClick={() => setShowNewProjectModal(true)}
        />
        <div className="h-full w-full overflow-y-auto overflow-x-hidden md:flex">
          <div className="flex h-full w-full max-w-[24rem] flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36  2xl:pl-60">
            <div className="pb-56">{children}</div>
          </div>
        </div>
      </div>
      <CreateProjectModal
        open={showNewProjectModal}
        onCloseHandler={() => setShowNewProjectModal(false)}
        title="New Project"
      />
    </>
  );
}
