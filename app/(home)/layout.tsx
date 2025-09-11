'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 -z-5 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-pulse"></div>

      {/* Layout Container */}
      <div className="flex flex-col min-h-screen overflow-auto">
        {/* Enhanced Navbar */}
        <header className="sticky top-0 w-full bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl z-50 transition-all duration-300 hover:bg-white/15">
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo with icon */}
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                Library System
              </h1>
            </div>

            {/* Enhanced Navigation */}
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-1 bg-white/25 backdrop-blur-md rounded-2xl p-2 border border-white/40 shadow-lg">
                <Link
                  href="/"
                  className="px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-white/60 rounded-xl transition-all duration-300 font-semibold relative group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-white/60 rounded-xl transition-all duration-300 font-semibold relative group"
                >
                  <span className="relative z-10">About</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-gray-800 hover:text-blue-700 hover:bg-white/60 rounded-xl transition-all duration-300 font-semibold relative group"
                >
                  <span className="relative z-10">Contact</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>

              {/* Enhanced Login Button */}
              <Link
                href="/login"
                className="hidden md:flex group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden ml-4"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Login</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* Mobile menu button - Updated with black color and functionality */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-black hover:text-gray-700 hover:bg-white/20 rounded-xl transition-all duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  // Close (X) icon
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger menu icon
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu - Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden relative overflow-hidden">
              {/* Beautiful gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-blue-50/40 to-purple-50/30 backdrop-blur-2xl"></div>

              {/* Subtle animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full filter blur-2xl animate-pulse delay-1000"></div>

              {/* Border and shadow */}
              <div className="border-t border-white/30 shadow-2xl">
                <div className="relative z-10 px-6 py-6 space-y-3">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-5 py-4 text-gray-700 hover:text-blue-700 hover:bg-white/50 rounded-2xl transition-all duration-300 font-semibold backdrop-blur-sm border border-transparent hover:border-white/40 hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    <span className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Home</span>
                    </span>
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-5 py-4 text-gray-700 hover:text-blue-700 hover:bg-white/50 rounded-2xl transition-all duration-300 font-semibold backdrop-blur-sm border border-transparent hover:border-white/40 hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    <span className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>About</span>
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-5 py-4 text-gray-700 hover:text-blue-700 hover:bg-white/50 rounded-2xl transition-all duration-300 font-semibold backdrop-blur-sm border border-transparent hover:border-white/40 hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    <span className="flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Contact</span>
                    </span>
                  </Link>

                  {/* Elegant divider */}
                  <div className="flex items-center py-2">
                    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </div>

                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-5 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white rounded-2xl font-semibold text-center shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Login</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Page Content with enhanced container */}
        <main className="flex-grow relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none"></div>
          {children}
        </main>

        {/* Enhanced Footer */}
        <footer className="relative text-center py-8 bg-black/20 backdrop-blur-xl border-t border-white/20 overflow-hidden">
          {/* Footer background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-400 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative z-10">
            {/* Footer content */}
            <div className="max-w-4xl mx-auto px-6 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                  <span className="text-white/90 font-semibold">Library Management System</span>
                </div>

                <div className="flex space-x-6 text-sm">
                  <Link href="/privacy" className="text-white/70 hover:text-white transition-colors duration-300">Privacy</Link>
                  <Link href="/terms" className="text-white/70 hover:text-white transition-colors duration-300">Terms</Link>
                  <Link href="/support" className="text-white/70 hover:text-white transition-colors duration-300">Support</Link>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-white/60 text-sm">
                &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
              </p>
              <p className="text-white/40 text-xs mt-2">
                Empowering libraries with digital innovation
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}