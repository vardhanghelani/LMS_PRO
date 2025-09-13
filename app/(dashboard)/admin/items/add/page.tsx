'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    BookOpen, 
    ArrowLeft, 
    User, 
    Hash, 
    Tag, 
    FileText, 
    CheckCircle, 
    XCircle,
    AlertTriangle
} from 'lucide-react';

export default function AddNewItemPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            setError('Title is required');
            return false;
        }
        if (!formData.author.trim()) {
            setError('Author is required');
            return false;
        }
        if (!formData.isbn.trim()) {
            setError('ISBN is required');
            return false;
        }
        if (!formData.category.trim()) {
            setError('Category is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/admin/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title.trim(),
                    author: formData.author.trim(),
                    isbn: formData.isbn.trim(),
                    category: formData.category.trim(),
                    description: formData.description.trim()
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                // Reset form
                setFormData({
                    title: '',
                    author: '',
                    isbn: '',
                    category: '',
                    description: ''
                });
                // Redirect after 2 seconds
                setTimeout(() => {
                    router.push('/admin/items');
                }, 2000);
            } else {
                setError(data.message || 'Failed to add library item');
            }
        } catch (error) {
            console.error('Error adding library item:', error);
            setError('Failed to add library item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="p-8">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">Library Item Added Successfully!</h1>
                        <p className="text-slate-600 mb-6">
                            The new library item has been added to the system and is now available for management.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/admin/items"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                View Items
                            </Link>
                            <button
                                onClick={() => setSuccess(false)}
                                className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                            >
                                Add Another
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/items"
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-slate-600" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Add New Library Item</h1>
                                <p className="text-slate-600">Add a new book or resource to the library</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                    Title *
                                </label>
                                <div className="relative">
                                    <BookOpen className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Enter book title"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Author Field */}
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-slate-700 mb-2">
                                    Author *
                                </label>
                                <div className="relative">
                                    <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Enter author name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* ISBN Field */}
                            <div>
                                <label htmlFor="isbn" className="block text-sm font-medium text-slate-700 mb-2">
                                    ISBN *
                                </label>
                                <div className="relative">
                                    <Hash className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <input
                                        type="text"
                                        id="isbn"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Enter ISBN number"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category Field */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                    Category *
                                </label>
                                <div className="relative">
                                    <Tag className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        placeholder="Enter category (e.g., Fiction, Science, History)"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                    Description
                                </label>
                                <div className="relative">
                                    <FileText className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                        placeholder="Enter book description (optional)"
                                    />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                                >
                                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-4">
                                <Link
                                    href="/admin/items"
                                    className="flex-1 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-center"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Adding...
                                        </>
                                    ) : (
                                        <>
                                            <BookOpen className="w-5 h-5" />
                                            Add Item
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
