import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { getTaskById } from '@/modules/app/tasks/TasksRepository';
import { Modal } from '@/modules/shared/modals/Modal';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';
import { DeleteTaskButton } from '@/modules/app/tasks/DeleteTaskButton';

interface TaskInterceptingPageProps {
  readonly params: { readonly taskId: string };
}

export default async function TaskInterceptingPage({
  params: { taskId },
}: TaskInterceptingPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: task, errors: taskErrors }] =
    await Promise.all([getAllProjects(), getTaskById(taskId)]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (taskErrors) return <ErrorList errors={taskErrors} />;

  if (!task) return;
  if (!projects || projects.length < 1 || !task) return null;

  const deleteTaskButton = (
    <DeleteTaskButton
      id={task.id}
      name={task.name}
      routerActionsOnSuccess={[{ type: RouterActionType.Back }, { type: RouterActionType.Refresh }]}
    />
  );

  return (
    <Modal
      defaultOpen
      headerButtons={deleteTaskButton}
      routerActionsOnClose={[{ type: RouterActionType.Back }, { type: RouterActionType.Refresh }]}
    >
      <TaskForm
        project={task.project}
        projects={projects}
        task={task}
        taskNameClassName="text-2xl"
      />
    </Modal>
  );
}
