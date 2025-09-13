'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    User, Mail, Phone, Calendar, MapPin, Shield, 
    BookOpen, Heart, DollarSign, Edit3, Sparkles,
    Library, TrendingUp, Award, Clock
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { 
    staggerContainer, 
    staggerItem, 
    fadeIn,
    slideInFromTop
} from '@/app/lib/motion';

type User = {
    name: string;
    email: string;
    role: 'patron' | 'librarian';
    gender?: string;
    phone_number?: string;
    birth_date?: string;
    address?: string;
};

type AccountStats = {
    itemsRead: number;
    currentlyBorrowed: number;
    favorites: number;
    totalFines: number;
};

export default function AccountDetails() {
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<AccountStats>({
        itemsRead: 0,
        currentlyBorrowed: 0,
        favorites: 0,
        totalFines: 0,
    });

    useEffect(() => {
        const fetchUserAndStats = async () => {
            try {
                const userRes = await fetch('/api/patron/account');
                const userData = await userRes.json();

                if (!userRes.ok) {
                    console.error('Error fetching user:', userData.error);
                    return;
                }

                setUser(userData.user);

                const statsRes = await fetch('/api/patron/stats');
                const statsData = await statsRes.json();

                if (!statsRes.ok) {
                    console.error('Error fetching stats:', statsData.error);
                    return;
                }

                setStats(statsData);
            } catch (err) {
                console.error('Failed to fetch user or stats', err);
            }
        };

        fetchUserAndStats();
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div 
                        className="w-20 h-20 nova-gradient rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <User className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold font-heading text-[#1E293B] mb-2">Loading Profile</h2>
                    <p className="text-[#1E293B]/70 text-lg">Fetching your account details...</p>
                </motion.div>
            </div>
        );
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'librarian': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'patron': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="space-y-8"
                >
                    {/* Profile Header */}
                    <motion.div 
                        className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-lg"
                        variants={slideInFromTop}
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                            <div className="text-center lg:text-left">
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 nova-gradient rounded-3xl flex items-center justify-center text-5xl font-bold shadow-lg border-4 border-white">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#06B6D4] rounded-full border-4 border-white flex items-center justify-center shadow-md">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <motion.h1 
                                    className="text-4xl font-bold font-heading gradient-text mb-3"
                                    variants={fadeIn}
                                >
                                    Account Details
                                </motion.h1>
                                <motion.p 
                                    className="text-xl text-[#1E293B]/70 font-medium"
                                    variants={fadeIn}
                                >
                                    View your profile and library activity
                                </motion.p>
                            </div>
                            
                            {/* Edit Profile Button */}
                            <motion.div variants={fadeIn}>
                                <Link href="/patron/account/edit">
                                    <button className="px-8 py-4 text-lg nova-gradient text-white rounded-xl font-medium transition-colors flex items-center">
                                        <Edit3 className="w-6 h-6 mr-3" />
                                        Edit Profile
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* User Information */}
                    <motion.div 
                        className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-lg"
                        variants={staggerItem}
                    >
                        <motion.h2 
                            className="text-3xl font-bold font-heading text-[#1E293B] mb-8"
                            variants={fadeIn}
                        >
                            Personal Information
                        </motion.h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0]"
                                variants={staggerItem}
                            >
                                <label className="block text-sm font-semibold text-[#1E293B]/70 mb-3 flex items-center gap-3">
                                    <User className="w-5 h-5 text-[#4F46E5]" />
                                    Full Name
                                </label>
                                <p className="text-2xl font-bold text-[#1E293B]">{user.name}</p>
                            </motion.div>

                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0]"
                                variants={staggerItem}
                            >
                                <label className="block text-sm font-semibold text-[#1E293B]/70 mb-3 flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-[#4F46E5]" />
                                    Email Address
                                </label>
                                <p className="text-2xl font-bold text-[#1E293B]">{user.email}</p>
                            </motion.div>
                        </div>

                        {user.phone_number && (
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <motion.div 
                                    className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0]"
                                    variants={staggerItem}
                                >
                                    <label className="block text-sm font-semibold text-[#1E293B]/70 mb-3 flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-[#4F46E5]" />
                                        Phone Number
                                    </label>
                                    <p className="text-2xl font-bold text-[#1E293B]">{user.phone_number}</p>
                                </motion.div>

                                {user.gender && (
                                    <motion.div 
                                        className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0]"
                                        variants={staggerItem}
                                    >
                                        <label className="block text-sm font-semibold text-[#1E293B]/70 mb-3 flex items-center gap-3">
                                            <User className="w-5 h-5 text-[#4F46E5]" />
                                            Gender
                                        </label>
                                        <p className="text-2xl font-bold text-[#1E293B] capitalize">{user.gender}</p>
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {user.birth_date && (
                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] mt-6"
                                variants={staggerItem}
                            >
                                <label className="block text-sm font-semibold text-[#1E293B]/70 mb-3 flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-[#4F46E5]" />
                                    Birth Date
                                </label>
                                <p className="text-2xl font-bold text-[#1E293B]">
                                    {new Date(user.birth_date).toLocaleDateString()}
                                </p>
                            </motion.div>
                        )}

                        {user.address && (
                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] mt-6"
                                variants={staggerItem}
                            >
                                <label className="block text-sm font-semibold text-[#1E293B]/70 mb-3 flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-[#4F46E5]" />
                                    Address
                                </label>
                                <p className="text-2xl font-bold text-[#1E293B]">{user.address}</p>
                            </motion.div>
                        )}

                        <motion.div 
                            className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] mt-6"
                            variants={staggerItem}
                        >
                            <label className="block text-sm font-semibold text-[#1E293B]/70 mb-4 flex items-center gap-3">
                                <Shield className="w-5 h-5 text-[#4F46E5]" />
                                Account Role
                            </label>
                            <div className="inline-flex items-center px-6 py-3 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-lg font-bold border border-[#4F46E5]/20">
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Library Stats */}
                    <motion.div 
                        className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-lg"
                        variants={staggerItem}
                    >
                        <motion.div 
                            className="flex items-center gap-4 mb-8"
                            variants={fadeIn}
                        >
                            <div className="w-12 h-12 nova-gradient rounded-2xl flex items-center justify-center shadow-md">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold font-heading text-[#1E293B]">Library Statistics</h2>
                        </motion.div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 text-center border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                                variants={staggerItem}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="w-16 h-16 bg-[#4F46E5]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#4F46E5]/20">
                                    <BookOpen className="w-8 h-8 text-[#4F46E5]" />
                                </div>
                                <div className="text-4xl font-bold text-[#1E293B] mb-2">{stats.itemsRead}</div>
                                <div className="text-[#1E293B]/70 font-medium">Items Read</div>
                            </motion.div>

                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 text-center border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                                variants={staggerItem}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="w-16 h-16 bg-[#06B6D4]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#06B6D4]/20">
                                    <Library className="w-8 h-8 text-[#06B6D4]" />
                                </div>
                                <div className="text-4xl font-bold text-[#1E293B] mb-2">{stats.currentlyBorrowed}</div>
                                <div className="text-[#1E293B]/70 font-medium">Currently Borrowed</div>
                            </motion.div>

                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 text-center border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                                variants={staggerItem}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="w-16 h-16 bg-[#D946EF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D946EF]/20">
                                    <Heart className="w-8 h-8 text-[#D946EF]" />
                                </div>
                                <div className="text-4xl font-bold text-[#1E293B] mb-2">{stats.favorites}</div>
                                <div className="text-[#1E293B]/70 font-medium">Favorites</div>
                            </motion.div>

                            <motion.div 
                                className="bg-[#F8FAFC] rounded-2xl p-6 text-center border border-[#E2E8F0] hover:shadow-lg transition-all duration-300"
                                variants={staggerItem}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-200">
                                    <DollarSign className="w-8 h-8 text-red-600" />
                                </div>
                                <div className="text-4xl font-bold text-[#1E293B] mb-2">
                                    ${Number(stats.totalFines).toFixed(2)}
                                </div>
                                <div className="text-[#1E293B]/70 font-medium">Total Fines</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}