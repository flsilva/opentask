import '../globals.css';
import { Logo } from '@/modules/shared/logo/Logo';
import Footer from '@/modules/marketing/shared/Footer';

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
