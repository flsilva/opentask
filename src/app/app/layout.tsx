import '../globals.css';
import Header from './ui/Header';

interface Project {
  readonly id: string;
  readonly name: string;
}

const projects: Array<Project> = [];

for (let x = 0; x < 60; x++) {
  projects.push({
    id: String(x + 1),
    name: `My Project #${x + 1}`,
  });
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <div className="flex h-full overflow-hidden">
        <div className="h-full w-0 overflow-y-auto overflow-x-hidden bg-gray-100 py-5 md:w-full md:min-w-[16rem] md:max-w-[16rem] md:px-6">
          <p className="font-medium text-gray-500">Projects</p>
          <nav className="mt-2 pl-2">
            {projects.map((item) => (
              <p key={item.id} className="mt-1 text-sm text-gray-800">
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
