import { NoTasksInProject } from '@/features/app/projects/ui/NoTasksInProject';
import { ProjectPageHeader } from '@/features/app/projects/ui/ProjectPageHeader';
import { AddTask } from '@/features/app/tasks/ui/AddTask';
import { TaskList } from '@/features/app/tasks/ui/TaskList';
import { TaskForm } from '@/features/app/tasks/ui/TaskForm';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  return (
    <>
      <ProjectPageHeader id={projectId} />
      <NoTasksInProject id={projectId} />
      <TaskList byProject={projectId} only="incomplete" />
      <AddTask containerClassName="my-8" projectId={projectId}>
        <TaskForm
          className="rounded-md bg-gray-100 px-2 py-6 sm:px-6 mt-4"
          projectId={projectId}
          startOnEditingMode
        />
      </AddTask>
      <TaskList byProject={projectId} only="completed" />
    </>
  );
}
