import './globals.css';
import { Inter } from 'next/font/google';
import Menu from './ui/shared/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Manager App',
  description: 'Yet another Task Manager app. But this one is on Next.js App Router!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        <br />
        <br />
        <h1>Root layout.</h1>
        {children}
      </body>
    </html>
  );
}
