"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeToken, isAdmin, getUserFromToken } from "@/lib/auth";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [admin, setAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userData = getUserFromToken();
    setUser(userData);
    setAdmin(isAdmin());
  }, []);

  const handleLogout = () => {
    removeToken();
    router.push("/login");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-gray-300 rounded-lg animate-pulse"></div>
              <span className="ml-3 text-xl font-bold bg-gray-300 h-6 w-24 rounded animate-pulse"></span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-6 w-16 bg-gray-300 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <div className="h-6 w-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 1 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                EJ LTD
              </span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user ? (
                <>
                  <Link
                    href="/"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                  >
                    Home
                  </Link>
                  <Link
                    href="/profile"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                  >
                    Profile
                  </Link>
                  {admin && (
                    <Link
                      href="/dashboard"
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition duration-150"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                  >
                    Home
                  </Link>
                  <Link
                    href="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition duration-150"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none transition duration-150"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border border-gray-200 rounded-lg mt-2 shadow-lg">
              {user ? (
                <>
                  <Link
                    href="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {admin && (
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600 transition duration-150"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-emerald-600 hover:bg-gray-100 transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
