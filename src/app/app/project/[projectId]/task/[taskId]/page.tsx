import 'server-only';
import { ProjectData } from '../../../ProjectData';
import { TaskData } from '../../../task/TaskData';
import TaskModal from './TaskModal';

const projects: Array<ProjectData> = [];

for (let x = 0; x < 60; x++) {
  projects.push({
    id: String(x + 1),
    name: `My Project ${x + 1}`,
    description: `My Project ${x + 1} description.`,
  });
}

const project: ProjectData = {
  id: '1',
  name: 'Awesome Project',
  description: 'This project is awesome...',
};

const task: TaskData = {
  id: '1',
  name: 'My simple task lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.',
  description: 'This task is pretty simple indeed.',
  projectId: '1',
};

export default function TaskPage() {
  return (
    <div className="flex flex-col">
      <TaskModal project={project} projects={projects} task={task} />
    </div>
  );
}
