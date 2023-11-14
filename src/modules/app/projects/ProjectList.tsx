import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { ProjectListItem } from './ProjectListItem';
import { ProjectStatus } from './ProjectStatus';
import { getProjects } from './ProjectsRepository';

interface ProjectListProps extends ClassNamePropsOptional {
  readonly activateItem?: boolean;
  readonly activeItemClassName?: string;
  readonly itemClassName?: string;
  readonly itemHref?: string;
  readonly noProjectsClassName?: string;
  readonly only?: ProjectStatus;
}

export const ProjectList = async ({
  activeItemClassName,
  className,
  itemClassName,
  itemHref,
  noProjectsClassName,
  only,
}: ProjectListProps) => {
  const { data: projects, errors } = await getProjects({
    ...(only && { isArchived: only === ProjectStatus.Archived }),
  });

  if (errors) return <ErrorList errors={errors} />;

  return (
    <nav className={twMerge('flex flex-col w-full', className)}>
      {projects &&
        projects.length > 0 &&
        projects.map(({ id, name }) => (
          <ProjectListItem
            activeClassName={activeItemClassName}
            href={itemHref || '/app/projects/:projectId'}
            className={itemClassName}
            id={id}
            key={id}
            name={name}
          />
        ))}
      {!projects ||
        (projects.length < 1 && (
          <p className={twMerge('text-sm font-medium text-gray-600', noProjectsClassName)}>
            No projects.
          </p>
        ))}
    </nav>
  );
};
