'use client';

import { useState } from 'react';

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

    // Basic validation
    const errors: LoginState['errors'] = {};
    if (!loginState.email) {
      errors.email = 'Email not found';
    }
    if (!loginState.password) {
      errors.password = 'Password is wrong';
    }

    if (Object.keys(errors).length > 0) {
      setLoginState(prev => ({ ...prev, errors, isLoading: false }));
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // For demo: simulate invalid credentials
      setLoginState(prev => ({
        ...prev,
        errors: {
          email: 'Email not found',
          password: 'Password is wrong'
        },
        isLoading: false
      }));
    }, 1000);
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`OAuth login with ${provider}`);
    // Implement OAuth logic here
  };

  const displayState = getDisplayState();

  // Dynamic styling based on form state
  const getInputBorderColor = (field: keyof LoginState['errors']) => {
    if (loginState.errors[field]) return 'border-red-500';
    if (loginState[field] && !loginState.errors[field]) return 'border-gray-300';
    return 'border-gray-200';
  };

  const getButtonStyling = () => {
    if (loginState.isLoading) {
      return { bg: 'bg-purple-400', text: 'text-white', cursor: 'cursor-not-allowed' };
    }
    if (displayState === 'filled' || displayState === 'error') {
      return { bg: 'bg-purple-600 hover:bg-purple-700', text: 'text-white' };
    }
    return { bg: 'bg-[#f4ebff]', text: 'text-[#cea3ff]' };
  };

  const buttonStyling = getButtonStyling();

  return (
    <div className="relative min-h-screen w-full overflow-hidden" data-name="login"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 50%, #ff6221 70%, #ed01cf 80%, #841aff 90%, #008dff 100%)"
      }}
    >

      {/* Pipeline360 Logo */}
      <div className="absolute top-[72px] left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src="/pipeline360-logo.svg" 
          alt="Pipeline360" 
          className="h-7 w-auto"
          style={{ width: "171.818px", height: "28px" }}
        />
      </div>

      {/* Main Content */}
      <div className="absolute left-1/2 max-w-[768px] rounded-[4px] translate-x-[-50%] translate-y-[-50%] w-[768px]" style={{ top: "calc(50% + 16px)" }}>
        <div className="flex items-center justify-between overflow-hidden relative w-[768px] bg-white rounded-lg shadow-lg">
          
          {/* Left Panel - Login Form */}
          <div className="flex-1 p-8 bg-white">
            <div className="max-w-[384px]">
              
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
                <p className="text-gray-600">Login to your Pipeline360 account</p>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginState.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={displayState === 'empty' ? 'Enter your email here...' : 'a@p360admin.com'}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${getInputBorderColor('email')}`}
                />
                {loginState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{loginState.errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginState.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={displayState === 'empty' ? 'Enter your password here...' : '••••••••'}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${getInputBorderColor('password')}`}
                />
                {loginState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{loginState.errors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loginState.isLoading}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${buttonStyling.bg} ${buttonStyling.text} ${buttonStyling.cursor || ''}`}
              >
                {loginState.isLoading ? 'Logging in...' : 'Login'}
              </button>

              {/* Separator */}
              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleOAuthLogin('Google')}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Login with Google
                </button>

                <button
                  onClick={() => handleOAuthLogin('Microsoft')}
                  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z"/>
                    <path fill="#00A4EF" d="M13 1h10v10H13z"/>
                    <path fill="#7FBA00" d="M1 13h10v10H1z"/>
                    <path fill="#FFB900" d="M13 13h10v10H13z"/>
                  </svg>
                  Login with Microsoft
                </button>
              </div>

            </div>
          </div>

          {/* Right Panel - Branding */}
          <div className="flex-1 bg-gray-100 h-full min-h-[500px] flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Pipeline360</h3>
              <p className="text-gray-600">Your digital advertising platform</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}