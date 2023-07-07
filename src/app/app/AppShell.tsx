'use client';

import AppHeader from '@/app/app/shared/ui/AppHeader';
import AppNav from '@/app/app/shared/ui/AppNav';
import { ProjectData } from './project/ProjectData';
import { useLayoutEffect, useRef, useState } from 'react';

interface AppShellProps {
  readonly projects: Array<ProjectData>;
  readonly mainContent: React.ReactNode;
}

export default function AppShell({ mainContent, projects }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (headerRef.current === undefined || headerRef.current === null) return;
    const headerWidth = headerRef.current.getBoundingClientRect().width;
    setIsMenuOpen(headerWidth >= 768);
  }, []);

  return (
    <>
      <AppHeader onMenuClick={() => setIsMenuOpen(!isMenuOpen)} ref={headerRef} />
      <div className="flex h-full overflow-hidden">
        <AppNav isOpen={isMenuOpen} projects={projects} />
        <div className="h-full w-full overflow-y-auto overflow-x-hidden md:flex">
          <div className="flex h-full w-full max-w-[24rem] flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36 2xl:pl-60">
            {mainContent}
          </div>
        </div>
      </div>
    </>
  );
}
