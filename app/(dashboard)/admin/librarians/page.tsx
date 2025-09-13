'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    UserCheck, 
    Plus, 
    Users, 
    Mail, 
    Calendar, 
    Shield,
    Eye,
    Edit,
    Trash2,
    Search,
    Filter,
    MoreVertical,
    AlertTriangle,
    CheckCircle,
    XCircle
} from 'lucide-react';

type User = {
    user_id: number;
    name: string | null;
    email: string | null;
    status: 'active' | 'inactive' | null;
    created_at: string;
};

export default function LibrariansPage() {
    const [librarians, setLibrarians] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);
    const [selectedLibrarian, setSelectedLibrarian] = useState<User | null>(null);
    const [removing, setRemoving] = useState(false);
    const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchLibrarians = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('/api/admin/librarians');
                const data = await res.json();
                
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch librarians');
                }
                
                if (data.success) {
                    setLibrarians(data.librarians);
                } else {
                    throw new Error(data.message || 'API returned unsuccessful response');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchLibrarians();
    }, []);

    // Filter librarians based on search and status
    const filteredLibrarians = librarians.filter(librarian => {
        const matchesSearch = librarian.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            librarian.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || librarian.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const activeCount = librarians.filter(user => user.status === 'active').length;
    const inactiveCount = librarians.filter(user => user.status === 'inactive').length;

    const handleRemoveLibrarian = async () => {
        if (!selectedLibrarian) return;

        setRemoving(true);
        try {
            const response = await fetch(`/api/admin/librarians/${selectedLibrarian.user_id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setSnackbar({ message: data.message, type: 'success' });
                // Remove librarian from list
                setLibrarians(prev => prev.filter(lib => lib.user_id !== selectedLibrarian.user_id));
                setShowRemoveDialog(false);
                setSelectedLibrarian(null);
            } else {
                setSnackbar({ message: data.message, type: 'error' });
            }
        } catch (error) {
            console.error('Error removing librarian:', error);
            setSnackbar({ message: 'Failed to remove librarian', type: 'error' });
        } finally {
            setRemoving(false);
        }
    };

    const handleToggleStatus = async (librarian: User) => {
        try {
            const newStatus = librarian.status === 'active' ? 'inactive' : 'active';
            const response = await fetch(`/api/admin/librarians/${librarian.user_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (data.success) {
                setSnackbar({ message: data.message, type: 'success' });
                // Update librarian status in list
                setLibrarians(prev => prev.map(lib => 
                    lib.user_id === librarian.user_id 
                        ? { ...lib, status: newStatus }
                        : lib
                ));
            } else {
                setSnackbar({ message: data.message, type: 'error' });
            }
        } catch (error) {
            console.error('Error updating librarian status:', error);
            setSnackbar({ message: 'Failed to update librarian status', type: 'error' });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300 text-lg">Loading staff database...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">SYSTEM ERROR</h3>
                    <p className="text-slate-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl hover:from-cyan-400 hover:to-emerald-400 transition-all duration-300"
                    >
                        RETRY CONNECTION
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Corporate Header */}
            <div className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg">
                                <UserCheck className="w-7 h-7 text-slate-900" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">STAFF MANAGEMENT</h1>
                                <p className="text-slate-400 text-sm">Librarian Access Control System</p>
                            </div>
                        </div>
                        
                        <Link 
                            href="/admin/librarians/addnewlibrarian"
                            className="group flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            ADD STAFF MEMBER
                        </Link>
                    </div>
                </div>
                    </div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Enterprise KPI Metrics */}
                    {librarians.length > 0 && (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <motion.div 
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Users className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">TOTAL STAFF</div>
                                        <div className="text-3xl font-bold text-white">{librarians.length}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-slate-400">Registered staff members</div>
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                                        <span>Capacity</span>
                                        <span>{Math.round((librarians.length / 50) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                        <motion.div 
                                            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.round((librarians.length / 50) * 100)}%` }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Shield className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ACTIVE</div>
                                        <div className="text-3xl font-bold text-emerald-400">{activeCount}</div>
                                    </div>
                                </div>
                                <div className="text-sm text-slate-400">Operational staff online</div>
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-xs text-emerald-400 font-medium">SYSTEM ACTIVE</span>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <UserCheck className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">INACTIVE</div>
                                        <div className="text-3xl font-bold text-amber-400">{inactiveCount}</div>
                            </div>
                        </div>
                                <div className="text-sm text-slate-400">Suspended access accounts</div>
                                {inactiveCount > 0 && (
                                    <div className="flex items-center gap-2 mt-3">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                        <span className="text-xs text-amber-400 font-medium">REQUIRES ATTENTION</span>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Enterprise Command Console */}
                    {librarians.length > 0 && (
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center">
                                        <Search className="w-5 h-5 text-slate-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">STAFF DATABASE SEARCH</h3>
                                        <p className="text-slate-400 text-sm">Advanced filtering and search capabilities</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search by name, email, or identifier..."
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
                                            ALL STAFF
                                        </button>
                                        <button
                                            onClick={() => setStatusFilter('active')}
                                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                                                statusFilter === 'active'
                                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
                                            }`}
                                        >
                                            ACTIVE
                                        </button>
                                        <button
                                            onClick={() => setStatusFilter('inactive')}
                                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                                                statusFilter === 'inactive'
                                                    ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg'
                                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 border border-slate-600'
                                            }`}
                                        >
                                            INACTIVE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    </motion.div>

                    {/* Librarians Grid */}
                    {filteredLibrarians.length === 0 && librarians.length > 0 ? (
                        <motion.div 
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-slate-200/50 shadow-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Librarians Found</h3>
                            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
                        </motion.div>
                ) : librarians.length === 0 ? (
                        <motion.div 
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-slate-200/50 shadow-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Librarians Found</h3>
                            <p className="text-slate-500 mb-6">Start by adding library staff members to manage your collection.</p>
                            <Link
                                href="/admin/librarians/addnewlibrarian"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <Plus className="w-5 h-5" />
                                Add Your First Librarian
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {/* Staff Directory Header */}
                            <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center">
                                            <Users className="w-5 h-5 text-slate-900" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">STAFF DIRECTORY</h3>
                                            <p className="text-slate-400 text-sm">{filteredLibrarians.length} staff members • Live status tracking</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-emerald-400 text-sm font-medium">REAL-TIME</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Staff Table */}
                            <div className="divide-y divide-slate-700">
                                {filteredLibrarians.map((user, index) => {
                                    const isActive = user.status === 'active';
                                    const joinDate = new Date(user.created_at);
                                    
                                    return (
                                        <motion.div
                                            key={user.user_id}
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-6 hover:bg-slate-700/30 transition-all duration-300 group"
                                        >
                                            <div className="grid grid-cols-12 gap-6 items-center">
                                                {/* Staff Profile */}
                                                <div className="col-span-4 flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg ${
                                                            isActive 
                                                                ? 'bg-gradient-to-br from-emerald-500 to-teal-500' 
                                                                : 'bg-gradient-to-br from-slate-600 to-slate-700'
                                                        }`}>
                                                            {user.name ? user.name.charAt(0).toUpperCase() : 'L'}
                                                        </div>
                                                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-800 ${
                                                            isActive ? 'bg-emerald-400' : 'bg-amber-400'
                                                        }`}></div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">STAFF MEMBER</div>
                                                        <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-indigo-300 transition-colors">
                                                            {user.name || 'Unnamed Staff'}
                                                        </h3>
                                                        <p className="text-sm text-slate-400 truncate">{user.email}</p>
                                                    </div>
                                                </div>

                                                {/* Status */}
                                                <div className="col-span-2 text-center">
                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">STATUS</div>
                                                    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold ${
                                                        isActive 
                                                            ? 'bg-emerald-900/50 text-emerald-300' 
                                                            : 'bg-amber-900/50 text-amber-300'
                                                    }`}>
                                                        <div className={`w-2 h-2 rounded-full ${
                                                            isActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                                                }`}></div>
                                                        {isActive ? 'ACTIVE' : 'INACTIVE'}
                                                    </div>
                                                </div>
                                                
                                                {/* Join Date */}
                                                <div className="col-span-2 text-center">
                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">JOINED</div>
                                                    <div className="text-sm font-medium text-slate-300">
                                                        {joinDate.toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        {Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24))} days ago
                                                    </div>
                                                </div>
                                                
                                                {/* Security Level */}
                                                <div className="col-span-2 text-center">
                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">ACCESS</div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Shield className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-sm font-medium text-cyan-400">LIBRARIAN</span>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="col-span-2 flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/admin/librarians/${user.user_id}`}
                                                        className="group/btn flex items-center justify-center w-10 h-10 bg-cyan-900/50 text-cyan-300 rounded-xl hover:bg-cyan-800/50 hover:scale-110 transition-all duration-200"
                                                        title="View Profile"
                                                    >
                                                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/librarians/${user.user_id}/edit`}
                                                        className="group/btn flex items-center justify-center w-10 h-10 bg-indigo-900/50 text-indigo-300 rounded-xl hover:bg-indigo-800/50 hover:scale-110 transition-all duration-200"
                                                        title="Edit Librarian"
                                                    >
                                                        <Edit className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleToggleStatus(user)}
                                                        className={`group/btn flex items-center justify-center w-10 h-10 rounded-xl hover:scale-110 transition-all duration-200 ${
                                                            isActive
                                                                ? 'bg-amber-900/50 text-amber-300 hover:bg-amber-800/50'
                                                                : 'bg-emerald-900/50 text-emerald-300 hover:bg-emerald-800/50'
                                                        }`}
                                                        title={isActive ? 'Deactivate' : 'Activate'}
                                                    >
                                                        {isActive ? (
                                                            <XCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                        ) : (
                                                            <CheckCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedLibrarian(user);
                                                            setShowRemoveDialog(true);
                                                        }}
                                                        className="group/btn flex items-center justify-center w-10 h-10 bg-red-900/50 text-red-300 rounded-xl hover:bg-red-800/50 hover:scale-110 transition-all duration-200"
                                                        title="Remove Staff"
                                                    >
                                                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
            </div>

            {/* Remove Confirmation Dialog */}
            {showRemoveDialog && selectedLibrarian && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">Remove Librarian</h3>
                                <p className="text-sm text-slate-500">This action cannot be undone</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-slate-700 mb-2">
                                Are you sure you want to remove <strong>{selectedLibrarian.name}</strong>?
                            </p>
                            <p className="text-sm text-slate-500">
                                This will deactivate their account and prevent them from accessing the system.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowRemoveDialog(false);
                                    setSelectedLibrarian(null);
                                }}
                                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                                disabled={removing}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRemoveLibrarian}
                                disabled={removing}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {removing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Removing...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Remove
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

        {/* Snackbar */}
        {snackbar && (
            <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <div className={`px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
                        snackbar.type === 'success' 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                        {snackbar.type === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <XCircle className="w-5 h-5" />
                        )}
                        <span className="font-medium">{snackbar.message}</span>
                        <button
                            onClick={() => setSnackbar(null)}
                            className="ml-2 text-current opacity-70 hover:opacity-100"
                        >
                            <XCircle className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
