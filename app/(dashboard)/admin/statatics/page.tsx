/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-8">
                        <div className="text-center">
                            <div className="h-10 bg-slate-200 rounded-lg w-96 mx-auto mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-64 mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                    <div className="h-4 bg-slate-200 rounded w-20 mb-3"></div>
                                    <div className="h-8 bg-slate-200 rounded w-12"></div>
                                </div>
                            ))}
                        </div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
                                <div className="h-64 bg-slate-100 rounded-lg"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Comprehensive Statistics
                    </h1>
                    <p className="text-slate-600">Deep insights into your library operations and performance</p>
                </div>

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
        <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">{icon}</span>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
                <p className="text-slate-600">{description}</p>
            </div>
        </div>
    );
}

function ChartSection({ icon, title, description, children }: { icon: string; title: string; description: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">{icon}</span>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                    <p className="text-slate-600 text-sm">{description}</p>
                </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
                {children}
            </div>
        </div>
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
    return (
        <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 shadow-sm border border-white/50 hover:shadow-md transition-all duration-200 group`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">
                    {title}
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {value}
                </div>
            </div>
        </div>
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
