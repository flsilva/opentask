import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "OpenTask.app: You're offline",
};

export default function OfflinePage() {
  return (
    <div className="flex flex-col h-screen w-full items-center px-12">
      <Image
        src="/logo-text-512x512.png"
        width={280}
        height={280}
        alt="OpenTask.app"
        className="sm:hidden"
      />
      <Image
        src="/logo-text-512x512.png"
        width={512}
        height={512}
        alt="OpenTask.app"
        className="hidden sm:block"
      />
      <p className="text-lg text-center">
        You&apos;re offline.
        <br />
        Please check your internet connection.
      </p>
    </div>
  );
}
