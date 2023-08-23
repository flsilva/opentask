import { TaskData } from './TaskData';
import TaskListItem from './TaskListItem';

interface TaskListProps {
  readonly onCompleteTaskClick: (task: TaskData) => void;
  readonly onTaskClick: (task: TaskData) => void;
  readonly tasks: Array<TaskData>;
}

export default function TaskList({ onCompleteTaskClick, onTaskClick, tasks }: TaskListProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mb-8 flex last:mb-0">
          <TaskListItem
            description={task.description || ''}
            dueDate={task.dueDate}
            isCompleted={task.isCompleted}
            key={task.id}
            name={task.name}
            onCompleteTaskClick={() => onCompleteTaskClick(task)}
            onTaskClick={() => onTaskClick(task)}
          />
        </div>
      ))}
    </>
  );
}
