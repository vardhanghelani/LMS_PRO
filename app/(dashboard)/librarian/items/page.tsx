'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Plus, Eye, Edit3, Search, Grid, List, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react';
import Link from 'next/link';

type Item = {
    id: number; // Changed from book_id to id
    title: string;
    author: string;
    isbn?: string; // kept from original
    status: 'Available' | 'Issued' | 'Partially Available';
    genre?: string;
    year?: number;
    totalCopies: number;
    availableCopies: number;
    issuedCopies: number;
    description?: string;
    image_url?: string;
    created_at?: string;
    updated_at?: string;
};

type ApiResponse = {
    success: boolean;
    items?: Item[];
    message?: string;
};

export default function ItemsList() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'title' | 'author' | 'genre' | 'year' | 'status'>('title');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        async function loadItems() {  // renamed
            try {
                setLoading(true);
                setError(null);

                const res = await fetch('/api/librarian/items', {  // changed endpoint
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data: ApiResponse = await res.json();

                if (data.success && data.items) {
                    setItems(data.items);  // renamed
                } else {
                    throw new Error(data.message || 'Failed to fetch items');
                }
            } catch (err) {
                console.error('Error loading items:', err);
                setError(err instanceof Error ? err.message : 'Failed to load items');
            } finally {
                setLoading(false);
            }
        }

        loadItems();
    }, []);

    const filteredItems = items  // renamed
        .filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.genre && item.genre.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            let aValue: string | number = a[sortBy] || '';
            let bValue: string | number = b[sortBy] || '';

            if (sortBy === 'year') {
                aValue = Number(aValue) || 0;
                bValue = Number(bValue) || 0;
            } else {
                aValue = aValue.toString().toLowerCase();
                bValue = bValue.toString().toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });


    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status) {
            case 'Available':
                return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
            case 'Issued':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
            case 'Partially Available':
                return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        }
    };

    const getItemId = (item: Item) => item.id;  // renamed

    const totalAvailableCopies = items.reduce((total, item) => total + item.availableCopies, 0);  // renamed

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-600 text-lg">Loading your library...</p>
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
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">Failed to load items</h3>
                            <p className="text-slate-600 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Try Again
                            </button>
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Library Collection</h1>
                                <p className="text-slate-700">Manage your item inventory</p>
                            </div>
                        </div>

                        <Link
                            href="/librarian/items/add"  // changed route
                            className="group flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                            Add New Item
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-slate-700 text-sm font-medium">Total Items</p>
                                    <p className="text-2xl font-bold text-slate-900">{items.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Available Copies */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-slate-700 text-sm font-medium">Available Copies</p>
                                    <p className="text-2xl font-bold text-slate-900">{totalAvailableCopies}</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Copies */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-slate-700 text-sm font-medium">Total Copies</p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {items.reduce((total, item) => total + item.totalCopies, 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Sort */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search items by title, author, or genre..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800 placeholder-slate-500"
                                />
                            </div>

                            {/* Sort Options */}
                            <div className="flex items-center gap-3">
                                <span className="text-slate-700 font-medium text-sm">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value as any)}
                                    className="px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-200 text-slate-800"
                                >
                                    <option value="title">Title</option>
                                    <option value="author">Author</option>
                                    <option value="genre">Genre</option>
                                    <option value="year">Year</option>
                                    <option value="status">Status</option>
                                </select>

                                <button
                                    onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200 text-slate-700"
                                    title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                                >
                                    {sortOrder === 'asc' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
                                    title="Grid View"
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600'}`}
                                    title="List View"
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Items Display */}
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {searchTerm ? 'No items found' : 'No items in library'}
                            </h3>
                            <p className="text-slate-600">
                                {searchTerm
                                    ? 'Try adjusting your search or filters'
                                    : 'Start by adding your first item to the library'}
                            </p>
                            {!searchTerm && (
                                <Link
                                    href="/librarian/items/add"
                                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Your First Item
                                </Link>
                            )}
                        </div>
                    ) : viewMode === 'grid' ? (
                        /* Grid View */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map(item => {
                                const itemId = getItemId(item);
                                return (
                                    <div key={itemId} className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200">
                                        <div className="flex flex-col h-full">
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                                                        <BookOpen className="w-5 h-5 text-indigo-600" />
                                                    </div>
                                                    <div className="text-xs text-gray-400">ID: {itemId}</div>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                                                    {item.title}
                                                </h3>
                                                <p className="text-slate-600 mb-2">by {item.author}</p>

                                                <div className="space-y-2 mb-4">
                                                    <span className={getStatusBadge(item.status)}>{item.status}</span>
                                                    <div className="text-xs text-slate-500 space-y-1">
                                                        <div className="flex justify-between">
                                                            <span>Copies:</span>
                                                            <span>{item.totalCopies}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Available:</span>
                                                            <span className="text-green-600">{item.availableCopies}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Issued:</span>
                                                            <span className="text-red-600">{item.issuedCopies}</span>
                                                        </div>
                                                    </div>
                                                    {item.genre && <div className="text-xs text-slate-500"><span className="font-medium">Genre:</span> {item.genre}</div>}
                                                    {item.year && <div className="text-xs text-slate-500"><span className="font-medium">Year:</span> {item.year}</div>}
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/librarian/items/${itemId}`}
                                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </Link>
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
                                            <th className="text-left py-4 px-6 font-semibold text-slate-800">Item Title</th>
                                            <th className="text-left py-4 px-6 font-semibold text-slate-800">Author</th>
                                            <th className="text-left py-4 px-6 font-semibold text-slate-800">Genre</th>
                                            <th className="text-center py-4 px-6 font-semibold text-slate-800">Year</th>
                                            <th className="text-center py-4 px-6 font-semibold text-slate-800">Status</th>
                                            <th className="text-center py-4 px-6 font-semibold text-slate-800">Copies</th>
                                            <th className="text-center py-4 px-6 font-semibold text-slate-800">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.map(item => {
                                            const itemId = item.id;
                                            return (
                                                <tr key={itemId} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-200">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                                <BookOpen className="w-4 h-4 text-indigo-600" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-slate-800">{item.title}</h3>
                                                                <div className="text-xs text-gray-400">ID: {itemId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-slate-800 font-medium">{item.author}</td>
                                                    <td className="py-4 px-6 text-slate-600">{item.genre || '-'}</td>
                                                    <td className="py-4 px-6 text-center text-slate-600">{item.year || '-'}</td>
                                                    <td className="py-4 px-6 text-center">
                                                        <span className={getStatusBadge(item.status)}>{item.status}</span>
                                                    </td>
                                                    <td className="py-4 px-6 text-center">
                                                        <div className="text-sm text-slate-700">
                                                            <div className="font-medium">{item.totalCopies}</div>
                                                            <div className="text-xs text-slate-500">
                                                                <span className="text-green-600">{item.availableCopies} available</span><br />
                                                                <span className="text-red-600">{item.issuedCopies} issued</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Link href={`/librarian/items/${itemId}`} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium">
                                                                <Eye className="w-4 h-4" />
                                                                View
                                                            </Link>
                                                        </div>
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
            </div>
        );
}

function getStatusBadge(status: string) {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
                switch (status) {
        case 'Available':
                return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
                case 'Issued':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
                case 'Partially Available':
                return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
                default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
}
