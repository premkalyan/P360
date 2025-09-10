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

  // Mock user authentication with role detection
  const authenticateUser = async (email: string, password: string) => {
    // TODO: SECURITY CRITICAL - Replace with actual authentication API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Strict whitelist of admin patterns
    const ADMIN_PATTERNS = ['@p360admin.com', '@company-admin.com'];
    const isAdmin = ADMIN_PATTERNS.some(pattern => email.toLowerCase().endsWith(pattern));
    const userRole = isAdmin ? 'admin' : 'user';
    
    return {
      user: {
        id: '1',
        email: email,
        name: email.split('@')[0],
        role: userRole,
        tenantId: isAdmin ? null : 'tenant-1' // Admins can access all tenants
      },
      role: userRole
    };
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
      // Authenticate user and get role information
      const authResult = await authenticateUser(formState.email, formState.password);
      
      // Store user session (in production, handle JWT tokens properly)
      if (typeof window !== 'undefined') {
        localStorage.setItem('p360_user', JSON.stringify(authResult.user));
        localStorage.setItem('p360_user_role', authResult.role);
      }

      // Role-based routing
      if (authResult.role === 'admin') {
        // Admin users go to organization management
        router.push('/admin/organizations');
      } else {
        // Regular users go to standard dashboard
        router.push('/dashboard');
      }
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
    setFormState(prev => ({ 
      ...prev, 
      errors: { general: 'Social login not yet implemented' }
    }));
  };

  // Function to check if form is valid for button enable/disable
  const isFormValid = () => {
    const emailValid = formState.email && /\S+@\S+\.\S+/.test(formState.email);
    const passwordValid = formState.password && formState.password.length > 0;
    return !!(emailValid && passwordValid);
  };

  return (
    <div style={{
      position: 'relative',
      width: '1440px',
      height: '960px',
      left: '100px',
      top: '100px',
      background: '#FFFFFF'
    }}>
      {/* Color Info - Background Gradient */}
      <div style={{
        position: 'absolute',
        width: '1440px',
        height: '475.25px',
        left: 'calc(50% - 1440px/2)',
        bottom: '-60.25px',
        transform: 'matrix(1, 0, 0, -1, 0, 0)'
      }}>
        {/* Frame 2147234854 - Gradient Rectangles */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          position: 'absolute',
          width: '1413.01px',
          height: '95.13px',
          left: '-32.98px',
          top: '447.69px',
          transform: 'matrix(1, 0, 0, -1, 0, 0)'
        }}>
          {/* Rectangle 240664298 */}
          <div style={{
            width: '420.8px',
            height: '95.13px',
            background: '#FF6221',
            filter: 'blur(64.9358px)',
            flex: 'none',
            order: 0,
            alignSelf: 'stretch',
            flexGrow: 1,
            margin: '0px -90.0574px'
          }} />
          
          {/* Rectangle 240664299 */}
          <div style={{
            width: '420.8px',
            height: '95.13px',
            background: '#ED01CF',
            filter: 'blur(95.0537px)',
            flex: 'none',
            order: 1,
            alignSelf: 'stretch',
            flexGrow: 1,
            margin: '0px -90.0574px'
          }} />
          
          {/* Rectangle 240664300 */}
          <div style={{
            width: '420.8px',
            height: '95.13px',
            background: '#841AFF',
            filter: 'blur(96.7956px)',
            flex: 'none',
            order: 2,
            alignSelf: 'stretch',
            flexGrow: 1,
            margin: '0px -90.0574px'
          }} />
          
          {/* Rectangle 240664301 */}
          <div style={{
            width: '420.8px',
            height: '95.13px',
            background: '#008DFF',
            filter: 'blur(75.8385px)',
            flex: 'none',
            order: 3,
            alignSelf: 'stretch',
            flexGrow: 1
          }} />
        </div>
      </div>

      {/* Main Flex Container */}
      <div style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        position: 'absolute',
        width: '768px',
        maxWidth: '768px',
        height: '528px',
        left: 'calc(50% - 768px/2 + 1px)',
        top: 'calc(50% - 528px/2 - 17px)',
        border: '1px solid #E4E4E7',
        filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.06))',
        borderRadius: '4px'
      }}>
        {/* Left Side - Login Form */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '32px',
          gap: '16px',
          width: '384px',
          height: '528px',
          background: '#FFFFFF',
          flex: 'none',
          order: 0,
          flexGrow: 1
        }}>
          {/* Form Container */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            gap: '24px',
            width: '320px',
            height: '464px',
            borderRadius: '8px',
            flex: 'none',
            order: 0,
            alignSelf: 'stretch',
            flexGrow: 0
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '8px',
              width: '320px',
              height: '58px',
              flex: 'none',
              order: 0,
              alignSelf: 'stretch',
              flexGrow: 0
            }}>
              {/* Title Text */}
              <h1 style={{
                width: '320px',
                height: '30px',
                fontFamily: 'Lexend Deca',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '30px',
                letterSpacing: '-0.4px',
                color: '#101828',
                flex: 'none',
                order: 0,
                alignSelf: 'stretch',
                flexGrow: 0,
                margin: 0
              }}>
                Welcome back
              </h1>
              
              {/* This is a card description. */}
              <p style={{
                width: '320px',
                height: '20px',
                fontFamily: 'Lexend Deca',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#4A5565',
                flex: 'none',
                order: 1,
                alignSelf: 'stretch',
                flexGrow: 0,
                margin: 0
              }}>
                Login to your Pipeline360 account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '24px',
              width: '320px',
              height: '382px',
              flex: 'none',
              order: 1,
              alignSelf: 'stretch',
              flexGrow: 0
            }}>
              {/* Email Field */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                width: '320px',
                height: '68px',
                flex: 'none',
                order: 0,
                flexGrow: 0
              }}>
                {/* Email Label */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '320px',
                  height: '20px',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }}>
                  {/* Email */}
                  <span style={{
                    width: '38px',
                    height: '20px',
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#4A5565',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0
                  }}>
                    Email
                  </span>
                  {/* * */}
                  <span style={{
                    width: '6px',
                    height: '20px',
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#F00250',
                    flex: 'none',
                    order: 1,
                    flexGrow: 0
                  }}>
                    *
                  </span>
        </div>
        
                {/* Button 2 (Email Input) */}
              <input
                type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ 
                    ...prev, 
                    email: e.target.value,
                    errors: { ...prev.errors, email: undefined }
                  }))}
                  placeholder="Enter your email here..."
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '0px 10px',
                    gap: '2px',
                    width: '320px',
                    height: '40px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    flex: 'none',
                    order: 1,
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#101828', // Black text when typing
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.color = '#101828'; // Ensure black text when focused
                  }}
                />
                {formState.errors.email && (
                  <span style={{
                    fontFamily: 'Lexend Deca',
                    fontSize: '12px',
                    color: '#F00250'
                  }}>
                    {formState.errors.email}
                  </span>
                )}
            </div>

              {/* Password Field */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                width: '320px',
                height: '68px',
                flex: 'none',
                order: 1,
                flexGrow: 0
              }}>
                {/* Password Label */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '0px',
                  gap: '4px',
                  width: '320px',
                  height: '20px',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }}>
                  {/* Password */}
                  <span style={{
                    width: '65px',
                    height: '20px',
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#4A5565',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0
                  }}>
                Password
                  </span>
                  {/* * */}
                  <span style={{
                    width: '6px',
                    height: '20px',
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#F00250',
                    flex: 'none',
                    order: 1,
                    flexGrow: 0
                  }}>
                    *
                  </span>
                </div>
                
                {/* Password Input Container */}
                <div style={{ position: 'relative', width: '100%' }}>
                  {/* Button 2 (Password Input) */}
              <input
                    type={formState.showPassword ? 'text' : 'password'}
                    value={formState.password}
                    onChange={(e) => setFormState(prev => ({ 
                      ...prev, 
                      password: e.target.value,
                      errors: { ...prev.errors, password: undefined }
                    }))}
                    placeholder="Enter your password here..."
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '0px 10px',
                      paddingRight: '40px',
                      gap: '2px',
                      width: '320px',
                      height: '40px',
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      flex: 'none',
                      order: 1,
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      fontFamily: 'Lexend Deca',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#101828', // Black text when typing
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.color = '#101828'; // Ensure black text when focused
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                    aria-label={formState.showPassword ? 'Hide password' : 'Show password'}
                  >
                    {formState.showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
            </div>
                {formState.errors.password && (
                  <span style={{
                    fontFamily: 'Lexend Deca',
                    fontSize: '12px',
                    color: '#F00250'
                  }}>
                    {formState.errors.password}
                  </span>
                )}
          </div>

              {/* Login Button */}
            <button
              type="submit"
                disabled={formState.loading || !isFormValid()} // ✅ Disable until valid email & password
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '4px 12px',
                  gap: '6px',
                  width: '320px',
                  height: '40px',
                  background: (formState.loading || !isFormValid()) ? '#F4EBFF' : '#841AFF', // Disabled vs enabled state
                  borderRadius: '4px',
                  border: 'none',
                  cursor: (formState.loading || !isFormValid()) ? 'not-allowed' : 'pointer',
                  flex: 'none',
                  order: 2,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }}
              >
                {/* Login */}
                <span style={{
                  width: '39px',
                  height: '20px',
                  fontFamily: 'Lexend Deca',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: (formState.loading || !isFormValid()) ? '#CEA3FF' : '#FFFFFF', // Disabled vs enabled text color
                  flex: 'none',
                  order: 0,
                  flexGrow: 0
                }}>
                  {formState.loading ? 'Logging in...' : 'Login'}
                </span>
            </button>

              {/* General Error */}
              {formState.errors.general && (
                <div style={{
                  fontFamily: 'Lexend Deca',
                  fontSize: '12px',
                  color: '#F00250',
                  textAlign: 'center',
                  width: '100%'
                }}>
                  {formState.errors.general}
                </div>
              )}

              {/* Separator */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '10px 0px',
                gap: '10px',
                isolation: 'isolate',
                width: '320px',
                height: '20px',
                flex: 'none',
                order: 3,
                alignSelf: 'stretch',
                flexGrow: 0,
                position: 'relative'
              }}>
                {/* Separator Line */}
                <div style={{
                  width: '320px',
                  height: '0px',
                  border: '1px solid #E5E7EB',
                  flex: 'none',
                  order: 0,
                  alignSelf: 'stretch',
                  flexGrow: 0
                }} />
                
                {/* Or continue with */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '0px 8px',
                  position: 'absolute',
                  width: '112px',
                  height: '16px',
                  left: 'calc(50% - 112px/2 - 0.5px)',
                  top: 'calc(50% - 16px/2)',
                  background: '#FFFFFF',
                  flex: 'none',
                  order: 1,
                  flexGrow: 0
                }}>
                  {/* Or continue with */}
                  <span style={{
                    width: '96px',
                    height: '16px',
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#71717A',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0
                  }}>
                    Or continue with
                  </span>
                </div>
          </div>

              {/* Social Login Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0px',
                gap: '10px',
                width: '320px',
                height: '90px',
                flex: 'none',
                order: 4,
                alignSelf: 'stretch',
                flexGrow: 0
              }}>
                {/* Google Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '4px 12px',
                    gap: '8px',
                    width: '320px',
                    height: '40px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 'none',
                    order: 0,
                    flexGrow: 0
                  }}
                >
                  {/* Google Icon */}
                  <div style={{ width: '20px', height: '20px', position: 'relative' }}>
                    <svg viewBox="0 0 20 20" style={{ width: '100%', height: '100%' }}>
                      <path d="M18.75 8.23H10.18V11.7H15.23C14.85 13.33 13.42 14.58 11.67 15.05V17.58H15.32C17.55 15.53 18.75 12.59 18.75 8.23Z" fill="#4285F4"/>
                      <path d="M10.18 20C13.42 20 16.11 18.92 17.85 17.08L14.2 14.55C13.13 15.33 11.77 15.8 10.18 15.8C7.05 15.8 4.4 13.73 3.42 10.92H-0.38V13.53C1.35 16.98 5.48 20 10.18 20Z" fill="#34A853"/>
                      <path d="M3.42 10.92C3.15 10.14 3 9.3 3 8.43C3 7.56 3.15 6.72 3.42 5.94V3.33H-0.38C-1.38 5.33 -2 6.83 -2 8.43C-2 10.03 -1.38 11.53 -0.38 13.53L3.42 10.92Z" fill="#FBBC05"/>
                      <path d="M10.18 3.25C11.95 3.25 13.54 3.92 14.77 5.1L17.93 1.94C16.1 0.19 13.41 -0.75 10.18 -0.75C5.48 -0.75 1.35 2.27 -0.38 5.72L3.42 8.33C4.4 5.52 7.05 3.25 10.18 3.25Z" fill="#EA4335"/>
                    </svg>
                  </div>
                  {/* Login with Google */}
                  <span style={{
                    width: '124px',
                    height: '20px',
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#101828',
                    flex: 'none',
                    order: 1,
                    flexGrow: 0
                  }}>
                    Login with Google
                  </span>
                </button>

                {/* Microsoft Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('microsoft')}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '4px 12px',
                    gap: '8px',
                    width: '320px',
                    height: '40px',
                    background: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 'none',
                    order: 1,
                    flexGrow: 0
                  }}
                >
                  {/* Microsoft Icon */}
                  <div style={{ width: '20px', height: '20px', position: 'relative' }}>
                    <svg viewBox="0 0 20 20" style={{ width: '100%', height: '100%' }}>
                      <rect x="2.5" y="2.5" width="7.14" height="7.14" fill="#F35325"/>
                      <rect x="10.36" y="2.5" width="7.14" height="7.14" fill="#81BC06"/>
                      <rect x="2.5" y="10.36" width="7.14" height="7.14" fill="#05A6F0"/>
                      <rect x="10.36" y="10.36" width="7.14" height="7.14" fill="#FFBA08"/>
                    </svg>
                  </div>
                  {/* Login with Microsoft */}
                  <span style={{
                    width: '139px',
                    height: '20px',
                    fontFamily: 'Lexend Deca',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#101828',
                    flex: 'none',
                    order: 1,
                    flexGrow: 0
                  }}>
                    Login with Microsoft
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Content Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px',
          width: '384px',
          height: '528px',
          background: '#CACACA',
          flex: 'none',
          order: 1,
          alignSelf: 'stretch',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'Lexend Deca',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '1.4em',
              color: '#4A5565',
              marginBottom: '16px'
            }}>
              Future Content Area
            </p>
            <p style={{
              fontFamily: 'Lexend Deca',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '1.4285714285714286em',
              color: '#99A1AF'
            }}>
              This space reserved for marketing content,<br />
              onboarding graphics, or promotional material.
            </p>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div style={{
        position: 'absolute',
        width: '171.82px',
        height: '28px',
        left: 'calc(50% - 171.82px/2 - 0.27px)',
        top: '72px'
      }}>
        <Image
          src="/logo-02.png"
          alt="Pipeline360"
          width={172}
          height={28}
          priority
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    </div>
  );
}