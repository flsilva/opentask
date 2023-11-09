'use client';

import 'client-only';
import { ProjectDto } from './ProjectsRepository';
import { ProjectMutationDropdown } from './ProjectMutationDropdown';
import { FeedbackBox } from '@/modules/shared/box/FeedbackBox';

export interface ProjectPageHeaderProps {
  readonly project: ProjectDto;
}

export const ProjectPageHeader = ({ project }: ProjectPageHeaderProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="sticky top-0 flex w-full justify-between bg-white py-8">
          <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
          <ProjectMutationDropdown project={project} />
        </div>
        {project.description && (
          <p className="block whitespace-pre-line text-sm mb-8">{project.description}</p>
        )}
        {project.isArchived && (
          <FeedbackBox className="mb-8">
            <p className="block">This project is archived.</p>
          </FeedbackBox>
        )}
      </div>
    </>
  );
};
