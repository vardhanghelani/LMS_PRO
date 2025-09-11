'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu, BookOpen, Heart, History, User, Bell, BarChart3, FileText, RotateCcw,
    CalendarDays, Users, DollarSign, TrendingUp, UserCheck, LogOut, X,
    Contact2
} from 'lucide-react';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { logout } from '@/app/utils/authClient';

const rolesConfig = {
    patron: {
        title: 'Patron Panel',
        nav: [
            { name: 'Library Items', href: '/patron/items', icon: BookOpen },
            { name: 'Wishlist', href: '/patron/wishlist', icon: Heart },
            { name: 'History', href: '/patron/history', icon: History },
            { name: 'Return', href: '/patron/return', icon: RotateCcw },
            { name: 'Notifications', href: '/patron/notifications', icon: Bell },
            { name: 'Account', href: '/patron/account', icon: User },
        ],
        sidebarBg: 'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
        titleColor: 'text-indigo-700',
        accentColor: 'indigo',
    },
    librarian: {
        title: 'Librarian Panel',
        nav: [
            { name: 'Dashboard', href: '/librarian', icon: BarChart3 },
            { name: 'Items', href: '/librarian/items', icon: BookOpen },
            { name: 'Issue', href: '/librarian/issue', icon: FileText },
            { name: 'Return', href: '/librarian/return', icon: RotateCcw },
            { name: 'Reservations', href: '/librarian/reservations', icon: CalendarDays },
            { name: 'Patrons', href: '/librarian/patrons', icon: Users },
            { name: 'Fines', href: '/librarian/fines', icon: DollarSign },
            { name: 'Account', href: '/librarian/account', icon: User },
        ],
        sidebarBg: 'bg-gradient-to-br from-purple-50 via-white to-pink-50',
        titleColor: 'text-purple-700',
        accentColor: 'purple',
    },
    admin: {
        title: 'Admin Panel',
        nav: [
            { name: 'Dashboard', href: '/admin', icon: BarChart3 },
            { name: 'Patrons', href: '/admin/patrons', icon: Users },
            { name: 'Librarians', href: '/admin/librarians', icon: UserCheck },
            { name: 'Stats', href: '/admin/statatics', icon: TrendingUp },
            { name: 'Contact', href: '/admin/contact', icon: Contact2 },
        ],
        sidebarBg: 'bg-gradient-to-br from-blue-50 via-white to-cyan-50',
        titleColor: 'text-blue-700',
        accentColor: 'blue',
    },
};

export default function Navbar({
    role = 'patron',
    children
}: {
    role?: keyof typeof rolesConfig;
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const pathname = usePathname();
    const config = rolesConfig[role];
    const { nav, title, sidebarBg, titleColor, accentColor } = config;

    // Ensure component is mounted on client to prevent hydration mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Lock body scroll when sidebar is open on mobile
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [sidebarOpen]);

    const confirmLogout = async () => {
        try {
            await logout();
            localStorage.clear();
            window.location.href = '/login';
        } catch (err) {
            console.error('Logout failed:', err);
            // Even if logout fails, clear local storage and redirect
            localStorage.clear();
            window.location.href = '/login';
        }
    };

    const getActiveStyles = (accentColor: string) => {
        const colorMap = {
            indigo: 'bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700 border-r-4 border-indigo-500 shadow-lg shadow-indigo-100',
            purple: 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border-r-4 border-purple-500 shadow-lg shadow-purple-100',
            blue: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-r-4 border-blue-500 shadow-lg shadow-blue-100',
        };
        return colorMap[accentColor as keyof typeof colorMap] || colorMap.indigo;
    };

    const getHoverStyles = (accentColor: string) => {
        const colorMap = {
            indigo: 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-white hover:text-indigo-600',
            purple: 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-white hover:text-purple-600',
            blue: 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-white hover:text-blue-600',
        };
        return colorMap[accentColor as keyof typeof colorMap] || colorMap.indigo;
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!isMounted) {
        return (
            <div className="h-screen flex overflow-x-hidden">
                <div className="w-72 bg-gray-100 animate-pulse"></div>
                <main className="flex-1 bg-gray-50 pt-20 md:pt-0">
                    {children}
                </main>
            </div>
        );
    }

    return (
        <>
            <div className="h-screen flex overflow-x-hidden">
                {/* Mobile top bar - Fixed positioning and higher z-index */}
                <div className="md:hidden fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md shadow-lg flex justify-between items-center px-6 py-4">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 flex items-center justify-center mr-3`}>
                            <span className="text-white text-sm font-bold">
                                {title.charAt(0)}
                            </span>
                        </div>
                        <h1 className={`text-lg font-bold ${titleColor}`}>{title}</h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200 z-[70]`}
                        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                    >
                        {sidebarOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
                
                {/* Sidebar */}
                <aside
                    className={`fixed md:relative md:flex-shrink-0 top-0 left-0 z-50 h-full md:h-full w-72 transform transition-all duration-300 ease-in-out
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                        ${sidebarBg} shadow-xl border-r border-gray-200/50
                        backdrop-blur-sm flex flex-col`}
                >
                    {/* Sidebar Header - Fixed */}
                    <div className="flex items-center p-6 pb-4 border-b border-gray-200/50 flex-shrink-0 pt-20 md:pt-6">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 flex items-center justify-center mr-4 shadow-lg`}>
                            <span className="text-white text-lg font-bold">
                                {title.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h2 className={`text-xl font-bold ${titleColor}`}>{title}</h2>
                            <p className="text-sm text-gray-500 capitalize">{role} Dashboard</p>
                        </div>
                    </div>

                    {/* Scrollable Navigation Container - This now takes remaining space */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-h-0">
                        <nav className="space-y-2">
                            {nav.map(({ name, href, icon: IconComponent }) => {
                                const active = pathname === href ||
                                    (href !== `/${role}` && pathname.startsWith(href + '/'));
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`group flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden
                                            ${active
                                                ? getActiveStyles(accentColor)
                                                : `text-gray-700 ${getHoverStyles(accentColor)} hover:shadow-md`}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <div className={`mr-4 p-1 rounded-lg transition-all duration-200 ${active ? 'transform scale-110' : 'group-hover:transform group-hover:scale-110'}`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                        <span className="relative z-10">{name}</span>
                                        {active && (
                                            <div className="absolute right-2 w-2 h-2 bg-current rounded-full opacity-60"></div>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Logout Button - Fixed at bottom */}
                    <div className="p-6 pt-4 border-t border-gray-200/50 flex-shrink-0">
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="group w-full flex items-center px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-25 hover:text-red-700 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md"
                        >
                            <div className="mr-4 p-1 rounded-lg group-hover:transform group-hover:scale-110 transition-all duration-200">
                                <LogOut className="w-6 h-6" />
                            </div>
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Overlay for mobile - Higher z-index but lower than top bar */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-50/50 min-h-0 pt-20 md:pt-0">
                    {children}
                </main>
            </div>
            
            <ConfirmDialog
                open={showConfirm}
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                onConfirm={confirmLogout}
                onCancel={() => setShowConfirm(false)} />
        </>
    );
}