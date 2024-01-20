'use server-;';

import 'server-only';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/features/shared/ui/ClassNameProps';
import { ErrorList } from '@/features/shared/ui/error/ErrorList';
import { ProjectListItem } from './ProjectListItem';
import { ProjectStatus } from '../data-access/ProjectStatus';
import { getProjects } from '../data-access/ProjectsDataAccess';

interface ProjectListProps extends ClassNamePropsOptional {
  readonly activateItem?: boolean;
  readonly activeItemClassName?: string;
  readonly empty?: React.ReactNode;
  readonly itemClassName?: string;
  readonly itemHref?: string;
  readonly only?: ProjectStatus;
}

/*
 * I'm suppressing the following TypeScript error that seems to be an issue
 * with async functions:
 *
 * "Type is referenced directly or indirectly in the fulfillment callback of its own 'then' method.ts(1062)""
 */
// @ts-ignore
export const ProjectList = async ({
  activeItemClassName,
  className,
  empty,
  itemClassName,
  itemHref,
  only,
}: ProjectListProps) => {
  const { data: projects, errors } = await getProjects({
    ...(only && { isArchived: only === ProjectStatus.Archived }),
  });

  if (errors) return <ErrorList errors={errors} />;
  if (!projects || projects.length === 0) return empty;

  return (
    <nav className={twMerge('flex flex-col w-full', className)}>
      {projects.map(({ id, name }) => (
        <ProjectListItem
          activeClassName={activeItemClassName}
          href={itemHref || '/app/projects/:projectId'}
          className={itemClassName}
          id={id}
          key={id}
          name={name}
        />
      ))}
    </nav>
  );
};
