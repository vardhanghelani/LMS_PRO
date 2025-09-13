'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    Save, 
    BookOpen, 
    User, 
    Hash, 
    Calendar, 
    Tag, 
    FileText, 
    MapPin, 
    Globe, 
    Clock, 
    FileType, 
    BookOpenCheck,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';
import Link from 'next/link';

interface Item {
    id: string;
    title: string;
    author: string;
    isbn: string | null;
    year: number | null;
    genre: string | null;
    item_type: string | null;
    location: string | null;
    publisher: string | null;
    language: string | null;
    pages: number | null;
    duration: number | null;
    format: string | null;
    subject: string | null;
    keywords: string | null;
    description: string | null;
    image_url: string | null;
}

const itemTypes = [
    { value: 'book', label: 'Book' },
    { value: 'ebook', label: 'E-Book' },
    { value: 'audiobook', label: 'Audiobook' },
    { value: 'magazine', label: 'Magazine' },
    { value: 'journal', label: 'Journal' },
    { value: 'newspaper', label: 'Newspaper' },
    { value: 'other', label: 'Other' },
];

export default function EditItemPage() {
    const { id } = useParams();
    const router = useRouter();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        year: '',
        genre: '',
        item_type: 'book',
        location: '',
        publisher: '',
        language: '',
        pages: '',
        duration: '',
        format: '',
        subject: '',
        keywords: '',
        description: '',
        image_url: ''
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/admin/items/${id}`);
                const data = await res.json();
                
                if (data.success && data.item) {
                    setItem(data.item);
                    setFormData({
                        title: data.item.title || '',
                        author: data.item.author || '',
                        isbn: data.item.isbn || '',
                        year: data.item.year?.toString() || '',
                        genre: data.item.genre || '',
                        item_type: data.item.item_type || 'book',
                        location: data.item.location || '',
                        publisher: data.item.publisher || '',
                        language: data.item.language || '',
                        pages: data.item.pages?.toString() || '',
                        duration: data.item.duration?.toString() || '',
                        format: data.item.format || '',
                        subject: data.item.subject || '',
                        keywords: data.item.keywords || '',
                        description: data.item.description || '',
                        image_url: data.item.image_url || ''
                    });
                } else {
                    setError(data.message || 'Failed to fetch item details');
                }
            } catch (err) {
                setError('Failed to fetch item details');
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.author.trim()) {
            setError('Title and author are required');
            return;
        }

        setSaving(true);
        setError(null);

        try {
            const response = await fetch(`/api/admin/items/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title.trim(),
                    author: formData.author.trim(),
                    isbn: formData.isbn.trim() || null,
                    year: formData.year ? parseInt(formData.year) : null,
                    genre: formData.genre.trim() || null,
                    item_type: formData.item_type,
                    location: formData.location.trim() || null,
                    publisher: formData.publisher.trim() || null,
                    language: formData.language.trim() || null,
                    pages: formData.pages ? parseInt(formData.pages) : null,
                    duration: formData.duration ? parseInt(formData.duration) : null,
                    format: formData.format.trim() || null,
                    subject: formData.subject.trim() || null,
                    keywords: formData.keywords.trim() || null,
                    description: formData.description.trim() || null,
                    image_url: formData.image_url.trim() || null
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/admin/items');
                }, 2000);
            } else {
                setError(data.message || 'Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
            setError('Failed to update item. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-300 text-lg">Loading item details...</p>
                </div>
            </div>
        );
    }

    if (error && !item) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-red-400 text-lg mb-4">{error}</p>
                    <Link 
                        href="/admin/items"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Items
                    </Link>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Item Updated Successfully!</h2>
                    <p className="text-slate-300 mb-4">Redirecting to items list...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <Link 
                        href="/admin/items"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Items
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Edit Item</h1>
                            <p className="text-slate-400">Update item information and details</p>
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <p className="text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Basic Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-400" />
                                Basic Information
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Title *
                                    </label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter item title"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Author */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Author *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter author name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* ISBN */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        ISBN
                                    </label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="isbn"
                                            value={formData.isbn}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter ISBN"
                                        />
                                    </div>
                                </div>

                                {/* Year */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Publication Year
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="number"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter publication year"
                                            min="1000"
                                            max="2100"
                                        />
                                    </div>
                                </div>

                                {/* Genre */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Genre
                                    </label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="genre"
                                            value={formData.genre}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter genre"
                                        />
                                    </div>
                                </div>

                                {/* Item Type */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Item Type
                                    </label>
                                    <select
                                        name="item_type"
                                        value={formData.item_type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    >
                                        {itemTypes.map(type => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-400" />
                                Additional Details
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter location"
                                        />
                                    </div>
                                </div>

                                {/* Publisher */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Publisher
                                    </label>
                                    <div className="relative">
                                        <BookOpenCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="publisher"
                                            value={formData.publisher}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter publisher"
                                        />
                                    </div>
                                </div>

                                {/* Language */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Language
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="language"
                                            value={formData.language}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter language"
                                        />
                                    </div>
                                </div>

                                {/* Pages */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Pages
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="number"
                                            name="pages"
                                            value={formData.pages}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter number of pages"
                                            min="1"
                                        />
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Duration (minutes)
                                    </label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="number"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter duration in minutes"
                                            min="1"
                                        />
                                    </div>
                                </div>

                                {/* Format */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                        Format
                                    </label>
                                    <div className="relative">
                                        <FileType className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            name="format"
                                            value={formData.format}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            placeholder="Enter format"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-400" />
                                Content Information
                            </h3>
                            
                            {/* Subject */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="Enter subject"
                                />
                            </div>

                            {/* Keywords */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                    Keywords
                                </label>
                                <input
                                    type="text"
                                    name="keywords"
                                    value={formData.keywords}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="Enter keywords (comma-separated)"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                                    Cover Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="Enter cover image URL"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Update Item
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
