import Link from 'next/link';
import '../globals.css';
import { Logo } from '@/modules/shared/logo/Logo';
import { Footer } from '@/modules/marketing/shared/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-8 flex flex-1 flex-col bg-white px-4 md:mt-12">
        <div className="flex justify-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Open Task</span>
            <Logo displayText />
          </Link>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
