"use client";
import { MaxWidthWrapper } from "@/utils/max-width-wrapper";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { Link } from "@/utils/navigation";
import { PATH } from "@/utils/navigation/config";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = null;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full bg-blue-300/55 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between px-2 md:px-7">
          <Link href="/" className="z-40 flex font-semibold">
            <span>Poll App</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <ThemeSwitcher />
                <Button className="w-fit" variant="ghost" asChild>
                  <Link
                    href={{
                      pathname: PATH.SIGN_IN,
                    }}
                  >
                    Sign in
                  </Link>
                </Button>
                <Button className="w-fit" variant="ghost" asChild>
                  <Link
                    href={{
                      pathname: PATH.CREATE_ACCOUNT,
                    }}
                  >
                    Get Started <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>

                <Button>My profile</Button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4 sm:hidden">
            <button
              onClick={toggleMenu}
              className="z-50 p-2 focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-col space-y-4 bg-blue-300/90 p-4 sm:hidden">
            <ThemeSwitcher />
            {!user ? (
              <>
                <Button variant="ghost" size="sm" onClick={toggleMenu}>
                  Sign in
                </Button>
                <Button size="sm" onClick={toggleMenu}>
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={toggleMenu}>
                  Dashboard
                </Button>
                <Button onClick={toggleMenu}>My profile</Button>
              </>
            )}
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
}
