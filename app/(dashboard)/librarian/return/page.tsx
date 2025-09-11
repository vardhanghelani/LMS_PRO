/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';

export default function ReturnPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReturnedItems() {
            try {
                const res = await fetch('/api/librarian/return');
                const result = await res.json();
                if (result?.data) {
                    setItems(result.data);
                } else {
                    console.error('No data returned');
                }
            } catch (error) {
                console.error('Error fetching returned items:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchReturnedItems();
    }, []);

    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status?.toLowerCase()) {
            case 'returned':
                return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
            case 'overdue':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
            case 'damaged':
                return `${baseClasses} bg-orange-100 text-orange-800 border border-orange-200`;
            case 'lost':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        }
    };

    const getItemTypeIcon = (itemType: string) => {
        switch (itemType?.toLowerCase()) {
            case 'book':
                return (
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                    </svg>
                );
            case 'journal':
                return (
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            case 'report':
                return (
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            default:
                return (
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                    </svg>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Returned Items</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Track and manage item returns from library users
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                                <span className="text-sm font-medium text-gray-500">Total Returns</span>
                                <div className="text-2xl font-bold text-gray-900">{items.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
                                <p className="text-gray-500 font-medium">Loading returned items...</p>
                            </div>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Returned Items</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                There are no item returns recorded at the moment. Check back later or refresh the page.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Item Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Requested By
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Approved By
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Dates
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.map((item: any, index: number) => (
                                        <tr key={item.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        {getItemTypeIcon(item.library_items?.item_type)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-gray-900">
                                                            {item.library_items?.title || 'Unknown Title'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            by {item.library_items?.author || 'Unknown Author'}
                                                        </div>
                                                        <div className="text-xs text-gray-400 capitalize">
                                                            {item.library_items?.item_type || 'Unknown Type'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 bg-blue-200 rounded-full flex items-center justify-center">
                                                        <span className="text-xs font-medium text-blue-700">
                                                            {item.users_item_tran_history_requested_byTousers?.name?.charAt(0)?.toUpperCase() || '?'}
                                                        </span>
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {item.users_item_tran_history_requested_byTousers?.name || '—'}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {item.users_item_tran_history_requested_byTousers?.email || ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {item.users_item_tran_history_approved_byTousers?.name ? (
                                                        <>
                                                            <div className="flex-shrink-0 h-8 w-8 bg-purple-200 rounded-full flex items-center justify-center">
                                                                <span className="text-xs font-medium text-purple-700">
                                                                    {item.users_item_tran_history_approved_byTousers.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {item.users_item_tran_history_approved_byTousers.name}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {item.users_item_tran_history_approved_byTousers.email}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-sm font-medium text-gray-500">
                                                                    Not Assigned
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="space-y-1">
                                                    {item.date_issued && (
                                                        <div className="text-xs">
                                                            <span className="font-medium text-gray-500">Issued:</span> {new Date(item.date_issued).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                    {item.date_due && (
                                                        <div className="text-xs">
                                                            <span className="font-medium text-gray-500">Due:</span> {new Date(item.date_due).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                    {item.date_returned && (
                                                        <div className="text-xs">
                                                            <span className="font-medium text-gray-500">Returned:</span> {new Date(item.date_returned).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="space-y-2">
                                                    <span className={getStatusBadge(item.status)}>
                                                        {item.status?.charAt(0)?.toUpperCase() + item.status?.slice(1)?.toLowerCase() || 'Unknown'}
                                                    </span>
                                                    {item.remarks && item.remarks.includes('fine') && (
                                                        <div className="text-xs text-red-600 font-medium">
                                                            Fine Applied
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}