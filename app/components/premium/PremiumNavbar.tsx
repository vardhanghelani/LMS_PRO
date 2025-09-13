'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, BookOpen, Heart, History, User, Bell, BarChart3, FileText, RotateCcw,
    CalendarDays, Users, DollarSign, TrendingUp, UserCheck, LogOut, X,
    Contact2, Shield, Activity, Settings, Library, Target
} from 'lucide-react';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { logout } from '@/app/utils/authClient';
import '../../styles/premium-theme.css';

const premiumRolesConfig = {
    patron: {
        title: 'Library Patron',
        nav: [
            { name: 'Browse Items', href: '/patron/items', icon: BookOpen },
            { name: 'My Wishlist', href: '/patron/wishlist', icon: Heart },
            { name: 'History', href: '/patron/history', icon: History },
            { name: 'Returns', href: '/patron/return', icon: RotateCcw },
            { name: 'Notifications', href: '/patron/notifications', icon: Bell },
            { name: 'My Account', href: '/patron/account', icon: User },
        ],
        sidebarBg: 'premium-sidebar',
        titleColor: 'premium-text-gradient',
        accentColor: 'primary',
    },
    librarian: {
        title: 'Librarian Portal',
        nav: [
            { name: 'Dashboard', href: '/librarian', icon: BarChart3 },
            { name: 'Manage Items', href: '/librarian/items', icon: BookOpen },
            { name: 'Issue Items', href: '/librarian/issue', icon: Target },
            { name: 'Returns', href: '/librarian/return', icon: RotateCcw },
            { name: 'Reservations', href: '/librarian/reservations', icon: CalendarDays },
            { name: 'Patron Management', href: '/librarian/patrons', icon: Users },
            { name: 'Fine Management', href: '/librarian/fines', icon: DollarSign },
            { name: 'My Account', href: '/librarian/account', icon: User },
        ],
        sidebarBg: 'premium-sidebar',
        titleColor: 'premium-text-gradient',
        accentColor: 'secondary',
    },
    admin: {
        title: 'Admin Panel',
        nav: [
            { name: 'Dashboard', href: '/admin', icon: Shield },
            { name: 'Patron Accounts', href: '/admin/patrons', icon: Users },
            { name: 'Librarian Accounts', href: '/admin/librarians', icon: UserCheck },
            { name: 'Analytics', href: '/admin/statatics', icon: TrendingUp },
            { name: 'Contact Management', href: '/admin/contact', icon: Contact2 },
        ],
        sidebarBg: 'premium-sidebar',
        titleColor: 'premium-text-gradient',
        accentColor: 'accent',
    },
};

interface PremiumNavbarProps {
    userRole: 'admin' | 'librarian' | 'patron';
    userName?: string;
    userEmail?: string;
}

export default function PremiumNavbar({ userRole, userName, userEmail }: PremiumNavbarProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const config = premiumRolesConfig[userRole];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/auth/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="premium-button p-3"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                <motion.div
                    className={`fixed inset-y-0 left-0 z-40 w-80 ${config.sidebarBg} transform ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:inset-0`}
                    initial={{ x: -320 }}
                    animate={{ x: 0 }}
                    exit={{ x: -320 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <div className="flex flex-col h-full">
                        {/* Title Section */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className={`text-2xl font-bold ${config.titleColor} tracking-tight`}>
                                        {config.title}
                                    </h1>
                                    <div className="text-xs text-gray-500 mt-1 font-medium">
                                        v2.0 Professional
                                    </div>
                                </div>
                                
                                {/* Close button for mobile */}
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-green-600 font-medium text-sm">Online</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-3 h-3 text-blue-500" />
                                        <span className="text-blue-600 font-medium text-xs">Secure</span>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 font-mono">
                                    {formatTime(currentTime)}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto premium-scrollbar">
                            {config.nav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                                const Icon = item.icon;
                                
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`premium-nav-item flex items-center gap-3 group ${
                                            isActive ? 'active' : ''
                                        }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-medium text-sm">
                                            {item.name}
                                        </span>
                                        
                                        {isActive && (
                                            <motion.div
                                                className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Profile Section */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="premium-card p-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-800 text-sm truncate">
                                            {userName || 'User'}
                                        </div>
                                        <div className="text-xs text-gray-600 truncate">
                                            {userEmail || 'user@example.com'}
                                        </div>
                                        <div className="text-xs font-medium text-blue-600 mt-1">
                                            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={() => setShowLogoutDialog(true)}
                                className="premium-nav-item w-full flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium text-sm">
                                    Sign Out
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <motion.div
                    className="fixed inset-0 z-30 bg-black/20 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Top Status Bar */}
            <div className="fixed top-0 left-0 right-0 z-20 lg:left-80">
                <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm">
                            <span className="text-green-600 font-medium">System Active</span>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span className="text-blue-600 font-medium">Connection Secure</span>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span className="text-purple-600 font-medium">Real-time Sync</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Activity className="w-4 h-4" />
                            <span className="font-mono">{formatTime(currentTime)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Dialog */}
            <ConfirmDialog
                open={showLogoutDialog}
                onClose={() => setShowLogoutDialog(false)}
                onConfirm={handleLogout}
                title="Sign Out"
                message="Are you sure you want to sign out of your account?"
                confirmText="Sign Out"
                cancelText="Cancel"
            />
        </>
    );
}
