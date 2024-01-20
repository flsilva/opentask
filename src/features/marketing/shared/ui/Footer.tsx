import Link from 'next/link';
import { GitHubLogoIcon } from '@/features/shared/ui/icon/GitHubLogoIcon';

export const Footer = () => {
  return (
    <footer>
      <div className="items-center bg-gray-100 px-6 py-6 md:flex md:justify-between lg:px-8">
        <p className="text-center text-sm md:text-left">
          © OpenTask
          <span className="ml-3">|</span>
          <Link href="/privacy" className="hover:text-green-500 ml-3">
            Privacy
          </Link>
          <span className="ml-3">|</span>
          <Link href="/terms" className="hover:text-green-500 ml-3">
            Terms
          </Link>
        </p>
        <div className="mt-6 flex justify-center md:mt-0">
          <Link className="mr-6" href="https://github.com/flsilva/opentask/">
            <GitHubLogoIcon className="fill-black hover:fill-green-500" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
