'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import '../../styles/typography.css';

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  errors: {
    email?: string;
    password?: string;
  };
}

export default function LoginPage() {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
    showPassword: false,
    loading: false,
    errors: {}
  });
  
  const router = useRouter();

  const updateField = (field: keyof Pick<LoginFormState, 'email' | 'password'>, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined // Clear error when user starts typing
      }
    }));
  };

  const validateForm = (): boolean => {
    const errors: LoginFormState['errors'] = {};
    
    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Email not found';
    }
    
    if (!formState.password) {
      errors.password = 'Password is required';
    } else if (formState.password.length < 6) {
      errors.password = 'Password is wrong';
    }
    
    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormState(prev => ({ ...prev, loading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always succeed
      // TODO: Replace with actual authentication API call
      router.push('/dashboard/campaigns');
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        errors: { email: 'Login failed. Please try again.' }
      }));
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSocialLogin = (provider: 'google' | 'microsoft') => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  return (
    <main 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FF6221 0%, #ED01CF 25%, #841AFF 50%, #008DFF 100%)',
        position: 'relative'
      }}
    >
      {/* Background blur effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 98, 33, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(237, 1, 207, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(132, 26, 255, 0.3) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Pipeline360 Logo */}
      <div 
        className="absolute"
        style={{
          top: '72px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10
        }}
      >
        <Image
          src="/figma_logo_exports/logo-02.png"
          alt="Pipeline360"
          width={172}
          height={28}
          priority
        />
      </div>

      {/* Login Card */}
      <div 
        className="relative"
        style={{
          width: '768px',
          marginTop: '120px' // Account for logo space
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: '4px',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
            padding: '32px',
            maxWidth: '400px',
            margin: '0 auto'
          }}
        >
          {/* Card Header */}
          <div className="text-center mb-6">
            <h1 
              className="p360-text-h1 mb-2"
              style={{ 
                fontFamily: 'Lexend Deca',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '30px',
                color: '#101828',
                letterSpacing: '-0.4px'
              }}
            >
              Welcome back
            </h1>
            <p 
              className="p360-text-body"
              style={{
                fontFamily: 'Lexend Deca',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#4A5565'
              }}
            >
              Login to your Pipeline360 account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6" role="form">
            {/* Email Field */}
            <div>
              <div className="flex items-center gap-1 mb-2">
                <label 
                  htmlFor="email"
                  style={{
                    fontFamily: 'Lexend Deca',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#4A5565'
                  }}
                >
                  Email
                </label>
                <span style={{ color: '#F00250' }}>*</span>
              </div>
              <div
                style={{
                  border: `1px solid ${formState.errors.email ? '#F00250' : '#E5E7EB'}`,
                  borderRadius: '4px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px'
                }}
              >
                <input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Enter your email here..."
                  className="w-full border-none outline-none bg-transparent"
                  style={{
                    fontFamily: 'Lexend Deca',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: formState.email ? '#101828' : '#99A1AF'
                  }}
                />
              </div>
              {formState.errors.email && (
                <p style={{ 
                  fontFamily: 'Lexend Deca',
                  fontSize: '12px',
                  color: '#F00250',
                  marginTop: '4px'
                }}>
                  {formState.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center gap-1 mb-2">
                <label 
                  htmlFor="password"
                  style={{
                    fontFamily: 'Lexend Deca',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#4A5565'
                  }}
                >
                  Password
                </label>
                <span style={{ color: '#F00250' }}>*</span>
              </div>
              <div
                style={{
                  border: `1px solid ${formState.errors.password ? '#F00250' : '#E5E7EB'}`,
                  borderRadius: '4px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                  justifyContent: 'space-between'
                }}
              >
                <input
                  id="password"
                  type={formState.showPassword ? 'text' : 'password'}
                  value={formState.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Enter your password here..."
                  className="flex-1 border-none outline-none bg-transparent"
                  style={{
                    fontFamily: 'Lexend Deca',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: formState.password ? '#101828' : '#99A1AF'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                  className="ml-2 p-1 hover:bg-gray-100 rounded"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path 
                      d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" 
                      stroke="#99A1AF" 
                      strokeWidth="1.2" 
                      fill="none"
                    />
                    <circle cx="8" cy="8" r="2" stroke="#99A1AF" strokeWidth="1.2" fill="none"/>
                    {!formState.showPassword && (
                      <line x1="1" y1="1" x2="15" y2="15" stroke="#99A1AF" strokeWidth="1.2"/>
                    )}
                  </svg>
                </button>
              </div>
              {formState.errors.password && (
                <p style={{ 
                  fontFamily: 'Lexend Deca',
                  fontSize: '12px',
                  color: '#F00250',
                  marginTop: '4px'
                }}>
                  {formState.errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={formState.loading}
              style={{
                width: '100%',
                height: '40px',
                background: formState.loading ? '#F4EBFF' : '#841AFF',
                borderRadius: '4px',
                border: 'none',
                fontFamily: 'Lexend Deca',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: formState.loading ? '#CEA3FF' : '#FFFFFF',
                cursor: formState.loading ? 'not-allowed' : 'pointer',
                opacity: formState.loading ? 0.7 : 1
              }}
            >
              {formState.loading ? 'Signing In...' : 'Login'}
            </button>

            {/* Separator */}
            <div className="relative py-2">
              <hr style={{ border: '1px solid #E5E7EB', margin: 0 }} />
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: '#FFFFFF',
                  padding: '0 8px',
                  fontFamily: 'Lexend Deca',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#71717A'
                }}
              >
                Or continue with
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2">
              {/* Google Login */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                style={{
                  width: '100%',
                  height: '40px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: 'Lexend Deca',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#101828',
                  cursor: 'pointer'
                }}
              >
                {/* Google Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.18 8.41V12.16H15.75C15.54 13.16 14.95 14.06 14.05 14.65L17.27 17.15C18.87 15.67 19.77 13.41 19.77 10.67C19.77 9.98 19.71 9.32 19.61 8.68L10.18 8.41Z" fill="#4285F4"/>
                  <path d="M4.07 11.67L3.23 12.33L0.46 14.48C2.04 17.61 5.78 19.77 10.18 19.77C12.68 19.77 14.77 18.97 16.27 17.58L13.05 15.08C12.15 15.67 10.98 16.08 10.18 16.08C7.78 16.08 5.74 14.6 4.98 12.57L4.07 11.67Z" fill="#34A853"/>
                  <path d="M0.46 5.52C1.67 2.42 5.52 0.23 10.18 0.23C12.18 0.23 13.98 0.93 15.38 2.28L12.68 4.98C11.88 4.23 10.78 3.78 10.18 3.78C7.78 3.78 5.74 5.26 4.98 7.29C4.69 8.04 4.52 8.85 4.52 9.69C4.52 10.53 4.69 11.34 4.98 12.09L0.46 5.52Z" fill="#FBBC05"/>
                  <path d="M10.18 3.78C11.81 3.78 13.26 4.35 14.38 5.42L16.77 3.03C14.97 1.34 12.68 0.23 10.18 0.23C6.99 0.23 4.25 1.91 2.67 4.45L4.98 7.29C5.74 5.26 7.78 3.78 10.18 3.78Z" fill="#EA4335"/>
                </svg>
                Login with Google
              </button>

              {/* Microsoft Login */}
              <button
                type="button"
                onClick={() => handleSocialLogin('microsoft')}
                style={{
                  width: '100%',
                  height: '40px',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontFamily: 'Lexend Deca',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#101828',
                  cursor: 'pointer'
                }}
              >
                {/* Microsoft Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2.5" y="2.5" width="7.14" height="7.14" fill="#F35325"/>
                  <rect x="10.36" y="2.5" width="7.14" height="7.14" fill="#81BC06"/>
                  <rect x="2.5" y="10.36" width="7.14" height="7.14" fill="#05A6F0"/>
                  <rect x="10.36" y="10.36" width="7.14" height="7.14" fill="#FFBA08"/>
                </svg>
                Login with Microsoft
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}