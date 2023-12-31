import 'server-only';
import Link from 'next/link';
import { buttonGreenClassName } from '@/modules/shared/control/button/buttonClassName';
import { HeroCopy } from '@/modules/marketing/shared/HeroCopy';
import { HeroHeading } from '@/modules/marketing/shared/HeroHeading';
import { ShowContentTransition } from '@/modules/marketing/shared/ShowContentTransition';

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
