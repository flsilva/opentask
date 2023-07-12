import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import { ProjectData } from '@/app/app/shared/project/ProjectData';
import { TaskData } from '@/app/app/shared/task/TaskData';
import TaskListAndTaskForm from '@/app/app/shared/task/TaskListAndTaskForm';
import TaskModal from '@/app/app/shared/task/TaskModal';
import TodayHeader from '../../TodayHeader';

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

const tasks: Array<TaskData> = [];
/*
for (let x = 0; x < 30; x++) {
  tasks.push({
    id: String(x + 1),
    name: `My task #${x + 1}: this one is pretty simple, just tick it!`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  });
}
*/

for (let x = 0; x < 30; x++) {
  tasks.push({
    id: String(x + 1),
    name: `My task #${
      x + 1
    }: this one is pretty easy, just tick it! Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    projectId: '1',
  });
}

export default function TaskPage() {
  return (
    <AppShell projects={projects}>
      <TodayHeader />
      <TaskListAndTaskForm project={project} projects={projects} tasks={tasks} />
      <TaskModal project={project} projects={projects} task={task} />
    </AppShell>
  );
}
