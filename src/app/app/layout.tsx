import '../globals.css';
import Header from './shared/ui/Header';
import AppNav from './shared/ui/AppNav';
import { ProjectData } from './project/ProjectData';

const projects: Array<ProjectData> = [];

for (let x = 0; x < 60; x++) {
  projects.push({
    id: String(x + 1),
    name: `My Project ${x + 1}`,
    description: `My Project ${x + 1} description.`,
  });
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <div className="flex h-full overflow-hidden">
        <AppNav projects={projects} />
        <div className="h-full w-full overflow-y-auto overflow-x-hidden md:flex">{children}</div>
      </div>
    </div>
  );
}
