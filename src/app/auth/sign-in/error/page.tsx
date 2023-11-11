import Link from 'next/link';
import { buttonGreenClassName } from '@/modules/shared/controls/button/buttonClassName';

export default function CheckEmailLinkPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mt-10 text-2xl font-medium text-black md:text-3xl">Error</h2>
      <div className="flex flex-col mt-4 items-center sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mb-6 text-center">There was an error trying to sign you in.</p>
        <Link href="/auth/sign-in" className={buttonGreenClassName}>
          Try again
        </Link>
      </div>
    </div>
  );
}
