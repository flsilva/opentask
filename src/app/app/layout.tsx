import '../globals.css';
import Header from './ui/Header';
import { CalendarTodaySvg } from '@/shared/ui/CalendarTodaySvg';
import { PlusSignalSvg } from '@/shared/ui/PlusSignalSvg';
import { ProjectsSvg } from '@/shared/ui/ProjectsSvg';

interface Project {
  readonly id: string;
  readonly name: string;
}

const projects: Array<Project> = [];

for (let x = 0; x < 60; x++) {
  projects.push({
    id: String(x + 1),
    name: `My Project ${x + 1}`,
  });
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <div className="flex h-full overflow-hidden">
        <div className="h-full w-0 overflow-y-auto overflow-x-hidden bg-gray-50 py-8 md:w-full md:min-w-[16rem] md:max-w-[16rem] md:px-6">
          <div className="mb-4 flex">
            <CalendarTodaySvg className="fill-gray-500" />
            <div className="ml-2 flex grow items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Today</p>
              <p className="mr-1.5 text-sm font-medium text-gray-500">7</p>
            </div>
          </div>
          <div className="mb-4 flex">
            <ProjectsSvg className="fill-gray-500" />
            <div className="ml-2 flex grow items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Projects</p>
              <PlusSignalSvg className="fill-gray-500" />
            </div>
          </div>
          <nav className="pl-2">
            {projects.map((item) => (
              <p key={item.id} className="mt-3 text-sm text-gray-800">
                {item.name}
              </p>
            ))}
          </nav>
        </div>
        <div className="h-full w-full overflow-y-auto overflow-x-hidden md:flex">{children}</div>
      </div>
    </div>
  );
}
