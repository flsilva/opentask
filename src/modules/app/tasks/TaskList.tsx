import { TaskDto } from './TasksRepository';
import { TaskListItem } from './TaskListItem';

interface TaskListProps {
  readonly addTask?: React.ReactNode;
  readonly tasks: Array<TaskDto>;
}

const renderTaskList = (tasks: Array<TaskDto>) =>
  tasks.map((task) => (
    <div key={task.id} className="flex mb-4 last:mb-0">
      <TaskListItem
        description={task.description || ''}
        dueDate={task.dueDate}
        id={task.id}
        isCompleted={task.isCompleted}
        key={task.id}
        name={task.name}
      />
    </div>
  ));

export const TaskList = ({ addTask, tasks }: TaskListProps) => {
  const completeTasks = tasks.filter((task) => task.isCompleted);
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div className="flex flex-col">
      {incompleteTasks.length > 0 && (
        <div className="flex flex-col pb-8">{renderTaskList(incompleteTasks)}</div>
      )}
      {addTask}
      {completeTasks.length > 0 && (
        <div className="flex flex-col py-8">{renderTaskList(completeTasks)}</div>
      )}
    </div>
  );
};
