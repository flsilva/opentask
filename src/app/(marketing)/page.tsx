import 'server-only';
import Link from 'next/link';
import { buttonGreenClassName } from '@/modules/shared/control/button/buttonClassName';
import { HeroCopy } from '@/modules/marketing/shared/HeroCopy';
import { HeroHeading } from '@/modules/marketing/shared/HeroHeading';
import { ShowContentTransition } from '@/modules/marketing/shared/ShowContentTransition';

export default function LandingPage() {
  return (
    <ShowContentTransition>
      <div className="pt-24 sm:pt-36 lg:pt-42">
        <HeroHeading>
          Free and Open Source <br />
          <span className="text-green-700">Task Manager</span>
        </HeroHeading>
        <HeroCopy>
          Get focused by organizing your plans and goals with simple projects and tasks.
        </HeroCopy>
        <div className="mt-10 flex items-center justify-center">
          <Link href="/auth/sign-in" className={buttonGreenClassName}>
            Get Started
          </Link>
        </div>
      </div>
    </ShowContentTransition>
  );
}
