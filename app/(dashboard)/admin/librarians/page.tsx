'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

    useEffect(() => {
        const fetchLibrarians = async () => {
            try {
                const res = await fetch('/api/admin/librarians');
                const data = await res.json();
                if (data.success) setLibrarians(data.librarians);
            } catch (err) {
                console.error('Error fetching librarians:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLibrarians();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">Librarians</h1>
                                <p className="text-slate-600 mt-1">Manage your library staff members</p>
                            </div>
                        </div>
                        
                        {/* Add New Librarian Button */}
                        <Link 
                            href="/admin/librarians/addnewlibrarian"
                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Librarian
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                    </div>

                    {!loading && librarians.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Total Librarians</p>
                                    <p className="text-3xl font-bold text-slate-800">{librarians.length}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Active Members</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {librarians.filter(user => user.status === 'active').length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Inactive Members</p>
                                    <p className="text-3xl font-bold text-red-500">
                                        {librarians.filter(user => user.status === 'inactive').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-16 h-16 bg-slate-300 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-slate-300 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-slate-300 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-slate-300 rounded-full w-16"></div>
                                    <div className="h-3 bg-slate-300 rounded w-20"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : librarians.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
                        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Librarians Found</h3>
                        <p className="text-slate-500 text-lg mb-6">Start by adding library staff members to manage your collection.</p>
                        <Link 
                            href="/admin/librarians/add"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Your First Librarian
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {librarians.map((user) => (
                            <Link
                                key={user.user_id}
                                href={`/admin/librarians/${user.user_id}`}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-teal-200 overflow-hidden cursor-pointer focus:outline-teal-500 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 block"
                                tabIndex={0}
                                aria-label={`View details of librarian ${user.name}`}
                            >
                                <div className="p-6">
                                    {/* User Avatar and Info */}
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'L'}
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                                }`}></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-xl font-bold text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
                                                {user.name}
                                            </h2>
                                            <p className="text-sm text-slate-600 truncate mt-1">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Status and Date */}
                                    <div className="flex justify-between items-center">
                                        <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold shadow-sm ${user.status === 'active'
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-red-100 text-red-800 border border-red-200'
                                            }`}>
                                            <div className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                                }`}></div>
                                            {user.status}
                                        </span>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 font-medium">Joined</p>
                                            <p className="text-sm text-slate-700 font-semibold">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover effect bottom border */}
                                <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}