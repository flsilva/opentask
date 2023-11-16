import 'server-only';
import { ProjectsSelect } from '@/modules/app/projects/ProjectsSelect';
import { updateTask } from './TasksRepository';

export interface TaskProjectsSelectProps {
  readonly defaultValue?: string;
  readonly taskId?: string;
}

export const TaskProjectsSelect = ({ defaultValue, taskId }: TaskProjectsSelectProps) => {
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
    <ProjectsSelect
      ariaLabel="Projects"
      defaultValue={defaultValue}
      name="projectId"
      onValueChange={updateTaskProject}
      placeholder="Select a Project"
    />
  );
};
