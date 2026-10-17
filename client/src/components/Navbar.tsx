import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../contexts/AuthContext";

type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
  external?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "Rooms",
    to: "/home",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><path fill="#90A4AE" fill-rule="evenodd" d="M17.632 1.25h-5.764c-.743 0-1.346 0-1.835.04c-.505.041-.954.129-1.372.341a3.5 3.5 0 0 0-1.53 1.53c-.212.418-.3.867-.341 1.372c-.04.489-.04 1.092-.04 1.835v.382h-.382c-.743 0-1.346 0-1.835.04c-.505.041-.954.129-1.372.341a3.5 3.5 0 0 0-1.53 1.53c-.212.418-.3.867-.341 1.372c-.04.489-.04 1.092-.04 1.835v5.764c0 .743 0 1.346.04 1.835c.041.505.129.955.341 1.372a3.5 3.5 0 0 0 1.53 1.53c.418.212.867.3 1.372.341c.489.04 1.092.04 1.835.04h5.764c.743 0 1.346 0 1.835-.04c.505-.041.954-.129 1.372-.341a3.5 3.5 0 0 0 1.53-1.53c.212-.417.3-.867.341-1.372c.04-.489.04-1.092.04-1.835v-.382h.382c.743 0 1.346 0 1.835-.04c.505-.041.955-.129 1.372-.341a3.5 3.5 0 0 0 1.53-1.53c.212-.418.3-.867.341-1.372c.04-.489.04-1.092.04-1.835V6.368c0-.743 0-1.346-.04-1.835c-.041-.505-.129-.954-.341-1.372a3.5 3.5 0 0 0-1.53-1.53c-.417-.212-.867-.3-1.372-.341c-.489-.04-1.092-.04-1.835-.04m-1.882 16v.35c0 .782 0 1.324-.035 1.745c-.034.412-.096.642-.183.813a2 2 0 0 1-.874.874c-.17.087-.4.15-.813.183c-.42.034-.963.035-1.745.035H6.4c-.782 0-1.324 0-1.745-.035c-.412-.034-.642-.096-.813-.183a2 2 0 0 1-.874-.874c-.087-.17-.15-.4-.183-.813c-.034-.42-.035-.963-.035-1.745v-5.7c0-.782 0-1.324.035-1.745c.034-.412.096-.642.183-.813a2 2 0 0 1 .874-.874c.17-.087.4-.15.813-.183c.42-.034.963-.035 1.745-.035h.35v3.882c0 .743 0 1.346.04 1.835c.041.505.129.954.341 1.372a3.5 3.5 0 0 0 1.53 1.53c.418.212.867.3 1.372.341c.489.04 1.092.04 1.835.04zm-7.5-5.15c0 .782 0 1.324.035 1.745c.034.412.096.642.183.813a2 2 0 0 0 .874.874c.17.087.4.15.813.183c.42.034.963.035 1.745.035h5.7c.782 0 1.324 0 1.745-.035c.412-.034.642-.096.813-.183a2 2 0 0 0 .874-.874c.087-.17.15-.4.183-.813c.034-.42.035-.963.035-1.745V6.4c0-.782 0-1.324-.035-1.745c-.034-.412-.096-.642-.183-.813a2 2 0 0 0-.874-.874c-.17-.087-.4-.15-.813-.183c-.42-.034-.963-.035-1.745-.035h-5.7c-.782 0-1.324 0-1.745.035c-.412.034-.642.096-.813.183a2 2 0 0 0-.874.874c-.087.17-.15.4-.183.813c-.034.42-.035.963-.035 1.745z" clip-rule="evenodd"/></svg>
    ),
  },
  {
    label: "Github",
    to: "https://github.com/ic0e/syncyt",
    external: true,
    icon: (
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5H14C14.5304 0.5 15.0391 0.710714 15.4142 1.08579C15.7893 1.46086 16 1.96957 16 2.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V2.5ZM3.293 3.793C3.48053 3.60553 3.73484 3.50021 4 3.50021C4.26516 3.50021 4.51947 3.60553 4.707 3.793L7.707 6.793C7.89447 6.98053 7.99979 7.23484 7.99979 7.5C7.99979 7.76516 7.89447 8.01947 7.707 8.207L4.707 11.207C4.5184 11.3892 4.2658 11.49 4.0036 11.4877C3.7414 11.4854 3.49059 11.3802 3.30518 11.1948C3.11977 11.0094 3.0146 10.7586 3.01233 10.4964C3.01005 10.2342 3.11084 9.9816 3.293 9.793L5.586 7.5L3.293 5.207C3.10553 5.01947 3.00021 4.76516 3.00021 4.5C3.00021 4.23484 3.10553 3.98053 3.293 3.793ZM9 9.5C8.73478 9.5 8.48043 9.60536 8.29289 9.79289C8.10536 9.98043 8 10.2348 8 10.5C8 10.7652 8.10536 11.0196 8.29289 11.2071C8.48043 11.3946 8.73478 11.5 9 11.5H12C12.2652 11.5 12.5196 11.3946 12.7071 11.2071C12.8946 11.0196 13 10.7652 13 10.5C13 10.2348 12.8946 9.98043 12.7071 9.79289C12.5196 9.60536 12.2652 9.5 12 9.5H9Z"
          fill="#90A4AE" // placeholder svgs
        />
      </svg>
    ),
  },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((item) => {
        const shared = "flex items-center gap-x-2 p-1 font-medium text-sm transition-colors";
      
        if (item.external) {
          return (
            <li key={item.label}>
              <a
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigate}
                className={`${shared} text-zinc-400 hover:text-zinc-100`}
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          );
        }
      
        return (
          <li key={item.label}>
            <NavLink
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `${shared} ${isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-100"}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </li>
        );
      })}
      </ul>
  );
}

export default function NavbarDefault() {
  const [openNav, setOpenNav] = useState(false);
  const { session, loading } = useAuth()
  
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className="mx-auto max-w-screen-xl rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 lg:px-8 lg:py-4">
      <div className="mx-auto flex items-center justify-between text-zinc-100">
        <Link
          to="/"
          className="mr-4 cursor-pointer py-1.5 font-medium text-base"
        >
          Synctwobe
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>

        {session ? (
          <div className="flex items-center gap-x-1">
            <Link
              to="/profile"
              className="hidden lg:inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#90A4AE" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1"/></svg>
              Profile
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="hidden lg:inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <Link
              to="/signin"
              className="hidden lg:inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="hidden lg:inline-flex items-center rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-900 hover:bg-white transition-colors"
            >
              Sign Up
            </Link>
  
            <button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={openNav}
              onClick={() => setOpenNav((v) => !v)}
              className="ml-auto h-6 w-6 text-zinc-200 hover:bg-transparent lg:hidden"
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        )}</div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          openNav ? "max-h-[32rem] opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto">
          <NavList onNavigate={() => setOpenNav(false)} />
          <div className="flex items-center gap-x-1">
            <Link
              to="/signin"
              onClick={() => setOpenNav(false)}
              className="flex-1 text-center rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpenNav(false)}
              className="flex-1 text-center rounded-md bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-white transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
