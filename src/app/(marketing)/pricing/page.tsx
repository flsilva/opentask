import Link from 'next/link';
import { buttonGreenClassName } from '@/features/shared/ui/control/button/buttonClassName';
import { HeroCopy } from '@/features/marketing/shared/ui/HeroCopy';
import { HeroHeading } from '@/features/marketing/shared/ui/HeroHeading';
import { ShowContentTransition } from '@/features/marketing/shared/ui/ShowContentTransition';

export default function PricingPage() {
  return (
    <ShowContentTransition>
      <div className="pt-16 sm:pt-32 lg:pt-38">
        <HeroHeading>
          Free
          <br />
          <span className="text-green-700">Open Source</span>
        </HeroHeading>
        <HeroCopy>
          OpenTask is free and open source software.
          <br />
          We aim to build a community and learn together while having fun building a fully
          functional and responsive PWA on top of bleeding-edge technology.
          <br />
          <br />
          Check the{' '}
          <Link href="/about" className="font-medium text-green-700">
            About
          </Link>{' '}
          page for more information.
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
