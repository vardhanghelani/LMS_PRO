'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  Activity,
  BarChart3,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Database,
  Eye,
  Cpu,
  Target,
  Zap
} from 'lucide-react';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('/api/admin');
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to fetch dashboard data');
                }
                
                if (result.success) {
                    setData(result);
                } else {
                    throw new Error(result.message || 'API returned unsuccessful response');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600 text-lg">Loading admin dashboard...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Error Loading Dashboard</h3>
                            <p className="text-slate-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const stats = [
        {
            title: "Total Patrons",
            value: data?.totalPatrons || 0,
            icon: Users,
            color: "from-indigo-500 to-blue-500",
            change: "+12%",
            trend: "up",
            description: "Registered library users"
        },
        {
            title: "Librarians",
            value: data?.totalLibrarians || 0,
            icon: UserCheck,
            color: "from-blue-500 to-cyan-500",
            change: "+5%",
            trend: "up",
            description: "Active staff members"
        },
        {
            title: "Library Items",
            value: data?.totalItems || 0,
            icon: BookOpen,
            color: "from-cyan-500 to-teal-500",
            change: "+8%",
            trend: "up",
            description: "Books and resources"
        },
        {
            title: "Active Loans",
            value: data?.issuedToday || 0,
            icon: TrendingUp,
            color: "from-teal-500 to-emerald-500",
            change: "+15%",
            trend: "up",
            description: "Currently borrowed"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Corporate Header */}
            <motion.div 
                className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                                <Database className="w-7 h-7 text-slate-900 font-bold" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Enterprise Command Center</h1>
                                <p className="text-slate-400 text-sm">Advanced Library Management System</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 font-medium text-sm">SYSTEM OPERATIONAL</span>
                            </div>
                            <div className="h-6 w-px bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span className="text-slate-300 font-medium text-sm">SECURE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-cyan-400" />
                                <span className="text-slate-300 font-medium text-sm">REAL-TIME</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            <div className="max-w-7xl mx-auto px-8 py-8">
                <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >

                    {/* Enterprise KPI Dashboard */}
                    <motion.div 
                        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, staggerChildren: 0.1 }}
                    >
                        {stats.map((stat, index) => {
                            const isPositive = stat.trend === 'up';
                            return (
                                <motion.div 
                                    key={stat.title} 
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.15 }}
                                    className="group"
                                >
                                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300 hover:border-slate-600">
                                        {/* Header with Icon and Trend */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <stat.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                                isPositive ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'
                                            }`}>
                                                {isPositive ? (
                                                    <ArrowUpRight className="w-3 h-3" />
                                                ) : (
                                                    <ArrowDownRight className="w-3 h-3" />
                                                )}
                                                {stat.change}
                                            </div>
                                        </div>
                                        
                                        {/* Metrics */}
                                        <div className="space-y-3">
                                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                {stat.title}
                                            </div>
                                            <div className="text-3xl font-bold text-white mb-2">
                                                {stat.value?.toLocaleString() || 0}
                                            </div>
                                            <div className="text-sm text-slate-400">
                                                {stat.description}
                                            </div>
                                            
                                            {/* Progress Bar */}
                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                                    <span>Performance</span>
                                                    <span>{85 + index * 5}%</span>
                                                </div>
                                                <div className="w-full bg-slate-700 rounded-full h-2">
                                                    <motion.div 
                                                        className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${85 + index * 5}%` }}
                                                        transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Enterprise Activity Monitor */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
                            {/* Activity Header */}
                            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg">
                                            <Activity className="w-6 h-6 text-slate-900" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-white">SYSTEM ACTIVITY MONITOR</h2>
                                            <p className="text-slate-400 text-sm">Live transaction feed • Real-time updates</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <span className="text-green-400 text-sm font-medium">LIVE</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">

                                <div className="space-y-3">
                                    {(data?.formattedActivity ?? []).map((activity: any, i: number) => {
                                        const isIssue = activity.type === 'issue';
                                        const userName = activity.userName || 'Unknown User';
                                        const itemTitle = activity.itemTitle || 'Unknown Item';
                                        const dateStr = activity.date
                                            ? new Date(activity.date).toLocaleString()
                                            : 'Unknown Date';

                                        return (
                                            <motion.div
                                                key={i}
                                                className="group p-4 rounded-xl border border-slate-700/50 bg-slate-900/30 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* Status Indicator */}
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                            isIssue 
                                                                ? 'bg-gradient-to-r from-amber-400 to-orange-400' 
                                                                : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                                                        } shadow-lg`}>
                                                            {isIssue ? (
                                                                <ArrowUpRight className="w-5 h-5 text-slate-900" />
                                                            ) : (
                                                                <ArrowDownRight className="w-5 h-5 text-slate-900" />
                                                            )}
                                                        </div>
                                                        <div className={`w-1 h-10 rounded ${
                                                            isIssue ? 'bg-amber-400' : 'bg-emerald-400'
                                                        }`}></div>
                                                    </div>
                                                    
                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="grid grid-cols-4 gap-4 items-center">
                                                            <div className="col-span-1">
                                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">USER</div>
                                                                <div className="text-sm font-medium text-white truncate">{userName}</div>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">ACTION</div>
                                                                <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${
                                                                    isIssue
                                                                        ? 'bg-amber-900/50 text-amber-300'
                                                                        : 'bg-emerald-900/50 text-emerald-300'
                                                                }`}>
                                                                    {isIssue ? 'ISSUED' : 'RETURNED'}
                                                                </span>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">ITEM</div>
                                                                <div className="text-sm text-slate-300 truncate">{itemTitle}</div>
                                                            </div>
                                                            <div className="col-span-1">
                                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">TIMESTAMP</div>
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                                    <span className="text-xs text-slate-400">
                                                                        {dateStr}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}

                                    {(data?.formattedActivity?.length ?? 0) === 0 && (
                                        <motion.div 
                                            className="text-center py-12"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <BarChart3 className="w-8 h-8 text-slate-400" />
                                            </div>
                                            <p className="text-slate-400">No system activity detected</p>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Enterprise Command Panel */}
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {[
                            { 
                                title: "LIBRARIAN CONTROL", 
                                description: "Staff Management & Access Control", 
                                href: "/admin/librarians", 
                                icon: UserCheck,
                                color: "from-indigo-500 to-purple-500",
                                bgColor: "from-indigo-900/20 to-purple-900/20",
                                borderColor: "indigo-500/30"
                            },
                            { 
                                title: "PATRON REGISTRY", 
                                description: "User Database & Account Management", 
                                href: "/admin/patrons", 
                                icon: Users,
                                color: "from-cyan-500 to-teal-500",
                                bgColor: "from-cyan-900/20 to-teal-900/20",
                                borderColor: "cyan-500/30"
                            },
                            { 
                                title: "ANALYTICS CENTER", 
                                description: "System Metrics & Performance Data", 
                                href: "/admin/statatics", 
                                icon: BarChart3,
                                color: "from-emerald-500 to-green-500",
                                bgColor: "from-emerald-900/20 to-green-900/20",
                                borderColor: "emerald-500/30"
                            }
                        ].map((action, index) => (
                            <motion.div 
                                key={action.title} 
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                            >
                                <a
                                    href={action.href}
                                    className={`block bg-gradient-to-br ${action.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-${action.borderColor} hover:border-opacity-60 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden`}
                                >
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
                                    </div>
                                    
                                    <div className="relative">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <action.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 mb-2">
                                                {action.title}
                                            </h3>
                                            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                                {action.description}
                                            </p>
                                        </div>
                                        
                                        {/* Status Indicator */}
                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
                                            <div className={`w-2 h-2 bg-gradient-to-r ${action.color} rounded-full animate-pulse`}></div>
                                            <span className="text-xs text-slate-400 font-medium">ACTIVE</span>
                                        </div>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

