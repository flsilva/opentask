import 'server-only';
import PrivacyMDX from './privacy.mdx';

export default function About() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl pt-12 sm:pt-16 lg:pt-20">
        <PrivacyMDX />
      </div>
    </div>
  );
}
