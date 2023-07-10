import Link from 'next/link';
import { ChildrenProps } from '../ChildrenProps';
import { ClassNamePropsOptional } from '../ClassNameProps';
import { UrlObject } from 'url';

interface ButtonProps extends ChildrenProps, ClassNamePropsOptional {
  readonly color?: 'green' | 'white';
  readonly href?: string;
  readonly onClick?: () => void;
}

export default function Button({
  children,
  className,
  color: userColor,
  href,
  onClick,
}: ButtonProps) {
  if (typeof href !== 'string' && (onClick === undefined || onClick === null)) {
    throw new Error("<Button>: Either 'href' or 'onClick' must be provided.");
  }

  const color = userColor ?? 'green';

  let classes =
    'flex items-center justify-center rounded-md px-3.5 py-2.5 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  if (color === 'green') {
    classes += ' bg-green-600  text-white hover:bg-green-500 focus-visible:outline-green-600';
  } else {
    classes += ' border bg-white text-gray-700 hover:bg-gray-50 focus-visible:outline-gray-700';
  }
  if (className) classes += ` ${className}`;

  if (typeof href === 'string') {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
