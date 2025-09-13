'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    BookOpen, 
    User, 
    Hash, 
    Calendar, 
    Tag, 
    FileText, 
    Edit3, 
    Trash2, 
    MapPin, 
    Globe, 
    Clock, 
    FileType, 
    BookOpenCheck, 
    Users, 
    Eye,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import ConfirmDialog from "@/app/components/ConfirmDialog";
import Snackbar from "@/app/components/Snackbar";

interface Item {
    id: string;
    title: string;
    author: string;
    isbn: string | null;
    year: number | null;
    genre: string | null;
    item_type: string | null;
    location: string | null;
    publisher: string | null;
    language: string | null;
    pages: number | null;
    duration: number | null;
    format: string | null;
    subject: string | null;
    keywords: string | null;
    description: string | null;
    image_url: string | null;
    totalCopies: number;
    availableCopies: number;
    issuedCopies: number;
    reservedCopies: number;
    created_at: string;
    updated_at: string;
    copies?: Array<{
        tran_id: number;
        status: string;
        user?: {
            user_id: number;
            name: string;
            email: string;
        } | null;
    }>;
    history?: Array<{
        id: number;
        status: string;
        requested_by?: {
            user_id: number;
            name: string;
            email: string;
        } | null;
        approved_by?: number;
        requested_at?: string;
        approved_at?: string;
        date_issued?: string;
        date_due?: string;
        date_returned?: string;
        remarks?: string;
    }>;
}

export default function AdminItemDetailPage() {
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const params = useParams();
    const itemId = params?.id as string;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('info');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`/api/admin/items/${itemId}`);
                const data = await res.json();
                if (data.success) {
                    setItem(data.item);
                } else {
                    setSnackbarMsg(data.message || 'Failed to load item');
                    setSnackbarType('error');
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error("Failed to load item:", error);
                setSnackbarMsg('Failed to load item');
                setSnackbarType('error');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [itemId]);

    // Calculate copy statistics
    const calculateCopyStats = (copies: any[]) => {
        const totalCopies = copies.length;
        const availableCopies = copies.filter(copy => copy.status === 'available').length;
        const issuedCopies = copies.filter(copy => copy.status === 'issued').length;
        const reservedCopies = copies.filter(copy => copy.status === 'reserved').length;
        
        return { totalCopies, availableCopies, issuedCopies, reservedCopies };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300 text-lg">Loading item details...</p>
                </div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 text-lg mb-4">Item not found</p>
                    <Link 
                        href="/admin/items"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Items
                    </Link>
                </div>
            </div>
        );
    }

    const copies = item.copies || [];
    const history = item.history || [];
    const stats = calculateCopyStats(copies);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <Link href="/admin/items" className="inline-flex items-center gap-3 text-slate-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-lg font-medium">Back to Items</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Item Details</h1>
                            <p className="text-slate-400 text-lg">Complete information and availability status</p>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden"
                >
                    {/* Status Bar */}
                    <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-b border-slate-600 p-6">
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            <StatusBadge label="Total" value={stats.totalCopies} color="bg-slate-600 text-slate-300" />
                            <StatusBadge label="Available" value={stats.availableCopies} color="bg-green-600 text-green-100" />
                            <StatusBadge label="Issued" value={stats.issuedCopies} color="bg-orange-600 text-orange-100" />
                            <StatusBadge label="Reserved" value={stats.reservedCopies} color="bg-blue-600 text-blue-100" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-8">
                        {/* Item Cover */}
                        <div className="xl:col-span-1 flex justify-center xl:justify-start">
                            <div className="w-full max-w-sm xl:max-w-none xl:sticky xl:top-8">
                                {item.image_url ? (
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                        <img
                                            src={item.image_url}
                                            alt={item.title ?? 'Item Image'}
                                            className="relative w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl border-4 border-slate-600 group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-2xl flex flex-col items-center justify-center border-4 border-slate-600 shadow-2xl">
                                        <BookOpen className="w-16 h-16 text-slate-400 mb-4" />
                                        <p className="text-slate-400 font-medium">No cover image</p>
                                        <p className="text-slate-500 text-sm mt-1">available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Item Information */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Title and Author Section */}
                            <div className="text-center xl:text-left space-y-4">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent leading-tight">
                                    {item.title ?? 'Untitled'}
                                </h2>
                                <div className="flex items-center justify-center xl:justify-start gap-3">
                                    <div className="p-2 bg-indigo-600/20 rounded-xl">
                                        <User className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="text-xl text-slate-300 font-medium">by {item.author}</span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <DetailCard icon={<Hash className="w-5 h-5 text-indigo-400" />} title="ISBN" content={item.isbn ?? 'Not available'} />
                                <DetailCard icon={<Calendar className="w-5 h-5 text-indigo-400" />} title="Publication Year" content={item.year ? item.year.toString() : 'Unknown'} />
                                <DetailCard icon={<Tag className="w-5 h-5 text-indigo-400" />} title="Genre" content={item.genre ?? 'Not specified'} />
                                <DetailCard icon={<MapPin className="w-5 h-5 text-indigo-400" />} title="Location" content={item.location ?? 'Not specified'} />
                                {item.publisher && <DetailCard icon={<BookOpenCheck className="w-5 h-5 text-indigo-400" />} title="Publisher" content={item.publisher} />}
                                {item.language && <DetailCard icon={<Globe className="w-5 h-5 text-indigo-400" />} title="Language" content={item.language} />}
                                {item.pages && <DetailCard icon={<FileText className="w-5 h-5 text-indigo-400" />} title="Pages" content={item.pages.toString()} />}
                                {item.duration && <DetailCard icon={<Clock className="w-5 h-5 text-indigo-400" />} title="Duration" content={`${item.duration} minutes`} />}
                                {item.format && <DetailCard icon={<FileType className="w-5 h-5 text-indigo-400" />} title="Format" content={item.format} />}
                            </div>

                            {/* Description */}
                            {item.description && (
                                <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-2xl p-6 border border-slate-600">
                                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-indigo-400" />
                                        Description
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">{item.description}</p>
                                </div>
                            )}

                            {/* Subject and Keywords */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {item.subject && (
                                    <div className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-2xl p-6 border border-indigo-600/30">
                                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-indigo-400" />
                                            Subject
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed">{item.subject}</p>
                                    </div>
                                )}
                                {item.keywords && (
                                    <div className="bg-gradient-to-br from-slate-700/50 to-indigo-600/20 rounded-2xl p-6 border border-slate-600">
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <Tag className="w-5 h-5 text-indigo-400" />
                                            Keywords
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {item.keywords.split(',').map((keyword, i) => (
                                                <span 
                                                    key={i} 
                                                    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-slate-600/50 text-slate-300 border border-slate-500 hover:bg-indigo-600/30 hover:border-indigo-500 transition-all duration-200 cursor-default"
                                                >
                                                    {keyword.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-2xl p-6 border border-slate-600">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Edit3 className="w-5 h-5 text-indigo-400" />
                                    Item Actions
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={`/admin/items/${item.id}/edit`}
                                        className="group relative flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold"
                                    >
                                        <Edit3 className="w-5 h-5" />
                                        <span>Edit Details</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setShowConfirm(true);
                                        }}
                                        className="group relative flex-1 sm:flex-none bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        <span>Delete Item</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Confirm Dialog */}
                <ConfirmDialog
                    open={showConfirm}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete "${selectedItem?.title}"?`}
                    onConfirm={async () => {
                        try {
                            const res = await fetch(`/api/admin/items/${selectedItem?.id}`, {
                                method: 'DELETE',
                            });
                            const data = await res.json();

                            if (data.success) {
                                setSnackbarMsg('Item deleted successfully');
                                setSnackbarType('success');
                                setSnackbarOpen(true);
                                setShowConfirm(false);
                                setSelectedItem(null);
                                setTimeout(() => window.location.href = '/admin/items', 1000);
                            } else {
                                setSnackbarMsg(data.message || 'Failed to delete item');
                                setSnackbarType('error');
                                setSnackbarOpen(true);
                                setShowConfirm(false);
                                setSelectedItem(null);
                            }
                        } catch (error) {
                            console.error("Delete failed:", error);
                            setSnackbarMsg('Server error while deleting');
                            setSnackbarType('error');
                            setSnackbarOpen(true);
                            setShowConfirm(false);
                            setSelectedItem(null);
                        }
                    }}
                    onCancel={() => {
                        setShowConfirm(false);
                        setSelectedItem(null);
                    }}
                />

                {/* Snackbar */}
                <Snackbar message={snackbarMsg} type={snackbarType} open={snackbarOpen} onClose={() => setSnackbarOpen(false)} />
            </div>
        </div>
    );
}

function StatusBadge({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className={`${color} px-4 py-2 rounded-xl font-semibold text-sm shadow-sm border border-slate-500/50`}>
            <span className="opacity-75">{label}:</span> <span className="font-bold">{value}</span>
        </div>
    );
}

function DetailCard({ icon, title, content }: { icon: JSX.Element, title: string, content: string }) {
    return (
        <div className="group bg-slate-700/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-600 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-slate-900/30 hover:scale-105 transition-all duration-300 cursor-default">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600/30 to-indigo-700/30 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-300 mb-1 text-sm uppercase tracking-wider">{title}</h4>
                    <p className="text-slate-200 font-medium text-lg break-words">{content}</p>
                </div>
            </div>
        </div>
    );
}
