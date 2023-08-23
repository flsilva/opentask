import 'server-only';
import HeroShell from '../modules/common/HeroShell';
import HeroHeading from '../modules/common/HeroHeading';
import HeroCopy from '../modules/common/HeroCopy';

export default function About() {
  return (
    <HeroShell className="pt-12 sm:pt-20 lg:pt-20">
      <HeroHeading>
        Create a community
        <br />
        <span className="text-green-700">To learn new tech</span>
      </HeroHeading>
      <HeroCopy className="text-left">
        OpenTask is a free and open source project created by Flavio Silva on top of the new Next.js
        App Router (v16.4+) and the unique features it brings together (RSC, Streaming, Server
        Actions, etc.).
        <br />
        <br />
        The beta version is fully functional, and you can use it as your primary task management
        tool.
        <br />
        <br />
        The goal is to create a community around the project by making it free and open source,
        where developers can help evolve the project through contributions for new features and bug
        fixes.
        <br />
        <br />
        And most importantly, the project has the potential to serve as a central hub for developers
        to share knowledge and establish best practices for using these new features. Let&apos;s
        make this an opportunity to give back, learn and evolve.
        <br />
        <br />
        Flavio Silva,
        <br />
        July 2023
      </HeroCopy>
    </HeroShell>
  );
}
