'use client';

import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';
import { AppShell } from '@/app/components/shell/AppShell';
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
        <AppShell userRole="patron" userName="Patron User" userEmail="patron@nova.com">
            <motion.div 
                className="space-y-8"
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
                        className="text-5xl font-bold font-heading gradient-text mb-4"
                        variants={fadeIn}
                    >
                        Library Collection
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-muted-foreground font-medium"
                        variants={fadeIn}
                    >
                        Discover books, journals, multimedia, and more
                    </motion.p>
                </motion.div>

                {/* Search and Filter Controls */}
                <motion.div variants={staggerItem}>
                    <Card variant="nova" padding="lg">
                        <div className="space-y-6">
                            {/* Search Bar */}
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Search items by title, author, genre, subject, or keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    variant="nova"
                                    size="lg"
                                    icon={<Search className="w-5 h-5" />}
                                    iconPosition="left"
                                />
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Item Type Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Item Type</label>
                                    <Select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        variant="nova"
                                    >
                                        <option value="">All Types</option>
                                        {itemTypes.map(type => (
                                            <option key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </option>
                                        ))}
                                    </Select>
                                </div>

                                {/* Sort Controls */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Sort by</label>
                                    <div className="flex gap-2">
                                        <Select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as SortBy)}
                                            variant="nova"
                                            className="flex-1"
                                        >
                                            <option value="title">Title</option>
                                            <option value="author">Author</option>
                                            <option value="genre">Genre</option>
                                            <option value="item_type">Type</option>
                                            <option value="year">Year</option>
                                        </Select>
                                        <Button
                                            onClick={toggleSortOrder}
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl"
                                            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                                        >
                                            <ArrowUpDown className={`w-4 h-4 transform transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                                        </Button>
                                    </div>
                                </div>

                                {/* View Mode */}
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">View</label>
                                    <div className="flex border border-border rounded-xl overflow-hidden">
                                        <Button
                                            onClick={() => setViewMode('grid')}
                                            variant={viewMode === 'grid' ? 'nova' : 'ghost'}
                                            size="sm"
                                            className="rounded-none border-0"
                                        >
                                            <Grid3X3 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            onClick={() => setViewMode('list')}
                                            variant={viewMode === 'list' ? 'nova' : 'ghost'}
                                            size="sm"
                                            className="rounded-none border-0"
                                        >
                                            <List className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <div className="flex items-end">
                                    <Button
                                        onClick={clearFilters}
                                        variant="ghost"
                                        className="w-full"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Clear Filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
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
                            <motion.div 
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                variants={staggerContainer}
                            >
                                {filteredAndSortedItems.map((item, index) => (
                                    <motion.div
                                        key={item.item_id}
                                        variants={staggerItem}
                                        initial="initial"
                                        animate="animate"
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <ItemCard item={item} />
                                    </motion.div>
                                ))}
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
        </AppShell>
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
            <Card variant="nova" padding="none" className="overflow-hidden">
                <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-muted-foreground" />
                    </div>

                    {/* Item Type Badge */}
                    <div className="absolute top-3 right-3">
                        <Badge variant="nova" className="text-xs">
                            {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                        </Badge>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-nova-primary transition-colors">
                        {item.title || 'Untitled'}
                    </h3>

                    <div className="flex items-center mb-3">
                        <User className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-muted-foreground truncate">{item.author}</span>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-2 mb-4">
                        {item.year && (
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3 mr-2" />
                                {item.year}
                            </div>
                        )}
                        {item.genre && (
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Tag className="w-3 h-3 mr-2" />
                                {item.genre}
                            </div>
                        )}
                    </div>

                    <Link href={`/patron/items/${item.item_id}`}>
                        <Button variant="nova" className="w-full">
                            <Sparkles className="w-4 h-4 mr-2" />
                            View Details
                        </Button>
                    </Link>
                </div>
            </Card>
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
            <Card variant="nova" padding="lg">
                <div className="flex gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-20 h-28 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-muted-foreground" />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-foreground">
                                        {item.title || 'Untitled'}
                                    </h3>
                                    <Badge variant="nova" className="text-xs">
                                        {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                                    </Badge>
                                </div>

                                <div className="flex items-center mb-3">
                                    <User className="w-4 h-4 text-muted-foreground mr-2" />
                                    <span className="text-sm font-medium text-muted-foreground">{item.author}</span>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap">
                                    {item.year && (
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {item.year}
                                        </div>
                                    )}
                                    {item.genre && (
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {item.genre}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <Link href={`/patron/items/${item.item_id}`}>
                                    <Button variant="nova">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
