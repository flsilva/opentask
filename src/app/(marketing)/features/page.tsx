import 'server-only';
import Link from 'next/link';
import { buttonClassNameGreen } from '@/app/modules/common//button/buttonClassName';
import HeroShell from '../modules/common/HeroShell';
import HeroHeading from '../modules/common/HeroHeading';
import HeroCopy from '../modules/common/HeroCopy';

export default function Features() {
  return (
    <HeroShell className="pt-24 sm:pt-36 lg:pt-42">
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
