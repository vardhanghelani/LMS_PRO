'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, BookOpen, FileText, RotateCcw, CalendarDays, Users, DollarSign, User, Bell, LogOut, X, Library, BarChart3
} from 'lucide-react';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { logout } from '@/app/utils/authClient';

const librarianNavItems = [
    { name: 'Dashboard', href: '/librarian', icon: BarChart3 },
    { name: 'Items', href: '/librarian/items', icon: BookOpen },
    { name: 'Issue', href: '/librarian/issue', icon: FileText },
    { name: 'Return', href: '/librarian/return', icon: RotateCcw },
    { name: 'Reservations', href: '/librarian/reservations', icon: CalendarDays },
    { name: 'Patrons', href: '/librarian/patrons', icon: Users },
    { name: 'Fines', href: '/librarian/fines', icon: DollarSign },
];

export default function LibrarianLayout({ children }: { children: React.ReactNode }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const confirmLogout = async () => {
        try {
            await logout();
            localStorage.clear();
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout failed:', err);
            localStorage.clear();
            window.location.href = '/login';
        }
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-[#F8FAFC]">
                <div className="h-20 bg-white/95 backdrop-blur-xl animate-pulse"></div>
                <div className="p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="h-96 bg-white rounded-2xl animate-pulse border border-[#E2E8F0]"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <motion.nav 
                className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#E2E8F0] shadow-lg"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo and Brand */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 nova-gradient rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
                                    <Library className="w-9 h-9 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold font-heading text-[#1E293B]">
                                        Nova Library
                                    </h1>
                                    <p className="text-[#1E293B]/60 text-sm font-medium">Librarian Dashboard</p>
                                </div>
                            </div>
                        </div>

                        {/* Centered Navigation */}
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <div className="flex items-center">
                                {/* Main Navigation Items */}
                                {librarianNavItems.map(({ name, href, icon: IconComponent }, index) => {
                                    const active = pathname === href || (href !== '/librarian' && pathname.startsWith(href + '/'));
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`group relative flex items-center px-4 py-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                                                index === 0 ? 'rounded-l-xl' : ''
                                            } ${
                                                active
                                                    ? 'bg-[#4F46E5]/10 text-[#4F46E5] shadow-md border border-[#4F46E5]/20'
                                                    : 'text-[#1E293B]/70 hover:text-[#1E293B] hover:bg-[#E2E8F0]/50'
                                            }`}
                                        >
                                            <IconComponent className="w-5 h-5 mr-2" />
                                            <span>{name}</span>
                                            {active && (
                                                <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-[#4F46E5] rounded-full"></div>
                                            )}
                                        </Link>
                                    );
                                })}

                                {/* Action Buttons */}
                                {/* Notifications */}
                                <Link href="/librarian/notifications">
                                    <button className="relative p-3 text-[#1E293B]/70 hover:text-[#1E293B] hover:bg-[#E2E8F0]/50 transition-all duration-300">
                                        <Bell className="w-6 h-6" />
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D946EF] rounded-full"></span>
                                    </button>
                                </Link>

                                {/* User Profile */}
                                <Link href="/librarian/account">
                                    <button className="w-12 h-12 nova-gradient flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300">
                                        <User className="w-6 h-6 text-white" />
                                    </button>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 rounded-r-xl"
                                >
                                    <LogOut className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-3 rounded-xl text-[#1E293B]/70 hover:text-[#1E293B] hover:bg-[#E2E8F0]/50 transition-all duration-300"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#E2E8F0]"
                        >
                            <div className="px-4 py-6 space-y-2">
                                {librarianNavItems.map(({ name, href, icon: IconComponent }) => {
                                    const active = pathname === href || (href !== '/librarian' && pathname.startsWith(href + '/'));
                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                                                active
                                                    ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20'
                                                    : 'text-[#1E293B]/70 hover:text-[#1E293B] hover:bg-[#E2E8F0]/50'
                                            }`}
                                        >
                                            <IconComponent className="w-5 h-5 mr-3" />
                                            <span>{name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Main Content */}
            <main className="pt-20">
                <div className="min-h-screen">
                    {children}
                </div>
            </main>

            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F46E5]/5 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#06B6D4]/5 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-[#D946EF]/3 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <ConfirmDialog
                open={showConfirm}
                title="Confirm Logout"
                message="Are you sure you want to logout from Nova Library?"
                onConfirm={confirmLogout}
                onCancel={() => setShowConfirm(false)}
            />
        </div>
    );
}