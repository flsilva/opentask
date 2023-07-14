import Link from 'next/link';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  readonly href?: string;
  readonly onClick?: () => void;
}

export const buttonClassNameCommon =
  'flex items-center justify-center rounded-md px-3.5 py-2.5 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

export const buttonClassNameGreen = `${buttonClassNameCommon} bg-green-600  text-white hover:bg-green-500 focus-visible:outline-green-600`;

export const buttonClassNameWhite = `${buttonClassNameCommon} border bg-white text-gray-700 hover:bg-gray-50 focus-visible:outline-gray-700`;

export default function Button({
  children,
  className,
  color = 'green',
  href,
  onClick,
}: ButtonProps) {
  if (typeof href !== 'string' && (onClick === undefined || onClick === null)) {
    throw new Error("<Button>: Either 'href' or 'onClick' must be provided.");
  }

  let buttonClassName = color === 'white' ? buttonClassNameWhite : buttonClassNameGreen;

  if (className) buttonClassName += ` ${className}`;

  if (typeof href === 'string') {
    return (
      <Link href={href} className={buttonClassName} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  );
}
