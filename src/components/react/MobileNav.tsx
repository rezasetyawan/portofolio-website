import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

const NavLink = ({
  label,
  href,
  closeMobileNav,
  currentPathname,
}: {
  label: string;
  href: string;
  closeMobileNav: () => void;
  currentPathname: string;
}) => {
  const subpath = currentPathname.match(/[^\/]+/g);
  const isActive = href === currentPathname || href === "/" + subpath?.[0];

  return (
    <a
      href={href}
      onClick={closeMobileNav}
      className={`w-fit ${isActive && "border-b-2 border-[#616f39] font-medium"}`}
    >
      {label}
    </a>
  );
};

const MobileNav = ({ pathname }: { pathname: string }) => {
  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Portofolio",
      href: "/portofolio",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsOpen((current) => !current);
  };

  const closeMobileNavbar = () => {
    setIsOpen(false);
  };

  const mobileNavRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileNavRef.current &&
      !mobileNavRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative sm:hidden" ref={mobileNavRef}>
      <Button className="h-auto w-auto rounded-full" onClick={toggleMobileNav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="21" x2="3" y1="6" y2="6" />
          <line x1="15" x2="3" y1="12" y2="12" />
          <line x1="17" x2="3" y1="18" y2="18" />
        </svg>
      </Button>
      <nav
        className={`fixed left-5 mt-5 flex w-52 flex-col gap-3 rounded-md bg-white p-3 text-black transition-all ${isOpen ? "opacity-100" : " opacity-0"}`}
      >
        {routes.map((route) => (
          <NavLink
            label={route.label}
            href={route.href}
            closeMobileNav={closeMobileNavbar}
            key={route.href}
            currentPathname={pathname}
          />
        ))}
      </nav>
    </div>
  );
};

export default MobileNav;
