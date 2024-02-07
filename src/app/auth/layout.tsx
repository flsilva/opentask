import '../globals.css';
import Link from 'next/link';
import { Logo } from '@/features/shared/ui/logo/Logo';
import { Footer } from '@/features/marketing/shared/ui/Footer';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-4 flex flex-1 flex-col bg-white px-4 md:mt-6">
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
