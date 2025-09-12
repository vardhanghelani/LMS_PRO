'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X, 
  LogOut,
  User,
  BarChart3,
  Library,
  FileText,
  CreditCard,
  Heart,
  History,
  Shield,
  UserCheck
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { navVariants, mobileMenuVariants } from '@/app/lib/motion';

interface AppShellProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'librarian' | 'patron';
  userName?: string;
  userEmail?: string;
}

const navigationItems = {
  admin: [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Librarians', href: '/admin/librarians', icon: UserCheck },
    { name: 'Patrons', href: '/admin/patrons', icon: Users },
    { name: 'Statistics', href: '/admin/statatics', icon: BarChart3 },
    { name: 'Contact', href: '/admin/contact', icon: FileText },
  ],
  librarian: [
    { name: 'Dashboard', href: '/librarian', icon: Home },
    { name: 'Items', href: '/librarian/items', icon: BookOpen },
    { name: 'Patrons', href: '/librarian/patrons', icon: Users },
    { name: 'Issue', href: '/librarian/issue', icon: Library },
    { name: 'Return', href: '/librarian/return', icon: BookOpen },
    { name: 'Reservations', href: '/librarian/reservations', icon: FileText },
    { name: 'Fines', href: '/librarian/fines', icon: CreditCard },
    { name: 'Account', href: '/librarian/account', icon: User },
  ],
  patron: [
    { name: 'Items', href: '/patron/items', icon: BookOpen },
    { name: 'History', href: '/patron/history', icon: History },
    { name: 'Wishlist', href: '/patron/wishlist', icon: Heart },
    { name: 'Return', href: '/patron/return', icon: BookOpen },
    { name: 'Notifications', href: '/patron/notifications', icon: Bell },
    { name: 'Account', href: '/patron/account', icon: User },
  ],
};

export function AppShell({ children, userRole = 'patron', userName, userEmail }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentNavItems = navigationItems[userRole] || [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'librarian': return 'Librarian';
      case 'patron': return 'Patron';
      default: return 'User';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'librarian': return 'from-blue-500 to-cyan-500';
      case 'patron': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Top Navigation Bar */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'nova-glass backdrop-blur-xl shadow-lg' 
            : 'bg-transparent'
        }`}
        variants={navVariants}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getRoleColor(userRole)} flex items-center justify-center shadow-lg`}>
                <Library className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-heading gradient-text">
                  Nova Library
                </h1>
                <p className="text-xs text-muted-foreground">
                  {getRoleDisplayName(userRole)}
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {currentNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={isActive ? "nova" : "ghost"}
                      size="sm"
                      onClick={() => router.push(item.href)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'shadow-nova' 
                          : 'hover:bg-white/10 hover:shadow-md'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                    </Button>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Search className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* Notifications */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="rounded-xl relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
              </motion.div>

              {/* User Menu */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <User className="w-5 h-5" />
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div 
                className="md:hidden"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded-xl"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] nova-glass backdrop-blur-xl"
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="p-6">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRoleColor(userRole)} flex items-center justify-center shadow-lg`}>
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{userName || 'User'}</h3>
                    <p className="text-sm text-white/70">{userEmail}</p>
                    <p className="text-xs text-white/50">{getRoleDisplayName(userRole)}</p>
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {currentNavItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant={isActive ? "nova" : "ghost"}
                          className={`w-full justify-start space-x-3 px-4 py-3 rounded-xl ${
                            isActive ? 'shadow-nova' : 'hover:bg-white/10'
                          }`}
                          onClick={() => {
                            router.push(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Logout Button */}
                <motion.div
                  className="mt-8 pt-6 border-t border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="destructive"
                    className="w-full justify-start space-x-3 px-4 py-3 rounded-xl"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
