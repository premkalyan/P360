'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    showPassword: false,
    loading: false,
    errors: {}
  });

  const validateForm = () => {
    const errors: LoginFormState['errors'] = {};
    
    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formState.password) {
      errors.password = 'Password is required';
    } else if (formState.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }));
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, errors: {} }));

    try {
      // TODO: SECURITY CRITICAL - Replace with actual authentication API call
      // This should integrate with NextAuth.js or similar secure auth system
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Implement proper login logic
      console.log('Login attempt:', { email: formState.email });
      
      // Navigate to dashboard on successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setFormState(prev => ({ 
        ...prev, 
        errors: { general: 'Login failed. Please try again.' },
        loading: false 
      }));
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSocialLogin = (provider: 'google' | 'microsoft') => {
    // TODO: SECURITY CRITICAL - Implement proper OAuth2 flow
    // - Use NextAuth.js providers
    // - Implement PKCE for security
    // - Secure token storage and validation
    // - Proper redirect URI validation
    console.log(`Login with ${provider}`);
  };

  return (
    <main className="min-h-screen bg-white relative">
      {/* Pipeline360 Logo */}
      <div className="absolute top-[72px] left-1/2 transform -translate-x-1/2">
        <Image
          src="/figma_logo_exports/logo-02.png"
          alt="Pipeline360"
          width={172}
          height={28}
          priority
          className="h-7 w-auto"
        />
      </div>

      {/* Main Container */}
      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-8 pt-[200px]">
          <div className="w-[768px] bg-white border border-[#E4E4E7] rounded shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
            <div className="p-8">
              <div className="max-w-[320px] mx-auto">
                {/* Header */}
                <div className="text-center mb-6">
                  <h1 
                    className="text-[#101828] mb-2"
                    style={{
                      fontFamily: 'Lexend Deca, sans-serif',
                      fontWeight: 600,
                      fontSize: '24px',
                      lineHeight: '1.25em',
                      letterSpacing: '-0.4px'
                    }}
                  >
                    Welcome back
                  </h1>
                  <p 
                    className="text-[#4A5565]"
                    style={{
                      fontFamily: 'Lexend Deca, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '1.4285714285714286em'
                    }}
                  >
                    Login to your Pipeline360 account
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} role="form" className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <div className="flex gap-1 mb-2">
                      <label 
                        htmlFor="email" 
                        className="text-[#4A5565]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '1.4285714285714286em'
                        }}
                      >
                        Email
                      </label>
                      <span 
                        className="text-[#F00250]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '1.4285714285714286em'
                        }}
                      >
                        *
                      </span>
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ 
                        ...prev, 
                        email: e.target.value,
                        errors: { ...prev.errors, email: undefined }
                      }))}
                      placeholder="Enter your email here..."
                      className="w-full h-10 px-4 border border-[#E5E7EB] rounded bg-white text-[#101828] placeholder-[#99A1AF]"
                      style={{
                        fontFamily: 'Lexend Deca, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '1.4285714285714286em'
                      }}
                    />
                    {formState.errors.email && (
                      <p className="text-[#F00250] text-sm mt-1" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>
                        {formState.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex gap-1 mb-2">
                      <label 
                        htmlFor="password" 
                        className="text-[#4A5565]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '1.4285714285714286em'
                        }}
                      >
                        Password
                      </label>
                      <span 
                        className="text-[#F00250]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '1.4285714285714286em'
                        }}
                      >
                        *
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={formState.showPassword ? 'text' : 'password'}
                        value={formState.password}
                        onChange={(e) => setFormState(prev => ({ 
                          ...prev, 
                          password: e.target.value,
                          errors: { ...prev.errors, password: undefined }
                        }))}
                        placeholder="Enter your password here..."
                        className="w-full h-10 px-4 pr-10 border border-[#E5E7EB] rounded bg-white text-[#101828] placeholder-[#99A1AF]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '1.4285714285714286em'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#99A1AF] hover:text-[#4A5565]"
                        aria-label={formState.showPassword ? 'Hide password' : 'Show password'}
                        aria-pressed={formState.showPassword}
                      >
                        {formState.showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    {formState.errors.password && (
                      <p className="text-[#F00250] text-sm mt-1" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>
                        {formState.errors.password}
                      </p>
                    )}
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={formState.loading}
                    className="w-full h-10 bg-[#F4EBFF] rounded flex items-center justify-center gap-1.5 hover:bg-[#E9D5FF] disabled:opacity-50"
                  >
                    <span 
                      className="text-[#CEA3FF]"
                      style={{
                        fontFamily: 'Lexend Deca, sans-serif',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '1.4285714285714286em'
                      }}
                    >
                      {formState.loading ? 'Logging in...' : 'Login'}
                    </span>
                  </button>

                  {/* General Error */}
                  {formState.errors.general && (
                    <p className="text-[#F00250] text-sm text-center" style={{ fontFamily: 'Lexend Deca, sans-serif' }}>
                      {formState.errors.general}
                    </p>
                  )}

                  {/* Separator */}
                  <div className="relative py-2.5">
                    <hr className="border-[#E5E7EB]" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                      <span 
                        className="text-[#71717A]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '12px',
                          lineHeight: '1.3333333333333333em'
                        }}
                      >
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      className="w-full h-10 border border-[#E5E7EB] rounded bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <div className="w-5 h-5">
                        {/* Google Icon */}
                        <svg viewBox="0 0 20 20" className="w-full h-full">
                          <path d="M18.75 8.23H10.18V11.7H15.23C14.85 13.33 13.42 14.58 11.67 15.05V17.58H15.32C17.55 15.53 18.75 12.59 18.75 8.23Z" fill="#4285F4"/>
                          <path d="M10.18 20C13.42 20 16.11 18.92 17.85 17.08L14.2 14.55C13.13 15.33 11.77 15.8 10.18 15.8C7.05 15.8 4.4 13.73 3.42 10.92H-0.38V13.53C1.35 16.98 5.48 20 10.18 20Z" fill="#34A853"/>
                          <path d="M3.42 10.92C3.15 10.14 3 9.3 3 8.43C3 7.56 3.15 6.72 3.42 5.94V3.33H-0.38C-1.38 5.33 -2 6.83 -2 8.43C-2 10.03 -1.38 11.53 -0.38 13.53L3.42 10.92Z" fill="#FBBC05"/>
                          <path d="M10.18 3.25C11.95 3.25 13.54 3.92 14.77 5.1L17.93 1.94C16.1 0.19 13.41 -0.75 10.18 -0.75C5.48 -0.75 1.35 2.27 -0.38 5.72L3.42 8.33C4.4 5.52 7.05 3.25 10.18 3.25Z" fill="#EA4335"/>
                        </svg>
                      </div>
                      <span 
                        className="text-[#101828]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '1.4285714285714286em'
                        }}
                      >
                        Login with Google
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialLogin('microsoft')}
                      className="w-full h-10 border border-[#E5E7EB] rounded bg-white hover:bg-gray-50 flex items-center justify-center gap-2"
                    >
                      <div className="w-5 h-5">
                        {/* Microsoft Icon */}
                        <svg viewBox="0 0 20 20" className="w-full h-full">
                          <rect x="2.5" y="2.5" width="7.14" height="7.14" fill="#F35325"/>
                          <rect x="10.36" y="2.5" width="7.14" height="7.14" fill="#81BC06"/>
                          <rect x="2.5" y="10.36" width="7.14" height="7.14" fill="#05A6F0"/>
                          <rect x="10.36" y="10.36" width="7.14" height="7.14" fill="#FFBA08"/>
                        </svg>
                      </div>
                      <span 
                        className="text-[#101828]"
                        style={{
                          fontFamily: 'Lexend Deca, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '1.4285714285714286em'
                        }}
                      >
                        Login with Microsoft
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Placeholder Content Area */}
        <div className="flex-1 bg-[#CACACA] flex items-center justify-center">
          <div className="text-center">
            <p 
              className="text-[#4A5565] mb-4"
              style={{
                fontFamily: 'Lexend Deca, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '1.4em'
              }}
            >
              Future Content Area
            </p>
            <p 
              className="text-[#99A1AF]"
              style={{
                fontFamily: 'Lexend Deca, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.4285714285714286em'
              }}
            >
              This space reserved for marketing content,<br />
              onboarding graphics, or promotional material.
            </p>
          </div>
        </div>
      </div>

      {/* Background Gradient Effect (bottom) */}
      <div className="fixed bottom-0 left-0 right-0 h-[475px] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6221] via-[#ED01CF] via-[#841AFF] to-[#008DFF] opacity-20 blur-[100px]" />
      </div>
    </main>
  );
}