/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

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
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse space-y-8">
                        {/* Header skeleton */}
                        <div className="text-center">
                            <div className="h-10 bg-slate-200 rounded-lg w-80 mx-auto mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-64 mx-auto"></div>
                        </div>

                        {/* Cards skeleton */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                    <div className="h-4 bg-slate-200 rounded w-20 mb-3"></div>
                                    <div className="h-8 bg-slate-200 rounded w-12"></div>
                                </div>
                            ))}
                        </div>

                        {/* Activity skeleton */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="border border-slate-200 rounded-lg p-4">
                                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
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
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-600">Manage your library operations and monitor activities</p>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <Card
                        title="Total Patrons"
                        value={data.totalPatrons}
                        icon="👥"
                        gradient="from-blue-500 to-blue-600"
                        bgGradient="from-blue-50 to-blue-100"
                    />
                    <Card
                        title="Total Librarians"
                        value={data.totalLibrarians}
                        icon="👨‍💼"
                        gradient="from-purple-500 to-purple-600"
                        bgGradient="from-purple-50 to-purple-100"
                    />
                    <Card
                        title="Total Items"
                        value={data.totalItems}
                        icon="📦"
                        gradient="from-emerald-500 to-emerald-600"
                        bgGradient="from-emerald-50 to-emerald-100"
                    />
                    <Card
                        title="Issued Today"
                        value={data.issuedToday}
                        icon="📤"
                        gradient="from-orange-500 to-orange-600"
                        bgGradient="from-orange-50 to-orange-100"
                    />
                    <Card
                        title="Returned Today"
                        value={data.returnedToday}
                        icon="📥"
                        gradient="from-teal-500 to-teal-600"
                        bgGradient="from-teal-50 to-teal-100"
                    />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl">⚡</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">Recent Activity</h2>
                            <p className="text-slate-600 text-sm">Latest item transactions and user activities</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {(data?.formattedActivity ?? []).map((activity: any, i: number) => {
                            const isIssue = activity.type === 'issue';
                            const userName = activity.userName || 'Unknown User';
                            const itemTitle = activity.itemTitle || 'Unknown Item';
                            const dateStr = activity.date
                                ? new Date(activity.date).toLocaleString()
                                : 'Unknown Date';

                            return (
                                <div key={i} className="group hover:shadow-md transition-all duration-200 border border-slate-200 rounded-lg p-4 bg-gradient-to-r from-white to-slate-50 hover:from-slate-50 hover:to-blue-50">
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${isIssue
                                                ? 'bg-gradient-to-r from-orange-400 to-orange-500'
                                                : 'bg-gradient-to-r from-teal-400 to-teal-500'
                                                }`}
                                        >
                                            {isIssue ? '📤' : '📥'}
                                        </div>
                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-1 text-sm">
                                                <span className="text-sm text-gray-700">
                                                    👤 {userName}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${isIssue
                                                        ? 'bg-orange-100 text-orange-700'
                                                        : 'bg-teal-100 text-teal-700'
                                                        }`}
                                                >
                                                    {isIssue ? 'issued' : 'returned'}
                                                </span>
                                                <span className="text-slate-600">the item</span>
                                                <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded-md text-xs">
                                                    {itemTitle}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-slate-500">
                                                    🕒 {dateStr}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {(data?.formattedActivity?.length ?? 0) === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <p className="text-slate-500">No recent activity to display</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Card({
    title,
    value,
    icon,
    gradient,
    bgGradient
}: {
    title: string;
    value: number;
    icon: string;
    gradient: string;
    bgGradient: string;
}) {
    return (
        <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 shadow-sm border border-white/50 hover:shadow-md transition-all duration-200 group cursor-pointer`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    {title}
                </div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {value?.toLocaleString() || 0}
                </div>
            </div>
        </div>
    );
}
