/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

interface Fine {
    fine_id: number;
    user: string | null;
    book: string | null;
    amount: number;
    reason: string | null;
    status: string;
    date_due: string | null;
    date_returned: string | null;
    created_at: string;
    paid_at: string | null;
}

interface ApiResponse {
    success: boolean;
    data: Fine[];
    message?: string;
}

export default function FinesPage() {
    const [fines, setFines] = useState<Fine[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFines() {
            try {
                const res = await fetch('/api/librarian/fines');
                if (!res.ok) {
                    throw new Error(`API returned status ${res.status}`);
                }

                const response: ApiResponse = await res.json();

                if (response.success) {
                    setFines(response.data || []);
                } else {
                    throw new Error(response.message || 'Failed to fetch fines');
                }
            } catch (err: any) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchFines();
    }, []);

    const calculateLateDays = (dateDue: string | null, dateReturned: string | null): number => {
        if (!dateDue || !dateReturned) return 0;

        const due = new Date(dateDue);
        const returned = new Date(dateReturned);
        const diffInMs = returned.getTime() - due.getTime();
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        return Math.max(0, diffInDays);
    };

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
        switch (status?.toLowerCase()) {
            case 'paid':
                return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
            case 'unpaid':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading fines...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-red-600 text-lg font-medium">Error loading fines</p>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    const totalFineAmount = fines.reduce((acc, fine) => acc + (Number(fine.amount) || 0), 0);
    const unpaidFines = fines.filter(fine => fine.status?.toLowerCase() === 'unpaid');
    const paidFines = fines.filter(fine => fine.status?.toLowerCase() === 'paid');

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Library Fines</h1>
                    <p className="text-gray-600">Manage and track all library fines</p>
                </div>

                {fines.length === 0 ? (
                    <div className="text-center p-16 bg-white rounded-xl shadow-md border border-gray-200">
                        <svg
                            className="mx-auto mb-4 h-16 w-16 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Fines Found</h3>
                        <p className="text-gray-600">Great! There are currently no outstanding fines in the system.</p>
                    </div>
                ) : (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Fines</p>
                                        <p className="text-2xl font-bold text-gray-900">{fines.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Unpaid Fines</p>
                                        <p className="text-2xl font-bold text-red-600">{unpaidFines.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Paid Fines</p>
                                        <p className="text-2xl font-bold text-green-600">{paidFines.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center">
                                    <div className="p-3 bg-yellow-100 rounded-lg">
                                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Amount</p>
                                        <p className="text-2xl font-bold text-yellow-600">₹{totalFineAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fine ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returned Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Days</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {fines.map((fine) => {
                                            const lateDays = calculateLateDays(fine.date_due, fine.date_returned);
                                            return (
                                                <tr key={fine.fine_id} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{fine.fine_id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.user || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fine.book || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">₹{Number(fine.amount).toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {fine.date_due ? new Date(fine.date_due).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {fine.date_returned ? new Date(fine.date_returned).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {lateDays > 0 ? (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                {lateDays} day{lateDays !== 1 ? 's' : ''}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-400 text-xs">N/A</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={getStatusBadge(fine.status)}>
                                                            {fine.status || 'Unknown'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                        {new Date(fine.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden space-y-4">
                            {fines.map((fine) => {
                                const lateDays = calculateLateDays(fine.date_due, fine.date_returned);
                                return (
                                    <div key={fine.fine_id} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">#{fine.fine_id}</h3>
                                                <p className="text-sm text-gray-600">{fine.user || 'N/A'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-red-600">₹{Number(fine.amount).toFixed(2)}</p>
                                                <span className={getStatusBadge(fine.status)}>
                                                    {fine.status || 'Unknown'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm"><span className="font-medium text-gray-700">Item:</span> {fine.book || 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-gray-700">Due Date:</span> {fine.date_due ? new Date(fine.date_due).toLocaleDateString() : 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-gray-700">Returned:</span> {fine.date_returned ? new Date(fine.date_returned).toLocaleDateString() : 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-gray-700">Late Days:</span> {lateDays > 0 ? `${lateDays} day${lateDays !== 1 ? 's' : ''}` : 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-gray-700">Created:</span> {new Date(fine.created_at).toLocaleDateString()}</p>
                                            {fine.reason && <p className="text-sm"><span className="font-medium text-gray-700">Reason:</span> {fine.reason}</p>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
