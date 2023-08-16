import Link from 'next/link';
import { LogoIcon } from './LogoIcon';

interface LogoProps {
  readonly fillColor?: string;
  readonly textColor?: string;
}

export const Logo = ({ fillColor = 'fill-green-700', textColor = 'text-green-700' }: LogoProps) => (
  <div className="flex flex-row">
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Open Task</span>
      <LogoIcon className={fillColor} />
    </Link>
    <Link href="/" className="-m-1.5 p-1.5">
      <h1 className={`ml-2 text-lg font-semibold leading-8 ${textColor}`}>OpenTask</h1>
    </Link>
  </div>
);
