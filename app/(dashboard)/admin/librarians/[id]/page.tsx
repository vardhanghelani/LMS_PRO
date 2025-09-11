'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    User,
    Mail,
    Shield,
    BookOpen,
    CheckCircle,
    Activity,
    Bell,
    Calendar,
    Hash,
    Users,
    AlertCircle,
    Clock,
    Send,
    Inbox
} from 'lucide-react';

interface Item {
    item_id: number;
    title: string;
    author: string;
    genre: string;
    year: number;
    _count: {
        item_tran: number;
    };
}

interface Transaction {
    tran_id: number;
    status: string;
    library_items: { title: string };
    users_item_tran_history_requested_byTousers: { name: string };
    approved_at: string;
}

interface Log {
    id: number;
    description: string;
    created_at: string;
}

interface Notification {
    id: number;
    message: string;
    created_at: string;
}

interface LibrarianData {
    success: boolean;
    user: {
        user_id: number;
        name: string;
        email: string;
        role: string;
    };
    summary: {
        totalItemsManaged: number;
        totalApprovedTransactions: number;
        totalLogs: number;
        totalNotifications: number;
    };
    itemsManaged: Item[];
    approvedTransactions: Transaction[];
    logs: Log[];
    notifications: {
        sent: Notification[];
        received: Notification[];
    };
}

export default function LibrarianDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState<LibrarianData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch(`/api/admin/librarians/${id}`);
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error('Error fetching librarian details:', err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [id]);

    const getGenreColor = (genre: string) => {
        const colors = {
            'Fiction': 'bg-purple-100 text-purple-800',
            'Non-Fiction': 'bg-blue-100 text-blue-800',
            'Science': 'bg-green-100 text-green-800',
            'History': 'bg-amber-100 text-amber-800',
            'Biography': 'bg-indigo-100 text-indigo-800',
            'Mystery': 'bg-gray-100 text-gray-800',
            'Romance': 'bg-pink-100 text-pink-800',
            'Fantasy': 'bg-violet-100 text-violet-800',
        };
        return colors[genre as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusColor = (status: string) => {
        const colors = {
            'approved': 'bg-green-100 text-green-800',
            'pending': 'bg-yellow-100 text-yellow-800',
            'rejected': 'bg-red-100 text-red-800',
            'completed': 'bg-blue-100 text-blue-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading librarian details...</p>
                </div>
            </div>
        );
    }

    if (!data || !data.success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-xl shadow-lg">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Data</h2>
                    <p className="text-gray-600 mb-6">Unable to fetch librarian details.</p>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const { user, summary, itemsManaged, approvedTransactions, logs, notifications } = data!;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
                        <h1 className="text-3xl font-bold text-gray-900">Librarian Profile</h1>
                        <p className="text-gray-600 mt-1">User ID: #{user.user_id}</p>
                    </div>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                        <div className="flex items-center gap-4 text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold">{user.name}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-indigo-100">{user.email}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                                    <Shield className="w-3 h-3" />
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{summary.totalItemsManaged}</p>
                                <p className="text-gray-600 text-sm">Items Managed</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{summary.totalApprovedTransactions}</p>
                                <p className="text-gray-600 text-sm">Transactions Approved</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Activity className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{summary.totalLogs}</p>
                                <p className="text-gray-600 text-sm">Activity Logs</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Bell className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">{summary.totalNotifications}</p>
                                <p className="text-gray-600 text-sm">Notifications</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Managed */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Items Managed</h3>
                    </div>

                    {itemsManaged.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {itemsManaged.map(item => (
                                <div key={item.item_id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                                            {item.title}
                                        </h4>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(item.genre)}`}>
                                            {item.genre}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            {item.author}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {item.year}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Hash className="w-4 h-4" />
                                            Quantity: {item._count.item_tran}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No items managed</p>
                        </div>
                    )}
                </div>

                {/* Approved Transactions */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">Approved Transactions</h3>
                    </div>

                    {approvedTransactions.length > 0 ? (
                        <div className="space-y-4">
                            {approvedTransactions.map(tran => (
                                <div key={tran.tran_id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{tran.library_items.title}</h4>
                                            <p className="text-gray-600 text-sm">
                                                Requested by: {tran.users_item_tran_history_requested_byTousers.name}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tran.status)}`}>
                                            {tran.status.charAt(0).toUpperCase() + tran.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        Approved on {new Date(tran.approved_at).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No approved transactions</p>
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Activity Logs */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                        </div>

                        {logs.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {logs.slice(0, 10).map(log => (
                                    <div key={log.id} className="border-l-4 border-purple-200 pl-4 py-2">
                                        <p className="text-gray-900 text-sm">{log.description}</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {new Date(log.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                <p>No activity logs found</p>
                            </div>
                        )}
                    </div>

                    {/* Notifications Summary */}
                    <div className="space-y-6">
                        {/* Notifications Sent */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Send className="w-5 h-5 text-orange-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Notifications Sent</h3>
                            </div>

                            {notifications.sent.length > 0 ? (
                                <div className="space-y-3 max-h-48 overflow-y-auto">
                                    {notifications.sent.slice(0, 5).map((n, index) => (
                                        <div key={`${n.id}-${index}`} className="text-sm">
                                            <p className="text-gray-900">{n.message}</p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                {new Date(n.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No notifications sent</p>
                            )}
                        </div>

                        {/* Notifications Received */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Inbox className="w-5 h-5 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Notifications Received</h3>
                            </div>

                            {notifications.received.length > 0 ? (
                                <div className="space-y-3 max-h-48 overflow-y-auto">
                                    {notifications.received.slice(0, 5).map((n, index) => (
                                        <div key={`${n.id}-${index}`} className="text-sm">
                                            <p className="text-gray-900">{n.message}</p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                {new Date(n.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No notifications received</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
