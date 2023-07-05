import Link from 'next/link';
import { GitHubLogoSvg } from '@/shared/ui/GitHubLogoSvg';
import { TwitterLogoSvg } from '@/shared/ui/TwitterLogoSvg';

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mb-6 items-center px-6 md:flex md:justify-between lg:px-8">
        <p className="text-center md:text-left">
          <Link href="/" className=" hover:text-green-500">
            © 2023 OpenTask Team
          </Link>
        </p>
        <div className="mt-6 flex justify-center md:mt-0">
          <Link className="mr-6" href="/">
            <GitHubLogoSvg className="fill-black hover:fill-green-500" />
          </Link>
          <Link href="/">
            <TwitterLogoSvg className="fill-black hover:fill-green-500" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
