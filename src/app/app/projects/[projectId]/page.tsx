import 'server-only';
import { NoTasksInProject } from '@/modules/app/projects/NoTasksInProject';
import { ProjectPageHeader } from '@/modules/app/projects/ProjectPageHeader';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskList } from '@/modules/app/tasks/TaskList';
import { TaskStatus } from '@/modules/app/tasks/TaskStatus';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { TaskProjectsSelect } from '@/modules/app/tasks/TaskProjectsSelect';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  return (
    <>
      <ProjectPageHeader id={projectId} />
      <NoTasksInProject id={projectId} />
      <TaskList byProject={projectId} only={TaskStatus.Incomplete} />
      <AddTask containerClassName="my-8" projectId={projectId}>
        <TaskForm
          className="rounded-md bg-gray-100 px-2 py-6 sm:px-6 mt-4"
          projectsSelect={<TaskProjectsSelect defaultValue={projectId} />}
          shouldStartOnEditingMode={true}
        />
      </AddTask>
      <TaskList byProject={projectId} only={TaskStatus.Complete} />
    </>
  );
}
