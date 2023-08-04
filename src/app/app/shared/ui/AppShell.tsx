'use client';

import 'client-only';
import { useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ChildrenProps } from '@/app/shared/ui//ChildrenProps';
import AppHeader from '@/app/app/shared/ui/AppHeader';
import AppNav from '@/app/app/shared/ui/AppNav';
import { ProjectData } from '@/app/app/shared/project/ProjectData';
import ProjectModal from '@/app/app/shared/project/ProjectModal';
import { CreateProjectData, UpdateProjectData } from '@/app/app/shared/project/ProjectData';
import { createProject } from '@/app/app/shared/project/project-model';

interface AppShellProps extends ChildrenProps {
  readonly project?: ProjectData | null;
  readonly projects: Array<ProjectData>;
}

export default function AppShell({ children, project, projects }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  console.log('AppShell() - showProjectModal: ', showProjectModal);
  console.log('AppShell() - projects: ', projects);

  const onCloseProjectModal = () => {
    console.log('AppShell().onCloseProjectModal()');
    setShowProjectModal(false);
  };

  const onCreateProject = async (data: CreateProjectData) => {
    console.log('AppShell().onCreateProject() - data: ', data);

    const project = await createProject(data);
    onCloseProjectModal();
    router.push(`/app/project/${project.id}`);
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const onUpdateProject = async (data: UpdateProjectData) => {
    throw new Error('This operation should be handler by a different component.');
  };

  const noProjectsMessage = () => (
    <p className="mt-4 text-sm font-medium text-gray-600">
      You don&#39;t have any projects yet.{' '}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-500"
        onClick={() => setShowProjectModal(true)}
      >
        Click here
      </button>{' '}
      to create your first.
    </p>
  );

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
              {children}
              {(!projects || projects.length === 0) && noProjectsMessage()}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        open={showProjectModal}
        onCloseHandler={onCloseProjectModal}
        onCreateProject={onCreateProject}
        onUpdateProject={onUpdateProject}
      />
    </>
  );
}
