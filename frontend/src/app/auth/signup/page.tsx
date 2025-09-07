'use client';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
  }) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implement actual registration logic
      console.log('Signup data:', data);
      
      // For demo purposes, always succeed
      alert('Account created successfully! (Demo mode)\nPlease check your email for verification.');
      router.push('/auth/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join P360 to unlock powerful performance marketing insights"
    >
      <SignupForm onSubmit={handleSignup} loading={loading} />
    </AuthLayout>
  );
}
