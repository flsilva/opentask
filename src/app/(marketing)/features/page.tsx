import 'server-only';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl sm:leading-tight">
            Capture Everything <br />
            <span className="text-green-700">Free Your Mind</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-500">
            Plan and structure everything, from chores to great ideas, as manageable projects and
            tasks.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/"
              className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
