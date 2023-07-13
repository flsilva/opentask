import Link from 'next/link';
import { GitHubLogoIcon } from '@/app/shared/ui/icon/GitHubLogoIcon';
import { TwitterLogoIcon } from '@/app/shared/ui/icon/TwitterLogoIcon';

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mt-20 items-center bg-gray-100 px-6 py-6 md:flex md:justify-between lg:px-8">
        <p className="text-center md:text-left">
          <Link href="/" className=" hover:text-green-500">
            © 2023 OpenTask Team
          </Link>
        </p>
        <div className="mt-6 flex justify-center md:mt-0">
          <Link className="mr-6" href="/">
            <GitHubLogoIcon className="fill-black hover:fill-green-500" />
          </Link>
          <Link href="/">
            <TwitterLogoIcon className="fill-black hover:fill-green-500" />
          </Link>
        </div>
      </div>
    </footer>
  );
}