import 'server-only';
import Image from 'next/image';
import Link from 'next/link';
import { buttonGreenClassName } from '@/modules/shared/controls/button/buttonClassName';
import { HeroShell } from '@/modules/marketing/shared/HeroShell';
import { HeroHeading } from '@/modules/marketing/shared/HeroHeading';
import { HeroCopy } from '@/modules/marketing/shared/HeroCopy';
import imgFeatures01 from './features-img-01.png';
import imgFeatures02 from './features-img-02.png';
import imgFeatures03 from './features-img-03.png';
import imgFeatures04 from './features-img-04.png';
import imgFeatures05 from './features-img-05.png';
import imgFeatures06 from './features-img-06.png';

export default function FeaturesPage() {
  return (
    <HeroShell className="pt-24 sm:pt-36 lg:pt-42">
      <HeroHeading>
        Capture Everything <br />
        <span className="text-green-700">Free Your Mind</span>
      </HeroHeading>
      <HeroCopy>
        Plan and structure everything, from chores to great ideas, as manageable projects and tasks.
      </HeroCopy>
      <p className="mt-16 mb-8 text-2xl font-medium text-gray-800">Projects</p>
      <Image
        alt="Projects on OpenTask"
        src={imgFeatures01}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '280px',
          width: '100%',
          height: 'auto',
        }}
      />
      <p className="mt-6 mb-8 text-lg leading-8 text-gray-800">
        Your projects are your goals. Have them at the appropriate size so you can complete all
        their tasks and achieve your goals.
      </p>
      <p className="mt-16 mb-8 text-2xl font-medium text-gray-800">Tasks</p>
      <Image
        alt="Tasks on OpenTask"
        src={imgFeatures02}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '280px',
          width: '100%',
          height: 'auto',
        }}
      />
      <p className="mt-6 mb-16 text-lg leading-8 text-gray-800">
        Your tasks are grouped into projects.
      </p>
      <Image
        alt="Tasks on OpenTask"
        src={imgFeatures03}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '280px',
          width: '100%',
          height: 'auto',
        }}
      />
      <p className="mt-6 mb-16 text-lg leading-8 text-gray-800">
        Break your to-dos into smaller, actionable tasks.
      </p>
      <Image
        alt="Tasks on OpenTask"
        src={imgFeatures04}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '280px',
          width: '100%',
          height: 'auto',
        }}
      />
      <p className="mt-6 mb-16 text-lg leading-8 text-gray-800">
        Set due dates for each task to keep track of them.
      </p>
      <Image
        alt="Tasks on OpenTask"
        src={imgFeatures05}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '280px',
          width: '100%',
          height: 'auto',
        }}
      />
      <p className="mt-6 text-lg leading-8 text-gray-800">
        Complete one task at a time towards your progress.
      </p>
      <p className="mt-12 mb-6 text-2xl font-medium text-gray-800">What about today?</p>
      <Image
        alt="Tasks on OpenTask"
        src={imgFeatures06}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '280px',
          width: '100%',
          height: 'auto',
        }}
      />
      <p className="mt-6 mb-16 text-lg leading-8 text-gray-800">
        See what tasks you have for today and what is overdue.
      </p>
      <div className="mt-10 flex items-center justify-center">
        <Link href="/auth/sign-in" className={buttonGreenClassName}>
          Get Started
        </Link>
      </div>
    </HeroShell>
  );
}
