/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import ConfirmDialog from '@/app/components/ConfirmDialog'; // Adjust import path if needed

type BorrowHistoryEntry = {
    id: number;
    item: {
        item_id: number;
        title: string | null;
        author: string;
        item_type: string;
        image_url?: string | null;
        location?: string | null;
    } | null;
    status: string;
    requested_at: string | null;
    approved_at: string | null;
    date_issued: string | null;
    date_due: string | null;
    date_returned: string | null;
    approved_by?: { name: string; email: string } | null;
    remarks: string | null;
};

type Stats = {
    itemsRead: number;
    currentlyBorrowed: number;
    favorites: number;
    totalFines: number;
    totalPaidFines: number;
    totalUnpaidFines: number;
};

export default function BorrowingHistory() {
    const [borrowHistory, setBorrowHistory] = useState<BorrowHistoryEntry[]>([]);
    const [stats, setStats] = useState<Stats>({
        itemsRead: 0,
        currentlyBorrowed: 0,
        favorites: 0,
        totalFines: 0,
        totalPaidFines: 0,
        totalUnpaidFines: 0,
    });
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);
    const [confirmPayOpen, setConfirmPayOpen] = useState(false);
    const [paying, setPaying] = useState(false);

    const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setSnackbar({ message, type });
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const [historyRes, statsRes] = await Promise.all([
                    fetch('/api/patron/history', { credentials: 'include' }),
                    fetch('/api/patron/stats', { credentials: 'include' }),
                ]);
                const historyData = await historyRes.json();
                const statsData = await statsRes.json();
                console.log(statsData)
                if (historyRes.ok) {
                    setBorrowHistory(historyData.borrowHistory || []);
                } else {
                    setBorrowHistory([]);
                }

                setStats({
                    itemsRead: statsData.itemsRead ?? 0,
                    currentlyBorrowed: statsData.currentlyBorrowed ?? 0,
                    favorites: statsData.favorites ?? 0,
                    totalFines: statsData.totalFines ?? 0,
                    totalPaidFines: statsData.totalPaid ?? 0,
                    totalUnpaidFines: statsData.totalUnpaid ?? 0,
                });
                console.log(stats)

            } catch (error) {
                console.error('Error fetching borrowing history or stats:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'returned':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'issued':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        return d.toLocaleDateString();
    };

    const handlePayFines = async () => {
        setConfirmPayOpen(false);
        setPaying(true);

        try {
            const res = await fetch('/api/patron/history/finepay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}),
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Payment failed');

            // Refresh data
            const [historyRes, statsRes] = await Promise.all([
                fetch('/api/patron/history', { credentials: 'include' }),
                fetch('/api/patron/stats', { credentials: 'include' }),
            ]);
            const historyData = await historyRes.json();
            const statsData = await statsRes.json();

            setBorrowHistory(historyData.borrowHistory ?? []);
            setStats({
                itemsRead: statsData.itemsRead ?? 0,
                currentlyBorrowed: statsData.currentlyBorrowed ?? 0,
                favorites: statsData.favorites ?? 0,
                totalFines: statsData.totalFines ?? 0,
                totalPaidFines: statsData.totalPaidFines ?? 0,
                totalUnpaidFines: statsData.totalUnpaidFines ?? 0,
            });

            showSnackbar('Fines paid successfully!', 'success');
        } catch {
            showSnackbar('Failed to pay fines. Please try again.', 'error');
        } finally {
            setPaying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-slate-300 rounded w-64 mx-auto mb-8"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-lg" />
                            ))}
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-16 bg-slate-200 rounded" />
                                ))}
                            </div>
                        </div>
                        <p className="text-center mt-6 text-slate-600">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                            Borrowing History
                        </h1>
                    </div>
                    <p className="text-slate-600">Track your reading journey and library activity</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-slate-200 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-indigo-600 mb-1">{stats.itemsRead}</div>
                        <div className="text-sm font-medium text-slate-600">Items Read</div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-slate-200 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-blue-600 mb-1">{stats.currentlyBorrowed}</div>
                        <div className="text-sm font-medium text-slate-600">Currently Borrowed</div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-slate-200 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-pink-600 mb-1">{stats.favorites}</div>
                        <div className="text-sm font-medium text-slate-600">Favorites</div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-slate-200 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div className="text-3xl font-bold text-red-600 mb-1">₹{Number(stats.totalFines).toFixed(2)}</div>
                        <div className="text-sm font-medium text-slate-600">Total Fines</div>
                    </div>
                </div>

                {/* Paid and Unpaid Fines */}
                <div className="flex justify-center space-x-10 mb-6">
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md text-center w-40">
                        <div className="text-lg font-semibold">₹{Number(stats.totalPaidFines).toFixed(2)}</div>
                        <div className="text-sm font-medium">Total Paid Fines</div>
                    </div>
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md text-center w-40">
                        <div className="text-lg font-semibold">₹{Number(stats.totalUnpaidFines).toFixed(2)}</div>
                        <div className="text-sm font-medium">Total Unpaid Fines</div>
                    </div>
                </div>

                {/* Pay Fines Button */}
                {stats.totalUnpaidFines > 0 && (
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => setConfirmPayOpen(true)}
                            disabled={paying}
                            className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-colors ${paying ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {paying ? 'Processing...' : 'Pay Fines'}
                        </button>
                    </div>
                )}

                {/* Confirm Dialog */}
                <ConfirmDialog
                    open={confirmPayOpen}
                    title="Confirm Pay Fines"
                    message="Are you sure you want to pay all your unpaid fines?"
                    confirmText="Pay Now"
                    cancelText="Cancel"
                    variant="warning"
                    onConfirm={handlePayFines}
                    onCancel={() => setConfirmPayOpen(false)}
                />

                {/* Borrow History Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            Borrowing History
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b-2 border-slate-200">
                                <tr>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Title</th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Requested</th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Approved</th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Issued</th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Due</th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Returned</th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 font-semibold text-slate-700 text-sm uppercase tracking-wider">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {borrowHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                                    <svg
                                                        className="w-8 h-8 text-slate-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                        />
                                                    </svg>
                                                </div>
                                                <h3 className="text-lg font-semibold text-slate-700 mb-2">No Borrowing History</h3>
                                                <p className="text-slate-500">Start your reading journey by borrowing your first item!</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    borrowHistory.map((entry) => (
                                        <tr key={entry.id} className="hover:bg-slate-50 transition-colors duration-200">
                                            <td className="px-6 py-4 font-semibold text-slate-800">{entry.item?.title || 'Untitled'}</td>
                                            <td className="px-6 py-4 text-slate-600">{formatDate(entry.requested_at)}</td>
                                            <td className="px-6 py-4 text-slate-600">{formatDate(entry.approved_at)}</td>
                                            <td className="px-6 py-4 text-slate-600">{formatDate(entry.date_issued)}</td>
                                            <td className="px-6 py-4 text-slate-600">{formatDate(entry.date_due)}</td>
                                            <td className="px-6 py-4 text-slate-600">{formatDate(entry.date_returned)}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                        entry.status
                                                    )}`}
                                                >
                                                    {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{entry.remarks || '-'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Snackbar */}
                {snackbar && (
                    <div
                        className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold z-50 ${snackbar.type === 'success'
                                ? 'bg-green-600'
                                : snackbar.type === 'error'
                                    ? 'bg-red-600'
                                    : 'bg-gray-600'
                            }`}
                        role="alert"
                        onClick={() => setSnackbar(null)}
                    >
                        {snackbar.message}
                    </div>
                )}
            </div>
        </div>
    );
}
