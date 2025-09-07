'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual authentication logic
      console.log('Login data:', data);
      
      // For demo purposes, always succeed
      alert('Login successful! (Demo mode)');
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your P360 account to continue"
    >
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </AuthLayout>
  );
}
