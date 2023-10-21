'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { deleteProject, updateProject, ProjectDto } from './ProjectsRepository';
import { ProjectPageHeaderUI } from './ProjectPageHeaderUI';

interface ProjectPageHeaderControllerProps {
  readonly project: ProjectDto;
}

export const ProjectPageHeaderController = ({ project }: ProjectPageHeaderControllerProps) => {
  const router = useRouter();

  const onArchiveProject = async (project: ProjectDto) => {
    await updateProject({ id: project.id, name: project.name, isArchived: true });
    router.push('/app/today');
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const onUnarchiveProject = async (project: ProjectDto) => {
    await updateProject({ id: project.id, name: project.name, isArchived: false });
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const onDeleteProject = async (project: ProjectDto) => {
    await deleteProject(project.id);
    router.push('/app/today');
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const onEditProject = (project: ProjectDto) => {
    router.push(`/app/projects/${project.id}/edit`);
  };

  if (!project) return null;

  return (
    <ProjectPageHeaderUI
      onArchiveProject={onArchiveProject}
      onUnarchiveProject={onUnarchiveProject}
      onDeleteProject={onDeleteProject}
      onEditProject={onEditProject}
      project={project}
    />
  );
};
