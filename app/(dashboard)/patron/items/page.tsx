'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Library, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import PatronItemsClient from '@/app/(dashboard)/patron/items/PatronItemsClient';
import { 
    staggerContainer, 
    staggerItem, 
    fadeIn,
    slideInFromTop
} from '@/app/lib/motion';

interface LibraryItem {
    item_id: number;
    title: string | null;
    author: string;
    isbn: string | null;
    year: number | null;
    genre: string | null;
    item_type: string;
    publisher: string | null;
    language: string | null;
    pages: number | null;
    duration: number | null;
    format: string | null;
    subject: string | null;
    keywords: string | null;
    description: string | null;
    location: string | null;
}

export default function PatronItemsPage() {
    const [items, setItems] = useState<LibraryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchItems() {
            setLoading(true);
            setError(null);
            try {
                // Fetch all items
                const res = await fetch('/api/patron/items?all=true', {
                    credentials: 'include'
                });
                const data = await res.json();

                if (data.success) {
                    setItems(data.items || []);
                } else {
                    console.error('Failed to load items:', data);
                    setError('Failed to load library items.');
                }
            } catch (err) {
                console.error('Error fetching items:', err);
                setError('Failed to load library items due to network error.');
            } finally {
                setLoading(false);
            }
        }

        fetchItems();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div 
                        className="w-20 h-20 nova-gradient rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <Library className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold font-heading text-[#1E293B] mb-2">Loading Library</h2>
                    <p className="text-[#1E293B]/70 text-lg">Discovering amazing content for you...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-200">
                        <AlertTriangle className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-[#1E293B] mb-2">Oops! Something went wrong</h3>
                    <p className="text-[#1E293B]/70 mb-6 text-lg">{error}</p>
                    <Button 
                        onClick={() => window.location.reload()} 
                        className="px-8 py-3 nova-gradient text-white rounded-xl font-medium transition-colors"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Try Again
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <PatronItemsClient
            allItems={items}
            error={error}
        />
    );
}
