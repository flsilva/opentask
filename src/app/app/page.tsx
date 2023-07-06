import 'server-only';
import { EllipsisHorizontalSvg } from '@/shared/ui/EllipsisHorizontalSvg';

interface Task {
  readonly description: string;
  readonly id: string;
  readonly name: string;
}

const tasks: Array<Task> = [];

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
  });
}

export default function App() {
  return (
    <div className="h-full w-full px-12">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">Awesome Project</h1>
        <EllipsisHorizontalSvg />
      </div>
      <p className="mb-8 text-sm">Project description...</p>
      {tasks.map((item) => (
        <div key={item.id} className="items-top mb-4 flex">
          <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-gray-500"></div>
          <div className="ml-2">
            <p className="text-sm text-gray-800">{item.name}</p>
            <p className="mt-1 w-[40.5rem] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-400">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}