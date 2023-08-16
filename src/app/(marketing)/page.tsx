import 'server-only';
import Link from 'next/link';
import { buttonClassNameGreen } from '@/app/shared/ui//button/buttonClassName';
import HeroShell from './shared/ui/HeroShell';
import HeroHeading from './shared/ui/HeroHeading';
import HeroCopy from './shared/ui/HeroCopy';

export default function Home() {
  return (
    <HeroShell className="pt-24 sm:pt-36 lg:pt-42">
      <HeroHeading>
        Free and Open Source <br />
        <span className="text-green-700">Task Manager</span>
      </HeroHeading>
      <HeroCopy>
        Get focused by organizing your plans and goals with simple projects and tasks.
      </HeroCopy>
      <div className="mt-10 flex items-center justify-center">
        <Link href="/auth/sign-in" className={buttonClassNameGreen}>
          Get Started
        </Link>
      </div>
    </HeroShell>
  );
}
