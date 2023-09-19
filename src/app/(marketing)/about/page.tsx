import 'server-only';
import HeroShell from '@/modules/marketing/shared/HeroShell';
import HeroHeading from '@/modules/marketing/shared/HeroHeading';
import HeroCopy from '@/modules/marketing/shared/HeroCopy';
import AboutMDX from './about.mdx';

export default function About() {
  return (
    <HeroShell className="pt-12 sm:pt-20 lg:pt-20">
      <HeroHeading>
        Foster a community
        <br />
        <span className="text-green-700">To learn new tech</span>
      </HeroHeading>
      <HeroCopy className="text-left">
        <AboutMDX />
      </HeroCopy>
    </HeroShell>
  );
}
