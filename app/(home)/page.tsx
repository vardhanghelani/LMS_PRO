'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Library, Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page immediately
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nova-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-nova-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-nova-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-nova-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Loading Screen */}
      <motion.div 
        className="text-center relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex justify-center mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-20 h-20 nova-gradient rounded-2xl flex items-center justify-center shadow-nova-lg">
            <Library className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold font-heading gradient-text mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Nova Library
        </motion.h1>
        
        <motion.p 
          className="text-white/80 font-medium mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Redirecting to login...
        </motion.p>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex space-x-2">
            <motion.div
              className="w-3 h-3 bg-nova-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-3 h-3 bg-nova-secondary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-3 h-3 bg-nova-accent rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}