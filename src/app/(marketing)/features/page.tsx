import 'server-only';
import Button from '@/app/shared/ui//button/Button';
import HeroShell from '../shared/ui/HeroShell';
import HeroHeading from '../shared/ui/HeroHeading';
import HeroCopy from '../shared/ui/HeroCopy';

export default function Features() {
  return (
    <HeroShell>
      <HeroHeading>
        Capture Everything <br />
        <span className="text-green-700">Free Your Mind</span>
      </HeroHeading>
      <HeroCopy>
        Plan and structure everything, from chores to great ideas, as manageable projects and tasks.
      </HeroCopy>
      <div className="mt-10 flex items-center justify-center">
        <Button href="/auth/sign-in">Get Started</Button>
      </div>
    </HeroShell>
  );
}
