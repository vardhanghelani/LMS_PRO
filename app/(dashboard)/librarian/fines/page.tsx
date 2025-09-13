/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, CheckCircle, AlertCircle, Clock, BookOpen, User, Calendar, FileText } from 'lucide-react';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import Snackbar from '@/app/components/Snackbar';

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
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
    const [snackbar, setSnackbar] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

    const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setSnackbar({ message, type });
    };

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

    const handleMarkAsPaid = async (fine: Fine) => {
        setSelectedFine(fine);
        setShowConfirm(true);
    };

    const confirmMarkAsPaid = async () => {
        if (!selectedFine) return;

        try {
            const res = await fetch('/api/librarian/fines', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    fineId: selectedFine.fine_id,
                    status: 'paid'
                }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                showSnackbar('Fine marked as paid successfully!', 'success');
                // Refresh the fines list
                const updatedFines = fines.map(fine => 
                    fine.fine_id === selectedFine.fine_id 
                        ? { ...fine, status: 'paid', paid_at: new Date().toISOString() }
                        : fine
                );
                setFines(updatedFines);
                
                // Refresh the dashboard if it exists
                if ((window as any).refreshLibrarianDashboard) {
                    (window as any).refreshLibrarianDashboard();
                }
            } else {
                showSnackbar(data.message || 'Failed to mark fine as paid', 'error');
            }
        } catch (error) {
            console.error('Error marking fine as paid:', error);
            showSnackbar('Failed to mark fine as paid', 'error');
        } finally {
            setShowConfirm(false);
            setSelectedFine(null);
        }
    };

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
                return `${baseClasses} bg-[#E2E8F0] text-[#1E293B]/60 border border-[#E2E8F0]`;
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center py-16">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4F46E5]"></div>
                            <p className="text-[#1E293B]/60 font-medium">Loading fines...</p>
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
                    <div className="flex items-center justify-center py-16">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <p className="text-red-600 text-lg font-medium">Error loading fines</p>
                            <p className="text-[#1E293B]/60">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const totalFineAmount = fines.reduce((acc, fine) => acc + (Number(fine.amount) || 0), 0);
    const unpaidFines = fines.filter(fine => fine.status?.toLowerCase() === 'unpaid');
    const paidFines = fines.filter(fine => fine.status?.toLowerCase() === 'paid');

    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1E293B]">Library Fines</h1>
                            <p className="mt-2 text-sm text-[#1E293B]/60">
                                Manage and track all library fines and payments
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-[#E2E8F0]">
                                <span className="text-sm font-medium text-[#1E293B]/60">Total Fines</span>
                                <div className="text-2xl font-bold text-[#1E293B]">{fines.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {fines.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-[#1E293B] mb-2">No Fines Found</h3>
                        <p className="text-[#1E293B]/60 max-w-sm mx-auto">
                            Great! There are currently no outstanding fines in the system.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <motion.div 
                                className="bg-white rounded-xl p-6 shadow-lg border border-[#E2E8F0]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="flex items-center">
                                    <div className="p-3 bg-[#4F46E5]/10 rounded-lg">
                                        <FileText className="w-6 h-6 text-[#4F46E5]" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-[#1E293B]/60">Total Fines</p>
                                        <p className="text-2xl font-bold text-[#1E293B]">{fines.length}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-white rounded-xl p-6 shadow-lg border border-[#E2E8F0]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <div className="flex items-center">
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <AlertCircle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-[#1E293B]/60">Unpaid Fines</p>
                                        <p className="text-2xl font-bold text-red-600">{unpaidFines.length}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-white rounded-xl p-6 shadow-lg border border-[#E2E8F0]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <div className="flex items-center">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-[#1E293B]/60">Paid Fines</p>
                                        <p className="text-2xl font-bold text-green-600">{paidFines.length}</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-white rounded-xl p-6 shadow-lg border border-[#E2E8F0]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="flex items-center">
                                    <div className="p-3 bg-[#06B6D4]/10 rounded-lg">
                                        <DollarSign className="w-6 h-6 text-[#06B6D4]" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-[#1E293B]/60">Total Amount</p>
                                        <p className="text-2xl font-bold text-[#06B6D4]">₹{totalFineAmount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white rounded-xl shadow-lg border border-[#E2E8F0] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-[#E2E8F0]">
                                    <thead className="bg-[#F8FAFC]">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Fine ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Item</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Due Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Returned Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Late Days</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-[#1E293B]/60 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-[#E2E8F0]">
                                        {fines.map((fine) => {
                                            const lateDays = calculateLateDays(fine.date_due, fine.date_returned);
                                            return (
                                                <tr key={fine.fine_id} className="hover:bg-[#F8FAFC] transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E293B]">#{fine.fine_id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E293B]">{fine.user || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E293B]">{fine.book || 'N/A'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">₹{Number(fine.amount).toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E293B]/70">
                                                        {fine.date_due ? new Date(fine.date_due).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1E293B]/70">
                                                        {fine.date_returned ? new Date(fine.date_returned).toLocaleDateString() : 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {lateDays > 0 ? (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                                {lateDays} day{lateDays !== 1 ? 's' : ''}
                                                            </span>
                                                        ) : (
                                                            <span className="text-[#1E293B]/40 text-xs">N/A</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={getStatusBadge(fine.status)}>
                                                            {fine.status || 'Unknown'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {fine.status?.toLowerCase() === 'unpaid' ? (
                                                            <button
                                                                onClick={() => handleMarkAsPaid(fine)}
                                                                className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                                                            >
                                                                Mark Paid
                                                            </button>
                                                        ) : (
                                                            <span className="text-[#1E293B]/40 text-sm">No action</span>
                                                        )}
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
                                    <motion.div 
                                        key={fine.fine_id} 
                                        className="bg-white rounded-xl p-6 shadow-lg border border-[#E2E8F0]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-[#1E293B]">#{fine.fine_id}</h3>
                                                <p className="text-sm text-[#1E293B]/60">{fine.user || 'N/A'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-red-600">₹{Number(fine.amount).toFixed(2)}</p>
                                                <span className={getStatusBadge(fine.status)}>
                                                    {fine.status || 'Unknown'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-sm"><span className="font-medium text-[#1E293B]/70">Item:</span> {fine.book || 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-[#1E293B]/70">Due Date:</span> {fine.date_due ? new Date(fine.date_due).toLocaleDateString() : 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-[#1E293B]/70">Returned:</span> {fine.date_returned ? new Date(fine.date_returned).toLocaleDateString() : 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-[#1E293B]/70">Late Days:</span> {lateDays > 0 ? `${lateDays} day${lateDays !== 1 ? 's' : ''}` : 'N/A'}</p>
                                            <p className="text-sm"><span className="font-medium text-[#1E293B]/70">Created:</span> {new Date(fine.created_at).toLocaleDateString()}</p>
                                            {fine.reason && <p className="text-sm"><span className="font-medium text-[#1E293B]/70">Reason:</span> {fine.reason}</p>}
                                            
                                            {/* Mobile Action Button */}
                                            {fine.status?.toLowerCase() === 'unpaid' && (
                                                <div className="pt-3 border-t border-[#E2E8F0]">
                                                    <button
                                                        onClick={() => handleMarkAsPaid(fine)}
                                                        className="w-full px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                                                    >
                                                        Mark as Paid
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Confirmation Dialog */}
            <ConfirmDialog
                open={showConfirm}
                title="Mark Fine as Paid"
                message={`Are you sure you want to mark fine #${selectedFine?.fine_id} as paid? This action cannot be undone.`}
                confirmText="Mark as Paid"
                cancelText="Cancel"
                variant="success"
                onConfirm={confirmMarkAsPaid}
                onCancel={() => {
                    setShowConfirm(false);
                    setSelectedFine(null);
                }}
            />

            {/* Snackbar */}
            <Snackbar
                open={!!snackbar}
                message={snackbar?.message || ''}
                type={snackbar?.type}
                onClose={() => setSnackbar(null)}
            />
        </div>
    );
}
