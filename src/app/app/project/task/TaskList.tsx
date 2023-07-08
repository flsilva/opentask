import { TaskData } from './TaskData';
import Task from './Task';

interface TaskListProps {
  readonly tasks: Array<TaskData>;
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mb-6 flex last:pb-8">
          <Task task={task} />
        </div>
      ))}
    </>
  );
}
