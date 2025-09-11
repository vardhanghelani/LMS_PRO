/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { useEffect, useState } from 'react';

interface LibraryItem {
    item_id: number;
    title: string;
    author: string;
    item_type: string;
    image_url?: string | null;
    location?: string | null;
    record_status?: string;
    genre?: string; // optional for genre badge (if you have)
}

interface WishlistEntry {
    id: number;
    user_id: number;
    book_id: number | null;
    item_id: number | null;
    created_at: string;
    library_items: LibraryItem | null;
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<WishlistEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<WishlistEntry | null>(null);

    // Fetch wishlist items on load
    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/patron/wishlist');
            const data = await res.json();
            if (data.success && Array.isArray(data.wishlist)) {
                setFavorites(data.wishlist);
            } else {
                setFavorites([]);
            }
        } catch (err) {
            console.error('Failed to fetch favorites', err);
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmRemove = async () => {
        if (!itemToRemove) {
            setConfirmOpen(false);
            setItemToRemove(null);
            return;
        }
        const itemId = itemToRemove.item_id;
        setConfirmOpen(false);
        setItemToRemove(null);
        try {
            const res = await fetch('/api/patron/wishlist', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item_id: itemId }),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                // Optimistically update UI by removing the item from local state
                setFavorites((prev) => prev.filter((fav) => fav.item_id !== itemId));
            } else {
                console.error('Failed to remove from wishlist:', data.error);
            }
        } catch (err) {
            console.error('Error removing from wishlist:', err);
        }
    };

    const promptRemoveFromWishlist = (entry: WishlistEntry) => {
        setItemToRemove(entry);
        setConfirmOpen(true);
    };

    const getGenreColor = (genre?: string) => {
        if (!genre) return 'bg-gray-100 text-gray-800 border-gray-200';
        const colors = {
            fiction: 'bg-blue-100 text-blue-800 border-blue-200',
            mystery: 'bg-purple-100 text-purple-800 border-purple-200',
            romance: 'bg-pink-100 text-pink-800 border-pink-200',
            fantasy: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            science: 'bg-green-100 text-green-800 border-green-200',
            history: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            biography: 'bg-orange-100 text-orange-800 border-orange-200',
        };
        const key = genre.toLowerCase();
        return colors[key as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-700 to-pink-700 bg-clip-text text-transparent">
                                Favorite Items
                            </h1>
                            <p className="text-slate-600 mt-2">Your personal collection of beloved items</p>
                        </div>
                    </div>
                    {!loading && favorites.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 inline-block">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-slate-500 text-sm font-medium">Total Favorites</p>
                                    <p className="text-3xl font-bold text-rose-600">{favorites.length}</p>
                                </div>
                                <div className="w-px h-12 bg-slate-300"></div>
                                <div className="text-center">
                                    <p className="text-slate-500 text-sm font-medium">Status</p>
                                    <div className="flex items-center justify-center gap-1 text-lg font-semibold text-rose-600">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Curated
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                                <div className="w-full h-48 bg-slate-300 rounded-xl mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-6 bg-slate-300 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-300 rounded w-1/2"></div>
                                    <div className="h-6 bg-slate-300 rounded w-16"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : favorites.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
                        <div className="w-24 h-24 mx-auto mb-6 bg-rose-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Favorites Yet</h3>
                        <p className="text-slate-500 text-lg mb-6">Start exploring our collection and add items to your favorites!</p>
                        <div className="flex items-center justify-center gap-2 text-rose-500">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-semibold">Happy Reading!</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favorites.map((entry, index) => {
                            const book = entry.library_items;
                            if (!book) return null;
                            return (
                                <div
                                    key={index}
                                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-rose-200 overflow-hidden"
                                >
                                    <div className="relative overflow-hidden">
                                        {book.image_url ? (
                                            <img
                                                src={book.image_url}
                                                alt={book.title}
                                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-56 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                                <svg
                                                    className="w-16 h-16 text-slate-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                                <svg
                                                    className="w-5 h-5 text-rose-500"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h2 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-rose-700 transition-colors">
                                                {book.title}
                                            </h2>
                                            <div className="flex items-center text-slate-600 mb-3">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-slate-400"
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
                                                <span className="text-sm font-medium">by {book.author}</span>
                                            </div>
                                            {book.genre && (
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-slate-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                                        />
                                                    </svg>
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getGenreColor(book.genre)}`}>
                                                        {book.genre}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => promptRemoveFromWishlist(entry)}
                                            className="mt-3 w-full py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
                                        >
                                            Remove from Wishlist
                                        </button>
                                        <ConfirmDialog
                                            open={confirmOpen}
                                            title="Remove from Wishlist?"
                                            message={`Are you sure you want to remove "${itemToRemove?.library_items?.title}" from your wishlist?`}
                                            confirmText="Remove"
                                            cancelText="Cancel"
                                            variant="danger"
                                            onConfirm={handleConfirmRemove}
                                            onCancel={() => {
                                                setConfirmOpen(false);
                                                setItemToRemove(null);
                                            }}
                                        />
                                        <div className="h-1 bg-gradient-to-r from-rose-500 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

const getGenreColor = (genre: string): string => {
    const colors = {
        fiction: 'bg-blue-100 text-blue-800 border-blue-200',
        mystery: 'bg-purple-100 text-purple-800 border-purple-200',
        romance: 'bg-pink-100 text-pink-800 border-pink-200',
        fantasy: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        science: 'bg-green-100 text-green-800 border-green-200',
        history: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        biography: 'bg-orange-100 text-orange-800 border-orange-200',
        default: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    const key = genre.toLowerCase();
    return colors[key as keyof typeof colors] || colors.default;
};
