'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ProjectDto } from './ProjectRepository';
import ProjectListUI from './ProjectListUI';

interface ProjectListApplicationProps {
  readonly projects: Array<ProjectDto>;
}

export default function ProjectListApplication({ projects }: ProjectListApplicationProps) {
  const router = useRouter();

  const onProjectClick = (project: ProjectDto) => {
    router.push(`/app/project/${project.id}`);
  };

  return <ProjectListUI onProjectClick={onProjectClick} projects={projects} />;
}
