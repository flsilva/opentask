'use server';

import 'server-only';
import { ProjectDto, getProjects } from '@/features/app/projects/data-access/ProjectsDataAccess';
import { Select, SelectItemProps, SelectProps } from '@/features/shared/ui/control/select/Select';
import { ErrorList } from '@/features/shared/ui/error/ErrorList';

export type ProjectsSelectProps = Omit<SelectProps, 'items'>;

export const mapPojectsToSelectItems = (projects: Array<ProjectDto>): Array<SelectItemProps> =>
  projects.map((project) => ({
    value: project.id,
    children: project.name,
  }));

export const ProjectsSelect = async ({ defaultValue, onValueChange }: ProjectsSelectProps) => {
  const { data: projects, errors } = await getProjects({ isArchived: false });

  if (errors) return <ErrorList errors={errors} />;
  if (!projects)
    return <ErrorList errors={[{ message: 'There was an error trying to load your Projects.' }]} />;

  /*
   * This ternary inside a ternary looks fine to me.
   */
  const _defaultValue = defaultValue
    ? defaultValue
    : projects && projects.length > 0
      ? projects[0].id
      : undefined;
  /**/

  return (
    <Select
      ariaLabel="Projects"
      defaultValue={_defaultValue}
      items={mapPojectsToSelectItems(projects)}
      name="projectId"
      onValueChange={onValueChange}
      placeholder="Select a Project"
    />
  );
};
