'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { AppShell } from '@/app/components/shell/AppShell';
import { Button } from '@/app/components/ui/button';
import PatronItemsClient from '@/app/(dashboard)/patron/items/PatronItemsClient';

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
            <AppShell userRole="patron" userName="Patron User" userEmail="patron@nova.com">
                <motion.div 
                    className="flex items-center justify-center py-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center">
                        <motion.div 
                            className="w-16 h-16 border-4 border-nova-primary/20 border-t-nova-primary rounded-full mx-auto mb-4"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <p className="text-muted-foreground text-lg">Loading library items...</p>
                    </div>
                </motion.div>
            </AppShell>
        );
    }

    if (error) {
        return (
            <AppShell userRole="patron" userName="Patron User" userEmail="patron@nova.com">
                <motion.div 
                    className="flex items-center justify-center py-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">Error Loading Items</h3>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <Button 
                            onClick={() => window.location.reload()} 
                            variant="nova"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                    </div>
                </motion.div>
            </AppShell>
        );
    }

    return (
        <PatronItemsClient
            allItems={items}
            error={error}
        />
    );
}
