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
  Sparkles
} from 'lucide-react';
import { AppShell } from '@/app/components/shell/AppShell';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { 
  staggerContainer, 
  staggerItem, 
  dashboardCardVariants,
  fadeIn,
  slideInFromTop
} from '@/app/lib/motion';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin')
            .then((res) => res.json())
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <AppShell userRole="admin" userName="Admin User" userEmail="admin@nova.com">
                <motion.div 
                    className="space-y-8"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Header skeleton */}
                    <motion.div className="text-center" variants={staggerItem}>
                        <div className="h-12 bg-muted rounded-2xl w-96 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-6 bg-muted rounded-xl w-80 mx-auto animate-pulse"></div>
                    </motion.div>

                    {/* Cards skeleton */}
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div key={i} variants={staggerItem}>
                                <Card variant="nova" padding="lg" className="animate-pulse">
                                    <div className="h-6 bg-muted rounded w-24 mb-4"></div>
                                    <div className="h-12 bg-muted rounded w-16"></div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Activity skeleton */}
                    <motion.div variants={staggerItem}>
                        <Card variant="nova" padding="lg" className="animate-pulse">
                            <div className="h-8 bg-muted rounded w-48 mb-6"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-16 bg-muted rounded-xl"></div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </motion.div>
            </AppShell>
        );
    }

    const stats = [
        {
            title: "Total Patrons",
            value: data?.totalPatrons || 0,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            change: "+12%",
            trend: "up"
        },
        {
            title: "Librarians",
            value: data?.totalLibrarians || 0,
            icon: UserCheck,
            color: "from-purple-500 to-pink-500",
            change: "+5%",
            trend: "up"
        },
        {
            title: "Library Items",
            value: data?.totalItems || 0,
            icon: BookOpen,
            color: "from-emerald-500 to-teal-500",
            change: "+8%",
            trend: "up"
        },
        {
            title: "Active Loans",
            value: data?.issuedToday || 0,
            icon: TrendingUp,
            color: "from-orange-500 to-red-500",
            change: "+15%",
            trend: "up"
        }
    ];

    return (
        <AppShell userRole="admin" userName="Admin User" userEmail="admin@nova.com">
            <motion.div 
                className="space-y-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {/* Header */}
                <motion.div 
                    className="text-center"
                    variants={slideInFromTop}
                >
                    <motion.h1 
                        className="text-5xl font-bold font-heading gradient-text mb-4"
                        variants={fadeIn}
                    >
                        Admin Dashboard
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-muted-foreground font-medium"
                        variants={fadeIn}
                    >
                        Welcome to the future of library management
                    </motion.p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerContainer}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            variants={dashboardCardVariants}
                            whileHover="hover"
                        >
                            <Card variant="nova" padding="lg" className="relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {stat.trend === 'up' ? (
                                                <ArrowUpRight className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <ArrowDownRight className="w-4 h-4 text-red-500" />
                                            )}
                                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            {stat.title}
                                        </h3>
                                        <p className="text-3xl font-bold text-foreground">
                                            {stat.value?.toLocaleString() || 0}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={staggerItem}>
                    <Card variant="nova" padding="lg">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 nova-gradient rounded-xl flex items-center justify-center shadow-nova">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-heading text-foreground">Recent Activity</h2>
                                <p className="text-muted-foreground">Latest transactions and user activities</p>
                            </div>
                        </div>

                        <div className="space-y-4">
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
                                        className="group p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-300 hover:shadow-md"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                isIssue 
                                                    ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                                                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                            } shadow-lg`}>
                                                {isIssue ? (
                                                    <TrendingUp className="w-5 h-5 text-white" />
                                                ) : (
                                                    <TrendingDown className="w-5 h-5 text-white" />
                                                )}
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 text-sm">
                                                    <span className="font-medium text-foreground">
                                                        {userName}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        isIssue
                                                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
                                                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300'
                                                    }`}>
                                                        {isIssue ? 'issued' : 'returned'}
                                                    </span>
                                                    <span className="text-muted-foreground">the item</span>
                                                    <span className="font-semibold text-foreground bg-muted px-2 py-1 rounded-md text-xs">
                                                        {itemTitle}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">
                                                        {dateStr}
                                                    </span>
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
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground">No recent activity to display</p>
                                </motion.div>
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={staggerContainer}
                >
                    {[
                        { title: "Manage Librarians", description: "Add or remove librarian accounts", href: "/admin/librarians", icon: UserCheck },
                        { title: "View Patrons", description: "Browse and manage patron accounts", href: "/admin/patrons", icon: Users },
                        { title: "System Statistics", description: "View detailed analytics and reports", href: "/admin/statatics", icon: BarChart3 }
                    ].map((action, index) => (
                        <motion.div key={action.title} variants={staggerItem}>
                            <Card variant="nova" padding="lg" className="group cursor-pointer hover:shadow-nova transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 nova-gradient rounded-xl flex items-center justify-center shadow-nova group-hover:scale-110 transition-transform duration-300">
                                        <action.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground group-hover:text-nova-primary transition-colors duration-300">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </AppShell>
    );
}

