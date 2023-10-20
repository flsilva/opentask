'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ProjectDto } from './ProjectsRepository';
import { ProjectListUI } from './ProjectListUI';

interface ProjectListApplicationProps {
  readonly projects: Array<ProjectDto>;
}

export const ProjectListApplication = ({ projects }: ProjectListApplicationProps) => {
  const router = useRouter();

  const onProjectClick = (project: ProjectDto) => {
    router.push(`/app/projects/${project.id}`);
  };

  return <ProjectListUI onProjectClick={onProjectClick} projects={projects} />;
};
