'use client';

import { useState, useEffect } from 'react';

interface OverviewStats {
    totalItems: number;
    totalBooks: number;
    totalLibraryItems: number;
    totalUsers: number;
    totalLibrarians: number;
    totalAdmins: number;
    activeReservations: number;
    overdueItems: number;
    totalFines: number;
    paidFines: number;
    unpaidFines: number;
}

interface PopularItem {
    item_id: number;
    title: string;
    author: string;
    item_type: string;
    borrowCount: number;
    image_url?: string;
}

interface OverdueItem {
    history_id: number;
    item: {
        item_id: number;
        title: string;
        author: string;
        item_type: string;
    };
    user: {
        user_id: number;
        name: string;
        email: string;
        phone_number?: string;
    };
    date_issued: string;
    date_due: string;
    daysOverdue: number;
}

interface SystemConfig {
    [key: string]: {
        value: string;
        description?: string;
        updated_at: string;
    };
}

export default function AdminDashboard() {
    const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
    const [popularItems, setPopularItems] = useState<PopularItem[]>([]);
    const [overdueItems, setOverdueItems] = useState<OverdueItem[]>([]);
    const [systemConfig, setSystemConfig] = useState<SystemConfig>({});
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const [overviewRes, popularRes, overdueRes, configRes] = await Promise.all([
                fetch('/api/admin/reports?type=overview'),
                fetch('/api/admin/reports?type=popular_items'),
                fetch('/api/admin/reports?type=overdue_items'),
                fetch('/api/admin/config')
            ]);

            const [overviewData, popularData, overdueData, configData] = await Promise.all([
                overviewRes.json(),
                popularRes.json(),
                overdueRes.json(),
                configRes.json()
            ]);

            if (overviewData.success) {
                setOverviewStats(overviewData.report.overview);
            }

            if (popularData.success) {
                setPopularItems(popularData.report.popularItems);
            }

            if (overdueData.success) {
                setOverdueItems(overdueData.report.overdueItems);
            }

            if (configData.success) {
                setSystemConfig(configData.configs);
            }
        } catch (err) {
            setError('Failed to fetch dashboard data');
        } finally {
            setIsLoading(false);
        }
    };

    const updateConfig = async (key: string, value: string, description?: string) => {
        try {
            const response = await fetch('/api/admin/config', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ config_key: key, config_value: value, description }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setSystemConfig(prev => ({
                        ...prev,
                        [key]: { value, description, updated_at: new Date().toISOString() }
                    }));
                }
            }
        } catch (err) {
            console.error('Failed to update config:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'popular', label: 'Popular Items' },
                        { id: 'overdue', label: 'Overdue Items' },
                        { id: 'config', label: 'System Config' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && overviewStats && (
                <div className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
                            <p className="text-3xl font-bold text-gray-900">{overviewStats.totalItems}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                {overviewStats.totalBooks} books, {overviewStats.totalLibraryItems} other items
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                            <p className="text-3xl font-bold text-gray-900">{overviewStats.totalUsers}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                {overviewStats.totalLibrarians} librarians, {overviewStats.totalAdmins} admins
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-sm font-medium text-gray-500">Active Reservations</h3>
                            <p className="text-3xl font-bold text-gray-900">{overviewStats.activeReservations}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-sm font-medium text-gray-500">Overdue Items</h3>
                            <p className="text-3xl font-bold text-red-600">{overviewStats.overdueItems}</p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-sm font-medium text-gray-500">Total Fines</h3>
                            <p className="text-3xl font-bold text-gray-900">${overviewStats.totalFines.toFixed(2)}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                ${overviewStats.paidFines.toFixed(2)} paid, ${overviewStats.unpaidFines.toFixed(2)} unpaid
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Popular Items Tab */}
            {activeTab === 'popular' && (
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Most Popular Items</h2>
                    </div>
                    <div className="p-6">
                        {popularItems.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No data available</p>
                        ) : (
                            <div className="space-y-4">
                                {popularItems.map((item, index) => (
                                    <div key={item.item_id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-400 w-8">#{index + 1}</div>
                                        {item.image_url && (
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="w-16 h-20 object-cover rounded"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                            <p className="text-sm text-gray-600">by {item.author}</p>
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                                                {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600">{item.borrowCount}</p>
                                            <p className="text-sm text-gray-500">borrows</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Overdue Items Tab */}
            {activeTab === 'overdue' && (
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Overdue Items</h2>
                    </div>
                    <div className="p-6">
                        {overdueItems.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No overdue items</p>
                        ) : (
                            <div className="space-y-4">
                                {overdueItems.map((item) => (
                                    <div key={item.history_id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{item.item.title}</h3>
                                                <p className="text-sm text-gray-600">by {item.item.author}</p>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Borrowed by: {item.user.name} ({item.user.email})
                                                </p>
                                                {item.user.phone_number && (
                                                    <p className="text-sm text-gray-600">Phone: {item.user.phone_number}</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-red-600">{item.daysOverdue} days</p>
                                                <p className="text-sm text-gray-500">overdue</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Due: {new Date(item.date_due).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* System Configuration Tab */}
            {activeTab === 'config' && (
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">System Configuration</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            <ConfigItem
                                key="max_borrow_days"
                                configKey="max_borrow_days"
                                label="Maximum Borrow Days"
                                value={systemConfig.max_borrow_days?.value || '14'}
                                description="Maximum number of days items can be borrowed"
                                onUpdate={updateConfig}
                            />
                            <ConfigItem
                                key="fine_per_day"
                                configKey="fine_per_day"
                                label="Fine Per Day ($)"
                                value={systemConfig.fine_per_day?.value || '1.00'}
                                description="Fine amount per day for overdue items"
                                onUpdate={updateConfig}
                            />
                            <ConfigItem
                                key="reservation_expiry_days"
                                configKey="reservation_expiry_days"
                                label="Reservation Expiry Days"
                                value={systemConfig.reservation_expiry_days?.value || '7'}
                                description="Number of days reservations remain active"
                                onUpdate={updateConfig}
                            />
                            <ConfigItem
                                key="max_reservations_per_user"
                                configKey="max_reservations_per_user"
                                label="Max Reservations Per User"
                                value={systemConfig.max_reservations_per_user?.value || '5'}
                                description="Maximum number of active reservations per user"
                                onUpdate={updateConfig}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface ConfigItemProps {
    configKey: string;
    label: string;
    value: string;
    description?: string;
    onUpdate: (key: string, value: string, description?: string) => void;
}

function ConfigItem({ configKey, label, value, description, onUpdate }: ConfigItemProps) {
    const [editValue, setEditValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onUpdate(configKey, editValue, description);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(value);
        setIsEditing(false);
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{label}</h3>
                    {description && (
                        <p className="text-sm text-gray-600 mt-1">{description}</p>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded text-sm"
                            />
                            <button
                                onClick={handleSave}
                                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="text-sm text-gray-800 font-mono">{value}</span>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
