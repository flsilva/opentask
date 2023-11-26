import Link from 'next/link';
import { Logo } from '@/modules/shared/logo/Logo';
import { buttonGreenClassName } from '@/modules/shared/control/button/buttonClassName';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col mt-8">
      <div className="flex flex-col items-center">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Open Task</span>
          <Logo displayText />
        </Link>
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-3xl">404</h2>
          <p className="mt-4">This page could not be found.</p>
          <Link href="/" className={`${buttonGreenClassName} mt-8`}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
