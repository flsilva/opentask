import { TaskDto } from './TaskRepository';
import TaskListItemUI from './TaskListItemUI';

interface TaskListUIProps {
  readonly onCompleteTaskClick: (task: TaskDto) => void;
  readonly onTaskClick: (task: TaskDto) => void;
  readonly tasks: Array<TaskDto>;
}

export default function TaskListUI({ onCompleteTaskClick, onTaskClick, tasks }: TaskListUIProps) {
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="mb-8 flex last:mb-0">
          <TaskListItemUI
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
