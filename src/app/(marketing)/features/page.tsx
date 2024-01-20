import 'server-only';
import Image from 'next/image';
import Link from 'next/link';
import { buttonGreenClassName } from '@/features/shared/ui/control/button/buttonClassName';
import { HeroCopy } from '@/features/marketing/shared/ui/HeroCopy';
import { HeroHeading } from '@/features/marketing/shared/ui/HeroHeading';
import { ShowContentTransition } from '@/features/marketing/shared/ui/ShowContentTransition';

export default function FeaturesPage() {
  return (
    <ShowContentTransition>
      <div className="pt-24 sm:pt-36 lg:pt-42">
        <HeroHeading>
          Capture Everything <br />
          <span className="text-green-700">Free Your Mind</span>
        </HeroHeading>
        <HeroCopy>
          Plan and structure everything, from chores to great ideas, as manageable projects and
          tasks.
        </HeroCopy>
        <p className="mt-16 mb-8 text-2xl font-medium text-gray-800">Projects</p>
        <Image
          alt="Projects on OpenTask"
          src="/images/marketing/features/features-img-01.png"
          width={435}
          height={884}
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
          src="/images/marketing/features/features-img-02.png"
          width={435}
          height={884}
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
          src="/images/marketing/features/features-img-03.png"
          width={435}
          height={884}
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
          src="/images/marketing/features/features-img-04.png"
          width={435}
          height={884}
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
          src="/images/marketing/features/features-img-05.png"
          width={435}
          height={884}
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
          src="/images/marketing/features/features-img-06.png"
          width={435}
          height={884}
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
      </div>
    </ShowContentTransition>
  );
}
