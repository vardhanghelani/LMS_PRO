'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Snackbar from '@/app/components/Snackbar';
import ConfirmDialog from '@/app/components/ConfirmDialog';

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
    available_copies: number;
    total_copies: number;
    created_at: Date;
    updated_at: Date;
}

export default function ItemDetailPage() {
    const params = useParams();
    const itemId = params.id as string;
    const [item, setItem] = useState<LibraryItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [borrowing, setBorrowing] = useState(false);
    const [borrowSuccess, setBorrowSuccess] = useState(false);
    const [borrowError, setBorrowError] = useState<string | null>(null);

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'info'>('info');
    const [wishlistAdding, setWishlistAdding] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);

    // Confirm Dialog states for removing from wishlist
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [borrowConfirmOpen, setBorrowConfirmOpen] = useState(false);
    const [borrowLoading, setBorrowLoading] = useState(false);


    const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setSnackbarMessage(message);
        setSnackbarType(type);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        async function fetchItem() {
            if (!itemId) return;
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/patron/items/${itemId}`, {
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.success) {
                    setItem(data.item);
                } else {
                    setError(data.error || 'Failed to load item details.');
                    showSnackbar(data.error || 'Failed to load item details.', 'error');
                }
            } catch (err) {
                console.error('Error fetching item:', err);
                setError('Failed to load item details due to network error.');
                showSnackbar('Network error when loading item details.', 'error');
            } finally {
                setLoading(false);
            }
        }
        fetchItem();
    }, [itemId]);

    useEffect(() => {
        async function checkWishlistStatus() {
            if (!itemId || !item) return;
            try {
                const response = await fetch('/api/patron/wishlist', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.success) {
                    const found = data.wishlist.some((w: any) => w.item_id === item.item_id);
                    setInWishlist(found);
                }
            } catch (err) {
                console.error('Failed to check wishlist status:', err);
            }
        }
        checkWishlistStatus();
    }, [item, itemId]);

    const handleBorrowRequest = async () => {
        if (!item) return;
        setBorrowing(true);
        setBorrowError(null);
        setBorrowSuccess(false);
        try {
            const response = await fetch('/api/patron/borrow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ item_id: item?.item_id }),
            });
            const data = await response.json();
            if (data.success) {
                setBorrowSuccess(true);
                setItem(prev => prev ? { ...prev, available_copies: prev.available_copies - 1 } : null);
                showSnackbar('Borrow request submitted successfully', 'success');
            } else {
                setBorrowError(data.message || 'Failed to borrow item');
                showSnackbar(data.message || 'Failed to borrow item', 'error');
            }
        } catch (err) {
            console.error('Error borrowing item:', err);
            setBorrowError('Failed to borrow item due to network error');
            showSnackbar('Network error while borrowing item', 'error');
        } finally {
            setBorrowing(false);
        }
    };


    const handleToggleWishlist = async () => {
        if (!item) return;
        // If already in wishlist, open confirm dialog before removing
        if (inWishlist) {
            setConfirmOpen(true);
            return;
        }
        setWishlistAdding(true);
        try {
            const response = await fetch('/api/patron/wishlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ item_id: item.item_id }),
            });
            const data = await response.json();
            if (data.success) {
                setInWishlist(true);
                showSnackbar('Item added to wishlist', 'success');
            } else {
                showSnackbar(data.message || 'Failed to add item to wishlist', 'error');
            }
        } catch (err) {
            console.error('Error adding to wishlist:', err);
            showSnackbar('Network error while adding item to wishlist', 'error');
        } finally {
            setWishlistAdding(false);
        }
    };

    const handleConfirmRemove = async () => {
        if (!item) {
            setConfirmOpen(false);
            return;
        }
        setConfirmLoading(true);
        try {
            const response = await fetch('/api/patron/wishlist', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ item_id: item.item_id }),
            });
            const data = await response.json();
            if (data.success) {
                setInWishlist(false);
                showSnackbar('Item removed from wishlist', 'success');
            } else {
                showSnackbar(data.message || 'Failed to remove item from wishlist', 'error');
            }
        } catch (err) {
            console.error('Error removing from wishlist:', err);
            showSnackbar('Network error while removing item from wishlist', 'error');
        } finally {
            setConfirmLoading(false);
            setConfirmOpen(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600 mt-4 text-lg">Loading item details...</p>
                </div>
            </div>
        );
    }
    if (error || !item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Error Loading Item</h3>
                    <p className="text-gray-500">{error || 'Item not found'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button
                        onClick={() => window.history.back()}
                        className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Collection
                    </button>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="md:flex">
                            {/* Item Image/Icon */}
                            <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-4 text-gray-400">{getItemTypeIcon(item.item_type)}</div>
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getItemTypeColor(
                                            item.item_type
                                        )}`}
                                    >
                                        {item.item_type.charAt(0).toUpperCase() + item.item_type.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Item Details */}
                            <div className="md:w-2/3 p-8">
                                <div className="mb-6">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title || 'Untitled'}</h1>
                                    <div className="flex items-center text-lg text-gray-600 mb-4">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        {item.author}
                                    </div>

                                    {/* Availability Status */}
                                    <div
                                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${item.available_copies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        <svg
                                            className={`w-4 h-4 mr-2 ${item.available_copies > 0 ? 'text-green-600' : 'text-red-600'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {item.available_copies > 0
                                            ? `${item.available_copies} of ${item.total_copies} copies available`
                                            : 'Currently unavailable'}
                                    </div>
                                </div>

                                {/* Description */}
                                {item.description && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                )}

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {item.year && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Year</h4>
                                            <p className="text-lg text-gray-900">{item.year}</p>
                                        </div>
                                    )}
                                    {item.genre && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Genre</h4>
                                            <p className="text-lg text-gray-900">{item.genre}</p>
                                        </div>
                                    )}
                                    {item.publisher && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Publisher</h4>
                                            <p className="text-lg text-gray-900">{item.publisher}</p>
                                        </div>
                                    )}
                                    {item.language && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Language</h4>
                                            <p className="text-lg text-gray-900">{item.language}</p>
                                        </div>
                                    )}
                                    {item.pages && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pages</h4>
                                            <p className="text-lg text-gray-900">{item.pages}</p>
                                        </div>
                                    )}
                                    {item.duration && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Duration</h4>
                                            <p className="text-lg text-gray-900">{item.duration} minutes</p>
                                        </div>
                                    )}
                                    {item.format && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Format</h4>
                                            <p className="text-lg text-gray-900">{item.format}</p>
                                        </div>
                                    )}
                                    {item.location && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Location</h4>
                                            <p className="text-lg text-gray-900">{item.location}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Subject and Keywords */}
                                {item.subject && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Subject</h4>
                                        <p className="text-lg text-gray-900">{item.subject}</p>
                                    </div>
                                )}
                                {item.keywords && (
                                    <div className="mb-8">
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Keywords</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.keywords.split(',').map((keyword, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                                                >
                                                    {keyword.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {item.available_copies > 0 ? (
                                        <button
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                                            onClick={() => setBorrowConfirmOpen(true)}
                                            disabled={borrowing}
                                        >
                                            {borrowing ? 'Requesting...' : 'Request Item'}
                                        </button>

                                    ) : (
                                        <button className="flex-1 bg-gray-400 text-white py-3 px-6 rounded-lg font-medium cursor-not-allowed">
                                            Item Unavailable
                                        </button>
                                    )}
                                    <button
                                        className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg
                    ${inWishlist
                                                ? 'bg-red-500 text-white hover:bg-red-600 border border-red-600'
                                                : 'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                                            }`}
                                        onClick={handleToggleWishlist}
                                        disabled={wishlistAdding}
                                    >
                                        {wishlistAdding
                                            ? inWishlist ? 'Removing...' : 'Adding...'
                                            : inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={borrowConfirmOpen}
                title="Confirm Borrow"
                message={`Do you want to borrow "${item?.title}"?`}
                confirmText="Confirm"
                cancelText="Cancel"
                variant="success"
                onConfirm={async () => {
                    setBorrowLoading(true);
                    try {
                        await handleBorrowRequest();
                    } finally {
                        setBorrowLoading(false);
                        setBorrowConfirmOpen(false);
                    }
                }}
                onCancel={() => setBorrowConfirmOpen(false)}
            />


            {/* Confirm dialog for Remove from Wishlist */}
            <ConfirmDialog
                open={confirmOpen}
                title="Remove from Wishlist?"
                message={`Are you sure you want to remove "${item?.title}" from your wishlist?`}
                confirmText="Remove"
                cancelText="Cancel"
                variant="danger"
                onConfirm={handleConfirmRemove}
                onCancel={() => {
                    setConfirmOpen(false);
                }}
            />

            {/* Snackbar */}
            <Snackbar
                message={snackbarMessage}
                type={snackbarType}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    );
}
// Helper functions
function getItemTypeIcon(itemType: string) {
    switch (itemType) {
        case 'book':
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                </svg>
            );
        case 'journal':
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'multimedia':
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            );
        case 'newspaper':
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            );
        case 'magazine':
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            );
        case 'thesis':
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'report':
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        default:
            return (
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
    }
}
function getItemTypeColor(itemType: string) {
    const colors: Record<string, string> = {
        book: 'bg-blue-100 text-blue-800',
        journal: 'bg-green-100 text-green-800',
        multimedia: 'bg-purple-100 text-purple-800',
        newspaper: 'bg-orange-100 text-orange-800',
        magazine: 'bg-pink-100 text-pink-800',
        thesis: 'bg-indigo-100 text-indigo-800',
        report: 'bg-gray-100 text-gray-800',
    };
    return colors[itemType] || 'bg-gray-100 text-gray-800';
}
