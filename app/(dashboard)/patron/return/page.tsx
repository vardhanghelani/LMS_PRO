/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import Snackbar from '@/app/components/Snackbar';
import { BookOpen } from 'lucide-react';

interface ReturnRecord {
    id: number;
    tran_id: number;
    status: string;
    requested_at: string;
    approved_at: string | null;
    date_issued: string | null;
    date_due: string | null;
    date_returned: string | null;
    remarks: string | null;
    library_items: {
        item_id: number;
        title: string;
        author: string;
        item_type: string;
        image_url: string | null;
    };
}

interface ApiResponse {
    success: boolean;
    data: ReturnRecord[];
    error?: string;
}

export default function ReturnPage() {
    const [records, setRecords] = useState<ReturnRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTranId, setSelectedTranId] = useState<number | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    useEffect(() => {
        async function fetchReturns() {
            try {
                setError(null);
                const res = await fetch('/api/patron/return');
                const json: ApiResponse = await res.json();
                if (json.success) setRecords(json.data);
                else setError(json.error || 'Failed to load records');
            } catch {
                setError('Network error fetching records');
            } finally {
                setLoading(false);
            }
        }
        fetchReturns();
    }, []);

    const onReturnClick = (tranId: number) => {
        setSelectedTranId(tranId);
        setConfirmOpen(true);
        setError(null);
        setSuccessMsg(null);
    };

    const handleReturn = async (tranId: number) => {
        try {
            const res = await fetch(`/api/patron/return/${tranId}`, { method: 'POST' });
            const json = await res.json();
            console.log(json);
            if (json.success) {
                setSuccessMsg(json.message || 'Returned successfully');
                setRecords(prev => prev.filter(r => r.tran_id !== tranId));
                setTimeout(() => setSuccessMsg(null), 3000);
            } else {
                setError(json.error || 'Return failed');
            }
        } catch {
            setError('Network error processing return');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                Return Items
                            </h1>
                            <p className="text-slate-600 mt-2">
                                Select an issued item and confirm return
                            </p>
                        </div>
                    </div>
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 max-w-2xl mx-auto">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}
                    {successMsg && (
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 max-w-2xl mx-auto">
                            <p className="text-green-700">{successMsg}</p>
                        </div>
                    )}
                    {!loading && records.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 inline-block mb-6">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-slate-500 text-sm font-medium">Items to Return</p>
                                    <p className="text-3xl font-bold text-blue-600">{records.length}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"></div>
                        ))}
                    </div>
                ) : records.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
                        <p className="text-lg font-semibold text-slate-700 mb-3">No Items to Return</p>
                        <p className="text-slate-500">You have no issued items.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {records.map(record => (
                            <div key={record.tran_id} className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                                {/* Cover */}
                                <div className="w-full h-48 bg-slate-200 flex items-center justify-center">
                                    {record.library_items.image_url ? (
                                        <img src={record.library_items.image_url} alt={record.library_items.title} className="object-cover h-full w-full" />
                                    ) : (
                                        <BookOpen className="w-12 h-12 text-slate-400" />
                                    )}
                                </div>
                                {/* Details */}
                                <div className="p-6 space-y-4">
                                    <h2 className="text-xl font-bold text-slate-800">{record.library_items.title}</h2>
                                    <p className="text-sm text-slate-600">by {record.library_items.author}</p>
                                    <div className="flex flex-col space-y-1 text-sm text-gray-700">
                                        <div>Issued: {new Date(record.date_issued || record.requested_at).toLocaleDateString()}</div>
                                        <div>Due: {record.date_due ? new Date(record.date_due).toLocaleDateString() : '—'}</div>
                                    </div>
                                    <button
                                        onClick={() => onReturnClick(record.id)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg shadow hover:opacity-90"
                                    >
                                        Return
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Confirm */}
                <ConfirmDialog
                    open={confirmOpen}
                    title="Confirm Return"
                    message="Are you sure you want to return this item?"
                    confirmText="Return"
                    cancelText="Cancel"
                    variant="warning"
                    onConfirm={() => {
                        if (selectedTranId !== null) handleReturn(selectedTranId);
                        setConfirmOpen(false);
                        setSelectedTranId(null);
                    }}
                    onCancel={() => {
                        setConfirmOpen(false);
                        setSelectedTranId(null);
                    }}
                />

                {/* Snackbar */}
                <Snackbar open={!!successMsg || !!error} message={successMsg || error || ''} type={successMsg ? 'success' : 'error'} onClose={() => { setSuccessMsg(null); setError(null) }} />
            </div>
        </div>
    );
}
