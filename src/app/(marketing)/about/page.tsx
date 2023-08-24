import 'server-only';
import HeroShell from '../modules/common/HeroShell';
import HeroHeading from '../modules/common/HeroHeading';
import HeroCopy from '../modules/common/HeroCopy';
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
