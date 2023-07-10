import 'server-only';
import Button from '@/app/shared/ui/button/Button';
import HeroShell from './shared/ui/HeroShell';
import HeroHeading from './shared/ui/HeroHeading';
import HeroCopy from './shared/ui/HeroCopy';

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
        <Button href="/auth/sign-in">Get Started</Button>
      </div>
    </HeroShell>
  );
}
