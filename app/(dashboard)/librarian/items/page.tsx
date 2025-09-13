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
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-[#E2E8F0] border-t-[#4F46E5] rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-[#1E293B]/60 text-lg">Loading your library...</p>
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
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1E293B] mb-2">Failed to load items</h3>
                            <p className="text-[#1E293B]/60 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 nova-gradient text-white rounded-lg hover:shadow-lg transition-all"
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
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 nova-gradient rounded-2xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#1E293B]">Library Collection</h1>
                                <p className="text-[#1E293B]/60">Manage your item inventory</p>
                            </div>
                        </div>

                        <Link
                            href="/librarian/items/add"  // changed route
                            className="group flex items-center gap-2 nova-gradient text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                            Add New Item
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#4F46E5]/10 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-[#4F46E5]" />
                                </div>
                                <div>
                                    <p className="text-[#1E293B]/60 text-sm font-medium">Total Items</p>
                                    <p className="text-2xl font-bold text-[#1E293B]">{items.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Available Copies */}
                        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-[#1E293B]/60 text-sm font-medium">Available Copies</p>
                                    <p className="text-2xl font-bold text-[#1E293B]">{totalAvailableCopies}</p>
                                </div>
                            </div>
                        </div>

                        {/* Total Copies */}
                        <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#06B6D4]/10 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-[#06B6D4]" />
                                </div>
                                <div>
                                    <p className="text-[#1E293B]/60 text-sm font-medium">Total Copies</p>
                                    <p className="text-2xl font-bold text-[#1E293B]">
                                        {items.reduce((total, item) => total + item.totalCopies, 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Sort */}
                    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-lg mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1E293B]/60" />
                                <input
                                    type="text"
                                    placeholder="Search items by title, author, or genre..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 outline-none transition-all duration-200 text-[#1E293B] placeholder-[#1E293B]/60"
                                />
                            </div>

                            {/* Sort Options */}
                            <div className="flex items-center gap-3">
                                <span className="text-[#1E293B]/60 font-medium text-sm">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={e => setSortBy(e.target.value as any)}
                                    className="px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 outline-none transition-all duration-200 text-[#1E293B]"
                                >
                                    <option value="title">Title</option>
                                    <option value="author">Author</option>
                                    <option value="genre">Genre</option>
                                    <option value="year">Year</option>
                                    <option value="status">Status</option>
                                </select>

                                <button
                                    onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                                    className="p-3 rounded-xl bg-[#E2E8F0] hover:bg-[#E2E8F0]/80 transition-colors duration-200 text-[#1E293B]"
                                    title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                                >
                                    {sortOrder === 'asc' ? <ArrowUp className="w-5 h-5" /> : <ArrowDown className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* View Toggle */}
                            <div className="flex items-center bg-[#E2E8F0] rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#4F46E5]' : 'text-[#1E293B]/60'}`}
                                    title="Grid View"
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm text-[#4F46E5]' : 'text-[#1E293B]/60'}`}
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
                            <BookOpen className="w-16 h-16 text-[#1E293B]/30 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-[#1E293B] mb-2">
                                {searchTerm ? 'No items found' : 'No items in library'}
                            </h3>
                            <p className="text-[#1E293B]/60">
                                {searchTerm
                                    ? 'Try adjusting your search or filters'
                                    : 'Start by adding your first item to the library'}
                            </p>
                            {!searchTerm && (
                                <Link
                                    href="/librarian/items/add"
                                    className="inline-flex items-center gap-2 mt-4 px-6 py-3 nova-gradient text-white rounded-xl hover:shadow-lg transition-all duration-200"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Your First Item
                                </Link>
                            )}
                        </div>
                    ) : viewMode === 'grid' ? (
                        /* Modern Timeline/Feed View */
                        <div className="space-y-4">
                            {filteredItems.map((item, index) => {
                                const itemId = getItemId(item);
                                const accentColors = [
                                    'from-purple-500 to-pink-500',
                                    'from-blue-500 to-cyan-500', 
                                    'from-green-500 to-teal-500',
                                    'from-orange-500 to-red-500',
                                    'from-indigo-500 to-purple-500',
                                    'from-emerald-500 to-green-500'
                                ];
                                const accentColor = accentColors[index % accentColors.length];
                                
                                return (
                                    <div key={itemId} className="group relative">
                                        {/* Timeline connector line */}
                                        {index < filteredItems.length - 1 && (
                                            <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent opacity-30"></div>
                                        )}
                                        
                                        {/* Main content */}
                                        <div className="flex gap-6 p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                                            {/* Left timeline dot */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-16 h-16 bg-gradient-to-r ${accentColor} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200`}>
                                                    <BookOpen className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="mt-2 text-xs font-bold text-gray-400">#{itemId}</div>
                                            </div>
                                            
                                            {/* Content area */}
                                            <div className="flex-1">
                                                {/* Header row */}
                                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                                                    <div className="flex-1">
                                                        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200 mb-2">
                                                            {item.title}
                                                        </h2>
                                                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                                                            <span className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                                <strong>by {item.author}</strong>
                                                            </span>
                                                            {item.year && (
                                                                <span className="flex items-center gap-2">
                                                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                                    {item.year}
                                                                </span>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Status and genre badges */}
                                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                                            <span className={getStatusBadge(item.status)}>
                                                                {item.status}
                                                            </span>
                                                            {item.genre && (
                                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                                                    {item.genre}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Action button */}
                                                    <div className="flex-shrink-0">
                                                        <Link
                                                            href={`/librarian/items/${itemId}`}
                                                            className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${accentColor} text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                                
                                                {/* Stats bar */}
                                                <div className="bg-gray-50 rounded-2xl p-4">
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-gray-800">{item.totalCopies}</div>
                                                            <div className="text-sm text-gray-500 font-medium">Total Copies</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-green-600">{item.availableCopies}</div>
                                                            <div className="text-sm text-gray-500 font-medium">Available</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-red-600">{item.issuedCopies}</div>
                                                            <div className="text-sm text-gray-500 font-medium">Issued</div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-2xl font-bold text-blue-600">{Math.round((item.availableCopies / item.totalCopies) * 100) || 0}%</div>
                                                            <div className="text-sm text-gray-500 font-medium">Availability</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* List View */
                        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                                            <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Item Title</th>
                                            <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Author</th>
                                            <th className="text-left py-4 px-6 font-semibold text-[#1E293B]">Genre</th>
                                            <th className="text-center py-4 px-6 font-semibold text-[#1E293B]">Year</th>
                                            <th className="text-center py-4 px-6 font-semibold text-[#1E293B]">Status</th>
                                            <th className="text-center py-4 px-6 font-semibold text-[#1E293B]">Copies</th>
                                            <th className="text-center py-4 px-6 font-semibold text-[#1E293B]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.map(item => {
                                            const itemId = item.id;
                                            return (
                                                <tr key={itemId} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAFC] transition-colors duration-200">
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-[#4F46E5]/10 rounded-lg flex items-center justify-center">
                                                                <BookOpen className="w-4 h-4 text-[#4F46E5]" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-[#1E293B]">{item.title}</h3>
                                                                <div className="text-xs text-[#1E293B]/40">ID: {itemId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-[#1E293B] font-medium">{item.author}</td>
                                                    <td className="py-4 px-6 text-[#1E293B]/60">{item.genre || '-'}</td>
                                                    <td className="py-4 px-6 text-center text-[#1E293B]/60">{item.year || '-'}</td>
                                                    <td className="py-4 px-6 text-center">
                                                        <span className={getStatusBadge(item.status)}>{item.status}</span>
                                                    </td>
                                                    <td className="py-4 px-6 text-center">
                                                        <div className="text-sm text-[#1E293B]">
                                                            <div className="font-medium">{item.totalCopies}</div>
                                                            <div className="text-xs text-[#1E293B]/60">
                                                                <span className="text-green-600">{item.availableCopies} available</span><br />
                                                                <span className="text-red-600">{item.issuedCopies} issued</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Link href={`/librarian/items/${itemId}`} className="flex items-center gap-1 px-3 py-1.5 bg-[#4F46E5]/10 text-[#4F46E5] rounded-lg hover:bg-[#4F46E5]/20 transition-colors duration-200 text-sm font-medium">
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
