import 'server-only';
import Link from 'next/link';
import { buttonClassNameGreen } from '@/app/modules/common//button/buttonClassName';
import HeroShell from '../modules/common/HeroShell';
import HeroHeading from '../modules/common/HeroHeading';
import HeroCopy from '../modules/common/HeroCopy';

export default function Pricing() {
  return (
    <HeroShell className="pt-16 sm:pt-32 lg:pt-38">
      <HeroHeading>
        Free & Open Source
        <br />
        <span className="text-green-700">Forever</span>
      </HeroHeading>
      <HeroCopy>
        OpenTask will always be free and open source software. Our goal is not to make money with
        the project but to build a community and learn together while having fun building a fully
        functional web app on top of bleeding-edge technology.
        <br />
        <br />
        Check out our{' '}
        <Link href="/about" className="font-medium text-green-700">
          About
        </Link>{' '}
        page for more information.
      </HeroCopy>
      <div className="mt-10 flex items-center justify-center">
        <Link href="/auth/sign-in" className={buttonClassNameGreen}>
          Get Started
        </Link>
      </div>
    </HeroShell>
  );
}
