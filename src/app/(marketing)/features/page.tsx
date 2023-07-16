import 'server-only';
import Link from 'next/link';
import { buttonClassNameGreen } from '@/app/shared/ui//button/buttonClassName';
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
        <Link href="/auth/sign-in" className={buttonClassNameGreen}>
          Get Started
        </Link>
      </div>
    </HeroShell>
  );
}
