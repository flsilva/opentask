import '../globals.css';
import Header from './ui/Header';
import Footer from './ui/Footer';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
