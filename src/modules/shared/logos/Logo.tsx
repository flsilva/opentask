import { LogoIcon } from './LogoIcon';

interface LogoProps {
  readonly color?: 'green' | 'white';
  readonly displayText?: boolean;
  readonly height?: string;
  readonly width?: string;
}

export const Logo = ({
  color = 'green',
  height = '2rem',
  displayText = false,
  width = '2rem',
}: LogoProps) => (
  <div className="flex flex-row">
    <LogoIcon
      className={color === 'green' ? 'fill-green-700' : 'fill-gray-50'}
      height={height}
      width={width}
    />
    {displayText && (
      <h1
        className={`ml-2 text-lg font-semibold leading-8 ${
          color === 'green' ? 'text-green-700' : 'text-gray-50'
        }`}
      >
        OpenTask
      </h1>
    )}
  </div>
);
