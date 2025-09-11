'use client';

import { useState, useEffect } from 'react';

interface Notification {
    notification_id: number;
    type: string;
    status: string;
    message: string;
    created_at: string;
    books?: {
        title?: string;
    };
}

export default function PatronNotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/patron/notifications');
                if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
                const data = await res.json();
                if (data.success && Array.isArray(data.notifications)) {
                    setNotifications(data.notifications);
                } else {
                    setNotifications([]);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const getNotificationIcon = (type: string) => {
        if (type === 'borrow') {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        } else if (type === 'return') {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            );
        } else {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm0 0V3" />
                </svg>
            );
        }
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'approved':
                return {
                    bg: 'bg-green-50 border-green-200',
                    iconBg: 'bg-green-100 text-green-600',
                    badge: 'bg-green-100 text-green-800',
                    text: 'text-green-700'
                };
            case 'pending':
                return {
                    bg: 'bg-yellow-50 border-yellow-200',
                    iconBg: 'bg-yellow-100 text-yellow-600',
                    badge: 'bg-yellow-100 text-yellow-800',
                    text: 'text-yellow-700'
                };
            case 'rejected':
                return {
                    bg: 'bg-red-50 border-red-200',
                    iconBg: 'bg-red-100 text-red-600',
                    badge: 'bg-red-100 text-red-800',
                    text: 'text-red-700'
                };
            default:
                return {
                    bg: 'bg-gray-50 border-gray-200',
                    iconBg: 'bg-gray-100 text-gray-600',
                    badge: 'bg-gray-100 text-gray-800',
                    text: 'text-gray-700'
                };
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days === 0) {
            if (hours === 0) return 'Just now';
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (days === 1) {
            return 'Yesterday';
        } else if (days < 7) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Notifications
                            </h1>
                            <p className="text-gray-600 mt-1">Stay updated with your library activities</p>
                        </div>
                    </div>
                    
                    {!loading && notifications.length > 0 && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-600 mt-4 text-lg animate-pulse">Loading notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="bg-white shadow-xl rounded-2xl p-12 text-center border border-gray-100">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-3">No notifications yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            You&apos;re all caught up! Notifications about your book requests and returns will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((noti) => {
                            const statusConfig = getStatusConfig(noti.status);
                            return (
                                <div
                                    key={noti.notification_id}
                                    className={`${statusConfig.bg} shadow-lg rounded-2xl p-6 border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1`}
                                >
                                    <div className="flex items-start">
                                        {/* Icon */}
                                        <div className={`${statusConfig.iconBg} rounded-xl p-3 mr-4 flex-shrink-0`}>
                                            {getNotificationIcon(noti.type)}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-2">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.badge}`}>
                                                        {noti.type.charAt(0).toUpperCase() + noti.type.slice(1)}
                                                    </span>
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.badge}`}>
                                                        {noti.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-gray-500 font-medium">
                                                    {formatDate(noti.created_at)}
                                                </span>
                                            </div>

                                            <p className="text-gray-800 font-medium mb-2 leading-relaxed">
                                                {noti.message}
                                            </p>

                                            {noti.books?.title && (
                                                <div className="flex items-center mt-3 p-3 bg-white/60 rounded-lg border border-white/40">
                                                    <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                    <span className="text-sm font-semibold text-blue-700">
                                                        {noti.books.title}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}