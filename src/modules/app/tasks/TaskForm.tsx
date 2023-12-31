import 'server-only';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { ClassNamePropsOptional } from '@/modules/shared/ClassNameProps';
import { ServerError } from '@/modules/shared/data-access/ServerResponse';
import { ErrorList } from '@/modules/shared/error/ErrorList';
import { Form } from '@/modules/shared/form/Form';
import { FormErrorList } from '@/modules/shared/form/FormErrorList';
import { ProjectsSelect } from '@/modules/app/projects/ProjectsSelect';
import { TaskFormFields } from './TaskFormFields';
import { createTask, updateTask, TaskDto, getTaskById } from './TasksRepository';

export interface TaskFormProps extends ClassNamePropsOptional {
  readonly defaultDueDate?: Date | undefined;
  readonly projectId?: string;
  readonly startOnEditingMode?: boolean;
  readonly taskId?: string;
  readonly taskNameClassName?: string;
}

export const TaskForm = async ({
  className,
  defaultDueDate,
  projectId,
  startOnEditingMode = false,
  taskId,
  taskNameClassName,
}: TaskFormProps) => {
  let task: TaskDto | undefined | null;
  let errors: Array<ServerError> | undefined;

  if (taskId) ({ data: task, errors } = await getTaskById(taskId));
  if (errors) return <ErrorList errors={errors} />;
  if (taskId && !task) notFound();

  const updateTaskProject = async (value: string) => {
    'use server';
    if (!taskId) return;

    const formData = new FormData();
    formData.append('id', taskId);
    formData.append('projectId', value);

    const { errors } = await updateTask(undefined, formData);

    if (errors) {
      // TODO: Display error on a toast?
      // It's already logged on the server-side.
    }
  };

  return (
    <Form
      action={task ? updateTask : createTask}
      className={twMerge('flex flex-col w-full', className)}
    >
      {task && <input type="hidden" name="id" value={task.id} />}
      <TaskFormFields
        defaultDueDate={defaultDueDate}
        projectsSelect={
          <ProjectsSelect
            ariaLabel="Projects"
            defaultValue={projectId ?? task?.projectId}
            name="projectId"
            onValueChange={updateTaskProject}
            placeholder="Select a Project"
          />
        }
        startOnEditingMode={startOnEditingMode}
        task={task}
        taskNameClassName={taskNameClassName}
      />
      <FormErrorList />
    </Form>
  );
};
