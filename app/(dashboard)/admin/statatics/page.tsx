/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts';
import { BarChart3, TrendingUp, Users, Database, Activity, Shield, Eye, Target } from 'lucide-react';

export default function AdminStatisticsPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then((res) => res.json())
            .then((json) => setData(json))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300 text-lg">Loading enterprise analytics...</p>
                    <p className="text-slate-500 text-sm mt-2">Processing system metrics and KPIs</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Corporate Analytics Header */}
            <motion.div 
                className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                            <BarChart3 className="w-7 h-7 text-slate-900" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">ENTERPRISE ANALYTICS CENTER</h1>
                            <p className="text-slate-400 text-sm">Advanced System Metrics & Performance Intelligence</p>
                        </div>
                        <div className="ml-auto flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-emerald-400 font-semibold text-sm">REAL-TIME DATA</span>
                            </div>
                            <div className="w-px h-6 bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-cyan-400" />
                                <span className="text-slate-300 font-semibold text-sm">LIVE MONITORING</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

                {/* ===== Overall Totals ===== */}
                <section className="space-y-6">
                    <SectionHeader
                        icon="📊"
                        title="Overall Totals"
                        description="Key metrics across your entire library system"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <StatsCard
                            title="Items"
                            value={data.itemAnalytics.totalItems}
                            icon="📦"
                            gradient="from-blue-500 to-blue-600"
                            bgGradient="from-blue-50 to-blue-100"
                        />
                        <StatsCard
                            title="Users"
                            value={data.userAnalytics.totalUsers}
                            icon="👥"
                            gradient="from-purple-500 to-purple-600"
                            bgGradient="from-purple-50 to-purple-100"
                        />
                        <StatsCard
                            title="Fines Collected"
                            value={`₹ ${data.fineManagement.totalFineCollected}`}
                            icon="💰"
                            gradient="from-amber-500 to-amber-600"
                            bgGradient="from-amber-50 to-amber-100"
                        />
                        <StatsCard
                            title="Active Transactions"
                            value={data.systemActivity.activeTransactions}
                            icon="⚡"
                            gradient="from-teal-500 to-teal-600"
                            bgGradient="from-teal-50 to-teal-100"
                        />
                        <StatsCard
                            title="Pending Transactions"
                            value={data.monthlyActivity.reduce((sum: number, m: any) => sum + m.pending, 0)}
                            icon="⏳"
                            gradient="from-yellow-500 to-yellow-600"
                            bgGradient="from-yellow-50 to-yellow-100"
                        />
                    </div>
                </section>

                {/* ===== Monthly Activity ===== */}
                <section>
                    <ChartSection
                        icon="📈"
                        title="Monthly Activity"
                        description="Track monthly trends in library operations"
                    >
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data.monthlyActivity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis
                                    dataKey="label"
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                />
                                <YAxis
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="issued" name="Issued" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="returned" name="Returned" fill="#10b981" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="pending" name="Pending" fill="#facc15" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="finesCollected" name="Fines Collected" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartSection>
                </section>

                {/* ===== Monthly New Users ===== */}
                <section>
                    <ChartSection
                        icon="📊"
                        title="User Growth (Monthly)"
                        description="Monitor new user registrations over time"
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.monthlyActivity} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis
                                    dataKey="label"
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                />
                                <YAxis
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    axisLine={{ stroke: '#e2e8f0' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="newPatrons"
                                    name="New Patrons"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="newLibrarians"
                                    name="New Librarians"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartSection>
                </section>

                {/* ===== Top Borrowed Items ===== */}
                <section>
                    <SectionHeader
                        icon="🏆"
                        title="Top 5 Borrowed Items"
                        description="Most popular items in your collection"
                    />
                    <div className="space-y-4">
                        {data.topBorrowed.map((b: any, idx: number) => (
                            <div key={idx} className="group hover:shadow-md transition-all duration-200 border border-slate-200 rounded-xl p-6 bg-white">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                        #{idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                                            {b.title}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">Author:</span>
                                                <span className="font-medium text-slate-700">{b.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">Genre:</span>
                                                <span className="bg-slate-100 px-2 py-1 rounded-md font-medium text-slate-700">{b.genre}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-500">Borrowed:</span>
                                                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full font-bold">
                                                    {b.count} times
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== User Analytics ===== */}
                <section>
                    <SectionHeader
                        icon="👥"
                        title="User Analytics"
                        description="Insights into user behavior and demographics"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DistributionCard
                            title="Status Distribution"
                            data={data.userAnalytics.statusDistribution}
                            keyProp="status"
                            countProp="_count.status"
                            icon="📊"
                            color="blue"
                        />
                        <DistributionCard
                            title="Role Distribution"
                            data={data.userAnalytics.roleDistribution}
                            keyProp="role"
                            countProp="_count.role"
                            icon="🎭"
                            color="purple"
                        />
                        <InfoCard
                            title="Most Active Patrons"
                            icon="⭐"
                            color="emerald"
                        >
                            {data.userAnalytics.mostActivePatrons.map((u: any, i: number) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                                    <div>
                                        <div className="font-medium text-slate-800">{u.name}</div>
                                        <div className="text-xs text-slate-500">{u.email}</div>
                                    </div>
                                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {u.borrowCount} borrows
                                    </span>
                                </div>
                            ))}
                        </InfoCard>
                    </div>
                </section>

                {/* ===== Item Analytics ===== */}
                <section>
                    <SectionHeader
                        icon="📦"
                        title="Item Analytics"
                        description="Detailed insights into your item collection"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DistributionCard
                            title="Genre Distribution"
                            data={data.itemAnalytics.genreDistribution}
                            keyProp="genre"
                            countProp="_count.genre"
                            icon="📖"
                            color="indigo"
                        />
                        <AvailabilityCard data={data.itemAnalytics.availability} />
                        <InfoCard
                            title="Monthly Additions"
                            icon="📅"
                            color="teal"
                        >
                            {data.itemAnalytics.monthlyAdditions.map((m: any, i: number) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                                    <span className="font-medium text-slate-700">{m.month}</span>
                                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-sm font-medium">
                                        {m.count}
                                    </span>
                                </div>
                            ))}
                        </InfoCard>
                    </div>
                </section>

                {/* ===== Fine Management ===== */}
                <section>
                    <SectionHeader
                        icon="💰"
                        title="Fine Management"
                        description="Overview of fines and penalties"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DistributionCard
                            title="Fine Status Breakdown"
                            data={data.fineManagement.statusBreakdown}
                            keyProp="status"
                            countProp="_count.status"
                            icon="📋"
                            color="amber"
                        />
                        <InfoCard
                            title="Top Fine Users"
                            icon="⚠️"
                            color="red"
                        >
                            {data.fineManagement.topFineUsers.map((u: any, i: number) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                                    <span className="font-medium text-slate-700">{u.name}</span>
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-bold">
                                        ₹{u.totalFine}
                                    </span>
                                </div>
                            ))}
                        </InfoCard>
                    </div>
                </section>

                {/* ===== System Activity ===== */}
                <section>
                    <SectionHeader
                        icon="⚡"
                        title="System Activity"
                        description="Real-time system status and activity"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            title="Overdue Items"
                            value={data.systemActivity.overdueItems}
                            icon="⏰"
                            gradient="from-red-500 to-red-600"
                            bgGradient="from-red-50 to-red-100"
                        />
                        <StatsCard
                            title="Recent Logs (7d)"
                            value={data.systemActivity.recentLogsCount}
                            icon="📝"
                            gradient="from-indigo-500 to-indigo-600"
                            bgGradient="from-indigo-50 to-indigo-100"
                        />
                        <InfoCard
                            title="Weekly Activity"
                            icon="📊"
                            color="slate"
                        >
                            {data.systemActivity.weeklyActivity.map((day: any, i: number) => (
                                <div key={i} className="py-2 border-b border-slate-100 last:border-b-0">
                                    <div className="font-medium text-slate-700 mb-1">{day.date}</div>
                                    <div className="flex gap-4 text-sm">
                                        <span className="text-blue-600">Issued: {day.issued}</span>
                                        <span className="text-emerald-600">Returned: {day.returned}</span>
                                    </div>
                                </div>
                            ))}
                        </InfoCard>
                    </div>
                </section>

                {/* ===== Librarian Performance ===== */}
                <section>
                    <SectionHeader
                        icon="👨‍💼"
                        title="Librarian Performance"
                        description="Staff performance metrics"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard
                            title="Approvals by Librarian"
                            icon="✅"
                            color="green"
                        >
                            {data.librarianPerformance.approvalStats.map((l: any, i: number) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                                    <span className="font-medium text-slate-700">{l.name}</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                                        {l.approvalsCount} approvals
                                    </span>
                                </div>
                            ))}
                        </InfoCard>
                    </div>
                </section>
            </div>
        </div>
    );
}

function SectionHeader({ icon, title, description }: { icon: string; title: string; description: string }) {
    return (
        <motion.div 
            className="flex items-center gap-4 mb-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-slate-900 text-xl font-bold">{icon}</span>
            </div>
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">{title}</h2>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>
            <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full"></div>
        </motion.div>
    );
}

function ChartSection({ icon, title, description, children }: { icon: string; title: string; description: string; children: React.ReactNode }) {
    return (
        <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center">
                        <span className="text-slate-900 text-xl font-bold">{icon}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                        <p className="text-slate-400 text-sm">{description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400 text-sm font-medium">LIVE</span>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-slate-900/20">
                {children}
            </div>
        </motion.div>
    );
}

function StatsCard({
    title,
    value,
    icon,
    gradient,
    bgGradient
}: {
    title: string;
    value: React.ReactNode;
    icon: string;
    gradient: string;
    bgGradient: string;
}) {
    // Map gradients to corporate colors
    const corporateGradients: { [key: string]: string } = {
        'from-blue-500 to-blue-600': 'from-cyan-500 to-teal-500',
        'from-purple-500 to-purple-600': 'from-indigo-500 to-purple-500',
        'from-amber-500 to-amber-600': 'from-amber-500 to-orange-500',
        'from-teal-500 to-teal-600': 'from-emerald-500 to-green-500',
        'from-yellow-500 to-yellow-600': 'from-amber-400 to-yellow-500',
        'from-red-500 to-red-600': 'from-red-500 to-pink-500',
        'from-indigo-500 to-indigo-600': 'from-indigo-500 to-blue-500'
    };
    
    const corporateGradient = corporateGradients[gradient] || gradient;
    
    return (
        <motion.div 
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 group"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r ${corporateGradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
                <div className="text-right">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</div>
                    <div className="text-3xl font-bold text-white mt-1">{value}</div>
                </div>
            </div>
            
            {/* Progress indicator */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                    <span>Performance</span>
                    <span>+12%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div 
                        className={`h-2 rounded-full bg-gradient-to-r ${corporateGradient}`}
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function DistributionCard({
    title,
    data,
    keyProp,
    countProp,
    icon,
    color
}: {
    title: string;
    data: any[];
    keyProp: string;
    countProp: string;
    icon: string;
    color: string;
}) {
    const colorClasses = {
        blue: 'from-blue-500 to-blue-600',
        purple: 'from-purple-500 to-purple-600',
        indigo: 'from-indigo-500 to-indigo-600',
        amber: 'from-amber-500 to-amber-600',
        cyan: 'from-cyan-500 to-cyan-600'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-lg">{icon}</span>
                </div>
                <h3 className="font-semibold text-slate-800">{title}</h3>
            </div>
            <div className="space-y-2">
                {data.map((item: any, idx: number) => {
                    const key = item[keyProp];
                    const count = countProp.split('.').reduce((acc: any, prop: string) => acc[prop], item);
                    return (
                        <div key={idx} className="flex items-center justify-between py-1">
                            <span className="text-slate-700 capitalize">{String(key)}</span>
                            <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-sm font-medium">
                                {count}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function AvailabilityCard({ data }: { data: any[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">📊</span>
                </div>
                <h3 className="font-semibold text-slate-800">Item Availability</h3>
            </div>
            <div className="space-y-2">
                {data.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-1">
                        <span className="text-slate-700 capitalize">{item.status}</span>
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-sm font-medium">
                            {item._count.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function InfoCard({
    title,
    icon,
    color,
    children
}: {
    title: string;
    icon: string;
    color: string;
    children: React.ReactNode
}) {
    const colorClasses = {
        emerald: 'from-emerald-500 to-emerald-600',
        teal: 'from-teal-500 to-teal-600',
        red: 'from-red-500 to-red-600',
        orange: 'from-orange-500 to-orange-600',
        slate: 'from-slate-500 to-slate-600',
        green: 'from-green-500 to-green-600',
        violet: 'from-violet-500 to-violet-600'
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                    <span className="text-white text-lg">{icon}</span>
                </div>
                <h3 className="font-semibold text-slate-800">{title}</h3>
            </div>
            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
}
