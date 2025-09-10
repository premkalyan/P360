'use client';

import { useState } from 'react';

// Import P360 Typography System
import '@/styles/typography.css';

interface LoginState {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  isLoading: boolean;
}

type FormDisplayState = 'empty' | 'filled' | 'error';

export default function LoginPage() {
  const [loginState, setLoginState] = useState<LoginState>({
    email: '',
    password: '',
    errors: {},
    isLoading: false,
  });

  // Determine display state for conditional styling
  const getDisplayState = (): FormDisplayState => {
    if (loginState.errors.email || loginState.errors.password) {
      return 'error';
    }
    if (loginState.email || loginState.password) {
      return 'filled';
    }
    return 'empty';
  };

  const handleInputChange = (field: keyof Pick<LoginState, 'email' | 'password'>, value: string) => {
    setLoginState(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined // Clear error when user starts typing
      }
    }));
  };

  const handleLogin = async () => {
    setLoginState(prev => ({ ...prev, isLoading: true, errors: {} }));

    // Comprehensive validation
    const errors: LoginState['errors'] = {};
    
    // Email validation
    if (!loginState.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginState.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!loginState.password) {
      errors.password = 'Password is required';
    } else if (loginState.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(errors).length > 0) {
      setLoginState(prev => ({ ...prev, errors, isLoading: false }));
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Check for valid credentials
      const validCredentials = [
        { email: 'admin@p360.com', password: 'admin123' },
        { email: 'user@p360.com', password: 'user123' },
        { email: 'demo@p360.com', password: 'demo123' },
        { email: 'rico.oktanondat@gmail.com', password: 'password123' } // From Figma example
      ];

      const isValidLogin = validCredentials.some(
        cred => cred.email === loginState.email && cred.password === loginState.password
      );

      if (isValidLogin) {
        // Successful login - check user type and redirect accordingly
        console.log('Login successful! Redirecting...');
        
              // TODO: P360-133 - Replace with secure backend authentication
              // For MVP demo, simulate admin check (will be replaced with proper role-based auth)
              const isAdminDemo = loginState.email === 'admin@p360.com';

              if (isAdminDemo) {
                alert('Welcome Admin! 🎉\n\nRedirecting to Organization Management...');
                // Redirect admin users to organizations tab
                setTimeout(() => {
                  // TODO: P360-133 - Replace with Next.js router.push() for SPA navigation
                  window.location.href = '/admin/organizations';
                }, 1000);
              } else {
                alert('Login successful! 🎉\n\nRedirecting to dashboard...');
                // Redirect regular users to dashboard
                // TODO: P360-133 - Implement user dashboard routing
                // setTimeout(() => {
                //   router.push('/dashboard');
                // }, 1000);
              }
        
        // For now, just clear the form for non-admin users
        setLoginState({
          email: '',
          password: '',
          errors: {},
          isLoading: false
        });
      } else {
        // Invalid credentials - show error state
        setLoginState(prev => ({
          ...prev,
          errors: {
            email: 'Email not found',
            password: 'Password is wrong'
          },
          isLoading: false
        }));
      }
    }, 1000);
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`OAuth login with ${provider}`);
    // Implement OAuth logic here
  };

  const displayState = getDisplayState();

  // Dynamic styling based on form state
  const getInputClasses = (field: keyof LoginState['errors']) => {
    const baseClasses = "bg-white box-border w-full h-10 px-2.5 py-0 rounded-[4px] p360-input focus:outline-none";
    
    if (loginState.errors[field]) {
      return `${baseClasses} border border-red-500 p360-text-primary`;
    }
    return `${baseClasses} border border-[#e5e7eb] p360-text-primary placeholder:text-[#99a1af]`;
  };

  // Check if form is valid for button state
  const isFormValid = () => {
    const emailValid = loginState.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginState.email);
    const passwordValid = loginState.password && loginState.password.length >= 6;
    return emailValid && passwordValid;
  };

  const getButtonStyling = () => {
    if (loginState.isLoading) {
      return { 
        bg: 'bg-purple-400', 
        text: 'text-white', 
        cursor: 'cursor-not-allowed',
        disabled: true 
      };
    }
    if (isFormValid()) {
      return { 
        bg: 'bg-[#841aff] hover:bg-[#7a17e6]', 
        text: 'text-white',
        cursor: 'cursor-pointer',
        disabled: false
      };
    }
    return { 
      bg: 'bg-[#f4ebff]', 
      text: 'text-[#cea3ff]',
      cursor: 'cursor-not-allowed',
      disabled: true
    };
  };

  const buttonStyling = getButtonStyling();

  return (
    <div
      className="bg-white relative min-h-screen w-full overflow-hidden font-p360"
      data-name="login"
    >
      {/* Background Gradient - More visible at bottom */}
      <div className="absolute bottom-[-60.25px] flex h-[475.252px] items-center justify-center left-1/2 translate-x-[-50%] w-[1440px]">
        <div className="flex-none scale-y-[-100%]">
          <div className="h-[475.252px] overflow-clip relative w-[1440px]">
            <div className="absolute box-border content-stretch flex h-[95.131px] items-center justify-start left-[-32.98px] pl-0 pr-[90.057px] py-0 top-[-67.57px] w-[1413.01px]">
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#ff6221] blur-[64.936px] filter size-full opacity-60" />
                </div>
              </div>
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#ed01cf] blur-[95.054px] filter size-full opacity-60" />
                </div>
              </div>
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#841aff] blur-[96.796px] filter size-full opacity-60" />
                </div>
              </div>
              <div className="basis-0 flex grow h-full items-center justify-center min-h-px min-w-px mr-[-90.057px] relative shrink-0">
                <div className="flex-none scale-y-[-100%] size-full">
                  <div className="bg-[#008dff] blur-[75.839px] filter size-full opacity-60" />
                </div>
              </div>
            </div>
            {/* Noise overlay */}
            <div className="absolute flex h-[476.002px] items-center justify-center left-1/2 mix-blend-overlay translate-x-[-50%] translate-y-[-50%] w-[1320.06px] opacity-20" style={{ top: "calc(50% - 0.375px)" }}>
              <div className="flex-none rotate-[180deg]">
                <div className="bg-gradient-to-r from-orange-200 via-pink-200 via-purple-200 to-blue-200 h-[476.002px] w-[1320.06px] opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline360 Logo */}
      <div 
        className="absolute h-7 overflow-clip top-[72px] w-[171.818px] z-10" 
        style={{ left: "calc(50% - 0.273px)", transform: "translateX(-50%)" }}
      >
        <img 
          src="/pipeline360-logo.svg" 
          alt="Pipeline360" 
          className="h-7 w-auto block max-w-none"
          style={{ width: "171.818px", height: "28px" }}
        />
      </div>

      {/* Main Content Container */}
      <div 
        className="absolute left-1/2 max-w-[768px] rounded-[4px] translate-x-[-50%] translate-y-[-50%] w-[768px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" 
        style={{ top: "calc(50% - 16px)" }}
      >
        <div className="flex items-center justify-between overflow-clip relative w-[768px] bg-white rounded-[4px] border border-[#e4e4e7]">
          
          {/* Left Panel - Login Form */}
          <div className="basis-0 bg-white box-border flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-[32px] relative shrink-0">
            <div className="flex flex-col gap-6 items-center justify-center relative rounded-[8px] shrink-0 w-full" data-testid="login">
              
              {/* Header */}
              <div className="flex flex-col gap-2 items-start justify-start leading-[0] relative shrink-0 w-full">
                <div className="font-['Lexend_Deca'] font-semibold relative shrink-0 text-[#101828] text-[24px] tracking-[-0.4px] w-full">
                  <p className="leading-[30px]">Welcome back</p>
                </div>
                <div className="font-['Lexend_Deca'] font-normal relative shrink-0 text-[#4a5565] text-[14px] w-full">
                  <p className="leading-[20px]">Login to your Pipeline360 account</p>
                </div>
            </div>

            {/* Form */}
              <div className="flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
                
              {/* Email Field */}
                <div className="flex flex-col gap-2 items-start justify-start relative shrink-0 w-80">
                  <label htmlFor="email" className="flex font-['Lexend_Deca'] font-normal gap-1 items-start justify-start leading-[0] relative shrink-0 text-[14px] w-full">
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#4a5565]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">Email</p>
                    </div>
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#f00250]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[14px] whitespace-pre">*</p>
        </div>
                  </label>
              <input
                    id="email"
                type="email"
                    value={loginState.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={displayState === 'empty' ? 'Enter your email here...' : ''}
                    className={getInputClasses('email')}
                    aria-label="Email"
                    aria-required="true"
                    aria-invalid={!!loginState.errors.email}
                    aria-describedby={loginState.errors.email ? "email-error" : undefined}
                  />
                  {loginState.errors.email && (
                    <p id="email-error" className="font-['Lexend_Deca'] font-normal text-[#f00250] text-[12px] leading-[16px]">
                      {loginState.errors.email}
                    </p>
                )}
            </div>

              {/* Password Field */}
                <div className="flex flex-col gap-2 items-start justify-start relative shrink-0 w-80">
                  <label htmlFor="password" className="flex font-['Lexend_Deca'] font-normal gap-1 items-start justify-start leading-[0] relative shrink-0 text-[14px] w-full">
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#4a5565]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden whitespace-pre">Password</p>
                    </div>
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#f00250]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[14px] whitespace-pre">*</p>
                </div>
                  </label>
              <input
                    id="password"
                    type="password"
                    value={loginState.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={displayState === 'empty' ? 'Enter your password here...' : ''}
                    className={getInputClasses('password')}
                    aria-label="Password"
                    aria-required="true"
                    aria-invalid={!!loginState.errors.password}
                    aria-describedby={loginState.errors.password ? "password-error" : undefined}
                  />
                  {loginState.errors.password && (
                    <p id="password-error" className="font-['Lexend_Deca'] font-normal text-[#f00250] text-[12px] leading-[16px]">
                      {loginState.errors.password}
                    </p>
                )}
          </div>

              {/* Login Button */}
            <button
                  data-testid="login-button"
                  type="button"
                  onClick={handleLogin}
                  disabled={buttonStyling.disabled}
                  className={`box-border flex gap-1.5 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-full p360-button-text transition-colors ${buttonStyling.bg} ${buttonStyling.text} ${buttonStyling.cursor || ''}`}
                  aria-label={loginState.isLoading ? 'Logging in...' : 'Login to your account'}
                >
                  {loginState.isLoading ? 'Logging in...' : 'Login'}
            </button>

                {/* Separator */}
                <div className="box-border flex flex-col gap-2.5 items-start justify-start px-0 py-2.5 relative shrink-0 w-full">
                  <div className="flex flex-col gap-2.5 items-start justify-start relative shrink-0 w-full">
                    <div className="h-0 relative shrink-0 w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-1px] border-t border-[#e5e7eb]"></div>
                    </div>
                  </div>
                  <div className="absolute bg-white box-border flex items-center justify-center px-2 py-0 top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% - 0.5px)" }}>
                    <div className="font-['Lexend_Deca'] font-normal leading-[0] relative shrink-0 text-[12px] text-[#71717a]">
                      <p className="leading-[16px] whitespace-pre">Or continue with</p>
                </div>
                </div>
          </div>

                {/* OAuth Buttons */}
                <div className="flex flex-col gap-2.5 items-center justify-start relative shrink-0 w-full">
                <button
                    onClick={() => handleOAuthLogin('Google')}
                    className="bg-white box-border flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80 border border-[#e5e7eb] hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <div className="font-['Lexend_Deca'] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px]">
                      <p className="leading-[20px] whitespace-pre">Login with Google</p>
                  </div>
                </button>

                <button
                    onClick={() => handleOAuthLogin('Microsoft')}
                    className="bg-white box-border flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80 border border-[#e5e7eb] hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#F25022" d="M1 1h10v10H1z"/>
                      <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                      <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                      <path fill="#FFB900" d="M13 13h10v10H13z"/>
                    </svg>
                    <div className="font-['Lexend_Deca'] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px]">
                      <p className="leading-[20px] whitespace-pre">Login with Microsoft</p>
                  </div>
                </button>
                </div>

              </div>
          </div>
        </div>

          {/* Right Panel - Figma Image */}
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <div 
              className="basis-0 bg-center bg-cover bg-no-repeat grow h-full min-h-px min-w-px shrink-0" 
              style={{ 
                backgroundImage: `url('/figma-placeholder-1.png'), url('/figma-placeholder-2.png')` 
              }}
            />
          </div>

        </div>
      </div>

    </div>
  );
}