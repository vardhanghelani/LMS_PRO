'use client';

import React from 'react';
import PremiumNavbar from '@/app/components/premium/PremiumNavbar';
import '../../styles/premium-theme.css';

interface AppShellProps {
  children: React.ReactNode;
  userRole?: 'admin' | 'librarian' | 'patron';
  userName?: string;
  userEmail?: string;
}

export function AppShell({ children, userRole = 'patron', userName, userEmail }: AppShellProps) {
  return (
    <div className="premium-theme min-h-screen">
      {/* Premium Navigation */}
      <PremiumNavbar 
        userRole={userRole}
        userName={userName}
        userEmail={userEmail}
      />

      {/* Main content with proper spacing */}
      <main className="lg:ml-80 pt-12">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
