'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, BookOpen, Heart, History, User, Bell, BarChart3, FileText, RotateCcw,
    CalendarDays, Users, DollarSign, TrendingUp, UserCheck, LogOut, X,
    Contact2, Shield, Cpu, Database, Terminal, Zap, Activity, Settings,
    Eye, Target, Library
} from 'lucide-react';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { logout } from '@/app/utils/authClient';
import '../../../styles/cyberpunk-theme.css';

const cyberRolesConfig = {
    patron: {
        title: 'PATRON.NODE',
        nav: [
            { name: 'DIGITAL ARCHIVES', href: '/patron/items', icon: Database },
            { name: 'WISHLIST.CACHE', href: '/patron/wishlist', icon: Heart },
            { name: 'ACCESS LOGS', href: '/patron/history', icon: Terminal },
            { name: 'DATA RETURN', href: '/patron/return', icon: RotateCcw },
            { name: 'NEURAL ALERTS', href: '/patron/notifications', icon: Bell },
            { name: 'USER.PROFILE', href: '/patron/account', icon: User },
        ],
        sidebarBg: 'cyber-sidebar',
        titleColor: 'cyber-neon-text',
        accentColor: 'cyan',
    },
    librarian: {
        title: 'LIBRARIAN.EXE',
        nav: [
            { name: 'COMMAND CENTER', href: '/librarian', icon: Cpu },
            { name: 'ASSET MATRIX', href: '/librarian/items', icon: Database },
            { name: 'DATA DEPLOY', href: '/librarian/issue', icon: Target },
            { name: 'RETRIEVAL OPS', href: '/librarian/return', icon: RotateCcw },
            { name: 'QUEUE MONITOR', href: '/librarian/reservations', icon: Activity },
            { name: 'USER NODES', href: '/librarian/patrons', icon: Users },
            { name: 'PENALTY GRID', href: '/librarian/fines', icon: DollarSign },
            { name: 'NEURAL PROFILE', href: '/librarian/account', icon: User },
        ],
        sidebarBg: 'cyber-sidebar',
        titleColor: 'cyber-neon-pink',
        accentColor: 'pink',
    },
    admin: {
        title: 'ADMIN.ROOT',
        nav: [
            { name: 'SYSTEM CORE', href: '/admin', icon: Shield },
            { name: 'PATRON MATRIX', href: '/admin/patrons', icon: Users },
            { name: 'OPERATOR GRID', href: '/admin/librarians', icon: UserCheck },
            { name: 'DATA STREAMS', href: '/admin/statatics', icon: TrendingUp },
            { name: 'COMM CHANNEL', href: '/admin/contact', icon: Contact2 },
        ],
        sidebarBg: 'cyber-sidebar',
        titleColor: 'cyber-neon-green',
        accentColor: 'green',
    },
};

interface CyberNavbarProps {
    userRole: 'admin' | 'librarian' | 'patron';
    userName?: string;
    userEmail?: string;
}

export default function CyberNavbar({ userRole, userName, userEmail }: CyberNavbarProps) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const config = cyberRolesConfig[userRole];

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
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(/\//g, '.').replace(', ', '_');
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="cyber-button p-3"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar */}
            <AnimatePresence>
                <motion.div
                    className={`fixed inset-y-0 left-0 z-40 w-80 ${config.sidebarBg} border-r border-cyan-500/30 transform ${
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
                        <div className="p-6 border-b border-cyan-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className={`text-2xl font-mono font-bold ${config.titleColor} tracking-wider`}>
                                        {config.title}
                                    </h1>
                                    <div className="text-xs font-mono text-gray-400 mt-1">
                                        v2.1.0_NEURAL
                                    </div>
                                </div>
                                
                                {/* Close button for mobile */}
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="lg:hidden text-gray-400 hover:text-cyan-400 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="px-6 py-4 border-b border-cyan-500/30">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 font-mono text-xs">SYSTEM_ONLINE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="w-3 h-3 text-cyan-400" />
                                    <span className="text-cyan-400 font-mono text-xs">NEURAL_ACTIVE</span>
                                </div>
                                <div className="text-xs font-mono text-gray-500">
                                    TIMESTAMP: {formatTime(currentTime)}
                                </div>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 p-4 space-y-2 overflow-y-auto cyber-scrollbar">
                            {config.nav.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`cyber-nav-item flex items-center gap-3 group ${
                                            isActive ? 'active' : ''
                                        }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <Icon className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-mono text-sm tracking-wider">
                                            {item.name}
                                        </span>
                                        
                                        {isActive && (
                                            <motion.div
                                                className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
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
                        <div className="p-4 border-t border-cyan-500/30">
                            <div className="cyber-card p-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <User className="w-5 h-5 text-black" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-mono font-medium text-white text-sm truncate">
                                            {userName || 'USER.UNKNOWN'}
                                        </div>
                                        <div className="font-mono text-xs text-gray-400 truncate">
                                            {userEmail || 'NO_EMAIL@SYSTEM.NULL'}
                                        </div>
                                        <div className="font-mono text-xs text-cyan-400">
                                            ROLE: {userRole.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={() => setShowLogoutDialog(true)}
                                className="cyber-nav-item w-full flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-mono text-sm tracking-wider">
                                    DISCONNECT
                                </span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <motion.div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Top Status Bar */}
            <div className="fixed top-0 left-0 right-0 z-20 lg:left-80">
                <div className="cyber-glass border-b border-cyan-500/30 px-6 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 font-mono text-xs">
                            <span className="text-cyan-400">SESSION_ACTIVE</span>
                            <div className="w-px h-4 bg-cyan-500/30"></div>
                            <span className="text-green-400">CONN_SECURE</span>
                            <div className="w-px h-4 bg-cyan-500/30"></div>
                            <span className="text-purple-400">DATA_SYNC</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                            <Terminal className="w-3 h-3" />
                            <span>{formatTime(currentTime)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Spacer */}
            <div className="lg:ml-80 pt-12">
                {/* This div ensures proper spacing for the main content */}
            </div>

            {/* Logout Confirmation Dialog */}
            <ConfirmDialog
                open={showLogoutDialog}
                onClose={() => setShowLogoutDialog(false)}
                onConfirm={handleLogout}
                title="DISCONNECT FROM SYSTEM"
                message="Are you sure you want to terminate your neural connection? All unsaved data streams will be lost."
                confirmText="DISCONNECT"
                cancelText="CANCEL"
            />
        </>
    );
}
