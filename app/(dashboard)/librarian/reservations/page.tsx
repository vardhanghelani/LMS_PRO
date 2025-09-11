/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import Snackbar from '@/app/components/Snackbar';


export default function ReservationsPage() {
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // For confirmation dialogs
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | null>(null);
    const [selectedReservation, setSelectedReservation] = useState<any>(null);

    // For return approval with fines
    const [showFineForm, setShowFineForm] = useState(false);
    const [additionalFineAmount, setAdditionalFineAmount] = useState('');
    const [bookConditionRemarks, setBookConditionRemarks] = useState('');

    // For rejection remarks
    const [rejectionRemarks, setRejectionRemarks] = useState('');

    // Snackbar state
    const [snackbar, setSnackbar] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);

    const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setSnackbar({ message, type });
    };

    // Fetch requests
    async function fetchReservations() {
        setLoading(true);
        try {
            const res = await fetch('/api/librarian/reservation');
            const result = await res.json();
            if (result?.requests) {
                setReservations(result.requests);
            } else {
                console.error('No data returned');
                setReservations([]);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
            setReservations([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, []);

    // Status badge styles
    const getStatusBadge = (status: string) => {
        const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status?.toLowerCase()) {
            case 'pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`;
            case 'issued':
                return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
            case 'returned':
                return `${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`;
            case 'rejected':
                return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
        }
    };

    // Open confirm dialog
    const openConfirmDialog = (reservation: any, action: 'approve' | 'reject') => {
        // Don't allow actions on rejected requests
        if (reservation.status === 'rejected') {
            showSnackbar('This request has already been rejected and cannot be modified.', 'error');
            return;
        }

        setSelectedReservation(reservation);
        setConfirmAction(action);

        // Reset fine form when opening
        if (action === 'approve' && reservation.status === 'returned') {
            setShowFineForm(true);
            setAdditionalFineAmount('');
            setBookConditionRemarks('');
        } else {
            setShowFineForm(false);
        }

        // Reset rejection remarks
        if (action === 'reject') {
            setRejectionRemarks('');
        }

        setConfirmOpen(true);
    };

    // Handle approve or reject after confirmation
    const handleConfirm = async () => {
        if (!selectedReservation || !confirmAction) {
            setConfirmOpen(false);
            return;
        }

        // Double-check that we're not processing a rejected request
        if (selectedReservation.status === 'rejected') {
            showSnackbar('This request has already been rejected and cannot be modified.', 'error');
            setConfirmOpen(false);
            return;
        }

        const method = confirmAction === 'approve' ? 'POST' : 'DELETE';

        // Determine request type ('issue' or 'return') - updated from 'borrow'
        let requestType: 'issue' | 'return' = 'issue';
        if (selectedReservation.status === 'returned' || selectedReservation.type === 'return') {
            requestType = 'return';
        }

        try {
            const requestBody: any = {
                borrowHistoryId: selectedReservation.id,
                type: requestType,
                remarks: selectedReservation.remarks || '',
            };

            // Add fine information for return approvals
            if (confirmAction === 'approve' && requestType === 'return' && showFineForm) {
                if (additionalFineAmount && parseFloat(additionalFineAmount) > 0) {
                    requestBody.additionalFineAmount = parseFloat(additionalFineAmount);
                    requestBody.bookConditionRemarks = bookConditionRemarks;
                }
            }

            // Add rejection remarks for rejections
            if (confirmAction === 'reject' && rejectionRemarks.trim()) {
                requestBody.remarks = rejectionRemarks.trim();
            }

            const res = await fetch('/api/librarian/reservation', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                showSnackbar(`Request ${confirmAction}d successfully!`, 'success');
                fetchReservations(); // refresh request list after action
            } else {
                showSnackbar(data.message || `Failed to ${confirmAction} request`, 'error');
            }
        } catch (error) {
            console.error('Error in handleConfirm:', error);
            showSnackbar(`Failed to ${confirmAction} request`, 'error');
        } finally {
            setConfirmOpen(false);
            setSelectedReservation(null);
            setConfirmAction(null);
            setShowFineForm(false);
            setAdditionalFineAmount('');
            setBookConditionRemarks('');
            setRejectionRemarks('');
        }
    };

    // Calculate days late for return requests
    const getDaysLate = (dateDue: string | Date) => {
        if (!dateDue) return 0;
        const due = new Date(dateDue);
        const today = new Date();
        const diffTime = today.getTime() - due.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    };

    // Calculate potential fine for late returns
    const getPotentialFine = (dateDue: string | Date) => {
        const daysLate = getDaysLate(dateDue);
        return daysLate * 5; // $5 per day
    };

    // Determine request type
    const getRequestType = (reservation: any) => {
        // Add null/undefined check to prevent runtime errors
        if (!reservation || !reservation.status) {
            return 'unknown';
        }

        if (reservation.status === 'returned') {
            return 'return';
        } else if (reservation.status === 'pending') {
            return 'issue';
        } else if (reservation.status === 'rejected') {
            // For rejected items, we need to determine the original request type
            // based on the remarks or other context
            if (reservation.remarks && reservation.remarks.toLowerCase().includes('return request rejected')) {
                return 'return';
            } else if (reservation.remarks && reservation.remarks.toLowerCase().includes('issue request rejected')) {
                return 'issue';
            }
            // Fallback to checking for just 'return' or 'issue' in case of legacy data
            if (reservation.remarks && reservation.remarks.toLowerCase().includes('return')) {
                return 'return';
            } else if (reservation.remarks && reservation.remarks.toLowerCase().includes('issue')) {
                return 'issue';
            }
            // Default to unknown if we can't determine
            return 'unknown';
        }
        return 'unknown';
    };

    // Get request type display text
    const getRequestTypeDisplay = (reservation: any) => {
        const type = getRequestType(reservation);
        switch (type) {
            case 'return':
                return reservation.status === 'rejected' ? 'Return Rejected' : 'Return Request';
            case 'issue':
                return reservation.status === 'rejected' ? 'Issue Rejected' : 'Issue Request';
            default:
                return 'Unknown Request';
        }
    };

    // Check if request can be rejected (only issue requests)
    const canBeRejected = (reservation: any) => {
        return reservation.status === 'pending' && getRequestType(reservation) === 'issue';
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Book Requests & Returns</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Manage book issue requests and return approvals from library users
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                                <span className="text-sm font-medium text-gray-500">Total Requests</span>
                                <div className="text-2xl font-bold text-gray-900">{reservations.length}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-600"></div>
                                <p className="text-gray-500 font-medium">Loading requests...</p>
                            </div>
                        </div>
                    ) : reservations.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m8-14v10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Requests</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                There are no book issue requests or return approvals pending at the moment. Check back later or refresh the page.
                            </p>
                        </div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Request Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Book Title</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Requested By</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reservations.map((item, index) => (
                                    <tr key={item.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${getRequestType(item) === 'return'
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-green-100 text-green-600'
                                                    }`}>
                                                    {getRequestType(item) === 'return' ? (
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{getRequestTypeDisplay(item)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m8-14v10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900">{item.books?.title || 'Unknown Title'}</div>
                                                    <div className="text-sm text-gray-500">{item.books?.author || 'Unknown Author'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-indigo-200 rounded-full flex items-center justify-center">
                                                    <span className="text-xs font-medium text-indigo-700">{item.users_book_tran_history_requested_byTousers?.name?.charAt(0)?.toUpperCase() || '?'}</span>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{item.users_book_tran_history_requested_byTousers?.name || '—'}</div>
                                                    <div className="text-sm text-gray-500">{item.requested_at ? new Date(item.requested_at).toLocaleDateString() : '—'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={getStatusBadge(item.status)}>
                                                {item.status?.charAt(0)?.toUpperCase() + item.status?.slice(1)?.toLowerCase() || 'Unknown'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.status === 'returned' && (
                                                <div className="text-sm text-gray-600">
                                                    {item.date_due && (
                                                        <div className="mb-1">
                                                            <span className="font-medium">Due:</span> {new Date(item.date_due).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                    {item.date_due && (
                                                        <div className="mb-1">
                                                            <span className="font-medium">Days Late:</span> {getDaysLate(item.date_due)}
                                                        </div>
                                                    )}
                                                    {item.date_due && getPotentialFine(item.date_due) > 0 && (
                                                        <div className="text-red-600 font-medium">
                                                            <span className="font-medium">Potential Fine:</span> ${getPotentialFine(item.date_due)}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {item.status === 'pending' && (
                                                <div className="text-sm text-gray-600">
                                                    {item.date_due && (
                                                        <div>
                                                            <span className="font-medium">Due:</span> {new Date(item.date_due).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {item.status === 'rejected' && (
                                                <div className="text-sm text-gray-600">
                                                    <div className="text-red-600 font-medium mb-1">
                                                        <span className="font-medium">Rejected</span>
                                                    </div>
                                                    {item.remarks && (
                                                        <div className="text-gray-600">
                                                            <span className="font-medium">Reason:</span> {item.remarks}
                                                        </div>
                                                    )}
                                                    {item.approved_at && (
                                                        <div className="text-gray-500 text-xs">
                                                            Rejected on: {new Date(item.approved_at).toLocaleDateString()}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            {/* Approve Button - Always show for pending and returned requests */}
                                            <button
                                                disabled={item.status !== 'pending' && item.status !== 'returned'}
                                                onClick={() => openConfirmDialog(item, 'approve')}
                                                className="px-3 py-1 rounded bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
                                            >
                                                {getRequestType(item) === 'return' ? 'Process Return' : 'Approve'}
                                            </button>

                                            {/* Reject Button - Only show for issue requests (pending status) */}
                                            {canBeRejected(item) && (
                                                <button
                                                    onClick={() => openConfirmDialog(item, 'reject')}
                                                    className="px-3 py-1 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Confirm Dialog for Approve/Reject */}
            <ConfirmDialog
                open={confirmOpen}
                title={
                    confirmAction === 'approve'
                        ? (getRequestType(selectedReservation) === 'return' ? 'Process Return?' : 'Approve Request?')
                        : 'Reject Request?'
                }
                message={
                    confirmAction === 'approve'
                        ? `Are you sure you want to ${getRequestType(selectedReservation) === 'return' ? 'process the return' : 'approve the issue'} for "${selectedReservation?.books?.title || ''}"?`
                        : `Are you sure you want to reject the ${getRequestType(selectedReservation)} for "${selectedReservation?.books?.title || ''}"?`
                }
                confirmText={
                    confirmAction === 'approve'
                        ? (getRequestType(selectedReservation) === 'return' ? 'Process Return' : 'Approve')
                        : 'Reject'
                }
                cancelText="Cancel"
                variant={confirmAction === 'approve' ? 'success' : 'danger'}
                onConfirm={handleConfirm}
                onCancel={() => {
                    setConfirmOpen(false);
                    setSelectedReservation(null);
                    setConfirmAction(null);
                    setShowFineForm(false);
                    setAdditionalFineAmount('');
                    setBookConditionRemarks('');
                    setRejectionRemarks('');
                }}
            >
                {/* Enhanced Fine Form for Return Approvals - Fixed Scrolling */}
                {showFineForm && confirmAction === 'approve' && selectedReservation?.status === 'returned' && (
                    <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl shadow-sm">
                        <div className="max-h-96 overflow-y-auto p-5">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-blue-900">Return Processing & Fine Assessment</h4>
                            </div>

                            {/* Book Return Summary */}
                            <div className="mb-4 p-4 bg-white border border-blue-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Book Title:</span>
                                    <span className="text-sm font-semibold text-gray-900">{selectedReservation?.books?.title}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Returned By:</span>
                                    <span className="text-sm font-semibold text-gray-900">{selectedReservation?.users_book_tran_history_requested_byTousers?.name}</span>
                                </div>
                                {selectedReservation?.date_due && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">Original Due Date:</span>
                                        <span className="text-sm font-semibold text-gray-900">{new Date(selectedReservation.date_due).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Late Return Fine Info */}
                            {selectedReservation?.date_due && getPotentialFine(selectedReservation.date_due) > 0 && (
                                <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <svg className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-semibold text-red-800">Late Return Detected</span>
                                    </div>
                                    <div className="text-sm text-red-700 space-y-1">
                                        <div><span className="font-medium">Days Overdue:</span> {getDaysLate(selectedReservation.date_due)} days</div>
                                        <div><span className="font-medium">Late Fee:</span> ${getPotentialFine(selectedReservation.date_due)} (${5}/day)</div>
                                    </div>
                                </div>
                            )}

                            {selectedReservation?.date_due && getPotentialFine(selectedReservation.date_due) === 0 && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm font-medium text-green-800">Returned on time - No late fees</span>
                                    </div>
                                </div>
                            )}

                            {/* Additional Fine for Book Condition */}
                            <div className="space-y-4">
                                <div className="border-t border-blue-200 pt-4">
                                    <h5 className="text-md font-medium text-blue-800 mb-3">Book Condition Assessment</h5>

                                    <div className="mb-3">
                                        <label className="block text-sm font-medium text-blue-700 mb-2">
                                            Additional Fine for Damage/Poor Condition
                                        </label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600 font-medium text-base">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={additionalFineAmount}
                                                onChange={(e) => setAdditionalFineAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="block w-full pl-8 pr-3 py-2.5 border-2 border-blue-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-500"
                                            />
                                        </div>
                                        <p className="mt-1.5 text-xs text-blue-600">
                                            Enter amount only if book shows damage, missing pages, or poor condition
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-blue-700 mb-2">
                                            Book Condition Notes
                                        </label>
                                        <textarea
                                            value={bookConditionRemarks}
                                            onChange={(e) => setBookConditionRemarks(e.target.value)}
                                            placeholder="Describe book condition, any damage, missing pages, excessive wear..."
                                            rows={3}
                                            className="block w-full px-3 py-2.5 border-2 border-blue-300 rounded-lg text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none placeholder-gray-500"
                                        />
                                    </div>
                                </div>

                                {/* Total Fine Summary */}
                                <div className="border-t border-blue-200 pt-4">
                                    <div className="p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
                                        <h5 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                                            <svg className="h-5 w-5 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            Fine Summary
                                        </h5>
                                        <div className="text-sm text-gray-700 space-y-2">
                                            {selectedReservation?.date_due && (
                                                <div className="flex justify-between items-center py-1">
                                                    <span className="flex items-center">
                                                        <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Late Return Fine:
                                                    </span>
                                                    <span className="font-semibold">${getPotentialFine(selectedReservation.date_due)}</span>
                                                </div>
                                            )}
                                            {additionalFineAmount && parseFloat(additionalFineAmount) > 0 && (
                                                <div className="flex justify-between items-center py-1">
                                                    <span className="flex items-center">
                                                        <svg className="h-4 w-4 text-orange-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                        </svg>
                                                        Book Damage Fine:
                                                    </span>
                                                    <span className="font-semibold">${parseFloat(additionalFineAmount).toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center pt-2 mt-3 border-t border-gray-200">
                                                <span className="font-semibold text-gray-900">Total Fine Amount:</span>
                                                <span className="font-bold text-lg text-blue-600">
                                                    ${selectedReservation?.date_due ?
                                                        (getPotentialFine(selectedReservation.date_due) + (additionalFineAmount ? parseFloat(additionalFineAmount) : 0)).toFixed(2)
                                                        : (additionalFineAmount ? parseFloat(additionalFineAmount) : 0).toFixed(2)
                                                    }
                                                </span>
                                            </div>
                                            {selectedReservation?.date_due && (getPotentialFine(selectedReservation.date_due) + (additionalFineAmount ? parseFloat(additionalFineAmount) : 0)) === 0 && (
                                                <div className="text-center py-2">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        No fines applicable
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rejection Remarks Form - Fixed Scrolling */}
                {confirmAction === 'reject' && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="max-h-60 overflow-y-auto p-4">
                            <h4 className="text-sm font-medium text-red-800 mb-3">Rejection Reason</h4>
                            <div>
                                <label className="block text-sm font-medium text-red-700 mb-1">
                                    Reason for Rejection (Optional but Recommended)
                                </label>
                                <textarea
                                    value={rejectionRemarks}
                                    onChange={(e) => setRejectionRemarks(e.target.value)}
                                    placeholder="Please provide a reason for rejection..."
                                    rows={3}
                                    className="block w-full px-3 py-2 border border-red-300 rounded-md text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white placeholder-gray-500 resize-none"
                                />
                                <p className="mt-1 text-xs text-red-600">
                                    Providing a reason helps users understand why their request was rejected
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </ConfirmDialog>

            {/* Snackbar for feedback */}
            <Snackbar
                open={!!snackbar}
                message={snackbar?.message || ''}
                type={snackbar?.type}
                onClose={() => setSnackbar(null)}
            />
        </div>
    );
}