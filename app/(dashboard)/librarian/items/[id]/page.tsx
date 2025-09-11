/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { JSX, useEffect, useState } from "react";
import { BookOpen, User, Hash, Calendar, Tag, FileText, Edit3, ArrowLeft, Trash2, MapPin, Globe, Clock, FileType, BookOpenCheck, Users } from 'lucide-react';
import Link from "next/link";
import ConfirmDialog from "@/app/components/ConfirmDialog";
import { useParams } from 'next/navigation';
import Snackbar from "@/app/components/Snackbar";
import {Atom} from "react-loading-indicators";

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

export default function ItemDetailPage() {
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
                const res = await fetch(`/api/librarian/items/${itemId}`);
                const data = await res.json();
                if (data.success) {
                    setItem(data.item);
                }
            } catch (error) {
                console.error("Failed to load item:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [itemId]);

    if (loading) {
        // return (
        //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-4">
        //         <div className="max-w-7xl mx-auto">
        //             <div className="flex items-center justify-center min-h-[60vh]">
        //                 <div className="text-center space-y-6">
        //                     <div className="relative">
        //                         <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin mx-auto"></div>
        //                         <div className="w-16 h-16 border-4 border-t-indigo-600 rounded-full animate-spin mx-auto absolute top-2 left-1/2 transform -translate-x-1/2"></div>
        //                     </div>
        //                     <div className="space-y-2">
        //                         <p className="text-slate-700 text-xl font-medium">Loading item details...</p>
        //                         <p className="text-slate-500 text-sm">Please wait while we fetch the data</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );
        <Atom color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]} />
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                                <BookOpen className="w-12 h-12 text-slate-400" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-red-600 text-xl font-semibold">Item not found</p>
                                <p className="text-slate-500 text-sm">The requested item could not be located</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-4 sm:py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                {/* Enhanced Header */}
                <div className="animate-fade-in">
                    <Link href="/librarian/items" className="inline-flex items-center gap-3 text-slate-600 hover:text-slate-800 transition-all duration-300 mb-6 group">
                        <div className="p-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 group-hover:bg-white/80 transition-all duration-300">
                            <ArrowLeft className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-medium">Back to Library</span>
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{item.availableCopies}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Item Details</h1>
                            <p className="text-slate-600 text-lg">Complete information and availability status</p>
                        </div>
                    </div>
                </div>

                {/* Enhanced Main Content */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/30 overflow-hidden animate-slide-up">
                    {/* Status Bar */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-slate-200/50 p-4">
                        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                            <StatusBadge label="Total" value={item.totalCopies} color="bg-slate-100 text-slate-700" />
                            <StatusBadge label="Available" value={item.availableCopies} color="bg-green-100 text-green-700" />
                            <StatusBadge label="Issued" value={item.issuedCopies} color="bg-orange-100 text-orange-700" />
                            <StatusBadge label="Reserved" value={item.reservedCopies} color="bg-blue-100 text-blue-700" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-6 sm:p-8">
                        {/* Enhanced Item Cover */}
                        <div className="xl:col-span-1 flex justify-center xl:justify-start">
                            <div className="w-full max-w-sm xl:max-w-none xl:sticky xl:top-8">
                                {item.image_url ? (
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                        <img
                                            src={item.image_url}
                                            alt={item.title ?? 'Item Image'}
                                            className="relative w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center">
                                                <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full aspect-[3/4] bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 rounded-2xl flex flex-col items-center justify-center border-4 border-white shadow-2xl">
                                        <BookOpen className="w-16 h-16 text-slate-400 mb-4" />
                                        <p className="text-slate-500 font-medium">No cover image</p>
                                        <p className="text-slate-400 text-sm mt-1">available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Enhanced Item Information */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Title and Author Section */}
                            <div className="text-center xl:text-left space-y-4">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
                                    {item.title ?? 'Untitled'}
                                </h2>
                                <div className="flex items-center justify-center xl:justify-start gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-xl">
                                        <User className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <span className="text-xl text-slate-700 font-medium">by {item.author}</span>
                                </div>
                            </div>

                            {/* Enhanced Details Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <DetailCard icon={<Hash className="w-5 h-5 text-indigo-600" />} title="ISBN" content={item.isbn ?? 'Not available'} delay="0ms" />
                                <DetailCard icon={<Calendar className="w-5 h-5 text-indigo-600" />} title="Publication Year" content={item.year ? item.year.toString() : 'Unknown'} delay="100ms" />
                                <DetailCard icon={<Tag className="w-5 h-5 text-indigo-600" />} title="Genre" content={item.genre ?? 'Not specified'} delay="200ms" />
                                <DetailCard icon={<MapPin className="w-5 h-5 text-indigo-600" />} title="Location" content={item.location ?? 'Not specified'} delay="300ms" />
                                {item.publisher && <DetailCard icon={<BookOpenCheck className="w-5 h-5 text-indigo-600" />} title="Publisher" content={item.publisher} delay="400ms" />}
                                {item.language && <DetailCard icon={<Globe className="w-5 h-5 text-indigo-600" />} title="Language" content={item.language} delay="500ms" />}
                                {item.pages && <DetailCard icon={<FileText className="w-5 h-5 text-indigo-600" />} title="Pages" content={item.pages.toString()} delay="600ms" />}
                                {item.duration && <DetailCard icon={<Clock className="w-5 h-5 text-indigo-600" />} title="Duration" content={`${item.duration} minutes`} delay="700ms" />}
                                {item.format && <DetailCard icon={<FileType className="w-5 h-5 text-indigo-600" />} title="Format" content={item.format} delay="800ms" />}
                            </div>

                            {/* Enhanced Description */}
                            {item.description && (
                                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-indigo-600" />
                                        Description
                                    </h3>
                                    <p className="text-slate-700 leading-relaxed text-lg">{item.description}</p>
                                </div>
                            )}

                            {/* Enhanced Subject and Keywords */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {item.subject && (
                                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-indigo-600" />
                                            Subject
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed">{item.subject}</p>
                                    </div>
                                )}
                                {item.keywords && (
                                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-6 border border-slate-200">
                                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <Tag className="w-5 h-5 text-indigo-600" />
                                            Keywords
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {item.keywords.split(',').map((keyword, i) => (
                                                <span 
                                                    key={i} 
                                                    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white/80 text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 cursor-default shadow-sm"
                                                    style={{ animationDelay: `${i * 100}ms` }}
                                                >
                                                    {keyword.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Enhanced Copies Info */}
                            <CopiesInfo copies={item.copies!} />

                            {/* Enhanced History Table */}
                            <HistoryTable history={item.history!} />

                            {/* Enhanced Actions */}
                            <ItemActions
                                item={item}
                                selectedItem={selectedItem}
                                setSelectedItem={setSelectedItem}
                                showConfirm={showConfirm}
                                setShowConfirm={setShowConfirm}
                                setSnackbarMsg={setSnackbarMsg}
                                setSnackbarType={setSnackbarType}
                                setSnackbarOpen={setSnackbarOpen}
                            />
                        </div>
                    </div>
                </div>

                {/* Confirm Dialog */}
                <ConfirmDialog
                    open={showConfirm}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete "${selectedItem?.title}"?`}
                    onConfirm={async () => {
                        try {
                            const res = await fetch(`/api/librarian/items/${selectedItem?.id}`, {
                                method: 'DELETE',
                            });
                            const data = await res.json();

                            if (data.success) {
                                setSnackbarMsg('Item deleted successfully');
                                setSnackbarType('success');
                                setSnackbarOpen(true);
                                setShowConfirm(false);
                                setSelectedItem(null);
                                setTimeout(() => window.location.href = '/librarian/items', 1000);
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

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out;
                }
            `}</style>
        </div>
    );
}

function StatusBadge({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className={`${color} px-4 py-2 rounded-xl font-semibold text-sm shadow-sm border border-white/50 backdrop-blur-sm`}>
            <span className="opacity-75">{label}:</span> <span className="font-bold">{value}</span>
        </div>
    );
}

function DetailCard({ icon, title, content, delay }: { icon: JSX.Element, title: string, content: string, delay: string }) {
    return (
        <div 
            className="group bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/40 hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/30 hover:scale-105 transition-all duration-300 cursor-default"
            style={{ animationDelay: delay }}
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 mb-1 text-sm uppercase tracking-wider">{title}</h4>
                    <p className="text-slate-700 font-medium text-lg break-words">{content}</p>
                </div>
            </div>
        </div>
    );
}

function CopiesInfo({ copies }: { copies: any[] }) {
    return (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Copy Management
                <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                    {copies.length} {copies.length === 1 ? 'copy' : 'copies'}
                </span>
            </h3>
            <div className="space-y-3 max-h-64 overflow-auto">
                {copies.length === 0 ? (
                    <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">No copies available</p>
                        <p className="text-slate-400 text-sm">Add copies to track availability</p>
                    </div>
                ) : copies.map((copy, index) => (
                    <div 
                        key={copy.tran_id} 
                        className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/50 hover:bg-white transition-all duration-200 shadow-sm"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                                <div className="font-bold text-slate-800">Transaction #{copy.tran_id}</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-600">Status:</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        copy.status === 'available' ? 'bg-green-100 text-green-700' :
                                        copy.status === 'issued' ? 'bg-orange-100 text-orange-700' :
                                        copy.status === 'reserved' ? 'bg-blue-100 text-blue-700' :
                                        'bg-slate-100 text-slate-700'
                                    }`}>
                                        {copy.status}
                                    </span>
                                </div>
                            </div>
                            {copy.user ? (
                                <div className="text-sm text-slate-600 text-right bg-slate-50 p-3 rounded-lg">
                                    <div className="font-semibold text-slate-800">{copy.user.name}</div>
                                    <div className="text-xs opacity-75 break-all">{copy.user.email}</div>
                                </div>
                            ) : (
                                <div className="text-sm text-slate-400 italic bg-slate-50 p-3 rounded-lg">
                                    No user assigned
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function HistoryTable({ history }: { history: any[] }) {
    return (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Transaction History
                <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                    {history.length} {history.length === 1 ? 'record' : 'records'}
                </span>
            </h3>
            {history.length === 0 ? (
                <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No transaction history</p>
                    <p className="text-slate-400 text-sm">Transactions will appear here when they occur</p>
                </div>
            ) : (
                <div className="overflow-auto max-h-80 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-sm">
                    <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-slate-100 to-indigo-100 sticky top-0">
                            <tr>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Requested By</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Approved By</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Requested At</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Approved At</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Date Issued</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Date Due</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Date Returned</th>
                                <th className="py-4 px-4 text-left text-sm font-bold text-slate-800 uppercase tracking-wider">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {history.map((h, index) => (
                                <tr key={h.id} className="hover:bg-slate-50/50 transition-colors duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                                    <td className="py-3 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                            h.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            h.status === 'issued' ? 'bg-blue-100 text-blue-700' :
                                            h.status === 'returned' ? 'bg-slate-100 text-slate-700' :
                                            'bg-orange-100 text-orange-700'
                                        }`}>
                                            {h.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-slate-800">{h.requested_by?.name ?? '-'}</td>
                                    <td className="py-3 px-4 font-medium text-slate-800">{h.approved_by?.name ?? '-'}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm">{h.requested_at ? new Date(h.requested_at).toLocaleString() : '-'}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm">{h.approved_at ? new Date(h.approved_at).toLocaleString() : '-'}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm">{h.date_issued ? new Date(h.date_issued).toLocaleDateString() : '-'}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm">{h.date_due ? new Date(h.date_due).toLocaleDateString() : '-'}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm">{h.date_returned ? new Date(h.date_returned).toLocaleDateString() : '-'}</td>
                                    <td className="py-3 px-4 text-slate-600 text-sm">{h.remarks || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export function ItemActions({
    item,
    selectedItem,
    setSelectedItem,
    showConfirm,
    setShowConfirm,
    setSnackbarMsg,
    setSnackbarType,
    setSnackbarOpen,
}: {
    item: any,
    selectedItem: any,
    setSelectedItem: any,
    showConfirm: any,
    setShowConfirm: any,
    setSnackbarMsg: any,
    setSnackbarType: any,
    setSnackbarOpen: any,
}) {
    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/librarian/items/${item.id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (data.success) {
                setSnackbarMsg("Item deleted successfully");
                setSnackbarType("success");
                setSnackbarOpen(true);
                setShowConfirm(false);
                setSelectedItem(null);
                setTimeout(() => window.location.href = "/librarian", 1500);
            } else {
                setSnackbarMsg(data.message || "Failed to delete item");
                setSnackbarType("error");
                setSnackbarOpen(true);
            }
        } catch (e) {
            setSnackbarMsg("Server error during deletion");
            setSnackbarType("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                Item Actions
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href={`/librarian/items/${item.id}/edit`}
                    className="group relative flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold will-change-transform"
                >
                    <Edit3 className="w-5 h-5 transition-transform duration-300 will-change-transform" />
                    <span>Edit Details</span>
                </Link>
                <button
                    onClick={() => {
                        setSelectedItem(item);
                        setShowConfirm(true);
                    }}
                    className="group relative flex-1 sm:flex-none bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 font-semibold will-change-transform"
                >
                    <Trash2 className="w-5 h-5 transition-transform duration-300 will-change-transform" />
                    <span>Delete Item</span>
                </button>
            </div>

            {/* Enhanced feature buttons */}
            <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                    <BookOpen className="w-4 h-4" />
                    View History
                </button>
                <button className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-4 py-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                    <Users className="w-4 h-4" />
                    Manage Copies
                </button>
            </div>

            {/* Confirm delete dialog */}
            {showConfirm && selectedItem?.id === item.id && (
                <ConfirmDialog
                    open={showConfirm}
                    title="Confirm Delete"
                    message={`Are you sure you want to delete "${item.title}"?`}
                    confirmText="Delete"
                    cancelText="Cancel"
                    variant="danger"
                    onConfirm={handleDelete}
                    onCancel={() => {
                        setShowConfirm(false);
                        setSelectedItem(null);
                    }}
                />
            )}
        </div>
    );
}