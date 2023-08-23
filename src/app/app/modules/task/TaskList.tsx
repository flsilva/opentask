import { TaskDTO } from './task-model-dto';
import TaskListItem from './TaskListItem';

interface TaskListProps {
  readonly onCompleteTaskClick: (task: TaskDTO) => void;
  readonly onTaskClick: (task: TaskDTO) => void;
  readonly tasks: Array<TaskDTO>;
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
