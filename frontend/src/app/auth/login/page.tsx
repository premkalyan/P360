'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Test credentials: rico.oktananda1@gmail.com / password
      if (email === 'rico.oktananda1@gmail.com' && password === 'password') {
        console.log('Login successful!');
        // Handle successful login
      } else {
        // Show validation errors
        setErrors({
          email: 'Email not found',
          password: 'Password is wrong'
        });
      }
    }, 1500);
  };

  const handleOAuthLogin = (provider: 'google' | 'microsoft') => {
    console.log(`Login with ${provider}`);
  };

  const isFormFilled = email && password;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 via-purple-600 to-blue-500 opacity-20"></div>
      
      {/* Pipeline360 Logo */}
      <div className="absolute top-[72px] left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <img 
              src="/p360-logo-full.svg" 
              alt="Pipeline360" 
              className="h-7 w-auto"
              style={{ width: "171.818px", height: "28px" }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-24">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex">
            {/* Left Panel - Form */}
            <div className="w-1/2 p-8">
              <div className="max-w-sm mx-auto">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2" style={{ 
                    fontFamily: "'Lexend Deca', sans-serif", 
                    fontSize: "24px", 
                    fontWeight: "600", 
                    lineHeight: "30px", 
                    letterSpacing: "-0.4px",
                    color: "#101828"
                  }}>
                    Welcome back
                  </h2>
                  <p className="text-gray-600 text-sm" style={{ 
                    fontFamily: "'Lexend Deca', sans-serif", 
                    fontSize: "14px", 
                    lineHeight: "20px",
                    color: "#4a5565"
                  }}>
                    Login to your Pipeline360 account
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-sm" style={{ 
                      fontFamily: "'Lexend Deca', sans-serif", 
                      fontSize: "14px", 
                      lineHeight: "20px",
                      color: "#4a5565"
                    }}>
                      Email <span style={{ color: "#f00250" }}>*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email here..."
                        className={`w-full h-10 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                        style={{ 
                          fontFamily: "'Lexend Deca', sans-serif", 
                          fontSize: "14px", 
                          lineHeight: "20px",
                          borderColor: errors.email ? "#f00250" : "#e5e7eb"
                        }}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs" style={{ 
                        fontFamily: "'Lexend Deca', sans-serif", 
                        fontSize: "12px", 
                        lineHeight: "16px",
                        color: "#f00250"
                      }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block text-sm" style={{ 
                      fontFamily: "'Lexend Deca', sans-serif", 
                      fontSize: "14px", 
                      lineHeight: "20px",
                      color: "#4a5565"
                    }}>
                      Password <span style={{ color: "#f00250" }}>*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password here..."
                        className={`w-full h-10 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          errors.password ? 'border-red-500' : 'border-gray-200'
                        }`}
                        style={{ 
                          fontFamily: "'Lexend Deca', sans-serif", 
                          fontSize: "14px", 
                          lineHeight: "20px",
                          borderColor: errors.password ? "#f00250" : "#e5e7eb"
                        }}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-xs" style={{ 
                        fontFamily: "'Lexend Deca', sans-serif", 
                        fontSize: "12px", 
                        lineHeight: "16px",
                        color: "#f00250"
                      }}>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={!isFormFilled || isLoading}
                    className={`w-full h-10 px-4 py-2 rounded text-sm font-medium transition-colors ${
                      isFormFilled && !isLoading
                        ? 'text-white hover:opacity-90' 
                        : 'cursor-not-allowed'
                    }`}
                    style={{ 
                      fontFamily: "'Lexend Deca', sans-serif", 
                      fontSize: "14px", 
                      lineHeight: "20px",
                      backgroundColor: isFormFilled && !isLoading ? "#841aff" : "#f4ebff",
                      color: isFormFilled && !isLoading ? "#ffffff" : "#cea3ff"
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Logging in...
                      </div>
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* Separator */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white" style={{ 
                        fontFamily: "'Lexend Deca', sans-serif", 
                        fontSize: "12px", 
                        lineHeight: "16px",
                        color: "#71717a"
                      }}>
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleOAuthLogin('google')}
                      className="w-full h-10 px-4 py-2 border border-gray-200 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      style={{ 
                        fontFamily: "'Lexend Deca', sans-serif", 
                        fontSize: "14px", 
                        lineHeight: "20px",
                        color: "#101828",
                        borderColor: "#e5e7eb"
                      }}
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
                      type="button"
                      onClick={() => handleOAuthLogin('microsoft')}
                      className="w-full h-10 px-4 py-2 border border-gray-200 rounded text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      style={{ 
                        fontFamily: "'Lexend Deca', sans-serif", 
                        fontSize: "14px", 
                        lineHeight: "20px",
                        color: "#101828",
                        borderColor: "#e5e7eb"
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#f25022" d="M1 1h10v10H1z"/>
                        <path fill="#00a4ef" d="M13 1h10v10H13z"/>
                        <path fill="#7fba00" d="M1 13h10v10H1z"/>
                        <path fill="#ffb900" d="M13 13h10v10H13z"/>
                      </svg>
                      Login with Microsoft
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Panel - Branding */}
            <div className="w-1/2 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
                  Pipeline360
                </h3>
                <p className="text-lg opacity-90" style={{ fontFamily: "'Lexend Deca', sans-serif" }}>
                  Your Digital Advertising Platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}