import 'server-only';
import AppShell from '@/app/app/shared/ui/AppShell';
import { ProjectData } from '@/app/app/shared/project/ProjectData';
import ProjectList from '@/app/app/shared/project/ProjectList';

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

export default function ProjectPage() {
  return (
    <AppShell project={project} projects={projects}>
      <ProjectList projects={projects} />
    </AppShell>
  );
}
