import 'server-only';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { buttonGreenClassName } from '@/modules/shared/controls/button/buttonClassName';
import { SubmitButton } from '@/modules/shared/controls/button/SubmitButton';
import { inputTextClassName } from '@/modules/shared/controls/input/inputTextClassName';
import { ServerError } from '@/modules/shared/data-access/ServerResponse';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { Form } from '@/modules/shared/form/Form';
import { FormErrorList } from '@/modules/shared/form/FormErrorList';
import { ProjectDto, createProject, getProjectById, updateProject } from './ProjectsRepository';

export interface ProjectFormProps extends ClassNamePropsOptional {
  readonly projectId?: string;
}

export const ProjectForm = async ({ className, projectId }: ProjectFormProps) => {
  let project: ProjectDto | undefined | null;
  let errors: Array<ServerError> | undefined;

  if (projectId) ({ data: project, errors } = await getProjectById({ id: projectId }));
  if (errors) return <ErrorList errors={errors} />;
  if (projectId && !project) notFound();

  const name = (project && project.name) ?? '';
  const description = (project && project.description) ?? '';
  const formAction = project ? updateProject : createProject;

  return (
    <Form action={formAction} className={twMerge('flex flex-col', className)}>
      {project && <input type="hidden" name="id" value={project.id} />}
      <input
        autoFocus
        defaultValue={name}
        name="name"
        type="text"
        placeholder="Project name"
        className={twMerge(inputTextClassName, 'mb-6')}
        required
        minLength={1}
        maxLength={500}
        autoComplete="off"
      />
      <textarea
        defaultValue={description}
        name="description"
        placeholder="Project description"
        rows={5}
        maxLength={500}
        className={twMerge(inputTextClassName, 'mb-6 resize-none')}
      ></textarea>
      <FormErrorList />
      <SubmitButton className={twMerge(buttonGreenClassName, 'flex self-end')}>Save</SubmitButton>
    </Form>
  );
};
