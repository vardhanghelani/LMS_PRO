 
'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, CheckCircle, AlertTriangle, Calendar, User, Mail } from 'lucide-react';

interface ItemIssueRecord {
    id: number;
    status: string;
    date_issued: string | null;
    date_due: string | null;
    requested_at: string;
    approved_at: string | null;
    library_items: {
        item_id: number;
        title: string;
        author: string;
        item_type: string;
    } | null;
    users_item_tran_history_requested_byTousers: {
        user_id: number;
        name: string;
        email: string;
    } | null;
    users_item_tran_history_approved_byTousers: {
        user_id: number;
        name: string;
        email: string;
    } | null;
}

interface ApiResponse {
    success: boolean;
    data: ItemIssueRecord[];
}

export default function IssuePage() {
    const [items, setItems] = useState<ItemIssueRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadIssuedItems() {
            try {
                const res = await fetch('/api/librarian/issue');
                const data: ApiResponse = await res.json();

                if (data.success && data.data) {
                    setItems(data.data);
                } else {
                    setError('No items data found');
                }
            } catch (err) {
                console.error('Error loading issued items:', err);
                setError('Failed to load issued items');
            } finally {
                setLoading(false);
            }
        }

        loadIssuedItems();
    }, []);

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status?.toLowerCase()) {
            case 'issued':
                return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
            case 'approved':
                return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
            case 'rejected':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        }
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return '—';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return '—';
        }
    };

    const getItemTypeIcon = (itemType: string) => {
        switch (itemType?.toLowerCase()) {
            case 'book':
                return (
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                );
            case 'magazine':
                return (
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                );
            case 'dvd':
                return (
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m2 4H5m14 0v13a1 1 0 01-1 1H6a1 1 0 01-1-1V8h14z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
        }
    };

    const issuedCount = items.filter(item => item.status?.toLowerCase() === 'issued').length;
    const pendingCount = items.filter(item => item.status?.toLowerCase() === 'pending').length;

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
                                    <h1 className="text-3xl font-bold text-slate-800">Issue Management Center</h1>
                                    <p className="text-slate-600">Professional tracking for all library transactions</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/50 shadow-lg"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="text-center">
                                            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">ACTIVE ISSUES</div>
                                            <div className="text-2xl font-bold text-emerald-700">{issuedCount}</div>
                                        </div>
                                    </motion.div>
                                    <motion.div 
                                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/50 shadow-lg"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="text-center">
                                            <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">PENDING</div>
                                            <div className="text-2xl font-bold text-amber-700">{pendingCount}</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            <div className="max-w-7xl mx-auto px-8 py-8">

                {/* Timeline Issue Feed */}
                <motion.div 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {loading ? (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 text-center border border-slate-200/50 shadow-lg">
                            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Loading Issue Records</h3>
                            <p className="text-slate-600">Gathering transaction history...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 text-center border border-red-200/50 shadow-lg">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Connection Error</h3>
                            <p className="text-slate-600 max-w-sm mx-auto">{error}</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 text-center border border-slate-200/50 shadow-lg">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">All Clear!</h3>
                            <p className="text-slate-600 max-w-sm mx-auto">
                                No active issues - all items are available in the library collection.
                            </p>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Timeline Layout with Cards */}
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-500"></div>
                            
                            <div className="space-y-8">
                                {items.map((item, index) => {
                                    const isOverdue = item.date_due && new Date(item.date_due) < new Date();
                                    const statusColor = item.status?.toLowerCase() === 'issued' ? 'emerald' : 
                                                      item.status?.toLowerCase() === 'pending' ? 'amber' : 
                                                      item.status?.toLowerCase() === 'approved' ? 'emerald' : 'slate';
                                    
                                    return (
                                        <motion.div
                                            key={item.id}
                                            className="relative flex items-start gap-6"
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            {/* Timeline Node */}
                                            <div className={`w-12 h-12 bg-gradient-to-r from-${statusColor}-500 to-${statusColor}-600 rounded-2xl flex items-center justify-center shadow-lg z-10 flex-shrink-0`}>
                                                <BookOpen className="w-5 h-5 text-white" />
                                            </div>
                                            
                                            {/* Timeline Card */}
                                            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border-l-4 border-l-emerald-400">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                                    {/* Item Details */}
                                                    <div className="lg:col-span-1">
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                <BookOpen className="w-6 h-6 text-emerald-600" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">
                                                                    {item.library_items?.title || 'Unknown Title'}
                                                                </h3>
                                                                <p className="text-slate-600 text-sm mb-2">
                                                                    by {item.library_items?.author || 'Unknown Author'}
                                                                </p>
                                                                <div className="inline-flex px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                                                                    {item.library_items?.item_type || 'Unknown Type'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Transaction Details */}
                                                    <div className="lg:col-span-1 space-y-4">
                                                        {/* Patron */}
                                                        <div>
                                                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">PATRON</div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                                                    <User className="w-4 h-4 text-teal-600" />
                                                                </div>
                                                                <div>
                                                                    <div className="text-sm font-medium text-slate-900">
                                                                        {item.users_item_tran_history_requested_byTousers?.name || 'Unknown User'}
                                                                    </div>
                                                                    <div className="text-xs text-slate-500">
                                                                        {item.users_item_tran_history_requested_byTousers?.email || 'No email'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Approved By */}
                                                        <div>
                                                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">APPROVED BY</div>
                                                            {item.users_item_tran_history_approved_byTousers?.name ? (
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-medium text-slate-900">
                                                                            {item.users_item_tran_history_approved_byTousers.name}
                                                                        </div>
                                                                        <div className="text-xs text-slate-500">
                                                                            {formatDate(item.approved_at)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                                                        <Clock className="w-4 h-4 text-amber-600" />
                                                                    </div>
                                                                    <div className="text-sm font-medium text-amber-700">Pending Approval</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Dates & Status */}
                                                    <div className="lg:col-span-1 space-y-4">
                                                        {/* Dates */}
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <div>
                                                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">ISSUE DATE</div>
                                                                <div className="text-sm font-medium text-slate-900">
                                                                    {item.date_issued ? formatDate(item.date_issued) : 'Not issued yet'}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">DUE DATE</div>
                                                                <div className={`text-sm font-medium ${
                                                                    isOverdue ? 'text-red-600' : 'text-slate-900'
                                                                }`}>
                                                                    {item.date_due ? formatDate(item.date_due) : 'Not set'}
                                                                    {isOverdue && (
                                                                        <div className="inline-flex items-center gap-1 ml-2 px-2 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold">
                                                                            <AlertTriangle className="w-3 h-3" />
                                                                            OVERDUE
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Status */}
                                                        <div>
                                                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">STATUS</div>
                                                            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold ${
                                                                item.status?.toLowerCase() === 'issued' ? 'bg-emerald-100 text-emerald-700' :
                                                                item.status?.toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                                item.status?.toLowerCase() === 'approved' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-slate-100 text-slate-700'
                                                            }`}>
                                                                {item.status?.toLowerCase() === 'issued' ? <CheckCircle className="w-4 h-4" /> :
                                                                 item.status?.toLowerCase() === 'pending' ? <Clock className="w-4 h-4" /> :
                                                                 <Calendar className="w-4 h-4" />}
                                                                {item.status?.charAt(0)?.toUpperCase() + item.status?.slice(1)?.toLowerCase() || 'Unknown'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
