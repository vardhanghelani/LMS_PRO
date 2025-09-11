'use client';

import { useEffect, useState } from 'react';
import { Users, Mail, BookOpen, Search, Grid, List, UserCheck, Award, TrendingUp } from 'lucide-react';

interface Patron {
    user_id: number;
    name: string;
    email: string;
    itemsRequested: number;
}

interface ApiResponse {
    success: boolean;
    data: Patron[];
    message?: string;
}

export default function PatronsPage() {
    const [patrons, setPatrons] = useState<Patron[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'email' | 'itemsRequested'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchPatrons = async () => {
            try {
                const res = await fetch('/api/librarian/patrons');
                const data: ApiResponse = await res.json();

                if (data.success && data.data) {
                    setPatrons(data.data);
                } else {
                    setError(data.message || 'Failed to fetch patrons');
                }
            } catch (error) {
                console.error('Error fetching patrons:', error);
                setError('Failed to load patrons');
            } finally {
                setLoading(false);
            }
        };

        fetchPatrons();
    }, []);

    const filteredPatrons = patrons
        .filter(patron =>
            patron.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patron.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = (bValue as string).toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

    const totalPatrons = patrons.length;
    const activeUsers = patrons.filter(p => p.itemsRequested > 0).length;
    const averageItemsRequested =
        patrons.length > 0
            ? Math.round(
                patrons.reduce((sum, p) => sum + (p.itemsRequested ?? 0), 0) / patrons.length
            )
            : 0;

    const getActivityLevel = (itemsRequested: number) => {
        if (itemsRequested >= 20) return { level: 'Super User', color: 'text-purple-700 bg-purple-100', icon: Award };
        if (itemsRequested >= 10) return { level: 'Active User', color: 'text-blue-700 bg-blue-100', icon: TrendingUp };
        if (itemsRequested >= 5) return { level: 'Regular User', color: 'text-green-700 bg-green-100', icon: BookOpen };
        if (itemsRequested > 0) return { level: 'New User', color: 'text-yellow-700 bg-yellow-100', icon: UserCheck };
        return { level: 'Inactive', color: 'text-gray-600 bg-gray-100', icon: Users };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-700 text-lg">Loading patrons...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Error Loading Patrons</h3>
                            <p className="text-slate-600">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Library Patrons</h1>
                            <p className="text-slate-700">Manage your library members and track their activity</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-slate-700 text-sm font-medium">Total Patrons</p>
                                    <p className="text-2xl font-bold text-slate-900">{totalPatrons}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                    <UserCheck className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-slate-700 text-sm font-medium">Active Users</p>
                                    <p className="text-2xl font-bold text-slate-900">{activeUsers}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-slate-700 text-sm font-medium">Avg. Items Requested</p>
                                    <p className="text-2xl font-bold text-slate-900">{averageItemsRequested}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Controls */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search patrons by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-500"
                                />
                            </div>

                            {/* Sort Options */}
                            <div className="flex items-center gap-3">
                                <span className="text-slate-700 font-medium text-sm">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'name' | 'email' | 'itemsRequested')}
                                    className="px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800"
                                >
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                    <option value="itemsRequested">Items Requested</option>
                                </select>

                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200 text-slate-700"
                                    title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                                >
                                    {sortOrder === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {filteredPatrons.length === 0 ? (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            {searchTerm ? 'No patrons found' : 'No patrons registered'}
                        </h3>
                        <p className="text-slate-600">
                            {searchTerm ? 'Try adjusting your search terms' : 'No library members have been registered yet'}
                        </p>
                    </div>
                ) : viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPatrons.map((patron) => {
                            const activityLevel = getActivityLevel(patron.itemsRequested);
                            const LevelIcon = activityLevel.icon;

                            return (
                                <div key={patron.user_id} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                                    <div className="flex flex-col h-full">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                                {patron.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${activityLevel.color}`}>
                                                <LevelIcon className="w-3 h-3" />
                                                {activityLevel.level}
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors duration-200">
                                                {patron.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-600 mb-3">
                                                <Mail className="w-4 h-4" />
                                                <span className="text-sm truncate">{patron.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <BookOpen className="w-4 h-4 text-indigo-600" />
                                                <span className="text-sm font-medium">{patron.itemsRequested} items requested</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-200">
                                        <th className="text-left py-4 px-6 font-semibold text-slate-800">Patron</th>
                                        <th className="text-left py-4 px-6 font-semibold text-slate-800">Email</th>
                                        <th className="text-center py-4 px-6 font-semibold text-slate-800">Items Requested</th>
                                        <th className="text-center py-4 px-6 font-semibold text-slate-800">Activity Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatrons.map((patron) => {
                                        const activityLevel = getActivityLevel(patron.itemsRequested);
                                        const LevelIcon = activityLevel.icon;

                                        return (
                                            <tr key={patron.user_id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-200">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                                                            {patron.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-900">{patron.name}</h3>
                                                            <p className="text-sm text-slate-600">ID: {patron.user_id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-slate-500" />
                                                        <span className="text-slate-800">{patron.email}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-indigo-600" />
                                                        <span className="font-semibold text-slate-900">{patron.itemsRequested}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${activityLevel.color}`}>
                                                        <LevelIcon className="w-3 h-3" />
                                                        {activityLevel.level}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
