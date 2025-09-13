'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
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
  Zap,
  Database,
  Shield,
  Eye,
  Cpu,
  Target
} from 'lucide-react';
import { PremiumStatCard, PremiumCard, PremiumBadge, PremiumButton, PremiumLoader } from '@/app/components/premium/PremiumComponents';
import '../../styles/premium-theme.css';

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
            setError(null); // Clear any previous errors
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

    // Add a refresh function that can be called from other components
    const refreshDashboard = () => {
        fetchDashboardData();
    };

    // Expose refresh function globally for other components to use
    useEffect(() => {
        (window as any).refreshLibrarianDashboard = refreshDashboard;
        return () => {
            delete (window as any).refreshLibrarianDashboard;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Loading Workflow Dashboard</h2>
                            <p className="text-slate-600">Gathering your library operations data...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 p-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Dashboard Connection Error</h2>
                        <p className="text-slate-600 mb-6">{error}</p>
                        <button
                            onClick={fetchDashboardData}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 mx-auto"
                        >
                            <Zap className="w-4 h-4" />
                            Reconnect
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="premium-theme min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <p className="text-gray-500">No data available</p>
                    </div>
                </div>
            </div>
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
            icon: <BookOpen className="w-6 h-6" />,
            color: "accent" as const,
            trend: "up" as const,
            trendValue: "+8%",
            description: "Ready for circulation"
        },
        {
            title: "Items Issued",
            value: data.summary.issued,
            icon: <Users className="w-6 h-6" />,
            color: "primary" as const,
            trend: "up" as const,
            trendValue: "+12%",
            description: "Currently borrowed"
        },
        {
            title: "Pending Requests",
            value: data.summary.pending,
            icon: <Clock className="w-6 h-6" />,
            color: "warning" as const,
            trend: "down" as const,
            trendValue: "-5%",
            description: "Awaiting approval"
        },
        {
            title: "Overdue Items",
            value: data.summary.overdueCount,
            icon: <AlertTriangle className="w-6 h-6" />,
            color: "danger" as const,
            trend: "down" as const,
            trendValue: "-15%",
            description: "Past due date"
        },
        {
            title: "Unpaid Fines",
            value: `₹${(data.summary.finesUnpaid ?? 0).toFixed(2)}`,
            icon: <DollarSign className="w-6 h-6" />,
            color: "danger" as const,
            trend: "down" as const,
            trendValue: "-10%",
            description: "Outstanding payments"
        },
        {
            title: "Collected Fines",
            value: `₹${(data.summary.finesCollected ?? 0).toFixed(2)}`,
            icon: <CheckCircle className="w-6 h-6" />,
            color: "accent" as const,
            trend: "up" as const,
            trendValue: "+20%",
            description: "Last 30 days"
        }
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100">
            {/* Timeline Header */}
            <motion.div 
                className="bg-white/90 backdrop-blur-sm border-b border-emerald-200/50 sticky top-0 z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center gap-6">
                        {/* Timeline Connector */}
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg flex-shrink-0"></div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-800">Library Operations Center</h1>
                                    <p className="text-slate-600">Professional workflow management for {data.summary.totalItems} collection items</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <span className="text-emerald-600 font-semibold text-sm">OPERATIONS ACTIVE</span>
                                    </div>
                                    <div className="w-px h-6 bg-slate-300"></div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-teal-600" />
                                        <span className="text-teal-600 font-semibold text-sm">LIVE TRACKING</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            <div className="max-w-7xl mx-auto p-8">
                <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >


                    {/* Timeline Stats Feed */}
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, staggerChildren: 0.1 }}
                    >
                        {/* Timeline Line */}
                        <div className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500"></div>
                            
                            {stats.map((stat, index) => {
                                const colorMap = {
                                    accent: 'emerald',
                                    primary: 'teal',
                                    warning: 'amber',
                                    danger: 'red'
                                };
                                const color = colorMap[stat.color] || 'emerald';
                                
                                return (
                                    <motion.div 
                                        key={stat.title}
                                        className="relative flex items-start gap-6 pb-8 last:pb-0"
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.15 }}
                                    >
                                        {/* Timeline Node */}
                                        <div className={`w-12 h-12 bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center shadow-lg z-10 flex-shrink-0`}>
                                            {stat.icon}
                                        </div>
                                        
                                        {/* Timeline Card */}
                                        <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-emerald-400">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">{stat.title}</h3>
                                                    <p className="text-3xl font-bold text-slate-900 mt-1">
                                                        {typeof stat.value === 'string' ? stat.value : stat.value.toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                                    stat.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {stat.trend === 'up' ? (
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    ) : (
                                                        <ArrowDownRight className="w-4 h-4" />
                                                    )}
                                                    {stat.trendValue}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-slate-500">{stat.description}</p>
                                                <div className="text-xs text-slate-400">
                                                    {new Date().toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                {/* Activity Charts */}
                <motion.div 
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                        {/* Data Flow Visualization */}
                        <PremiumCard>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Activity Overview</h2>
                                    <p className="text-gray-500 text-sm">Daily transactions and trends</p>
                                </div>
                            </div>
                            
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorIssued" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#00d9ff" stopOpacity={0.1}/>
                                        </linearGradient>
                                        <linearGradient id="colorReturned" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#c74de6" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#c74de6" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.3)" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fontSize: 11, fill: "#6b7280" }}
                                        tickFormatter={(value) => {
                                            const d = new Date(value);
                                            return `${d.getMonth() + 1}/${d.getDate()}`;
                                        }}
                                    />
                                    <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#ffffff",
                                            border: "1px solid #e5e7eb",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                            color: "#1f2937"
                                        }}
                                        labelFormatter={(label) => `Date: ${label}`}
                                        formatter={(value, name) => {
                                            if (name === 'issued') return [value, 'Items Issued'];
                                            if (name === 'returned') return [value, 'Items Returned'];
                                            return [value, name];
                                        }}
                                    />
                                    <Legend />
                                    <Area 
                                        type="monotone" 
                                        dataKey="issued" 
                                        stroke="#00d9ff" 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorIssued)"
                                        name="Items Issued"
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="returned" 
                                        stroke="#c74de6" 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorReturned)"
                                        name="Items Returned"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </PremiumCard>

                        {/* Popular Items */}
                        <PremiumCard>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <TrendingUp className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Popular Items</h2>
                                        <p className="text-gray-500 text-sm">Most requested books and resources</p>
                                    </div>
                                </div>
                                <button
                                    onClick={fetchDashboardData}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                                    title="Refresh popular items data"
                                >
                                    <Activity className="w-4 h-4" />
                                    Refresh
                                </button>
                            </div>
                            
                            {loading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="premium-card p-4 animate-pulse">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                                <BookOpen className="w-5 h-5 text-gray-300" />
                                                <div className="flex-1">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                                <div className="w-12 h-6 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : sortedTopItems.length > 0 ? (
                                <div className="space-y-3 max-h-80 overflow-y-auto premium-scrollbar">
                                    {sortedTopItems.slice(0, 10).map((borrowedItem, i) => (
                                        <motion.div
                                            key={borrowedItem.item?.item_id || i}
                                            className="premium-card p-4 hover:shadow-md transition-all duration-300"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ x: 4 }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm text-white ${
                                                    i === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                                                    i === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' : 
                                                    i === 2 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 
                                                    'bg-gradient-to-r from-purple-500 to-pink-500'
                                                } shadow-md`}>
                                                    {i + 1}
                                                </div>
                                                
                                                <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-sm truncate text-gray-800">
                                                        {borrowedItem.item?.title || `Item ${borrowedItem.item?.item_id || 'Unknown'}`}
                                                    </div>
                                                    <div className="text-xs text-gray-600 truncate">
                                                        by {borrowedItem.item?.author || 'Unknown Author'}
                                                    </div>
                                                    {borrowedItem.item?.genre && (
                                                        <PremiumBadge variant="primary" className="text-xs mt-1">
                                                            {borrowedItem.item.genre}
                                                        </PremiumBadge>
                                                    )}
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="font-bold text-blue-600 text-lg">{borrowedItem.borrowCount || 0}</div>
                                                    <div className="text-xs text-gray-500">requests</div>
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
                                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <TrendingUp className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Popular Items Yet</h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Popular items will appear here once patrons start borrowing from your collection.
                                    </p>
                                    <div className="text-xs text-gray-400">
                                        <p>• Items are ranked by borrow frequency</p>
                                        <p>• Data includes last 30 days of activity</p>
                                        <p>• Updates automatically as new borrows occur</p>
                                    </div>
                                </motion.div>
                            )}
                        </PremiumCard>
                </motion.div>

                {/* Available Genres */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <PremiumCard>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Available Genres</h2>
                                <p className="text-gray-500 text-sm">Library collection categories</p>
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
                                        <PremiumBadge 
                                            variant={idx % 4 === 0 ? 'primary' : idx % 4 === 1 ? 'success' : idx % 4 === 2 ? 'warning' : 'danger'}
                                            className="w-full justify-center py-2 text-sm font-medium"
                                        >
                                            {genre}
                                        </PremiumBadge>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No genres available</p>
                        )}
                    </PremiumCard>
                </motion.div>
            </motion.div>
            </div>
        </div>
    );
}