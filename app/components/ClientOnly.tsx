'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Suppress hydration warnings for browser extension attributes
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('hydration')) {
        return;
      }
      originalError.apply(console, args);
    };

    // Clean up browser extension attributes that cause hydration mismatches
    const cleanupExtensionAttributes = () => {
      const inputs = document.querySelectorAll('input[fdprocessedid], button[fdprocessedid]');
      inputs.forEach(element => {
        element.removeAttribute('fdprocessedid');
      });
    };

    // Run cleanup after a short delay to allow extensions to finish
    const timeoutId = setTimeout(cleanupExtensionAttributes, 100);

    return () => {
      console.error = originalError;
      clearTimeout(timeoutId);
    };
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
