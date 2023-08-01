import { TaskData } from './TaskData';
import TaskListItem from './TaskListItem';

interface TaskListProps {
  readonly onTaskClick: (task: TaskData) => void;
  readonly tasks: Array<TaskData>;
}

export default function TaskList({ onTaskClick, tasks }: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mb-6 flex last:pb-8">
          <TaskListItem
            description={task.description}
            name={task.name}
            onTaskClick={() => onTaskClick(task)}
          />
        </div>
      ))}
    </>
  );
}
