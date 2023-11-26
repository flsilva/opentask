import { notFound } from 'next/navigation';
import { getProjectById } from './ProjectsRepository';
import { ProjectMutationDropdown } from './ProjectMutationDropdown';
import { WarningFeedback } from '@/modules/shared/feedback/WarningFeedback';
import { ErrorList } from '@/modules/shared/error/ErrorList';

export interface ProjectPageHeaderProps {
  readonly id: string;
}

export const ProjectPageHeader = async ({ id }: ProjectPageHeaderProps) => {
  const { data: project, errors } = await getProjectById(id);

  if (errors) return <ErrorList errors={errors} />;
  if (!project) return notFound();

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
        <ProjectMutationDropdown project={project} />
      </div>
      {project.description && (
        <p className="block whitespace-pre-line text-sm mb-8">{project.description}</p>
      )}
      {project.archivedAt && (
        <WarningFeedback className="mb-8">
          <p className="block">This project is archived.</p>
        </WarningFeedback>
      )}
    </div>
  );
};
