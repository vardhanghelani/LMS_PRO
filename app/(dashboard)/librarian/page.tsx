'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle,
  DollarSign,
  CheckCircle,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react';
import { AppShell } from '@/app/components/shell/AppShell';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  staggerContainer, 
  staggerItem, 
  dashboardCardVariants,
  fadeIn,
  slideInFromTop
} from '@/app/lib/motion';

interface SummaryStats {
    available: number;
    issued: number;
    pending: number;
    overdueCount: number;
    totalItems: number;
    finesUnpaid: number;
    finesCollected: number;
}

interface Genre {
    genre: string;
}

interface TopBorrowedItem {
    item: {
        item_id: number;
        title: string;
        author: string;
        genre?: string;
        image_url?: string;
        location?: string;
        record_status: string;
    };
    borrowCount: number;
}

interface ChartData {
    days: string[];
    issued: number[];
    returned: number[];
}

interface DashboardData {
    success: boolean;
    summary: SummaryStats;
    genres: string[];
    topBorrowedItems?: TopBorrowedItem[];
    chartData: ChartData;
}

const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    trend,
    change
}: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: any;
    color: string;
    trend?: 'up' | 'down';
    change?: string;
}) => {
    return (
        <motion.div
            variants={dashboardCardVariants}
            whileHover="hover"
        >
            <Card variant="nova" padding="lg" className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        {trend && change && (
                            <div className="flex items-center space-x-1">
                                {trend === 'up' ? (
                                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                                ) : (
                                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                                )}
                                <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    {change}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            {title}
                        </h3>
                        <p className="text-3xl font-bold text-foreground">
                            {value}
                        </p>
                        {subtitle && (
                            <p className="text-xs text-muted-foreground">{subtitle}</p>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/librarian');
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

    if (loading) {
        return (
            <AppShell userRole="librarian" userName="Librarian User" userEmail="librarian@nova.com">
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                    >
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <motion.div key={i} variants={staggerItem}>
                                <Card variant="nova" padding="lg" className="animate-pulse">
                                    <div className="h-6 bg-muted rounded w-24 mb-4"></div>
                                    <div className="h-12 bg-muted rounded w-16"></div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </AppShell>
        );
    }

    if (error) {
        return (
            <AppShell userRole="librarian" userName="Librarian User" userEmail="librarian@nova.com">
                <motion.div 
                    className="text-center py-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Error</h2>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <Button onClick={fetchDashboardData} variant="nova">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                </motion.div>
            </AppShell>
        );
    }

    if (!data) {
        return (
            <AppShell userRole="librarian" userName="Librarian User" userEmail="librarian@nova.com">
                <div className="text-center py-20">
                    <p className="text-muted-foreground">No data available</p>
                </div>
            </AppShell>
        );
    }

    const chartData = data.chartData.days.map((day, index) => ({
        date: day,
        issued: data.chartData.issued[index],
        returned: data.chartData.returned[index],
    }));

    const sortedTopItems = Array.isArray(data.topBorrowedItems)
        ? [...data.topBorrowedItems].sort((a, b) => b.borrowCount - a.borrowCount)
        : [];

    const stats = [
        {
            title: "Available Items",
            value: data.summary.available,
            icon: BookOpen,
            color: "from-emerald-500 to-teal-500",
            trend: "up" as const,
            change: "+8%"
        },
        {
            title: "Issued Items",
            value: data.summary.issued,
            icon: Users,
            color: "from-blue-500 to-cyan-500",
            trend: "up" as const,
            change: "+12%"
        },
        {
            title: "Pending Requests",
            value: data.summary.pending,
            icon: Clock,
            color: "from-yellow-500 to-orange-500",
            trend: "down" as const,
            change: "-5%"
        },
        {
            title: "Overdue Items",
            value: data.summary.overdueCount,
            icon: AlertTriangle,
            color: "from-red-500 to-pink-500",
            trend: "down" as const,
            change: "-15%"
        },
        {
            title: "Unpaid Fines",
            value: `₹${(data.summary.finesUnpaid ?? 0).toFixed(2)}`,
            icon: DollarSign,
            color: "from-red-500 to-rose-500",
            trend: "down" as const,
            change: "-10%"
        },
        {
            title: "Collected Fines",
            value: `₹${(data.summary.finesCollected ?? 0).toFixed(2)}`,
            subtitle: "Last 30 days",
            icon: CheckCircle,
            color: "from-green-500 to-emerald-500",
            trend: "up" as const,
            change: "+20%"
        }
    ];

    return (
        <AppShell userRole="librarian" userName="Librarian User" userEmail="librarian@nova.com">
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
                        Librarian Dashboard
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-muted-foreground font-medium"
                        variants={fadeIn}
                    >
                        Manage your library operations with precision
                    </motion.p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                >
                    {stats.map((stat, index) => (
                        <motion.div key={stat.title} variants={staggerItem}>
                            <StatCard {...stat} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Charts */}
                <motion.div 
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                    variants={staggerContainer}
                >
                    {/* Daily Transactions Chart */}
                    <motion.div variants={staggerItem}>
                        <Card variant="nova" padding="lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 nova-gradient rounded-xl flex items-center justify-center shadow-nova">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold font-heading text-foreground">Daily Transactions</h2>
                                    <p className="text-muted-foreground">Last 30 days activity</p>
                                </div>
                            </div>
                            
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                                        tickFormatter={(value) => {
                                            const d = new Date(value);
                                            return `${d.getMonth() + 1}/${d.getDate()}`;
                                        }}
                                    />
                                    <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            border: "1px solid hsl(var(--border))",
                                            borderRadius: "12px",
                                            boxShadow: "var(--shadow-nova)"
                                        }}
                                        labelFormatter={(label) => `Date: ${label}`}
                                        formatter={(value, name) => {
                                            if (name === 'issued') return [value, 'Items Issued'];
                                            if (name === 'returned') return [value, 'Items Returned'];
                                            return [value, name];
                                        }}
                                    />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="issued" 
                                        stroke="hsl(var(--nova-primary))" 
                                        strokeWidth={3} 
                                        name="Items Issued"
                                        dot={{ fill: "hsl(var(--nova-primary))", strokeWidth: 2, r: 4 }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="returned" 
                                        stroke="hsl(var(--nova-secondary))" 
                                        strokeWidth={3} 
                                        name="Items Returned"
                                        dot={{ fill: "hsl(var(--nova-secondary))", strokeWidth: 2, r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Card>
                    </motion.div>

                    {/* Top Borrowed Items */}
                    <motion.div variants={staggerItem}>
                        <Card variant="nova" padding="lg">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 nova-gradient rounded-xl flex items-center justify-center shadow-nova">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold font-heading text-foreground">Top Borrowed Items</h2>
                                    <p className="text-muted-foreground">Most popular library items</p>
                                </div>
                            </div>
                            
                            {sortedTopItems.length > 0 ? (
                                <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-nova">
                                    {sortedTopItems.slice(0, 10).map((borrowedItem, i) => (
                                        <motion.div
                                            key={borrowedItem.item.item_id}
                                            className="group p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-300 hover:shadow-md"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                                    i === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                                                    i === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 
                                                    i === 2 ? 'bg-gradient-to-r from-amber-600 to-yellow-600' : 
                                                    'bg-gradient-to-r from-purple-500 to-pink-500'
                                                } shadow-lg`}>
                                                    {i + 1}
                                                </div>
                                                
                                                <BookOpen className="w-5 h-5 text-nova-primary flex-shrink-0" />
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-foreground text-sm truncate">
                                                        {borrowedItem.item.title || `Item ID: ${borrowedItem.item.item_id}`}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground truncate">
                                                        by {borrowedItem.item.author}
                                                    </div>
                                                    {borrowedItem.item.genre && (
                                                        <Badge variant="nova" className="text-xs mt-1">
                                                            {borrowedItem.item.genre}
                                                        </Badge>
                                                    )}
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="font-bold text-nova-primary text-lg">{borrowedItem.borrowCount}</div>
                                                    <div className="text-xs text-muted-foreground">borrows</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div 
                                    className="text-center py-12"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground">No borrowing data available</p>
                                </motion.div>
                            )}
                        </Card>
                    </motion.div>
                </motion.div>

                {/* Genres */}
                <motion.div variants={staggerItem}>
                    <Card variant="nova" padding="lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 nova-gradient rounded-xl flex items-center justify-center shadow-nova">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-heading text-foreground">Available Genres</h2>
                                <p className="text-muted-foreground">Library collection categories</p>
                            </div>
                        </div>
                        
                        {data.genres.length ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {data.genres.map((genre, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Badge variant="nova" className="w-full justify-center py-2 text-sm">
                                            {genre}
                                        </Badge>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground text-center py-8">No genres available</p>
                        )}
                    </Card>
                </motion.div>
            </motion.div>
        </AppShell>
    );
}