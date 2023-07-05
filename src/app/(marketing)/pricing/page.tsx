import 'server-only';
import Link from 'next/link';
import Button from '../ui/Button';
import HeroShell from '../ui/HeroShell';
import HeroHeading from '../ui/HeroHeading';
import HeroCopy from '../ui/HeroCopy';

export default function Pricing() {
  return (
    <HeroShell>
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
        <Button href="/auth/sign-in">Get Started</Button>
      </div>
    </HeroShell>
  );
}
