import { useEffect } from "react";

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'danger',
    children
}: {
    open: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'warning' | 'info' | 'success';
    children?: React.ReactNode;
}) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCancel();
        };
        if (open) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onCancel, open]);

    if (!open) return null;

    const variantStyles = {
        danger: {
            icon: '⚠️',
            confirmBtn: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600'
        },
        warning: {
            icon: '⚡',
            confirmBtn: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600'
        },
        info: {
            icon: 'ℹ️',
            confirmBtn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        success: {
            icon: '✅',
            confirmBtn: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600'
        }
    };

    const currentVariant = variantStyles[variant];

    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={onCancel}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with icon */}
                <div className="flex flex-col items-center pt-8 pb-4 px-6">
                    <div className={`w-16 h-16 rounded-full ${currentVariant.iconBg} flex items-center justify-center mb-4 shadow-sm`}>
                        <span className="text-2xl">{currentVariant.icon}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                        {title || 'Confirm Action'}
                    </h2>
                </div>

                {/* Message */}
                <div className="px-6 pb-6">
                    <p className="text-gray-600 text-center leading-relaxed">
                        {message || 'Are you sure you want to proceed? This action cannot be undone.'}
                    </p>
                    
                    {/* Children content */}
                    {children && (
                        <div className="mt-4">
                            {children}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-6 pt-0">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`flex-1 px-6 py-3 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${currentVariant.confirmBtn}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}