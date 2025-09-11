'use client';

import { useState, useEffect } from 'react';

interface Notification {
    notification_id: number;
    type: string;
    message: string;
    status: string;
    created_at: string;
    resolved_at?: string;
    item?: {
        title: string;
        item_type: string;
    };
}

interface NotificationSystemProps {
    userId: number;
    userRole: string;
}

export default function NotificationSystem({ userId, userRole }: NotificationSystemProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNotifications();
    }, [userId]);

    const fetchNotifications = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/notifications');
            const data = await response.json();

            if (data.success) {
                setNotifications(data.notifications);
            } else {
                setError('Failed to fetch notifications');
            }
        } catch (err) {
            setError('Network error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (notificationId: number) => {
        try {
            const response = await fetch(`/api/notifications/${notificationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'read' }),
            });

            if (response.ok) {
                setNotifications(prev =>
                    prev.map(notif =>
                        notif.notification_id === notificationId
                            ? { ...notif, status: 'read' }
                            : notif
                    )
                );
            }
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'overdue':
                return '⚠️';
            case 'reservation_available':
                return '📚';
            case 'fine_due':
                return '💰';
            case 'system_maintenance':
                return '🔧';
            case 'new_item_added':
                return '📖';
            default:
                return '📢';
        }
    };

    const getNotificationColor = (type: string, status: string) => {
        if (status === 'read') {
            return 'bg-gray-50 border-gray-200';
        }

        switch (type) {
            case 'overdue':
                return 'bg-red-50 border-red-200';
            case 'reservation_available':
                return 'bg-green-50 border-green-200';
            case 'fine_due':
                return 'bg-yellow-50 border-yellow-200';
            case 'system_maintenance':
                return 'bg-blue-50 border-blue-200';
            default:
                return 'bg-white border-gray-200';
        }
    };

    const unreadCount = notifications.filter(n => n.status === 'pending').length;

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    Notifications
                    {unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </h2>
                <button
                    onClick={fetchNotifications}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    Refresh
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {notifications.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">📭</div>
                    <p className="text-gray-500">No notifications yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.notification_id}
                            className={`border rounded-lg p-4 transition-colors ${getNotificationColor(
                                notification.type,
                                notification.status
                            )}`}
                        >
                            <div className="flex items-start space-x-3">
                                <div className="text-2xl">
                                    {getNotificationIcon(notification.type)}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900 capitalize">
                                            {notification.type.replace('_', ' ')}
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            {new Date(notification.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    
                                    <p className="mt-1 text-sm text-gray-700">
                                        {notification.message}
                                    </p>
                                    
                                    {notification.item && (
                                        <p className="mt-1 text-xs text-gray-600">
                                            Item: {notification.item.title} ({notification.item.item_type})
                                        </p>
                                    )}
                                    
                                    {notification.status === 'pending' && (
                                        <button
                                            onClick={() => markAsRead(notification.notification_id)}
                                            className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
