import 'server-only';
import Button from './ui/Button';
import HeroShell from './ui/HeroShell';
import HeroHeading from './ui/HeroHeading';
import HeroCopy from './ui/HeroCopy';

export default function Home() {
  return (
    <HeroShell>
      <HeroHeading>
        Free and Open Source <br />
        <span className="text-green-700">Task Manager</span>
      </HeroHeading>
      <HeroCopy>
        Get focused by organizing your plans and goals with simple projects and tasks.
      </HeroCopy>
      <div className="mt-10 flex items-center justify-center">
        <Button href="/">Get Started</Button>
      </div>
    </HeroShell>
  );
}
