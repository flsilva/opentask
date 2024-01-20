'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon } from '@/features/shared/ui/icon/HamburgerMenuIcon';
import { XIcon } from '@/features/shared/ui/icon/XIcon';
import { Logo } from '@/features/shared/ui/logo/Logo';
import { MainMenu } from './MainMenu';
import { MainMenuMobile } from './MainMenuMobile';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="flex">
      <nav className="flex flex-col grow justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Open Task</span>
              <Logo displayText />
            </Link>
          </div>
          {!isMobileMenuOpen && (
            <button
              type="button"
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <HamburgerMenuIcon aria-hidden="true" />
            </button>
          )}
          {isMobileMenuOpen && (
            <button
              type="button"
              className="lg:hidden -m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIcon aria-hidden="true" />
            </button>
          )}
          <div className="hidden lg:flex lg:gap-x-12">
            <MainMenu />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/auth/sign-in"
              className="text-sm font-medium leading-6 text-gray-900 hover:text-green-700"
            >
              Log in &nbsp;<span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="flex lg:hidden">
          <MainMenuMobile
            onItemClick={() => setIsMobileMenuOpen(false)}
            isOpen={isMobileMenuOpen}
          />
        </div>
      </nav>
    </header>
  );
};
