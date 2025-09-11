/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface User {
    user_id: number;
    name: string;
    email: string;
    gender: string;
    birth_date: string | null;
    phone_number: string;
    role: string;
    address: string;
    status: string;
}

interface GenreCount {
    genre: string;
    count: number;
}

interface LibrarianAccountData {
    user: User;
    genresWithCount: GenreCount[];
}

export default function LibrarianAccountPage() {
    const [accountData, setAccountData] = useState<LibrarianAccountData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLibrarian = async () => {
            try {
                const res = await fetch('/api/librarian/account');
                const data = await res.json();

                if (res.ok) {
                    setAccountData(data);
                } else {
                    console.error('Error fetching librarian:', data.error);
                }
            } catch (err) {
                console.error('Network error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLibrarian();
    }, []);

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
        switch (status?.toLowerCase()) {
            case 'active':
                return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
            case 'inactive':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        }
    };

    const getRoleBadge = (role: string) => {
        const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
        switch (role?.toLowerCase()) {
            case 'librarian':
                return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
            case 'admin':
                return `${baseClasses} bg-purple-100 text-purple-800 border border-purple-200`;
            case 'head librarian':
                return `${baseClasses} bg-indigo-100 text-indigo-800 border border-indigo-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-center py-16">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                            <p className="text-gray-500 font-medium">Loading account details...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!accountData) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-16">
                        <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Librarian Not Found</h3>
                        <p className="text-gray-500">Unable to load librarian account details. Please try again later.</p>
                    </div>
                </div>
            </div>
        );
    }

    const { user, genresWithCount } = accountData;
    const totalItems = genresWithCount.reduce((total, genre) => total + genre.count, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Account Profile</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        View and manage your librarian account information
                    </p>
                </div>

                <Link
                    href="/librarian/account/edit"
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-6"
                >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                </Link>

                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-2xl font-bold text-blue-600">
                                        {user.name?.charAt(0)?.toUpperCase() || 'L'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-6">
                                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                                <p className="text-blue-100 text-lg">{user.email}</p>
                                <div className="flex items-center space-x-3 mt-3">
                                    <span className={getRoleBadge(user.role)}>
                                        {user.role}
                                    </span>
                                    <span className={getStatusBadge(user.status)}>
                                        {user.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Items</p>
                                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Genres Managed</p>
                                <p className="text-2xl font-bold text-gray-900">{genresWithCount.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">User ID</p>
                                <p className="text-2xl font-bold text-gray-900">#{user.user_id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Genres Section */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Genres Managed
                        </h3>
                    </div>

                    <div className="h-80 overflow-hidden">
                        <div className="sticky top-0 bg-gray-100 px-6 py-3 border-b border-gray-300">
                            <div className="flex justify-between items-center font-semibold text-gray-700">
                                <span className="text-base">Genre</span>
                                <span className="text-base">Item Count</span>
                            </div>
                        </div>

                        <div className="h-full overflow-y-auto px-6 py-2">
                            <div className="space-y-1">
                                {genresWithCount.map(({ genre, count }, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center py-3 px-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group border-b border-gray-100 last:border-b-0"
                                    >
                                        <span className="text-gray-800 font-medium group-hover:text-blue-900 transition-colors duration-200">
                                            {genre}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full text-sm min-w-[3rem] text-center group-hover:bg-blue-200 transition-colors duration-200">
                                                {count}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                            <span>Total Items Across All Genres</span>
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-bold">
                                {totalItems}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                        <p className="text-sm text-gray-500">Detailed information about your librarian account</p>
                    </div>
                    <div className="px-6 py-4">
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Full Name</dt>
                                <dd className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.name}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Email Address</dt>
                                <dd className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Role</dt>
                                <dd className="text-sm">
                                    <span className={getRoleBadge(user.role)}>{user.role}</span>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Account Status</dt>
                                <dd className="text-sm">
                                    <span className={getStatusBadge(user.status)}>{user.status}</span>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Gender</dt>
                                <dd className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md capitalize">{user.gender || 'Not specified'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Phone Number</dt>
                                <dd className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.phone_number || 'Not specified'}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Birth Date</dt>
                                <dd className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                                    {user.birth_date ? new Date(user.birth_date).toLocaleDateString() : 'Not specified'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 mb-1">Address</dt>
                                <dd className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{user.address || 'Not specified'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
