'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, TrendingUp } from 'lucide-react';

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
    color = "blue"
}: {
    title: string;
    value: number | string;
    subtitle?: string;
    color?: string;
}) => {
    const colorClasses = {
        blue: "bg-blue-50 border-blue-200 text-blue-900",
        green: "bg-green-50 border-green-200 text-green-900",
        yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
        red: "bg-red-50 border-red-200 text-red-900",
        purple: "bg-purple-50 border-purple-200 text-purple-900",
        gray: "bg-gray-50 border-gray-200 text-gray-900"
    };

    return (
        <div className={`p-3 sm:p-4 rounded-lg border ${colorClasses[color as keyof typeof colorClasses]}`}>
            <h3 className="text-xs sm:text-sm font-medium">{title}</h3>
            <p className="text-lg sm:text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs mt-1">{subtitle}</p>}
        </div>
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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">Error</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!data) {
        return <div>No data available</div>;
    }

    const chartData = data.chartData.days.map((day, index) => ({
        date: day,
        issued: data.chartData.issued[index],
        returned: data.chartData.returned[index],
    }));

    const sortedTopItems = Array.isArray(data.topBorrowedItems)
        ? [...data.topBorrowedItems].sort((a, b) => b.borrowCount - a.borrowCount)
        : [];

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold mb-3">Library Dashboard</h1>

                {/* Summary Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-4">
                    <StatCard title="Available Items" value={data.summary.available} color="green" />
                    <StatCard title="Issued Items" value={data.summary.issued} color="blue" />
                    <StatCard title="Pending Requests" value={data.summary.pending} color="yellow" />
                    <StatCard title="Overdue Items" value={data.summary.overdueCount} color="red" />
                    <StatCard title="Unpaid Fines" value={`₹${(data.summary.finesUnpaid ?? 0).toFixed(2)}`} color="red" />
                    <StatCard title="Collected Fines" value={`₹${(data.summary.finesCollected ?? 0).toFixed(2)}`} subtitle="Last 30 days" color="green" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-6 mb-4">
                    <div className="bg-white p-3 rounded shadow border">
                        <h2 className="mb-2 text-lg font-semibold">Daily Transactions (Last 30 Days)</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => {
                                        const d = new Date(value);
                                        return `${d.getMonth() + 1}/${d.getDate()}`;
                                    }}
                                />
                                <YAxis />
                                <Tooltip
                                    labelFormatter={(label) => `Date: ${label}`}
                                    formatter={(value, name) => {
                                        if (name === 'issued') return [value, 'Items Issued'];
                                        if (name === 'returned') return [value, 'Items Returned'];
                                        return [value, name];
                                    }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="issued" stroke="#3B82F6" strokeWidth={2} name="Items Issued" />
                                <Line type="monotone" dataKey="returned" stroke="#10B981" strokeWidth={2} name="Items Returned" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-3 rounded shadow border">
                        <div className="flex items-center mb-3">
                            <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                            <h2 className="text-lg font-semibold">Top Borrowed Items</h2>
                        </div>
                        {sortedTopItems.length > 0 ? (
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {sortedTopItems.slice(0, 10).map((borrowedItem, i) => (
                                    <div key={borrowedItem.item.item_id} className="flex justify-between items-center p-2 rounded border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 hover:shadow-sm transition-shadow">
                                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                                            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-white font-bold text-xs flex-shrink-0 ${i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-amber-600' : 'bg-purple-500'
                                                }`}>{i + 1}</div>
                                            <BookOpen className="w-4 h-4 text-purple-600 flex-shrink-0" />
                                            <div className="truncate">
                                                <div className="font-medium text-gray-900 text-sm truncate">
                                                    {borrowedItem.item.title || `Item ID: ${borrowedItem.item.item_id}`}
                                                </div>
                                                <div className="text-xs text-gray-500 truncate">
                                                    by {borrowedItem.item.author}
                                                </div>
                                                {borrowedItem.item.genre && (
                                                    <div className="text-xs text-purple-600 truncate">
                                                        {borrowedItem.item.genre}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="ml-3 flex-shrink-0 text-right">
                                            <div className="font-bold text-purple-700">{borrowedItem.borrowCount}</div>
                                            <div className="text-xs text-gray-500">borrows</div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-3 text-xs">
                                    <div className="bg-blue-50 rounded p-2 text-center">
                                        <div className="font-semibold text-blue-700">Total Items</div>
                                        <div className="text-blue-600 font-bold">{sortedTopItems.length}</div>
                                    </div>
                                    <div className="bg-green-50 rounded p-2 text-center">
                                        <div className="font-semibold text-green-700">Total Borrows</div>
                                        <div className="text-green-600 font-bold">
                                            {sortedTopItems.reduce((acc, borrowedItem) => acc + borrowedItem.borrowCount, 0)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-32 flex flex-col items-center justify-center text-gray-500">
                                <BookOpen className="w-6 h-6 mb-2 opacity-50" />
                                <p className="text-sm">No borrowing data available</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-3 rounded shadow border">
                    <h2 className="mb-2 text-lg font-semibold">Available Genres</h2>
                    {data.genres.length ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                            {data.genres.map((genre, idx) => (
                                <div key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs text-center font-medium">{genre}</div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-xs">No genres available</p>
                    )}
                </div>
            </div>
        </div>
    );
}