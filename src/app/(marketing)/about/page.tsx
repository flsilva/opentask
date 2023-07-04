import 'server-only';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-tight">
            Create a community
            <br />
            <span className="text-green-700">To learn new tech</span>
          </h1>
          <p className="mt-6 text-left text-xl leading-8 text-gray-500">
            OpenTask is a free and open source project created by Flavio Silva on top of the new
            Next.js App Router (v16.4+) and the unique features it brings together (RSC, Streaming,
            Server Actions, etc.).
            <br />
            <br />
            The beta version is fully functional, and you can use it as your primary task management
            tool.
            <br />
            <br />
            The goal is to create a community around the project by making it free and open source,
            where developers can help evolve the project through contributions for new features and
            bug fixes.
            <br />
            <br />
            And most importantly, the project has the potential to serve as a central hub for
            developers to share knowledge and establish best practices for using these new features.
            Let&apos;s make this an opportunity to give back, learn and evolve.
            <br />
            <br />
            Flavio Silva,
            <br />
            July 2023
          </p>
        </div>
      </div>
    </div>
  );
}
