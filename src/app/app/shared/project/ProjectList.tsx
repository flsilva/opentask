'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ProjectData } from '../../shared/project/ProjectData';

interface ProjectListProps {
  readonly projects: Array<ProjectData>;
}

export default function ProjectList({ projects }: ProjectListProps) {
  const router = useRouter();

  const onProjectClick = (project: ProjectData) => {
    router.push(`/app/project/${project.id}`);
  };

  return (
    <nav className="flex w-full flex-col">
      {projects &&
        projects.length > 0 &&
        projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className="flex grow items-center rounded-md p-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200"
            onClick={() => onProjectClick(project)}
          >
            <p>{project.name}</p>
          </button>
        ))}
      {!projects ||
        (projects.length < 1 && <p className="text-sm font-medium text-gray-600">No projects.</p>)}
    </nav>
  );
}
