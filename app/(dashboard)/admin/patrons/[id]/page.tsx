/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Shield, Calendar, BookOpen, DollarSign, Heart, AlertCircle, Clock, Check, X } from 'lucide-react';

interface Patron {
    user_id: number;
    name: string | null;
    email: string | null;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
    fines: {
        fine_id: number;
        amount: string;
        reason: string | null;
        status: string;
        created_at: string;
    }[];
    item_tran: any[];
    item_tran_history_item_tran_history_requested_byTousers: any[];
    user_wishlist: {
        id: number;
        library_items: {
            title: string | null;
            author: string;
        } | null;
    }[];
    notifications_notifications_to_user_idTousers: any[];
    notifications_notifications_from_user_idTousers: any[];
    logs: {
        log_id: number;
        description: string;
        created_at: string;
    }[];
    stats: {
        totalIssued: number;
        totalReturned: number;
        totalFines: string;
        currentIssuedItems: {
            id: number;
            date_due: string | null;
            library_items: {
                title: string | null;
            } | null;
        }[];
    };
}

export default function PatronDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [patron, setPatron] = useState<Patron | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPatron() {
            try {
                const res = await fetch(`/api/admin/patrons/${id}`);
                const data = await res.json();
                if (data.success) {
                    setPatron(data.user);
                    console.log("Logs : ",data.user.logs);
                }
            } catch (error) {
                console.error('Failed to fetch patron details:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPatron();
    }, [id]);

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            active: { bg: 'bg-green-100', text: 'text-green-800', icon: Check },
            inactive: { bg: 'bg-gray-100', text: 'text-gray-800', icon: X },
            suspended: { bg: 'bg-red-100', text: 'text-red-800', icon: X },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                <Icon className="w-3 h-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getRoleBadge = (role: string) => {
        const roleColors = {
            admin: 'bg-purple-100 text-purple-800',
            librarian: 'bg-blue-100 text-blue-800',
            patron: 'bg-gray-100 text-gray-800',
            student: 'bg-indigo-100 text-indigo-800',
            faculty: 'bg-emerald-100 text-emerald-800',
        };
        const colorClass = roleColors[role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800';
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                <Shield className="w-3 h-3" />
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
        );
    };

    const isOverdue = (dueDate: string | null) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading patron details...</p>
                </div>
            </div>
        );
    }

    if (!patron) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Patron Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested patron details are not accessible.</p>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Patron Profile</h1>
                        <p className="text-gray-600 mt-1">User ID: #{patron.user_id}</p>
                    </div>
                </div>
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                        <div className="flex items-center gap-4 text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold">{patron.name || 'Unknown User'}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-blue-100">{patron.email || 'No email'}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                {getStatusBadge(patron.status)}
                                <div className="mt-2">
                                    {getRoleBadge(patron.role)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Member since {new Date(patron.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </div>
                </div>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{patron.stats.totalIssued}</p>
                                <p className="text-gray-600 text-sm">Items Issued</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{patron.stats.totalReturned}</p>
                                <p className="text-gray-600 text-sm">Items Returned</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">₹{patron.stats.totalFines}</p>
                                <p className="text-gray-600 text-sm">Total Fines</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Currently Issued Items */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Currently Issued Items</h3>
                        </div>
                        {patron.stats.currentIssuedItems.length > 0 ? (
                            <div className="space-y-4">
                                {patron.stats.currentIssuedItems.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900 mb-2">
                                            {item.library_items?.title || 'Unknown Title'}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className={`text-sm ${isOverdue(item.date_due)
                                                ? 'text-red-600 font-medium'
                                                : 'text-gray-600'
                                                }`}>
                                                Due: {item.date_due
                                                    ? new Date(item.date_due).toLocaleDateString()
                                                    : 'N/A'}
                                                {isOverdue(item.date_due) && ' (Overdue)'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No currently issued items</p>
                            </div>
                        )}
                    </div>
                    {/* Wishlist */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-pink-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Wishlist</h3>
                        </div>
                        {patron.user_wishlist.length > 0 ? (
                            <div className="space-y-3">
                                {patron.user_wishlist.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium text-gray-900">
                                            {item.library_items?.title || 'Unknown Title'}
                                        </h4>
                                        <p className="text-gray-600 text-sm">
                                            by {item.library_items?.author || 'Unknown Author'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No items in wishlist</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Fines Section */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Fines</h3>
                    </div>
                    {patron.fines.length > 0 ? (
                        <div className="space-y-3">
                            {patron.fines.map((fine) => (
                                <div key={fine.fine_id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium text-gray-900">₹{fine.amount}</p>
                                            <p className="text-gray-600 text-sm">{fine.reason || 'No reason specified'}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${fine.status === 'unpaid'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                            }`}>
                                            {fine.status.charAt(0).toUpperCase() + fine.status.slice(1)}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-xs">
                                        {new Date(fine.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No fines recorded</p>
                        </div>
                    )}
                </div>
                {/* Activity Logs */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                    </div>
                    {patron.logs.length > 0 ? (
                        <div className="space-y-4">
                            {patron.logs.slice(0, 10).map((log) => (
                                <div key={log.log_id} className="border-l-4 border-blue-200 pl-4 py-2">
                                    <p className="text-gray-900">{log.description}</p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {new Date(log.created_at).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No activity logs available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
