'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function ProtectedRoute({ children, adminOnly = false }: { 
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    
    if (adminOnly) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role !== 'Admin') {
        console.log(user)
        console.warn('Access denied: Admins only');
        router.push('/');
      }
    }
  }, [router, adminOnly]);

  return <>{children}</>;
}