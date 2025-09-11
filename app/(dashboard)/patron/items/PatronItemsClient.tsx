/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import React, { useState, useMemo } from 'react';

interface LibraryItem {
    item_id: number;
    title: string | null;
    author: string;
    isbn: string | null;
    year: number | null;
    genre: string | null;
    item_type: string;
    publisher: string | null;
    language: string | null;
    pages: number | null;
    duration: number | null;
    format: string | null;
    subject: string | null;
    keywords: string | null;
    description: string | null;
    location: string | null;
}

type SortBy = 'title' | 'author' | 'genre' | 'item_type' | 'year';
type SortOrder = 'asc' | 'desc';
type ViewMode = 'grid' | 'list';

// Item type colors for badges
const itemTypeColors: Record<string, string> = {
    book: 'bg-blue-100 text-blue-800',
    journal: 'bg-green-100 text-green-800',
    multimedia: 'bg-purple-100 text-purple-800',
    newspaper: 'bg-orange-100 text-orange-800',
    magazine: 'bg-pink-100 text-pink-800',
    thesis: 'bg-indigo-100 text-indigo-800',
    report: 'bg-gray-100 text-gray-800'
};

// Item type icons
const getItemTypeIcon = (itemType: string) => {
    switch (itemType) {
        case 'book':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        case 'journal':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'multimedia':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            );
        case 'newspaper':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            );
        case 'magazine':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            );
        case 'thesis':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'report':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        default:
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
    }
};

export default function PatronItemsClient({
    allItems,
    error: initialError,
}: {
    allItems: LibraryItem[];
    error: string | null;
}) {
    const [error, setError] = useState<string | null>(initialError);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<SortBy>('title');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [filterType, setFilterType] = useState<string>('');
    const [filterGenre, setFilterGenre] = useState<string>('');

    const mergedItems = [...allItems];

    // Get unique item types and genres for filters
    const itemTypes = [...new Set(mergedItems.map(item => item.item_type))].sort();
    const genres = [...new Set(mergedItems.map(item => item.genre).filter(Boolean))].sort();

    const filteredAndSortedItems = useMemo(() => {
        let filtered = mergedItems;
        
        // Apply search filter
        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();
            filtered = filtered.filter(item =>
                (item.title?.toLowerCase().includes(search)) ||
                item.author.toLowerCase().includes(search) ||
                (item.genre?.toLowerCase().includes(search)) ||
                (item.subject?.toLowerCase().includes(search)) ||
                (item.keywords?.toLowerCase().includes(search))
            );
        }

        // Apply type filter
        if (filterType) {
            filtered = filtered.filter(item => item.item_type === filterType);
        }

        // Apply genre filter
        if (filterGenre) {
            filtered = filtered.filter(item => item.genre === filterGenre);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;
            
            switch (sortBy) {
                case 'title':
                    aValue = a.title?.toLowerCase() || '';
                    bValue = b.title?.toLowerCase() || '';
                    break;
                case 'author':
                    aValue = a.author.toLowerCase();
                    bValue = b.author.toLowerCase();
                    break;
                case 'genre':
                    aValue = a.genre?.toLowerCase() || '';
                    bValue = b.genre?.toLowerCase() || '';
                    break;
                case 'item_type':
                    aValue = a.item_type.toLowerCase();
                    bValue = b.item_type.toLowerCase();
                    break;
                case 'year':
                    aValue = a.year || 0;
                    bValue = b.year || 0;
                    break;
                default:
                    aValue = a.title?.toLowerCase() || '';
                    bValue = b.title?.toLowerCase() || '';
            }
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue);
                return sortOrder === 'asc' ? comparison : -comparison;
            } else {
                const comparison = (aValue as number) - (bValue as number);
                return sortOrder === 'asc' ? comparison : -comparison;
            }
        });
        
        return filtered;
    }, [mergedItems, searchTerm, sortBy, sortOrder, filterType, filterGenre]);

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilterType('');
        setFilterGenre('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                        Library Collection
                    </h1>
                    <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg">Discover books, journals, multimedia, and more</p>
                </div>

                {/* Search and Filter Controls */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search items by title, author, genre, subject, or keywords..."
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Item Type Filter */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm sm:text-base"
                                >
                                    <option value="">All Types</option>
                                    {itemTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Genre Filter */}
                            {/* <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
                                <select
                                    value={filterGenre}
                                    onChange={(e) => setFilterGenre(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm sm:text-base"
                                >
                                    <option value="">All Genres</option>
                                    {genres.map(genre => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div> */}

                            {/* Sort Controls */}
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                                <div className="flex gap-2">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortBy)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white text-sm sm:text-base"
                                    >
                                        <option value="title">Title</option>
                                        <option value="author">Author</option>
                                        <option value="genre">Genre</option>
                                        <option value="item_type">Type</option>
                                        <option value="year">Year</option>
                                    </select>
                                    <button
                                        onClick={toggleSortOrder}
                                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-colors"
                                        title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                                    >
                                        <svg
                                            className={`w-5 h-5 text-gray-600 transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* View Mode and Clear Filters */}
                            <div className="flex gap-2">
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                                        title="Grid View"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                                        title="List View"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    onClick={clearFilters}
                                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {error ? (
                    <div className="text-center py-16 sm:py-20 text-red-600 font-semibold">{error}</div>
                ) : filteredAndSortedItems.length === 0 ? (
                    <div className="text-center py-16 sm:py-20">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                            {searchTerm || filterType || filterGenre ? 'No items found' : 'No Items Available'}
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base">
                            {searchTerm || filterType || filterGenre ? 'Try adjusting your search terms or filters.' : 'Check back later for new additions to our collection.'}
                        </p>
                        {(searchTerm || filterType || filterGenre) && (
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        {(searchTerm || filterType || filterGenre) && (
                            <div className="text-center mb-6 sm:mb-8">
                                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                                    {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'Item' : 'Items'} Found
                                </span>
                            </div>
                        )}

                        {/* Items Display */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8">
                                {filteredAndSortedItems.map((item) => (
                                    <ItemCard
                                        key={item.item_id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4 sm:space-y-6">
                                {filteredAndSortedItems.map((item) => (
                                    <ItemListItem
                                        key={item.item_id}
                                        item={item}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// --- ItemCard Component ---
function ItemCard({ item }: { item: LibraryItem;}) {
    return (
        <div
            className={`group bg-white rounded-2xl shadow-lg transform transition-all duration-300 overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1
            `}
        >
            <div className="relative overflow-hidden">
                <div className="w-full h-44 xs:h-48 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {getItemTypeIcon(item.item_type)}
                </div>

                {/* Item Type Badge */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <span className={`inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${itemTypeColors[item.item_type] || 'bg-gray-100 text-gray-800'} backdrop-blur-sm`}>
                        {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                    </span>
                </div>

            </div>

            <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title || 'Untitled'}
                </h2>

                <div className="flex items-center mb-2 sm:mb-3">
                    <svg
                        className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">{item.author}</span>
                </div>

                {/* Additional Info */}
                <div className="space-y-1 mb-3">
                    {item.year && (
                        <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {item.year}
                        </div>
                    )}
                    {item.genre && (
                        <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {item.genre}
                        </div>
                    )}
                </div>

                <Link href={`/patron/items/${item.item_id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-xs sm:text-sm font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}

// --- ItemListItem Component ---
function ItemListItem({ item }: { item: LibraryItem;}) {
    return (
        <div
            className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100`}
        >
            <div className="flex flex-col xs:flex-row p-4 sm:p-6 gap-3 sm:gap-6">
                <div className="flex-shrink-0 mb-3 xs:mb-0 xs:mr-4 sm:mr-6">
                    <div className="w-20 h-28 sm:w-24 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        {getItemTypeIcon(item.item_type)}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-2 xs:flex-row xs:items-start xs:justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                                    {item.title || 'Untitled'}
                                </h3>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${itemTypeColors[item.item_type] || 'bg-gray-100 text-gray-800'}`}>
                                    {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                                </span>
                            </div>

                            <div className="flex items-center mb-2">
                                <svg
                                    className="w-4 h-4 text-gray-400 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">{item.author}</span>
                            </div>

                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                {item.year && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {item.year}
                                    </span>
                                )}
                                {item.genre && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {item.genre}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="mt-2 xs:mt-0 xs:ml-4 flex-shrink-0">
                            <Link href={`/patron/items/${item.item_id}`}>
                                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg w-full xs:w-auto">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
