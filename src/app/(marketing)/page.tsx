import 'server-only';
import Link from 'next/link';
import { buttonGreenClassName } from '@/features/shared/ui/control/button/buttonClassName';
import { HeroCopy } from '@/features/marketing/shared/ui/HeroCopy';
import { HeroHeading } from '@/features/marketing/shared/ui/HeroHeading';
import { ShowContentTransition } from '@/features/marketing/shared/ui/ShowContentTransition';

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
