import Link from 'next/link';
import { ChildrenProps } from './ChildrenProps';
import { Href } from './MainNav';

interface ButtonProps extends ChildrenProps, Href {}

export default function Button({ children, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      {children}
    </Link>
  );
}
