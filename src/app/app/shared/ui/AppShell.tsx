'use client';

import 'client-only';
import { useLayoutEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { ChildrenProps } from '@/app/shared/ui//ChildrenProps';
import AppHeader from '@/app/app/shared/ui/AppHeader';
import AppNav from '@/app/app/shared/ui/AppNav';
import { ProjectData } from '../project/ProjectData';
import ProjectHeader, { ProjectAction } from '../project/ProjectHeader';
import ProjectsHeader from '../project/ProjectsHeader';
import TodayHeader from '../../today/TodayHeader';
import ProjectModal from '../project/ProjectModal';
import { CreateProjectData, UpdateProjectData } from '../project/ProjectData';
import { createProject, deleteProject, updateProject } from '../project/project-model';
import { ConfirmationModal, ConfirmationModalProps } from './ConfirmationModal';

interface AppShellProps extends ChildrenProps {
  readonly project?: ProjectData | null;
  readonly projects: Array<ProjectData>;
}

export default function AppShell({ children, project, projects }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editProject, setEditProject] = useState<ProjectData | undefined>(undefined);
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  console.log('AppShell() - showProjectModal: ', showProjectModal);
  console.log('AppShell() - projects: ', projects);

  const findProjectById = (id: string): ProjectData | undefined =>
    projects.find((project) => project.id === id);

  const confirmationModalCancelHandler = () => {
    console.log('AppShell().confirmationModalCancelHandler()');
    setConfirmationModalProps(null);
  };

  const updateProjectHandler = async (project: ProjectData) => {
    console.log('AppShell().updateProjectHandler()');
    await updateProject({ id: project.id, name: project.name, isArchived: true });
    router.push('/app/today');
    setConfirmationModalProps(null);
  };

  const deleteProjectHandler = async (project: ProjectData) => {
    console.log('AppShell().deleteProjectHandler()');
    await deleteProject(project.id);
    router.push('/app/today');
    setConfirmationModalProps(null);
  };

  const onProjectActionHandler = (action: ProjectAction, projectId: string) => {
    console.log(
      `AppShell().onProjectActionHandler() - action: ${action} | projectId: ${projectId}`,
    );
    const project = findProjectById(projectId);
    switch (action) {
      /*
       * Archive Project
       */
      case ProjectAction.Archive:
        console.log('AppShell().onProjectActionHandler() - Archive project');
        if (project === null || project === undefined) return;
        setConfirmationModalProps({
          confirmButtonLabel: 'Archive',
          modalCopy: (
            <span>
              Are you sure you want to archive <span className="font-semibold">{project.name}</span>
              ?
            </span>
          ),
          modalTitle: 'Archive Project',
          onCancelHandler: confirmationModalCancelHandler,
          onConfirmHandler: () => updateProjectHandler(project),
          open: true,
        });
        break;
      /*
       * Delete Project
       */
      case ProjectAction.Delete:
        console.log('AppShell().onProjectActionHandler() - Delete project');
        if (project === null || project === undefined) return;
        setConfirmationModalProps({
          confirmButtonLabel: 'Delete',
          modalCopy: (
            <span>
              Are you sure you want to delete <span className="font-semibold">{project.name}</span>?
            </span>
          ),
          modalTitle: 'Delete Project',
          onCancelHandler: confirmationModalCancelHandler,
          onConfirmHandler: () => deleteProjectHandler(project),
          open: true,
        });
        break;
      /*
       * Edit Project
       */
      case ProjectAction.Edit:
        console.log('AppShell().onProjectActionHandler() - Edit project');
        setEditProject(project);
        setShowProjectModal(true);
        break;
      /*
       * Unhandled action error
       */
      default:
        throw new Error(
          'AppShell().onProjectActionHandler() - ProjectAction not handled: ',
          action,
        );
    }
  };

  const onCloseProjectModalHandler = () => {
    console.log('AppShell().onCloseProjectModalHandler()');
    setEditProject(undefined);
    setShowProjectModal(false);
  };

  const onCreateProject = async (data: CreateProjectData) => {
    console.log('AppShell().onCreateProject() - data: ', data);

    const project = await createProject(data);
    onCloseProjectModalHandler();
    router.push(`/app/project/${project.id}`);
  };

  const onUpdateProject = async (data: UpdateProjectData) => {
    console.log('AppShell().onUpdateProject() - data: ', data);

    const project = await updateProject(data);
    onCloseProjectModalHandler();
    /*
     * This is necessary to refetch and rerender the updated data.
     */
    router.refresh();
    /**/
  };

  let headerComponent;
  if (pathname.indexOf('app/today') !== -1) {
    headerComponent = <TodayHeader />;
  } else if (pathname.indexOf('app/projects') !== -1) {
    headerComponent = <ProjectsHeader />;
  } else if (pathname.indexOf('app/project') !== -1) {
    if (project === null || project === undefined)
      throw new Error(
        "AppShell() - property 'project' cannot be null or undefined on /app/project routes",
      );
    headerComponent = (
      <ProjectHeader onProjectActionClick={onProjectActionHandler} project={project} />
    );
  } else {
    throw new Error(`AppShell() - Unhandled route: ${pathname}`);
  }

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
              {headerComponent}
              {children}
              {(!projects || projects.length === 0) && noProjectsMessage()}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        open={showProjectModal}
        onCloseHandler={onCloseProjectModalHandler}
        onCreateProject={onCreateProject}
        onUpdateProject={onUpdateProject}
        project={editProject}
      />
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </>
  );
}
