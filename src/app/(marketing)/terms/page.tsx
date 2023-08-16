import 'server-only';
import TermsMDX from './terms.mdx';

export default function About() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl mb-20 pt-12 sm:pt-16 lg:pt-20">
        <TermsMDX />
      </div>
    </div>
  );
}
