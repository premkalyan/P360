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

type ScreenState = 'empty' | 'filled' | 'error';

export default function LoginPage() {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
    errors: {},
    isLoading: false
  });

  // Determine current screen state based on input and errors
  const getScreenState = (): ScreenState => {
    if (Object.keys(state.errors).length > 0) return 'error';
    if (state.email || state.password) return 'filled';
    return 'empty';
  };

  const screenState = getScreenState();

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    setState(prev => ({
      ...prev,
      [field]: value,
      errors: {
        ...prev.errors,
        [field]: undefined // Clear error for this field
      }
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!state.email || !state.password) return;

    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    setTimeout(() => {
      // Test credentials: rico.oktananda1@gmail.com / password
      if (state.email === 'rico.oktananda1@gmail.com' && state.password === 'password') {
        console.log('Login successful!');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Show validation errors (Error state)
        setState(prev => ({
          ...prev,
          isLoading: false,
          errors: {
            email: 'Email not found',
            password: 'Password is wrong'
          }
        }));
      }
    }, 1500);
  };

  const handleOAuthLogin = (provider: 'google' | 'microsoft') => {
    console.log(`Login with ${provider}`);
  };

  // Get input border classes based on screen state
  const getInputBorderClass = (field: 'email' | 'password') => {
    if (screenState === 'error' && state.errors[field]) {
      return 'border-[#f00250]';
    }
    return 'border-gray-200';
  };

  // Get input text content based on screen state
  const getInputContent = (field: 'email' | 'password') => {
    if (screenState === 'filled' && state[field]) {
      return field === 'password' ? '**********' : state[field];
    }
    return '';
  };

  // Get input text color based on screen state
  const getInputTextColor = (field: 'email' | 'password') => {
    if (screenState === 'filled' && state[field]) {
      return 'text-[#101828]';
    }
    return 'text-[#99a1af]';
  };

  // Get placeholder text
  const getPlaceholder = (field: 'email' | 'password') => {
    if (screenState === 'filled' && state[field]) return '';
    return field === 'email' ? 'Enter your email here...' : 'Enter your password here...';
  };

  // Get button styling based on screen state
  const getButtonStyling = () => {
    const isFormFilled = state.email && state.password;
    if (screenState === 'filled' && isFormFilled && !state.isLoading) {
      return { bg: 'bg-[#841aff]', text: 'text-white' };
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
        <div className="content-stretch flex items-center justify-between max-w-inherit overflow-clip relative w-[768px]">
          
          {/* Left Panel - Form */}
          <div className="basis-0 bg-white box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-[32px] relative shrink-0">
            <div className="content-stretch flex flex-col gap-6 items-center justify-center relative rounded-[8px] shrink-0 w-full">
              
              {/* Header */}
              <div className="content-stretch flex flex-col gap-2 items-start justify-start leading-[0] relative shrink-0 w-full">
                <div className="font-['Lexend_Deca:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[#101828] text-[24px] tracking-[-0.4px] w-full">
                  <p className="leading-[30px]">Welcome back</p>
                </div>
                <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal relative shrink-0 text-[#4a5565] text-[14px] w-full">
                  <p className="leading-[20px]">Login to your Pipeline360 account</p>
                </div>
            </div>

            {/* Form */}
              <form onSubmit={handleLogin} className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
                
              {/* Email Field */}
                <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-80">
                  <div className="content-stretch flex font-['Lexend_Deca:Regular',_sans-serif] font-normal gap-1 items-start justify-start leading-[0] relative shrink-0 text-[14px] text-nowrap w-full">
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#4a5565]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-nowrap whitespace-pre">Email</p>
                    </div>
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#f00250]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[14px] text-nowrap whitespace-pre">*</p>
                    </div>
        </div>
                  <div className="bg-white box-border content-stretch flex gap-0.5 h-10 items-center justify-start px-2.5 py-0 relative rounded-[4px] shrink-0 w-full">
                    <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${getInputBorderClass('email')}`} />
              <input
                type="email"
                      value={state.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={getPlaceholder('email')}
                      disabled={state.isLoading}
                      className={`basis-0 box-border content-stretch flex grow items-start justify-start min-h-px min-w-px px-1.5 py-0 relative shrink-0 font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] text-[14px] text-nowrap w-full bg-transparent border-none outline-none ${getInputTextColor('email')}`}
                    />
                  </div>
                  {screenState === 'error' && state.errors.email && (
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#f00250] text-[12px] text-nowrap">
                      <p className="leading-[16px] whitespace-pre">{state.errors.email}</p>
                    </div>
                )}
            </div>

              {/* Password Field */}
                <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-80">
                  <div className="content-stretch flex font-['Lexend_Deca:Regular',_sans-serif] font-normal gap-1 items-start justify-start leading-[0] relative shrink-0 text-[14px] text-nowrap w-full">
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#4a5565]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-nowrap whitespace-pre">Password</p>
                    </div>
                    <div className="overflow-ellipsis overflow-hidden relative shrink-0 text-[#f00250]">
                      <p className="leading-[20px] overflow-ellipsis overflow-hidden text-[14px] text-nowrap whitespace-pre">*</p>
                    </div>
                </div>
                  <div className="bg-white box-border content-stretch flex gap-0.5 h-10 items-center justify-start px-2.5 py-0 relative rounded-[4px] shrink-0 w-full">
                    <div aria-hidden="true" className={`absolute border border-solid inset-[-1px] pointer-events-none rounded-[5px] ${getInputBorderClass('password')}`} />
              <input
                      type="password"
                      value={state.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder={getPlaceholder('password')}
                      disabled={state.isLoading}
                      className={`basis-0 box-border content-stretch flex grow items-start justify-start min-h-px min-w-px px-1.5 py-0 relative shrink-0 font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] text-[14px] text-nowrap w-full bg-transparent border-none outline-none ${getInputTextColor('password')}`}
                    />
                  </div>
                  {screenState === 'error' && state.errors.password && (
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#f00250] text-[12px] text-nowrap">
                      <p className="leading-[16px] whitespace-pre">{state.errors.password}</p>
            </div>
                )}
          </div>

              {/* Login Button */}
            <button
              type="submit"
                  disabled={!state.email || !state.password || state.isLoading}
                  className={`${buttonStyling.bg} box-border content-stretch flex gap-1.5 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-full`}
                >
                  <div className={`font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 ${buttonStyling.text} text-[14px] text-nowrap`}>
                    <p className="leading-[20px] whitespace-pre">
                      {state.isLoading ? 'Logging in...' : 'Login'}
                    </p>
                  </div>
            </button>

                {/* Separator */}
                <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-2.5 relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-2.5 items-start justify-start relative shrink-0 w-full">
                    <div className="h-0 relative shrink-0 w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-1px]" style={{ "--stroke-0": "rgba(229, 231, 235, 1)" } as React.CSSProperties}>
                        <img alt="" className="block max-w-none size-full" src={img} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute bg-white box-border content-stretch flex items-center justify-center px-2 py-0 top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% - 0.5px)" }}>
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-nowrap text-zinc-500">
                      <p className="leading-[16px] whitespace-pre">Or continue with</p>
                </div>
                </div>
          </div>

                {/* OAuth Buttons */}
                <div className="content-stretch flex flex-col gap-2.5 items-center justify-start relative shrink-0 w-full">
                  {/* Google Login */}
                <button
                  type="button"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={state.isLoading}
                    className="bg-white box-border content-stretch flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80"
                  >
                    <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <div className="overflow-clip relative shrink-0 size-5">
                      <div className="absolute inset-[42.05%_6.25%_16.83%_50.89%]">
                        <img alt="" className="block max-w-none size-full" src={img1} />
                      </div>
                      <div className="absolute inset-[58.33%_19.56%_6.25%_11.04%]">
                        <img alt="" className="block max-w-none size-full" src={img2} />
                      </div>
                      <div className="absolute inset-[30.39%_74.11%_30.39%_6.25%]">
                        <img alt="" className="block max-w-none size-full" src={img3} />
                      </div>
                      <div className="absolute inset-[6.25%_19.24%_58.31%_11.04%]">
                        <img alt="" className="block max-w-none size-full" src={img4} />
                      </div>
                    </div>
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px] text-nowrap">
                      <p className="leading-[20px] whitespace-pre">Login with Google</p>
                  </div>
                </button>

                  {/* Microsoft Login */}
                <button
                  type="button"
                    onClick={() => handleOAuthLogin('microsoft')}
                    disabled={state.isLoading}
                    className="bg-white box-border content-stretch flex gap-2 h-10 items-center justify-center px-3 py-1 relative rounded-[4px] shrink-0 w-80"
                  >
                    <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <div className="overflow-clip relative shrink-0 size-5">
                      <div className="absolute inset-[12.5%_51.79%_51.79%_12.5%]">
                        <img alt="" className="block max-w-none size-full" src={img5} />
                      </div>
                      <div className="absolute inset-[12.5%_12.5%_51.79%_51.79%]">
                        <img alt="" className="block max-w-none size-full" src={img6} />
                      </div>
                      <div className="absolute inset-[51.79%_51.79%_12.5%_12.5%]">
                        <img alt="" className="block max-w-none size-full" src={img7} />
                      </div>
                      <div className="absolute inset-[51.79%_12.5%_12.5%_51.78%]">
                        <img alt="" className="block max-w-none size-full" src={img8} />
                      </div>
                    </div>
                    <div className="font-['Lexend_Deca:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#101828] text-[14px] text-nowrap">
                      <p className="leading-[20px] whitespace-pre">Login with Microsoft</p>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

          {/* Right Panel - Branding */}
          <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
            <div className="basis-0 bg-center bg-cover bg-no-repeat grow h-full min-h-px min-w-px shrink-0" style={{ backgroundImage: `url('${imgDiv}'), url('${imgDiv1}')` }} />
          </div>
        </div>
        
        {/* Border and Shadow */}
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" />
      </div>
    </div>
  );
}