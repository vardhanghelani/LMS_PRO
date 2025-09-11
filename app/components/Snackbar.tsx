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
    duration = 3000,
}: SnackbarProps) {
    useEffect(() => {
        if (!open) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [open, duration, onClose]);

    if (!open) return null;

    const backgroundColor = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600',
    }[type];

    return (
        <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white font-semibold ${backgroundColor} select-none`}
            role="alert"
            aria-live="assertive"
        >
            {message}
        </div>
    );
}
