"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../logo/Logo";
import Socials from "../Socials/Socials";

const links = [
  { name: "home", path: "/" },
  { name: "about", path: "/aboutus" },
  { name: "services", path: "/services" },
  { name: "pump stations", path: "/pumpStations" },
  { name: "Projects", path: "/projects" },
  // { name: "application form", path: "/applicationForm" }, // application form is comment to prevent visitor access ((mvp))
  { name: "contact", path: "/contact" },
  { name: "request", path: "/request" },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Toggle Button */}
      <SheetTrigger
        className="
          text-slate-900 
          hover:text-brand_1-600 
          active:text-brand_1-700 
          flex items-center justify-center 
          text-3xl transition-colors
        "
      >
        <RiMenu3Fill />
      </SheetTrigger>

      {/* Mobile Menu */}
      <SheetContent
        side="right"
        className="
          bg-slate-900/90 backdrop-blur-sm
          text-white 
          border-none 
          px-6
        "
      >
        <div className="flex flex-col pt-16 pb-8 items-center justify-between h-full">
          <SheetHeader>
            <SheetTitle>
              <Logo width={100} height={50} />
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigation Menu
            </SheetDescription>
          </SheetHeader>

          {/* Nav Links */}
          <ul className="w-full flex flex-col gap-6 items-center justify-center">
            {links.map((link, indx) => (
              <li key={indx}>
                <Link
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    uppercase font-semibold text-left tracking-[1.2px] text-lg 
                    transition-colors
                    ${
                      pathname === link.path
                        ? "text-brand-yellow"
                        : "text-white hover:text-brand-yellow"
                    }
                  `}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* login link */}
          <div className="mt-10">
            {/* register link is commenteed out */}
            {/* <Link
              prefetch={false}
              href="/myAMSU"
              className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-light rounded-md text-white bg-transparent transition-colors duration-200 shadow-sm"
            >
              Login / Register
            </Link> */}
          </div>
          {/* Social Icons */}
          <div className="mt-10">
            <Socials containerStyles="text-white text-xl flex gap-6" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
