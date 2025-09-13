import React, { useEffect } from 'react';

interface SnackbarProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    open: boolean;
    onClose: () => void;
    duration?: number; // ms to auto close
}

export default function Snackbar({
    message,
    type = 'info',
    open,
    onClose,
    duration = 5000, // Increased default duration to 5 seconds
}: SnackbarProps) {
    useEffect(() => {
        if (!open) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [open, duration, onClose]);

    if (!open) return null;

    const getSnackbarConfig = () => {
        switch (type) {
            case 'success':
                return {
                    backgroundColor: 'bg-green-600',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ),
                };
            case 'error':
                return {
                    backgroundColor: 'bg-red-600',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                };
            default:
                return {
                    backgroundColor: 'bg-blue-600',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                };
        }
    };

    const { backgroundColor, icon } = getSnackbarConfig();

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl text-white font-medium ${backgroundColor} animate-in slide-in-from-bottom-2 fade-in-0 duration-300 max-w-sm`}
            role="alert"
            aria-live="assertive"
        >
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div className="flex-grow text-sm leading-relaxed">
                {message}
            </div>
            <button
                onClick={onClose}
                className="flex-shrink-0 ml-2 opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Close notification"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}
