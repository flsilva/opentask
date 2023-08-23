import '../globals.css';
import { Logo } from '@/app/modules/common/logo/Logo';
import Footer from '../(marketing)/modules/common/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-8 flex flex-1 flex-col bg-white px-4 md:mt-12">
        <div className="flex justify-center">
          <Logo />
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
