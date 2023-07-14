import '../globals.css';
import Header from './shared/ui/Header';
import Footer from './shared/ui/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-20 flex flex-1 flex-col bg-white">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
}
