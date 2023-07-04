import '../globals.css';
import Header from './ui/Header';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white">
      <Header />
      {children}
    </div>
  );
}
