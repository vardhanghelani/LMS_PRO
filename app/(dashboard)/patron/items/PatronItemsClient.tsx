'use client';

import Link from 'next/link';
import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Snackbar from '@/app/components/Snackbar';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  BookOpen, 
  Calendar, 
  User, 
  Tag,
  ArrowUpDown,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';
// Removed AppShell import - using new Nova layout
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { 
  staggerContainer, 
  staggerItem, 
  fadeIn,
  slideInFromTop
} from '@/app/lib/motion';

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
    
    // Snackbar state for showing messages from other pages
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('info');
    
    // Check for success message from URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const successMessage = urlParams.get('success');
        
        if (successMessage) {
            setSnackbarMessage(decodeURIComponent(successMessage));
            setSnackbarType('success');
            setSnackbarOpen(true);
            
            // Clean up URL
            const url = new URL(window.location.href);
            url.searchParams.delete('success');
            window.history.replaceState({}, '', url.toString());
        }
    }, []);

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
        <div className="min-h-screen p-8">
            <motion.div 
                className="max-w-7xl mx-auto space-y-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {/* Header */}
                <motion.div 
                    className="text-center"
                    variants={slideInFromTop}
                >
                    <motion.h1 
                        className="text-6xl font-bold font-heading gradient-text mb-6"
                        variants={fadeIn}
                    >
                        Library Collection
                    </motion.h1>
                    <motion.p 
                        className="text-2xl text-[#1E293B]/70 font-medium mb-8"
                        variants={fadeIn}
                    >
                        Discover books, journals, multimedia, and more
                    </motion.p>
                </motion.div>

                {/* Enhanced Search and Filter Controls */}
                <motion.div variants={staggerItem}>
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-[#E2E8F0] shadow-2xl shadow-blue-100/50">
                        <div className="space-y-8">
                            {/* Search Bar */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by title, author, genre, subject, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 text-base bg-white/70 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder:text-gray-400 shadow-inner"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Enhanced Filters Row */}
                            <div className="flex flex-wrap gap-4 items-center justify-between">
                                {/* Left Side - Filters */}
                                <div className="flex flex-wrap gap-4 items-center">
                                    {/* Item Type Filter */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Filter className="w-4 h-4" />
                                            Item Type
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={filterType}
                                                onChange={(e) => setFilterType(e.target.value)}
                                                className="appearance-none h-12 pl-4 pr-10 min-w-[140px] bg-white/80 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer hover:bg-white"
                                            >
                                                <option value="" className="text-blue-600 font-semibold">All Types</option>
                                                {itemTypes.map(type => (
                                                    <option key={type} value={type} className="capitalize">
                                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                        {filterType && (
                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                                        )}
                                    </div>

                                    {/* Genre Filter */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Tag className="w-4 h-4" />
                                            Genre
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={filterGenre}
                                                onChange={(e) => setFilterGenre(e.target.value)}
                                                className="appearance-none h-12 pl-4 pr-10 min-w-[140px] bg-white/80 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer hover:bg-white"
                                            >
                                                <option value="" className="text-blue-600 font-semibold">All Genres</option>
                                                {genres.map(genre => (
                                                    <option key={genre} value={genre}>
                                                        {genre}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                        {filterGenre && (
                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
                                        )}
                                    </div>

                                    {/* Sort Controls */}
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <ArrowUpDown className="w-4 h-4" />
                                            Sort by
                                        </label>
                                        <div className="flex gap-2">
                                            <div className="relative">
                                                <select
                                                    value={sortBy}
                                                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                                                    className="appearance-none h-12 pl-4 pr-10 min-w-[120px] bg-white/80 border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer hover:bg-white"
                                                >
                                                    <option value="title">Title</option>
                                                    <option value="author">Author</option>
                                                    <option value="genre">Genre</option>
                                                    <option value="item_type">Type</option>
                                                    <option value="year">Year</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                            </div>
                                            <button
                                                onClick={toggleSortOrder}
                                                className={`h-12 px-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center min-w-[48px] ${
                                                    sortOrder === 'asc' 
                                                        ? 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100' 
                                                        : 'bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100'
                                                }`}
                                                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                                            >
                                                <ArrowUpDown className={`w-5 h-5 transform transition-transform duration-300 ${
                                                    sortOrder === 'desc' ? 'rotate-180' : ''
                                                }`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - View and Actions */}
                                <div className="flex items-end gap-4">
                                    {/* View Mode Toggle */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            View
                                        </label>
                                        <div className="flex bg-gray-100 rounded-xl p-1 border-2 border-gray-200">
                                            <button
                                                onClick={() => setViewMode('grid')}
                                                className={`flex items-center justify-center h-10 px-4 rounded-lg transition-all duration-300 ${
                                                    viewMode === 'grid'
                                                        ? 'bg-white shadow-md text-blue-600 border-2 border-blue-200'
                                                        : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            >
                                                <Grid3X3 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={`flex items-center justify-center h-10 px-4 rounded-lg transition-all duration-300 ${
                                                    viewMode === 'list'
                                                        ? 'bg-white shadow-md text-blue-600 border-2 border-blue-200'
                                                        : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            >
                                                <List className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Clear Filters */}
                                    {(searchTerm || filterType || filterGenre) && (
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-3 opacity-0 pointer-events-none">
                                                Actions
                                            </label>
                                            <button
                                                onClick={clearFilters}
                                                className="h-12 px-6 bg-red-50 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-300 flex items-center gap-2 font-medium"
                                            >
                                                <X className="w-4 h-4" />
                                                Clear
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {(searchTerm || filterType || filterGenre) && (
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                                    <span className="text-sm font-medium text-gray-600">Active filters:</span>
                                    {searchTerm && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                            <Search className="w-3 h-3" />
                                            "{searchTerm}"
                                            <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-blue-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {filterType && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium capitalize">
                                            <Filter className="w-3 h-3" />
                                            {filterType}
                                            <button onClick={() => setFilterType('')} className="ml-1 hover:text-purple-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {filterGenre && (
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                            <Tag className="w-3 h-3" />
                                            {filterGenre}
                                            <button onClick={() => setFilterGenre('')} className="ml-1 hover:text-green-900">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {error ? (
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Error</h3>
                        <p className="text-muted-foreground">{error}</p>
                    </motion.div>
                ) : filteredAndSortedItems.length === 0 ? (
                    <motion.div 
                        className="text-center py-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                            {searchTerm || filterType || filterGenre ? 'No items found' : 'No Items Available'}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {searchTerm || filterType || filterGenre ? 'Try adjusting your search terms or filters.' : 'Check back later for new additions to our collection.'}
                        </p>
                        {(searchTerm || filterType || filterGenre) && (
                            <Button onClick={clearFilters} variant="nova">
                                <X className="w-4 h-4 mr-2" />
                                Clear Filters
                            </Button>
                        )}
                    </motion.div>
                ) : (
                    <>
                        {/* Results Count */}
                        {(searchTerm || filterType || filterGenre) && (
                            <motion.div 
                                className="text-center mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Badge variant="nova" className="text-sm px-4 py-2">
                                    {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'Item' : 'Items'} Found
                                </Badge>
                            </motion.div>
                        )}

                        {/* Items Display */}
                        {viewMode === 'grid' ? (
                            /* Magazine-Style Masonry Layout */
                            <motion.div 
                                className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                                variants={staggerContainer}
                            >
                                {filteredAndSortedItems.map((item, index) => {
                                    const heights = ['h-64', 'h-72', 'h-80', 'h-96'];
                                    const colors = [
                                        'from-rose-400 to-pink-400',
                                        'from-violet-400 to-purple-400',
                                        'from-cyan-400 to-blue-400',
                                        'from-emerald-400 to-teal-400',
                                        'from-orange-400 to-amber-400',
                                        'from-indigo-400 to-blue-400'
                                    ];
                                    const randomHeight = heights[index % heights.length];
                                    const randomColor = colors[index % colors.length];
                                    
                                    return (
                                        <motion.div
                                            key={item.item_id}
                                            className="break-inside-avoid mb-6"
                                            variants={staggerItem}
                                            initial="initial"
                                            animate="animate"
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
                                        >
                                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                                {/* Header with gradient */}
                                                <div className={`${randomHeight} bg-gradient-to-br ${randomColor} p-6 flex flex-col justify-between relative overflow-hidden`}>
                                                    {/* Pattern overlay */}
                                                    <div className="absolute inset-0 opacity-20">
                                                        <div className="absolute top-4 right-4 w-20 h-20 border-4 border-white rounded-full"></div>
                                                        <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white rounded-full"></div>
                                                        <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                                                    </div>
                                                    
                                                    {/* Content */}
                                                    <div className="relative z-10">
                                                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold mb-3 border border-white/30">
                                                            {item.item_type.toUpperCase()}
                                                        </div>
                                                        <h3 className="text-white font-black text-xl mb-2 leading-tight">
                                                            {item.title || 'Untitled'}
                                                        </h3>
                                                    </div>
                                                    
                                                    <div className="relative z-10 flex items-center justify-between">
                                                        <div className="text-white/90 font-semibold text-sm">
                                                            by {item.author}
                                                        </div>
                                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                                            <BookOpen className="w-6 h-6 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Details section */}
                                                <div className="p-5">
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {item.year && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                                                                <Calendar className="w-3 h-3" />
                                                                {item.year}
                                                            </span>
                                                        )}
                                                        {item.genre && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                                                                <Tag className="w-3 h-3" />
                                                                {item.genre}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    {item.description && (
                                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                    
                                                    <Link href={`/patron/items/${item.item_id}`} className="block">
                                                        <button className={`w-full py-3 px-4 bg-gradient-to-r ${randomColor} text-white font-bold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}>
                                                            <Sparkles className="w-4 h-4" />
                                                            Explore
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div 
                                className="space-y-4"
                                variants={staggerContainer}
                            >
                                {filteredAndSortedItems.map((item, index) => (
                                    <motion.div
                                        key={item.item_id}
                                        variants={staggerItem}
                                        initial="initial"
                                        animate="animate"
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <ItemListItem item={item} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </motion.div>
            
            {/* Success/Error Snackbar */}
            <Snackbar
                message={snackbarMessage}
                type={snackbarType}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
            />
        </div>
    );
}

// --- ItemCard Component ---
function ItemCard({ item }: { item: LibraryItem;}) {
    return (
        <motion.div
            className="group"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-lg hover:shadow-xl transition-all duration-300">
                                                <div className="relative">
                                                    <div className="w-full h-48 bg-gradient-to-br from-[#E2E8F0] to-[#F8FAFC] flex items-center justify-center overflow-hidden">
                                                        {item.image_url ? (
                                                            <img 
                                                                src={item.image_url} 
                                                                alt={item.title || 'Book cover'} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <BookOpen className="w-16 h-16 text-[#1E293B]/40" />
                                                        )}
                                                    </div>

                    {/* Item Type Badge */}
                    <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-xs font-medium border border-[#4F46E5]/20">
                            {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1E293B] mb-3 line-clamp-2 group-hover:text-[#4F46E5] transition-colors">
                        {item.title || 'Untitled'}
                    </h3>

                    <div className="flex items-center mb-4">
                        <User className="w-5 h-5 text-[#1E293B]/60 mr-3 flex-shrink-0" />
                        <span className="text-[#1E293B]/80 font-medium truncate">{item.author}</span>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-3 mb-6">
                        {item.year && (
                            <div className="flex items-center text-sm text-[#1E293B]/60">
                                <Calendar className="w-4 h-4 mr-3" />
                                {item.year}
                            </div>
                        )}
                        {item.genre && (
                            <div className="flex items-center text-sm text-[#1E293B]/60">
                                <Tag className="w-4 h-4 mr-3" />
                                {item.genre}
                            </div>
                        )}
                    </div>

                    <Link href={`/patron/items/${item.item_id}`}>
                        <button className="w-full nova-gradient text-white rounded-xl px-4 py-3 font-medium transition-colors flex items-center justify-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

// --- ItemListItem Component ---
function ItemListItem({ item }: { item: LibraryItem;}) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
        >
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-20 h-28 bg-gradient-to-br from-[#E2E8F0] to-[#F8FAFC] rounded-xl flex items-center justify-center overflow-hidden">
                            {item.image_url ? (
                                <img 
                                    src={item.image_url} 
                                    alt={item.title || 'Book cover'} 
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <BookOpen className="w-10 h-10 text-[#1E293B]/40" />
                            )}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <h3 className="text-2xl font-bold text-[#1E293B]">
                                        {item.title || 'Untitled'}
                                    </h3>
                                    <div className="px-3 py-1 bg-[#4F46E5]/10 text-[#4F46E5] rounded-full text-xs font-medium border border-[#4F46E5]/20">
                                        {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                                    </div>
                                </div>

                                <div className="flex items-center mb-4">
                                    <User className="w-5 h-5 text-[#1E293B]/60 mr-3" />
                                    <span className="text-[#1E293B]/80 font-medium">{item.author}</span>
                                </div>

                                <div className="flex items-center gap-4 flex-wrap">
                                    {item.year && (
                                        <div className="flex items-center text-sm text-[#1E293B]/60">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {item.year}
                                        </div>
                                    )}
                                    {item.genre && (
                                        <div className="flex items-center text-sm text-[#1E293B]/60">
                                            <Tag className="w-4 h-4 mr-2" />
                                            {item.genre}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <Link href={`/patron/items/${item.item_id}`}>
                                    <button className="nova-gradient text-white rounded-xl px-6 py-3 font-medium transition-colors flex items-center">
                                        <Sparkles className="w-5 h-5 mr-2" />
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
