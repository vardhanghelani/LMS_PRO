'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    BookOpen, 
    Search, 
    Filter,
    Eye,
    Edit,
    Trash2,
    Plus,
    User,
    Calendar,
    Tag,
    Hash,
    AlertTriangle,
    CheckCircle,
    XCircle,
    BarChart3,
    TrendingUp,
    TrendingDown
} from 'lucide-react';

type LibraryItem = {
    item_id: number;
    title: string;
    author: string;
    isbn: string;
    category: string;
    status: string;
    created_at: string;
    updated_at: string;
    users: {
        user_id: number;
        name: string;
        email: string;
    } | null;
    totalCopies: number;
    availableCopies: number;
    issuedCopies: number;
    reservedCopies: number;
};

export default function AdminItemsPage() {
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'unavailable'>('all');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const params = new URLSearchParams();
                if (searchTerm) params.append('search', searchTerm);
                if (statusFilter !== 'all') params.append('status', statusFilter);
                
                const res = await fetch(`/api/admin/items?${params.toString()}`);
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch library items');
                }
                
                if (data.success) {
                    setItems(data.items);
                } else {
                    throw new Error(data.message || 'API returned unsuccessful response');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        
        fetchItems();
    }, [searchTerm, statusFilter]);

    // Filter items based on search and status
    const filteredItems = items.filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.isbn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || 
                            (statusFilter === 'available' && item.availableCopies > 0) ||
                            (statusFilter === 'unavailable' && item.availableCopies === 0);
        return matchesSearch && matchesStatus;
    });

    const totalItems = items.length;
    const availableItems = items.filter(item => item.availableCopies > 0).length;
    const unavailableItems = items.filter(item => item.availableCopies === 0).length;
    const totalCopies = items.reduce((sum, item) => sum + item.totalCopies, 0);
    const totalIssued = items.reduce((sum, item) => sum + item.issuedCopies, 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-16 text-center border border-slate-700/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-16 h-16 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                            <h3 className="text-xl font-bold text-white mb-2">Loading Inventory Database</h3>
                            <p className="text-slate-400">Retrieving library collection data...</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-7xl mx-auto px-8 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-16 text-center border border-red-500/20 shadow-lg"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Database Connection Error</h3>
                            <p className="text-slate-400 mb-6 max-w-md mx-auto">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                            >
                                Retry Connection
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto px-8 py-8">
                <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Corporate Header */}
                    <motion.div 
                        className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 rounded-2xl p-8"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">INVENTORY MANAGEMENT</h1>
                                    <p className="text-slate-400">Corporate library asset tracking and administration</p>
                                </div>
                                <div className="flex items-center gap-2 ml-6">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-emerald-400 text-sm font-medium">LIVE</span>
                                </div>
                            </div>
                            
                            <Link 
                                href="/admin/items/add"
                                className="group flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-emerald-500/20"
                            >
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                ADD NEW ASSET
                            </Link>
                        </div>

                    </motion.div>

                    {/* Corporate KPI Dashboard */}
                    {items.length > 0 && (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-4 gap-6"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <motion.div 
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">TOTAL ASSETS</div>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{totalItems}</div>
                                    <div className="text-sm text-slate-400">Library collection items</div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">AVAILABLE</div>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{availableItems}</div>
                                    <div className="text-sm text-slate-400">Ready for circulation</div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                                            <XCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-xs font-semibold text-red-400 uppercase tracking-wider">OUT OF STOCK</div>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{unavailableItems}</div>
                                    <div className="text-sm text-slate-400">Requires restocking</div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg relative overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10"></div>
                                <div className="relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                                            <BarChart3 className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider">TOTAL COPIES</div>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{totalCopies}</div>
                                    <div className="text-sm text-slate-400">Physical inventory count</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Corporate Search Console */}
                    {items.length > 0 && (
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-lg"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center">
                                        <Search className="w-5 h-5 text-slate-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">INVENTORY SEARCH CONSOLE</h3>
                                        <p className="text-slate-400 text-sm">Advanced filtering and query interface</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search by title, author, ISBN, category..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-slate-400"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setStatusFilter('all')}
                                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                                                statusFilter === 'all'
                                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
                                            }`}
                                        >
                                            ALL ITEMS
                                        </button>
                                        <button
                                            onClick={() => setStatusFilter('available')}
                                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                                                statusFilter === 'available'
                                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
                                            }`}
                                        >
                                            AVAILABLE
                                        </button>
                                        <button
                                            onClick={() => setStatusFilter('unavailable')}
                                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                                                statusFilter === 'unavailable'
                                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
                                            }`}
                                        >
                                            OUT OF STOCK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Corporate Inventory Display */}
                    {filteredItems.length === 0 && items.length > 0 ? (
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-16 text-center border border-slate-700/50 shadow-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Assets Match Query</h3>
                            <p className="text-slate-400">Refine your search parameters or adjust filter criteria.</p>
                        </motion.div>
                    ) : items.length === 0 ? (
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-16 text-center border border-slate-700/50 shadow-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Inventory Database Empty</h3>
                            <p className="text-slate-400 mb-6">Initialize your library collection by adding your first asset.</p>
                            <Link 
                                href="/admin/items/add"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <Plus className="w-5 h-5" />
                                INITIALIZE COLLECTION
                            </Link>
                        </motion.div>
                    ) : (
                        /* Corporate Inventory Management Table */
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            {/* Corporate Table Header */}
                            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center">
                                            <BarChart3 className="w-5 h-5 text-slate-900" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">ASSET DATABASE</h3>
                                            <p className="text-slate-400 text-sm">{filteredItems.length} items • Real-time inventory tracking</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-emerald-400 text-sm font-medium">LIVE DATA</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Table Body */}
                            <div className="divide-y divide-slate-700">
                                {filteredItems.map((item, index) => {
                                    const utilization = Math.round(((item.totalCopies - item.availableCopies) / item.totalCopies) * 100);
                                    const isHighDemand = utilization > 70;
                                    const isLowStock = item.availableCopies <= 1;
                                    
                                    return (
                                        <motion.div
                                            key={item.item_id}
                                            className="grid grid-cols-12 gap-6 p-6 hover:bg-slate-700/30 transition-all duration-300 group"
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            {/* Asset Profile */}
                                            <div className="col-span-4 flex items-center gap-4">
                                                <div className="relative">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${
                                                        isHighDemand ? 'bg-gradient-to-br from-red-500 to-pink-500' :
                                                        isLowStock ? 'bg-gradient-to-br from-amber-500 to-orange-500' :
                                                        'bg-gradient-to-br from-emerald-500 to-teal-500'
                                                    }`}>
                                                        <BookOpen className="w-7 h-7" />
                                                    </div>
                                                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 ${
                                                        isHighDemand ? 'bg-red-400' : isLowStock ? 'bg-amber-400' : 'bg-emerald-400'
                                                    }`}></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">ASSET #{item.item_id}</div>
                                                    <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-cyan-300 transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-400 truncate">by {item.author}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded-md text-xs font-medium">
                                                            {item.isbn}
                                                        </span>
                                                        <span className="px-2 py-1 bg-blue-900/50 text-blue-300 rounded-md text-xs font-medium">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Stock Metrics */}
                                            <div className="col-span-2 text-center">
                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">STOCK STATUS</div>
                                                <div className="w-full max-w-20 mx-auto">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-bold text-slate-300">{utilization}%</span>
                                                    </div>
                                                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                                utilization > 80 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                                                utilization > 50 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                                                                'bg-gradient-to-r from-emerald-500 to-teal-500'
                                                            }`}
                                                            style={{ width: `${utilization}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-sm font-bold text-emerald-400">{item.availableCopies}</span>
                                                        <span className="text-xs text-slate-500">/{item.totalCopies}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Asset Manager */}
                                            <div className="col-span-2 text-center">
                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">ASSIGNED TO</div>
                                                <div className="flex items-center justify-center gap-3">
                                                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-slate-300">
                                                            {item.users?.name || 'Unassigned'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Status & Alerts */}
                                            <div className="col-span-2 text-center">
                                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">STATUS</div>
                                                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold ${
                                                    item.availableCopies > 0 ? 'bg-emerald-900/50 text-emerald-300' : 'bg-red-900/50 text-red-300'
                                                }`}>
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        item.availableCopies > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                                                    }`}></div>
                                                    {item.availableCopies > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                                                </div>
                                                
                                                {isHighDemand && (
                                                    <div className="flex items-center justify-center gap-1 text-xs text-red-400 font-medium mt-1">
                                                        <TrendingUp className="w-3 h-3" />
                                                        HIGH DEMAND
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Actions */}
                                            <div className="col-span-2 flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/items/${item.item_id}`}
                                                    className="group/btn flex items-center justify-center w-10 h-10 bg-cyan-900/50 text-cyan-300 rounded-xl hover:bg-cyan-800/50 hover:scale-110 transition-all duration-200"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                </Link>
                                                <Link
                                                    href={`/admin/items/${item.item_id}/edit`}
                                                    className="group/btn flex items-center justify-center w-10 h-10 bg-indigo-900/50 text-indigo-300 rounded-xl hover:bg-indigo-800/50 hover:scale-110 transition-all duration-200"
                                                    title="Edit Asset"
                                                >
                                                    <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
