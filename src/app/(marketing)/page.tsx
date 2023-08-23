import 'server-only';
import Link from 'next/link';
import { buttonClassNameGreen } from '@/app/modules/common//button/buttonClassName';
import HeroShell from './modules/common/HeroShell';
import HeroHeading from './modules/common/HeroHeading';
import HeroCopy from './modules/common/HeroCopy';

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
