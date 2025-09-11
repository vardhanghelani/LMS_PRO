'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type User = {
    user_id: number;
    name: string | null;
    email: string | null;
    status: 'active' | 'inactive' | null;
    created_at: string;
};

export default function PatronsPage() {
    const [patrons, setPatrons] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatrons = async () => {
            try {
                const res = await fetch('/api/admin/patrons');
                const data = await res.json();
                if (data.success) setPatrons(data.patrons);
            } catch (err) {
                console.error('Error fetching patrons:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPatrons();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
                                Patrons
                            </h1>
                            <p className="text-slate-600 mt-1">Library members and book enthusiasts</p>
                        </div>
                    </div>

                    {!loading && patrons.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200 mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Total Patrons</p>
                                    <p className="text-3xl font-bold text-slate-800">{patrons.length}</p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Active Members</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {patrons.filter((user) => user.status === 'active').length}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-slate-500 text-sm font-medium">Inactive Members</p>
                                    <p className="text-3xl font-bold text-red-500">
                                        {patrons.filter((user) => user.status === 'inactive').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                                aria-hidden="true"
                            >
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
                ) : patrons.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
                        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-slate-400"
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
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Patrons Found</h3>
                        <p className="text-slate-500 text-lg">Welcome new library members to start building your community.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {patrons.map((user) => (
                            <Link
                                key={user.user_id}
                                href={`/admin/patrons/${user.user_id}`}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-teal-200 overflow-hidden cursor-pointer focus:outline-teal-500 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 block"
                                tabIndex={0}
                                aria-label={`View details of patron ${user.name}`}
                            >
                                <div className="p-6">
                                    {/* User Avatar and Info */}
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'P'}
                                            </div>
                                            <div
                                                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}
                                            ></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-xl font-bold text-slate-800 truncate group-hover:text-teal-700 transition-colors">
                                                {user.name}
                                            </h2>
                                            <p className="text-sm text-slate-600 truncate mt-1">{user.email}</p>
                                        </div>
                                    </div>

                                    {/* Status and Date */}
                                    <div className="flex justify-between items-center">
                                        <span
                                            className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold shadow-sm ${user.status === 'active'
                                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                                    : 'bg-red-100 text-red-800 border border-red-200'
                                                }`}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full mr-2 ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}
                                            ></div>
                                            {user.status}
                                        </span>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 font-medium">Member Since</p>
                                            <p className="text-sm text-slate-700 font-semibold">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Hover effect bottom border */}
                                <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
