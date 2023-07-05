import Link from 'next/link';
import { LogoSvg } from './LogoSvg';

export const Logo = () => (
  <div className="flex flex-row">
    <Link href="/" className="-m-1.5 p-1.5 ">
      <span className="sr-only">Open Task</span>
      <LogoSvg className="fill-green-700" />
    </Link>
    <Link href="/" className="-m-1.5 p-1.5">
      <h1 className="ml-2 text-lg font-semibold leading-8 text-green-700">OpenTask</h1>
    </Link>
  </div>
);
