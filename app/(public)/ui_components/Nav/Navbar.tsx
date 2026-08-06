"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowRightUpLine } from "react-icons/ri";
import Logo from "../logo/Logo";
import MobileNav from "../Mobile/MobileNav";
// import Topbar from "../Nav/topNav/TopNav";

const links = [
  { name: "home", path: "/" },
  { name: "about", path: "/aboutus" },
  { name: "services", path: "/services" },
  { name: "pump stations", path: "/pumpStations" },
  { name: "Projects", path: "/projects" },
  // { name: "application form", path: "/applicationForm" }, // application form is commented out from visitor view
  { name: "contact", path: "/contact" },
  { name: "request", path: "/request" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-gray-100 border-b-2 border-brand_1-300 py-3 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo width={70} height={70} />

          <nav className="hidden xl:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {links.map((link, index) => {
                const isActive = pathname === link.path;

                return (
                  <li key={index}>
                    <Link
                      href={link.path}
                      className={`relative text-sm font-bold uppercase tracking-wider transition-all
                          ${isActive ? "text-brand_1-600" : "text-slate-700"}
                          hover:text-brand_1-600
                          after:content-[''] after:absolute after:-bottom-1 after:left-0 
                          after:w-0 after:h-[2px] after:bg-brand_1-600 after:transition-all
                          hover:after:w-full ${isActive ? "after:w-full" : ""}
                        `}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => (window.location.href = "/request")}
              className="group flex items-center bg-slate-900 rounded-full overflow-hidden hover:bg-green-700 transition-all"
            >
              <span className="pl-6 pr-4 text-white font-bold text-xs uppercase tracking-widest">
                get a quote
              </span>
              <div className="m-1 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20">
                <RiArrowRightUpLine className="text-white text-xl group-hover:rotate-45 transition-all" />
              </div>
            </button>
          </nav>

          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
