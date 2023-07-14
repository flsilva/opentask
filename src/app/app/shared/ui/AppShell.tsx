'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChildrenProps } from '@/app/shared/ui//ChildrenProps';
import AppHeader from '@/app/app/shared/ui/AppHeader';
import AppNav from '@/app/app/shared/ui/AppNav';
import { ProjectData } from '../project/ProjectData';
import ProjectModal from '../project/ProjectModal';
import TodayHeader from '../../today/TodayHeader';
import ProjectHeader, { ProjectAction } from '../project/ProjectHeader';
import ProjectsHeader from '../project/ProjectsHeader';

interface AppShellProps extends ChildrenProps {
  readonly project?: ProjectData;
  readonly projects: Array<ProjectData>;
}

export default function AppShell({ children, project, projects }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editProject, setEditProject] = useState<ProjectData | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  console.log('AppShell() - pathname: ', pathname);

  const onProjectActionHandler = (action: ProjectAction, projectId: string) => {
    console.log(
      `AppShell().onProjectActionHandler() - action: ${action} | projectId: ${projectId}`,
    );
    switch (action) {
      case ProjectAction.Archive:
        console.log('AppShell().onProjectActionHandler() - Archive project');
        break;
      case ProjectAction.Delete:
        console.log('AppShell().onProjectActionHandler() - Delete project');
        break;
      case ProjectAction.Edit:
        console.log('AppShell().onProjectActionHandler() - Edit project');
        setEditProject(projects.find((project) => project.id === projectId));
        setShowProjectModal(true);
        break;
      default:
        throw new Error(
          'AppShell().onProjectActionHandler() - ProjectAction not handled: ',
          action,
        );
    }
  };

  const onCloseProjectModalHandler = () => {
    setEditProject(undefined);
    setShowProjectModal(false);
  };

  let headerComponent;
  if (pathname.indexOf('app/today') !== -1) {
    headerComponent = <TodayHeader />;
  } else if (pathname.indexOf('app/projects') !== -1) {
    headerComponent = <ProjectsHeader />;
  } else if (pathname.indexOf('app/project') !== -1) {
    if (project === null || project === undefined)
      throw new Error(
        "AppShell() - property 'project' must be provided when on /app/project routes. Received: ",
        project,
      );
    headerComponent = (
      <ProjectHeader onProjectActionClick={onProjectActionHandler} project={project} />
    );
  }

  useLayoutEffect(() => {
    if (headerRef.current === undefined || headerRef.current === null) return;
    const headerWidth = headerRef.current.getBoundingClientRect().width;
    setIsMenuOpen(headerWidth >= 768);
  }, []);

  return (
    <>
      <AppHeader onMenuButtonClick={() => setIsMenuOpen(!isMenuOpen)} ref={headerRef} />
      <div className="flex h-full overflow-hidden">
        <AppNav
          isOpen={isMenuOpen}
          projects={projects}
          onNewProjectClick={() => setShowProjectModal(true)}
        />
        <div className="h-full w-full overflow-y-auto overflow-x-hidden md:flex">
          <div className="flex h-full w-full max-w-[24rem] flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36  2xl:pl-60">
            <div className="pb-56">
              {headerComponent}
              {children}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        open={showProjectModal}
        onCloseHandler={onCloseProjectModalHandler}
        project={editProject}
      />
    </>
  );
}
